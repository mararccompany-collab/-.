import { useState, useMemo } from 'react';
import { allTeams, type TeamData } from '../data/teamsData';
import type { FormationPlayer } from '../data/teamsData';

const POS_COORDS: Record<string, { x: number; y: number }> = {
  'GK': { x: 50, y: 92 },
  'RB': { x: 15, y: 78 }, 'RWB': { x: 12, y: 70 },
  'CB': { x: 50, y: 72 },
  'LB': { x: 85, y: 78 }, 'LWB': { x: 88, y: 70 },
  'CDM': { x: 50, y: 56 },
  'CM': { x: 50, y: 52 },
  'CAM': { x: 50, y: 42 },
  'RM': { x: 15, y: 48 },
  'LM': { x: 85, y: 48 },
  'RW': { x: 20, y: 35 },
  'LW': { x: 80, y: 35 },
  'CF': { x: 50, y: 32 },
  'ST': { x: 50, y: 25 },
};

function assignPositions(players: FormationPlayer[]) {
  const posCount: Record<string, number> = {};
  return players.map(p => {
    posCount[p.pos] = (posCount[p.pos] || 0) + 1;
    const idx = posCount[p.pos] - 1;
    let base = POS_COORDS[p.pos] || { x: 50, y: 50 };
    let { x, y } = base;
    const offsets: Record<string, { x: number; y: number }[]> = {
      'CB': [{ x: 0, y: 0 }, { x: -15, y: 0 }, { x: 15, y: 0 }, { x: -25, y: 0 }],
      'CM': [{ x: 0, y: 0 }, { x: -12, y: 0 }, { x: 12, y: 0 }, { x: -20, y: -3 }],
      'CDM': [{ x: 0, y: 0 }, { x: -12, y: 0 }, { x: 12, y: 0 }],
      'CAM': [{ x: 0, y: 0 }, { x: -15, y: 0 }, { x: 15, y: 0 }],
      'ST': [{ x: 0, y: 0 }, { x: -15, y: 0 }, { x: 15, y: -5 }],
      'CF': [{ x: 0, y: 0 }, { x: -12, y: 0 }, { x: 12, y: 0 }],
    };
    const off = (offsets[p.pos] || [{ x: 0, y: 0 }, { x: -10, y: 0 }, { x: 10, y: 0 }])[idx];
    if (off) { x += off.x; y += off.y; }
    return { ...p, x, y };
  });
}

export default function TeamFormation() {
  const [selectedTeam, setSelectedTeam] = useState<TeamData>(allTeams[0]);
  const [search, setSearch] = useState('');
  const [showSelector, setShowSelector] = useState(false);

  const filtered = useMemo(() =>
    allTeams.filter(t => t.nameAr.includes(search) || t.name.toLowerCase().includes(search)),
    [search]
  );

  const formation = useMemo(() => assignPositions(selectedTeam.players), [selectedTeam]);

  return (
    <div>
      <div className="relative mb-4">
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-right flex items-center gap-3 cursor-pointer hover:bg-white/[0.06] transition-colors"
        >
          <span className="text-2xl">{selectedTeam.flag}</span>
          <div className="flex-1">
            <span className="text-white font-bold text-sm block" style={{ fontFamily: 'Cairo' }}>{selectedTeam.nameAr}</span>
            <span className="text-white/30 text-[10px]">{selectedTeam.formation} · المجموعة {selectedTeam.groupAr}</span>
          </div>
          <span className="text-white/30 text-xs">{showSelector ? '▲' : '▼'}</span>
        </button>
        {showSelector && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-[#0d0f1a] border border-white/10 rounded-xl z-20 max-h-60 overflow-y-auto custom-scrollbar">
            <div className="p-2 sticky top-0 bg-[#0d0f1a] z-10">
              <input
                type="text"
                placeholder="ابحث عن فريق..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs text-right outline-none focus:border-green-500/30"
                style={{ fontFamily: 'Cairo' }}
              />
            </div>
            {filtered.map(team => (
              <button key={team.id}
                onClick={() => { setSelectedTeam(team); setShowSelector(false); setSearch(''); }}
                className={`w-full text-right px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                  selectedTeam.id === team.id ? 'bg-green-500/10 text-green-400' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{team.flag}</span>
                <span className="text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{team.nameAr}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="bg-white/5 rounded-lg px-3 py-1.5">
          <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>التشكيل</span>
          <span className="text-white text-xs font-bold" style={{ fontFamily: 'Orbitron' }}>{selectedTeam.formation}</span>
        </div>
        <div className="bg-white/5 rounded-lg px-3 py-1.5">
          <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>المدرب</span>
          <span className="text-white text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{selectedTeam.coachAr}</span>
        </div>
        <div className="bg-white/5 rounded-lg px-3 py-1.5">
          <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>التصنيف</span>
          <span className="text-white text-xs font-bold" style={{ fontFamily: 'Orbitron' }}>{selectedTeam.fifaRank}</span>
        </div>
        <div className="bg-white/5 rounded-lg px-3 py-1.5">
          <span className="text-[9px] text-white/40 block" style={{ fontFamily: 'Cairo' }}>كأس العالم</span>
          <span className="text-white text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{selectedTeam.worldCups || '—'}</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-green-900/40 via-green-800/30 to-green-900/40" style={{ aspectRatio: '9/16', maxWidth: 400, margin: '0 auto' }}>
        <svg viewBox="0 0 100 178" className="absolute inset-0 w-full h-full opacity-20">
          <rect x="2" y="2" width="96" height="174" fill="none" stroke="white" strokeWidth="0.5" rx="2" />
          <line x1="2" y1="89" x2="98" y2="89" stroke="white" strokeWidth="0.3" />
          <circle cx="50" cy="89" r="8" fill="none" stroke="white" strokeWidth="0.3" />
          <rect x="25" y="2" width="50" height="32" fill="none" stroke="white" strokeWidth="0.3" rx="1" />
          <rect x="35" y="2" width="30" height="16" fill="none" stroke="white" strokeWidth="0.2" rx="1" />
          <rect x="25" y="144" width="50" height="32" fill="none" stroke="white" strokeWidth="0.3" rx="1" />
          <rect x="35" y="160" width="30" height="16" fill="none" stroke="white" strokeWidth="0.2" rx="1" />
          <circle cx="50" cy="8" r="1" fill="white" opacity="0.5" />
          <circle cx="50" cy="170" r="1" fill="white" opacity="0.5" />
        </svg>

        {formation.map((player) => (
          <div key={player.num}
            className="absolute flex flex-col items-center transition-all duration-500"
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-500/80 to-emerald-600/80 border-2 border-white/30 flex items-center justify-center shadow-lg"
              style={{
                animation: `pulse-slow ${3 + player.num * 0.2}s ease-in-out infinite`,
                animationDelay: `${player.num * 0.3}s`,
              }}
            >
              <span className="text-white text-[10px] font-black" style={{ fontFamily: 'Orbitron' }}>{player.num}</span>
            </div>
            <span className="text-white text-[9px] font-bold mt-0.5 bg-black/40 px-1 py-0.5 rounded whitespace-nowrap" style={{ fontFamily: 'Cairo' }}>
              {player.nameAr}
            </span>
            <span className="text-white/30 text-[7px]" style={{ fontFamily: 'Cairo' }}>{player.posAr}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="text-white/60 text-xs font-bold mb-2" style={{ fontFamily: 'Cairo' }}>🧑‍🤝‍🧑 التشكيلة الأساسية</h4>
        <div className="flex flex-wrap gap-1.5">
          {formation.map(p => (
            <div key={p.num} className="bg-white/[0.04] border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
              <span className="text-[10px] text-green-400 font-black min-w-[18px] text-center" style={{ fontFamily: 'Orbitron' }}>{p.num}</span>
              <div>
                <span className="text-white text-[10px] font-bold block" style={{ fontFamily: 'Cairo' }}>{p.nameAr}</span>
                <span className="text-white/30 text-[8px]" style={{ fontFamily: 'Cairo' }}>{p.posAr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
