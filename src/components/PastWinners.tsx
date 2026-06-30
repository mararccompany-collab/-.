import { useState } from 'react';
import { worldCupWinners } from '../data/worldCupWinners';

export default function PastWinners() {
  const [selected, setSelected] = useState<number | null>(null);
  const [yearFilter, setYearFilter] = useState<'all' | 'old' | 'modern'>('all');

  const filtered = yearFilter === 'all' ? worldCupWinners
    : yearFilter === 'old' ? worldCupWinners.filter(w => w.year < 1970)
    : worldCupWinners.filter(w => w.year >= 1970);

  const championCounts: Record<string, { count: number; flag: string }> = {};
  worldCupWinners.forEach(w => {
    championCounts[w.champion] = championCounts[w.champion] || { count: 0, flag: w.championFlag };
    championCounts[w.champion].count++;
  });
  const topChampions = Object.entries(championCounts).sort((a, b) => b[1].count - a[1].count);

  return (
    <div>
      {/* Summary bar */}
      <div className="p-4 mb-4 rounded-2xl bg-gradient-to-l from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20">
        <h3 className="text-amber-400 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>🏆 سجل الأبطال</h3>
        <div className="flex flex-wrap gap-2">
          {topChampions.map(([champion, data]) => (
            <div key={champion} className="bg-white/5 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <span className="text-sm">{data.flag}</span>
              <span className="text-white text-xs font-bold">{data.count}</span>
              <span className="text-white/50 text-[10px]">{champion === 'West Germany' ? 'ألمانيا' : champion === 'Germany' ? 'ألمانيا' : champion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: 'الكل' },
          { key: 'old', label: 'القديمة (1930-1966)' },
          { key: 'modern', label: 'الحديثة (1970-2022)' },
        ].map(f => (
          <button key={f.key}
            onClick={() => setYearFilter(f.key as typeof yearFilter)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              yearFilter === f.key ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
            }`}
            style={{ fontFamily: 'Cairo' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/40 via-yellow-500/20 to-amber-500/40" />
        {filtered.map((entry, i) => {
          const isSelected = selected === entry.year;
          return (
            <div key={entry.year}
              onClick={() => setSelected(isSelected ? null : entry.year)}
              className="relative pr-8 pb-4 group cursor-pointer"
            >
              {/* Dot */}
              <div className={`absolute right-[3px] top-1.5 w-[7px] h-[7px] rounded-full border-2 transition-all duration-300 ${
                isSelected ? 'bg-amber-400 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-[#070a14] border-amber-500/50 group-hover:border-amber-400'
              }`} />
              {/* Card */}
              <div className={`rounded-xl p-3 transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-l from-amber-500/15 to-yellow-500/5 border border-amber-500/30'
                  : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{entry.championFlag}</span>
                    <div>
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'Cairo' }}>{entry.championAr}</span>
                      <span className="text-white/30 text-[10px] mr-1">({entry.champion})</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-amber-400 font-black text-sm" style={{ fontFamily: 'Orbitron' }}>{entry.year}</span>
                  </div>
                </div>
                {/* Expanded */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-amber-500/20" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>الوصيف</span>
                      <span className="text-white/80 text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{entry.runnerUpAr}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>المستضيف</span>
                      <span className="text-white/80 text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{entry.hostAr}</span>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-2 text-center col-span-2">
                      <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>النتيجة</span>
                      <span className="text-green-400 font-black text-sm" style={{ fontFamily: 'Orbitron' }}>{entry.score}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
