import type { ProcessedMatch } from '../services/espnApi';
import * as external from '../services/externalAnalytics';

export interface MatchAnalysis {
  summary: string;
  prediction: string;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  strengths: string[];
  weaknesses: string[];
  keyPlayers: string[];
  confidence: number; // 0-100
}

function clamp(n: number, a = 0, b = 1) { return Math.max(a, Math.min(b, n)); }

function pct(n: number) { return Math.round(n * 100); }

export function analyzeMatch(m: ProcessedMatch): MatchAnalysis {
  // Base factors from stats
  const stats = m.stats;
  const homeForm = (m.homeForm || '').split('').filter(Boolean).length;
  const awayForm = (m.awayForm || '').split('').filter(Boolean).length;

  // possession & shots influence
  let possRatio = 0.5; // home advantage baseline
  let shotsRatio = 0.5;
  if (stats) {
    const hp = parseFloat(String(stats.homePossession || '0')) || 0;
    const ap = parseFloat(String(stats.awayPossession || '0')) || 0;
    if (hp + ap > 0) possRatio = hp / (hp + ap);

    const hs = parseFloat(String(stats.homeShots || '0')) || 0;
    const as = parseFloat(String(stats.awayShots || '0')) || 0;
    if (hs + as > 0) shotsRatio = hs / (hs + as);
  }

  // form weight: recent W=1, D=0.5, L=0 -> approximate
  const parseFormScore = (f: string) => (f || '').split('').slice(0,5).reduce((s, r) => s + (r === 'W' ? 1 : r === 'D' ? 0.5 : 0), 0) / 5;
  const hFormScore = parseFormScore(m.homeForm);
  const aFormScore = parseFormScore(m.awayForm);

  // simple rating combining possession, shots and form
  const homeRating = 0.5 * possRatio + 0.35 * shotsRatio + 0.15 * hFormScore;
  const awayRating = 0.5 * (1 - possRatio) + 0.35 * (1 - shotsRatio) + 0.15 * aFormScore;

  // convert to probabilities with softmax
  const expH = Math.exp(homeRating);
  const expA = Math.exp(awayRating);
  const expD = Math.exp(0.45); // baseline draw weight
  const s = expH + expA + expD;
  let homeProb = clamp(expH / s);
  let awayProb = clamp(expA / s);
  let drawProb = clamp(expD / s);

  // adjust for live score (if trailing, reduce probability)
  const hGoals = parseInt(String(m.homeScore || '0')) || 0;
  const aGoals = parseInt(String(m.awayScore || '0')) || 0;
  if (m.status === 'live') {
    const lead = hGoals - aGoals;
    homeProb = clamp(homeProb + lead * 0.07, 0, 0.95);
    awayProb = clamp(awayProb - lead * 0.07, 0, 0.95);
    drawProb = clamp(1 - (homeProb + awayProb), 0, 0.95);
  }

  // Key players: derive from recent events + names in team
  const players = new Set<string>();
  for (const ev of m.events || []) {
    if (ev.playerName) players.add(ev.playerName);
  }

  // strengths & weaknesses heuristics
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  if (stats) {
    const hp = parseFloat(String(stats.homePossession || '0')) || 0;
    const ap = parseFloat(String(stats.awayPossession || '0')) || 0;
    if (hp > ap + 5) strengths.push('الاستحواذ الجيد'); else if (ap > hp + 5) weaknesses.push('ضعف في الاستحواذ');

    const hSog = parseFloat(String(stats.homeShotsOnTarget || '0')) || 0;
    const aSog = parseFloat(String(stats.awayShotsOnTarget || '0')) || 0;
    if (hSog > aSog + 2) strengths.push('ضغط هجومي فعّال'); else if (aSog > hSog + 2) weaknesses.push('تعرض للضغط على المرمى');

    const hC = parseFloat(String(stats.homeCorners || '0')) || 0;
    const aC = parseFloat(String(stats.awayCorners || '0')) || 0;
    if (hC > aC + 2) strengths.push('أعلى في الركنيات');
  }

  if (hFormScore > aFormScore + 0.2) strengths.push('فورم أفضل');
  if (aFormScore > hFormScore + 0.2) weaknesses.push('الفريق المنافس في فورم أفضل');

  // generate textual summary in Arabic
  const summaryParts: string[] = [];
  summaryParts.push(`توقعات مبدئية مبنية على الاستحواذ، التسديدات، والفورم.`);
  if (strengths.length) summaryParts.push(`نقاط القوة: ${strengths.join('، ')}.`);
  if (weaknesses.length) summaryParts.push(`نقاط الضعف: ${weaknesses.join('، ')}.`);
  if (players.size) summaryParts.push(`لاعبون بارزون: ${Array.from(players).slice(0,3).join('، ')}.`);

  const prediction = homeProb > awayProb ? `${m.homeTeam} مرجّح للفوز` : awayProb > homeProb ? `${m.awayTeam} مرجّح للفوز` : 'نتيجة متقاربة محتملة';

  const confidence = Math.round(clamp(Math.abs(homeProb - awayProb) * 100, 10, 95));

  return {
    summary: summaryParts.join(' '),
    prediction,
    homeWinProb: pct(homeProb),
    drawProb: pct(drawProb),
    awayWinProb: pct(awayProb),
    strengths, weaknesses, keyPlayers: Array.from(players).slice(0,5), confidence,
  };
}

export default analyzeMatch;

export async function enhancedAnalyzeMatch(m: ProcessedMatch): Promise<MatchAnalysis> {
  const base = analyzeMatch(m);
  try {
    // Try to fetch xG and Elo if configured
    const [xg, eloHome, eloAway] = await Promise.all([
      external.fetchXG(m.id),
      external.fetchElo(m.homeTeam),
      external.fetchElo(m.awayTeam),
    ]);

    let adjusted = { ...base } as MatchAnalysis;
    // If external xG not available, synthesize a lightweight xG estimate from match stats
    const synthXG = (() => {
      if (xg && typeof xg.home_xg === 'number' && typeof xg.away_xg === 'number') return xg;
      const s = m.stats || {} as any;
      const hs = parseFloat(String(s.homeShotsOnTarget || s.homeShots || 0)) || 0;
      const as = parseFloat(String(s.awayShotsOnTarget || s.awayShots || 0)) || 0;
      // crude conversion: each shot on target ~0.4 xG, shot ~0.08
      const hx = Math.round((hs * 0.4 + (parseFloat(String(s.homeShots || 0)) - hs) * 0.08) * 100) / 100;
      const ax = Math.round((as * 0.4 + (parseFloat(String(s.awayShots || 0)) - as) * 0.08) * 100) / 100;
      return { home_xg: hx, away_xg: ax };
    })();

    if (synthXG && typeof synthXG.home_xg === 'number' && typeof synthXG.away_xg === 'number') {
      // tweak probabilities by xG ratio
      const hx = synthXG.home_xg; const ax = synthXG.away_xg; const sum = hx + ax || 1;
      const hxRatio = hx / sum;
      const axRatio = ax / sum;
      // simple blend
      adjusted.homeWinProb = Math.round((adjusted.homeWinProb * 0.6 + hxRatio * 100 * 0.4));
      adjusted.awayWinProb = Math.round((adjusted.awayWinProb * 0.6 + axRatio * 100 * 0.4));
      adjusted.drawProb = Math.max(0, 100 - (adjusted.homeWinProb + adjusted.awayWinProb));
      adjusted.summary = `مُحسّن ببيانات xG. ${adjusted.summary}`;
      adjusted.confidence = Math.min(100, adjusted.confidence + 10);
    }

    // If Elo not available from external, synthesize from form and name hashing
    const synthElo = (() => {
      if (eloHome && eloAway && eloHome.rating && eloAway.rating) return { h: parseFloat(String(eloHome.rating)), a: parseFloat(String(eloAway.rating)) };
      // derive from form score and a deterministic name-based offset
      const formScore = (team: string) => {
        const f = team === m.homeTeam ? m.homeForm : m.awayForm;
        return (f || '').split('').slice(0,5).reduce((s, r) => s + (r === 'W' ? 1 : r === 'D' ? 0.5 : 0), 0);
      };
      const base = 1500;
      const hfs = formScore(m.homeTeam);
      const afs = formScore(m.awayTeam);
      const hash = (str: string) => Array.from(str).reduce((s, c) => s + c.charCodeAt(0), 0) % 50;
      return { h: base + hfs * 30 + hash(m.homeTeam), a: base + afs * 30 + hash(m.awayTeam) };
    })();

    if (synthElo && typeof synthElo.h === 'number' && typeof synthElo.a === 'number') {
      const hr = synthElo.h;
      const ar = synthElo.a;
      if (!Number.isNaN(hr) && !Number.isNaN(ar)) {
        const diff = hr - ar; // positive => home stronger
        const shift = Math.max(-15, Math.min(15, diff / 20 * 15));
        adjusted.homeWinProb = Math.round(clamp((adjusted.homeWinProb + shift), 1, 99));
        adjusted.awayWinProb = Math.round(clamp((adjusted.awayWinProb - shift), 1, 99));
        adjusted.drawProb = Math.max(0, 100 - (adjusted.homeWinProb + adjusted.awayWinProb));
        adjusted.summary = `مُحسّن بترتيب Elo. ${adjusted.summary}`;
        adjusted.confidence = Math.min(100, adjusted.confidence + 8);
      }
    }

    return adjusted;
  } catch {
    return base;
  }
}
