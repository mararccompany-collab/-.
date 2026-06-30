import { useState, useMemo } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import analyzeMatch from '../utils/matchAnalysis';

interface AnalysesPageProps { matches: ProcessedMatch[]; getArabicName: (n: string) => string; settings?: { showPredictions?: boolean } }

export default function AnalysesPage({ matches, getArabicName, settings }: AnalysesPageProps) {
  const [expertOnly, setExpertOnly] = useState(false);
  const [minConfidence, setMinConfidence] = useState(50);
  const [query, setQuery] = useState('');

  const analyses = useMemo(() => matches.map(m => ({ m, a: analyzeMatch(m) })), [matches]);

  const filtered = analyses.filter(item => {
    if (!item) return false;
    if (expertOnly && item.a.confidence < minConfidence) return false;
    if (query) {
      const q = query.trim().toLowerCase();
      if (!item.m.homeTeam.toLowerCase().includes(q) && !item.m.awayTeam.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن فريق أو مباراة" className="flex-1 p-2 rounded-md bg-white/5 text-white" />
        <div className="flex items-center gap-2">
          <label className="text-white/60 text-sm">فلتر الخبراء</label>
          <input type="checkbox" checked={expertOnly} onChange={e => setExpertOnly(e.target.checked)} />
        </div>
      </div>

      {expertOnly && (
        <div className="flex items-center gap-2">
          <label className="text-white/60 text-sm">عتبة الثقة: {minConfidence}%</label>
          <input type="range" min={10} max={95} value={minConfidence} onChange={e => setMinConfidence(parseInt(e.target.value))} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(({ m, a }) => (
          <div key={m.id} className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={m.homeLogo} alt="" loading="lazy" decoding="async" className="w-8 h-8" />
                <div>
                  <div className="text-white font-bold">{getArabicName(m.homeTeam)} <span className="text-white/50">vs</span> {getArabicName(m.awayTeam)}</div>
                  <div className="text-white/40 text-xs">{m.group} • {new Date(m.date).toLocaleString('ar-EG')}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-black" style={{ fontFamily: 'Orbitron' }}>{m.homeScore} - {m.awayScore}</div>
                <div className="text-white/40 text-xs">ثقة {a.confidence}%</div>
              </div>
            </div>

            <p className="text-white/40 text-sm mt-2">{a.summary}</p>

            <div className="flex items-center gap-2 mt-3">
              <div className="text-white/80 text-sm">تنبؤ:</div>
              <div className="text-white font-bold">{a.prediction}</div>
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              <button onClick={() => navigator.clipboard?.writeText(`${getArabicName(m.homeTeam)} ${m.homeScore}-${m.awayScore} ${getArabicName(m.awayTeam)} - ${a.prediction} (${a.confidence}%)`)}
                className="bg-white/5 px-3 py-1 rounded-md text-white/60">نسخ</button>
              <a href={`#match-${m.id}`} className="bg-green-500 px-3 py-1 rounded-md text-white">اذهب للتفاصيل</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
