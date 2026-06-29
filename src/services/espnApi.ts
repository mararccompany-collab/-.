const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world';
const STANDINGS_BASE = 'https://site.api.espn.com/apis/v2/sports/soccer/fifa.world';
const CORS_PROXY = 'https://corsproxy.io/?';

export interface MatchEvent {
  type: string;
  clock: string;
  teamId: string;
  playerName: string;
  assistName: string;
}

export interface MatchStats {
  homePossession: string;
  awayPossession: string;
  homeShots: string;
  awayShots: string;
  homeShotsOnTarget: string;
  awayShotsOnTarget: string;
  homeCorners: string;
  awayCorners: string;
  homeFouls: string;
  awayFouls: string;
  homeGoals: string;
  awayGoals: string;
}

export interface ProcessedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeId: string;
  awayId: string;
  homeAbbr: string;
  awayAbbr: string;
  homeScore: string;
  awayScore: string;
  status: 'live' | 'upcoming' | 'finished';
  statusText: string;
  clock: string;
  venue: string;
  city: string;
  group: string;
  date: string;
  broadcasts: string;
  events: MatchEvent[];
  stats: MatchStats | null;
  attendance: number;
  homeRecord: string;
  awayRecord: string;
  homeForm: string;
  awayForm: string;
}

function getStatVal(stats: any[], abbr: string): string {
  return stats?.find((s: any) => s.abbreviation === abbr)?.displayValue || '0';
}

function processMatch(event: any): ProcessedMatch {
  const comp = event.competitions?.[0];
  const empty: ProcessedMatch = {
    id: event.id, homeTeam: '', awayTeam: '', homeLogo: '', awayLogo: '',
    homeId: '', awayId: '', homeAbbr: '', awayAbbr: '', homeScore: '0', awayScore: '0',
    status: 'upcoming', statusText: '', clock: '', venue: '', city: '',
    group: '', date: event.date || '', broadcasts: '', events: [], stats: null,
    attendance: 0, homeRecord: '', awayRecord: '', homeForm: '', awayForm: '',
  };
  if (!comp) return empty;

  const home = comp.competitors?.find((c: any) => c.homeAway === 'home');
  const away = comp.competitors?.find((c: any) => c.homeAway === 'away');

  const stateMap: Record<string, 'live' | 'upcoming' | 'finished'> = { pre: 'upcoming', in: 'live', post: 'finished' };
  const status = stateMap[comp.status?.type?.state] || 'upcoming';

  let statusText = '';
  if (status === 'live') statusText = comp.status?.type?.shortDetail || comp.status?.displayClock || 'جارية';
  else if (status === 'finished') statusText = comp.status?.type?.detail || 'FT';
  else statusText = comp.status?.type?.shortDetail || '';

  const broadcastNames = comp.broadcasts?.flatMap((b: any) => b.names) || [];

  const events: MatchEvent[] = (comp.details || []).map((d: any) => ({
    type: d.type?.text || '',
    clock: d.clock?.displayValue || '',
    teamId: d.team?.id || '',
    playerName: d.athletesInvolved?.[0]?.displayName || '',
    assistName: d.athletesInvolved?.[1]?.displayName || '',
  }));

  let stats: MatchStats | null = null;
  if (home?.statistics?.length && away?.statistics?.length) {
    stats = {
      homePossession: getStatVal(home.statistics, 'PP'),
      awayPossession: getStatVal(away.statistics, 'PP'),
      homeShots: getStatVal(home.statistics, 'SHOT'),
      awayShots: getStatVal(away.statistics, 'SHOT'),
      homeShotsOnTarget: getStatVal(home.statistics, 'SOG'),
      awayShotsOnTarget: getStatVal(away.statistics, 'SOG'),
      homeCorners: getStatVal(home.statistics, 'CW'),
      awayCorners: getStatVal(away.statistics, 'CW'),
      homeFouls: getStatVal(home.statistics, 'FC'),
      awayFouls: getStatVal(away.statistics, 'FC'),
      homeGoals: getStatVal(home.statistics, 'G'),
      awayGoals: getStatVal(away.statistics, 'G'),
    };
  }

  return {
    id: event.id,
    homeTeam: home?.team?.displayName || 'TBD',
    awayTeam: away?.team?.displayName || 'TBD',
    homeLogo: home?.team?.logo || '',
    awayLogo: away?.team?.logo || '',
    homeId: home?.id || '',
    awayId: away?.id || '',
    homeAbbr: home?.team?.abbreviation || '',
    awayAbbr: away?.team?.abbreviation || '',
    homeScore: home?.score ?? '0',
    awayScore: away?.score ?? '0',
    status, statusText,
    clock: comp.status?.displayClock || '',
    venue: comp.venue?.fullName || '',
    city: comp.venue?.address ? `${comp.venue.address.city || ''}, ${comp.venue.address.country || ''}` : '',
    group: comp.altGameNote || '',
    date: event.date,
    broadcasts: broadcastNames.join(', '),
    events, stats,
    attendance: comp.attendance || 0,
    homeRecord: home?.records?.[0]?.summary || '',
    awayRecord: away?.records?.[0]?.summary || '',
    homeForm: home?.form || '',
    awayForm: away?.form || '',
  };
}

async function apiFetch(url: string): Promise<any> {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('API error');
    return await r.json();
  } catch {
    try {
      const r = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
      if (!r.ok) throw new Error('Proxy error');
      return await r.json();
    } catch {
      throw new Error('Network unavailable');
    }
  }
}

export async function fetchTodayMatches(): Promise<ProcessedMatch[]> {
  try {
    const data = await apiFetch(`${ESPN_BASE}/scoreboard`);
    return (data.events || []).map(processMatch);
  } catch { return []; }
}

export async function fetchMatchesByDate(date: string): Promise<ProcessedMatch[]> {
  try {
    const data = await apiFetch(`${ESPN_BASE}/scoreboard?dates=${date}`);
    return (data.events || []).map(processMatch);
  } catch { return []; }
}

// ===== Standings =====
export interface GroupTeam {
  name: string; logo: string; played: number; wins: number;
  draws: number; losses: number; goalsFor: number; goalsAgainst: number;
  goalDiff: number; points: number; rank: number; qualified: boolean;
}
export interface GroupStanding { name: string; teams: GroupTeam[]; }

function getStat(stats: any[], name: string): number {
  return stats?.find((s: any) => s.name === name)?.value || 0;
}

export async function fetchAllGroupStandings(): Promise<GroupStanding[]> {
  try {
    const data = await apiFetch(`${STANDINGS_BASE}/standings`);
    return (data.children || []).map((child: any) => {
      const teams = (child.standings?.entries || []).map((e: any) => ({
        name: e.team?.displayName || '',
        logo: e.team?.logos?.[0]?.href || '',
        played: getStat(e.stats, 'gamesPlayed'),
        wins: getStat(e.stats, 'wins'),
        draws: getStat(e.stats, 'ties'),
        losses: getStat(e.stats, 'losses'),
        goalsFor: getStat(e.stats, 'pointsFor'),
        goalsAgainst: getStat(e.stats, 'pointsAgainst'),
        goalDiff: getStat(e.stats, 'pointDifferential'),
        points: getStat(e.stats, 'points'),
        rank: getStat(e.stats, 'rank'),
        qualified: getStat(e.stats, 'advanced') === 1,
      })).sort((a: GroupTeam, b: GroupTeam) => a.rank - b.rank);
      return { name: child.name || '', teams };
    });
  } catch { return []; }
}

// ===== Top Scorers - from standings data =====
export interface TopScorer {
  name: string; team: string; teamLogo: string; goals: number;
}

export async function fetchTopScorers(): Promise<TopScorer[]> {
  // ESPN doesn't have a direct top scorers endpoint for free,
  // so we extract goal scorers from match events across all dates
  try {
    const scorers: Record<string, TopScorer> = {};
    const dates: string[] = [];
    // Get last 12 days of matches
    for (let i = 0; i <= 12; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0].replace(/-/g, ''));
    }
    
    const results = await Promise.all(dates.map(d => fetchMatchesByDate(d)));
    for (const matches of results) {
      for (const m of matches) {
        for (const ev of m.events) {
          if (ev.type.toLowerCase().includes('goal') && !ev.type.toLowerCase().includes('own') && ev.playerName) {
            const key = ev.playerName;
            if (!scorers[key]) {
              const isHome = ev.teamId === m.homeId;
              scorers[key] = {
                name: ev.playerName,
                team: isHome ? m.homeTeam : m.awayTeam,
                teamLogo: isHome ? m.homeLogo : m.awayLogo,
                goals: 0,
              };
            }
            scorers[key].goals++;
          }
        }
      }
    }
    
    return Object.values(scorers).sort((a, b) => b.goals - a.goals).slice(0, 10);
  } catch { return []; }
}
