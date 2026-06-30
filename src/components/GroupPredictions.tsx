import { useMemo } from 'react';
import { allTeams, groupLabels } from '../data/teamsData';
import type { TeamData } from '../data/teamsData';

interface TeamProb {
  team: TeamData;
  rankScore: number;
  advanceProb: number;
  topProb: number;
  winProb: number;
}

function calcProb(rank: number, minRank: number, maxRank: number): number {
  const normalized = 1 - (rank - minRank) / (maxRank - minRank + 1);
  return Math.round(normalized * 100);
}

export default function GroupPredictions() {
  const predictions = useMemo(() => {
    const groups = new Map<string, TeamData[]>();
    allTeams.filter(t => t.group !== '—').forEach(t => {
      const arr = groups.get(t.group) || [];
      arr.push(t);
      groups.set(t.group, arr);
    });

    const result: { group: string; teams: TeamProb[] }[] = [];

    groups.forEach((teams, group) => {
      const minRank = Math.min(...teams.map(t => t.fifaRank));
      const maxRank = Math.max(...teams.map(t => t.fifaRank));
      const rankRange = maxRank - minRank || 1;

      const teamProbs: TeamProb[] = teams.map(team => {
        const baseProb = 1 - (team.fifaRank - minRank) / (maxRank - minRank + 1);

        const advanceProb = Math.round(Math.min(95, Math.max(5, baseProb * 100 + 10)));
        const topProb = Math.round(Math.min(80, Math.max(0, baseProb * 100 + 20)));
        const winProb = Math.round(Math.min(60, Math.max(0, baseProb * 100 - 10)));

        return {
          team,
          rankScore: team.fifaRank,
          advanceProb: Math.min(98, Math.max(2, advanceProb)),
          topProb: Math.min(90, Math.max(0, topProb)),
          winProb: Math.min(70, Math.max(0, winProb)),
        };
      });

      teamProbs.sort((a, b) => b.advanceProb - a.advanceProb);
      result.push({ group, teams: teamProbs });
    });

    return result.sort((a, b) => a.group.localeCompare(b.group));
  }, []);

  const totalTeams = allTeams.filter(t => t.group !== '—').length;

  return (
    <div>
      <div className="mb-4 p-4 rounded-2xl bg-gradient-to-l from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20">
        <h3 className="text-blue-400 text-sm font-bold mb-2" style={{ fontFamily: 'Cairo' }}>📊 تحليل المجموعات - نسب التأهل المتوقعة</h3>
        <p className="text-white/40 text-xs" style={{ fontFamily: 'Cairo' }}>
          بناءً على التصنيف العالمي FIFA • {totalTeams} منتخباً في {predictions.length} مجموعات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {predictions.map(({ group, teams }) => (
          <div key={group} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
            <div className="text-amber-400 text-sm font-bold mb-3 text-center" style={{ fontFamily: 'Cairo' }}>
              🏆 المجموعة {groupLabels[group]}
            </div>

            {/* Probability bars */}
            {teams.map((t, i) => {
              const barColor = i === 0 ? 'from-green-500 to-emerald-400' : i === 1 ? 'from-blue-500 to-cyan-400' : 'from-gray-500 to-gray-400';
              return (
                <div key={t.team.id} className="mb-2.5 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="text-sm">{t.team.flag}</span>
                      <span className="text-white text-xs font-bold truncate" style={{ fontFamily: 'Cairo' }}>{t.team.nameAr}</span>
                      <span className="text-white/30 text-[9px] shrink-0">(التصنيف: {t.team.fifaRank})</span>
                    </div>
                    <span className="text-white text-xs font-black min-w-[32px] text-left" style={{ fontFamily: 'Orbitron' }}>{t.advanceProb}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000`}
                      style={{ width: `${t.advanceProb}%` }}
                    />
                  </div>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-[9px] text-white/30" style={{ fontFamily: 'Cairo' }}>
                      🥇 صدارة: <span className="text-yellow-400 font-bold">{t.topProb}%</span>
                    </span>
                    <span className="text-[9px] text-white/30" style={{ fontFamily: 'Cairo' }}>
                      🏆 فوز: <span className="text-green-400 font-bold">{t.winProb}%</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Top 2 prediction */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <span className="text-[10px] text-white/40 block mb-1" style={{ fontFamily: 'Cairo' }}>🔮 المتوقعون للتأهل:</span>
              <div className="flex gap-2">
                {teams.slice(0, 2).map((t, i) => (
                  <span key={t.team.id} className={`text-xs font-bold flex items-center gap-1 ${i === 0 ? 'text-green-400' : 'text-blue-400'}`} style={{ fontFamily: 'Cairo' }}>
                    {i === 0 ? '🥇' : '🥈'} {t.team.nameAr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Match outcome probabilities */}
      <div className="mt-6">
        <h3 className="text-white/60 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>⚡ نسب القوة بين المنتخبات</h3>
        <p className="text-white/30 text-xs mb-3" style={{ fontFamily: 'Cairo' }}>
          * تعتمد النسب على الفارق في التصنيف العالمي FIFA بين المنتخبين
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predictions.map(({ group, teams }) => {
            const topTeams = teams.slice(0, 2);
            if (topTeams.length < 2) return null;
            const [first, second] = topTeams;
            const rankDiff = second.team.fifaRank - first.team.fifaRank;
            const strongerWinProb = Math.min(85, Math.round(50 + rankDiff * 1.2));
            const drawProb = Math.max(5, Math.round(30 - Math.abs(rankDiff) * 0.5));
            const weakerWinProb = 100 - strongerWinProb - drawProb;

            return (
              <div key={group} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                <div className="text-xs font-bold text-white/60 mb-2 text-center" style={{ fontFamily: 'Cairo' }}>
                  المجموعة {groupLabels[group]}: {first.team.nameAr} × {second.team.nameAr}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{first.team.flag}</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all" style={{ width: `${strongerWinProb}%` }} />
                    <div className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all" style={{ width: `${drawProb}%` }} />
                    <div className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all" style={{ width: `${weakerWinProb}%` }} />
                  </div>
                  <span className="text-sm">{second.team.flag}</span>
                </div>
                <div className="flex justify-between text-[9px] mt-1">
                  <span className="text-green-400 font-bold" style={{ fontFamily: 'Cairo' }}>{first.team.nameAr}: {strongerWinProb}%</span>
                  <span className="text-gray-400" style={{ fontFamily: 'Cairo' }}>تعادل: {drawProb}%</span>
                  <span className="text-red-400 font-bold" style={{ fontFamily: 'Cairo' }}>{second.team.nameAr}: {weakerWinProb}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
