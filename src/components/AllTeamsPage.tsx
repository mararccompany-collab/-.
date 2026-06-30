import { useState, useMemo } from 'react';
import { allTeams, groupLabels } from '../data/teamsData';
import type { TeamData } from '../data/teamsData';

export default function AllTeamsPage() {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const groups = useMemo(() => {
    const g = new Map<string, TeamData[]>();
    allTeams.forEach(t => {
      const arr = g.get(t.group) || [];
      arr.push(t);
      g.set(t.group, arr);
    });
    return Array.from(g.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    if (selectedGroup) return groups.filter(([g]) => g === selectedGroup);
    return groups;
  }, [selectedGroup, groups]);

  return (
    <div>
      {/* Search + Group filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ابحث عن فريق..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm text-right outline-none focus:border-green-500/30"
          style={{ fontFamily: 'Cairo' }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button onClick={() => setSelectedGroup(null)}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            !selectedGroup ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Cairo' }}
        >
          جميع المجموعات
        </button>
        {groups.map(([g]) => (
          <button key={g} onClick={() => setSelectedGroup(g)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              selectedGroup === g ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
            }`}
            style={{ fontFamily: 'Cairo' }}
          >
            المجموعة {groupLabels[g]}
          </button>
        ))}
      </div>

      {/* Teams grid */}
      {filtered.map(([group, teams]) => {
        const visible = search
          ? teams.filter(t => t.nameAr.includes(search) || t.name.toLowerCase().includes(search))
          : teams;
        if (visible.length === 0) return null;
        return (
          <div key={group} className="mb-6">
            <h3 className="text-white/40 text-xs font-bold mb-3 px-1" style={{ fontFamily: 'Cairo' }}>
              🏆 المجموعة {groupLabels[group]}
            </h3>
            <div className="flex flex-col gap-2">
              {visible.map(team => {
                const isExpanded = expandedTeam === team.id;
                const isArab = ['qatar', 'saudi-arabia', 'morocco', 'tunisia', 'egypt', 'algeria', 'iraq', 'jordan'].includes(team.id);
                return (
                  <div key={team.id}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'bg-green-500/10 border-green-500/30'
                        : isArab
                          ? 'bg-emerald-500/5 border-emerald-500/15'
                          : 'bg-white/[0.03] border-white/5'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
                      className="w-full text-right p-3 flex items-center gap-3 cursor-pointer"
                    >
                      <span className="text-2xl shrink-0">{team.flag}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-bold text-sm block leading-tight" style={{ fontFamily: 'Cairo' }}>{team.nameAr}</span>
                        <span className="text-white/30 text-[9px]">{team.coachAr} · تصنيف {team.fifaRank}</span>
                      </div>
                      <div className="text-left shrink-0">
                        <span className="text-white/30 text-[10px] block">{team.formation}</span>
                        <span className="text-white/20 text-[9px]">{team.worldCups ? `🏆×${team.worldCups}` : '—'}</span>
                      </div>
                      <span className={`text-white/30 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-0">
                        <div className="border-t border-green-500/20 pt-3">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {team.keyPlayersAr.map((p, i) => (
                              <span key={i} className="bg-white/10 text-white text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: 'Cairo' }}>
                                ⭐ {p}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {team.players.map(p => (
                              <div key={p.number} className="bg-white/[0.04] border border-white/5 rounded-md px-2 py-1 flex items-center gap-1.5">
                                <span className="text-[8px] text-green-400 font-black min-w-[14px]" style={{ fontFamily: 'Orbitron' }}>{p.number}</span>
                                <span className="text-white text-[9px]" style={{ fontFamily: 'Cairo' }}>{p.nameAr}</span>
                                <span className="text-white/30 text-[7px]" style={{ fontFamily: 'Cairo' }}>{p.roleAr}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
