interface BracketSlot {
  team1: string;
  team2: string;
  score1?: string;
  score2?: string;
  winner?: string;
}

interface BracketRound {
  name: string;
  nameAr: string;
  icon: string;
  matches: BracketSlot[];
}

const bracketData: BracketRound[] = [
  {
    name: 'Round of 16', nameAr: 'دور الـ16', icon: '🏟️',
    matches: [
      { team1: 'هولندا', team2: 'الولايات المتحدة', score1: '3', score2: '1', winner: 'هولندا' },
      { team1: 'الأرجنتين', team2: 'أستراليا', score1: '2', score2: '1', winner: 'الأرجنتين' },
      { team1: 'اليابان', team2: 'كرواتيا', score1: '1', score2: '1', winner: 'كرواتيا' },
      { team1: 'البرازيل', team2: 'كوريا الجنوبية', score1: '4', score2: '1', winner: 'البرازيل' },
      { team1: 'إنجلترا', team2: 'السنغال', score1: '3', score2: '0', winner: 'إنجلترا' },
      { team1: 'فرنسا', team2: 'بولندا', score1: '3', score2: '1', winner: 'فرنسا' },
      { team1: 'المغرب', team2: 'إسبانيا', score1: '0', score2: '0', winner: 'المغرب' },
      { team1: 'البرتغال', team2: 'سويسرا', score1: '6', score2: '1', winner: 'البرتغال' },
    ],
  },
  {
    name: 'Quarterfinals', nameAr: 'ربع النهائي', icon: '⚔️',
    matches: [
      { team1: 'هولندا', team2: 'الأرجنتين', score1: '2', score2: '2', winner: 'الأرجنتين' },
      { team1: 'كرواتيا', team2: 'البرازيل', score1: '1', score2: '1', winner: 'كرواتيا' },
      { team1: 'إنجلترا', team2: 'فرنسا', score1: '1', score2: '2', winner: 'فرنسا' },
      { team1: 'المغرب', team2: 'البرتغال', score1: '1', score2: '0', winner: 'المغرب' },
    ],
  },
  {
    name: 'Semifinals', nameAr: 'نصف النهائي', icon: '🔥',
    matches: [
      { team1: 'الأرجنتين', team2: 'كرواتيا', score1: '3', score2: '0', winner: 'الأرجنتين' },
      { team1: 'فرنسا', team2: 'المغرب', score1: '2', score2: '0', winner: 'فرنسا' },
    ],
  },
  {
    name: 'Final', nameAr: 'النهائي', icon: '🏆',
    matches: [
      { team1: 'الأرجنتين', team2: 'فرنسا', score1: '3', score2: '3', winner: 'الأرجنتين' },
    ],
  },
];

const groupStageResults: Record<string, { qualified: string[]; eliminated: string[] }> = {
  'A': { qualified: ['هولندا', 'السنغال'], eliminated: ['الإكوادور', 'قطر'] },
  'B': { qualified: ['إنجلترا', 'الولايات المتحدة'], eliminated: ['إيران', 'ويلز'] },
  'C': { qualified: ['الأرجنتين', 'بولندا'], eliminated: ['المكسيك', 'السعودية'] },
  'D': { qualified: ['فرنسا', 'أستراليا'], eliminated: ['تونس', 'الدنمارك'] },
  'E': { qualified: ['اليابان', 'إسبانيا'], eliminated: ['ألمانيا', 'كوستاريكا'] },
  'F': { qualified: ['المغرب', 'كرواتيا'], eliminated: ['بلجيكا', 'كندا'] },
  'G': { qualified: ['البرازيل', 'سويسرا'], eliminated: ['الكاميرون', 'صربيا'] },
  'H': { qualified: ['البرتغال', 'كوريا الجنوبية'], eliminated: ['الأوروغواي', 'غانا'] },
};

export default function WorldCupBracket() {
  return (
    <div>
      {/* Group stage results */}
      <div className="mb-6">
        <h3 className="text-white/60 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>📊 مرحلة المجموعات - المتأهلون والخارجون</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(groupStageResults).map(([group, data]) => (
            <div key={group} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
              <div className="text-amber-400 text-xs font-bold mb-2 text-center" style={{ fontFamily: 'Cairo' }}>المجموعة {group}</div>
              <div className="space-y-1.5">
                {data.qualified.map((team, i) => (
                  <div key={team} className="flex items-center gap-1.5 text-xs">
                    <span className="text-green-400 text-[9px]">{i === 0 ? '🥇' : '🥈'}</span>
                    <span className="text-green-300 font-bold" style={{ fontFamily: 'Cairo' }}>{team}</span>
                  </div>
                ))}
                <div className="border-t border-white/5 my-1" />
                {data.eliminated.map(team => (
                  <div key={team} className="flex items-center gap-1.5 text-xs">
                    <span className="text-red-400">✕</span>
                    <span className="text-white/40" style={{ fontFamily: 'Cairo' }}>{team}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knockout bracket */}
      <h3 className="text-white/60 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>🏆 الأدوار الإقصائية - مشوار البطولة</h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 overflow-x-auto pb-2">
        {bracketData.map((round, ri) => (
          <div key={round.name} className="flex-1 min-w-[220px]">
            <div className={`text-center text-xs font-bold mb-2 px-3 py-1.5 rounded-lg ${
              ri === bracketData.length - 1 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-white/60'
            }`} style={{ fontFamily: 'Cairo' }}>
              {round.icon} {round.nameAr}
            </div>
            <div className="space-y-2">
              {round.matches.map((m, mi) => {
                const isWinner = (team: string) => team === m.winner;
                return (
                  <div key={mi} className={`rounded-lg p-2.5 border ${
                    ri === bracketData.length - 1
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-white/[0.03] border-white/5'
                  }`}>
                    {[m.team1, m.team2].map((team, ti) => (
                      <div key={ti} className={`flex items-center justify-between py-0.5 ${ti === 0 ? 'mb-0.5' : ''}`}>
                        <span className={`text-xs ${isWinner(team) ? 'text-white font-bold' : 'text-white/40'}`} style={{ fontFamily: 'Cairo' }}>
                          {isWinner(team) ? '🏅 ' : ''}{team}
                        </span>
                        <span className={`text-xs font-black ${isWinner(team) ? 'text-green-400' : 'text-white/30'}`} style={{ fontFamily: 'Orbitron' }}>
                          {ti === 0 ? m.score1 : m.score2}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Champion highlight */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-l from-yellow-500/15 via-amber-500/5 to-transparent border border-yellow-500/20 text-center">
        <span className="text-4xl block mb-2">🏆</span>
        <span className="text-yellow-400 text-lg font-black block" style={{ fontFamily: 'Cairo' }}>الأرجنتين بطلة كأس العالم 2022</span>
        <span className="text-white/50 text-xs block mt-1" style={{ fontFamily: 'Cairo' }}>فازت على فرنسا 4-2 بركلات الترجيح بعد التعادل 3-3</span>
      </div>

      {/* Eliminated teams summary */}
      <div className="mt-6">
        <h3 className="text-white/60 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>🚫 جميع المنتخبات التي خرجت من البطولة</h3>
        <div className="flex flex-wrap gap-1.5">
          {Object.values(groupStageResults).flatMap(g => g.eliminated).map(team => (
            <span key={team} className="bg-red-500/5 border border-red-500/10 text-white/50 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              ✕ {team}
            </span>
          ))}
          {['الولايات المتحدة', 'أستراليا', 'بولندا', 'السنغال', 'كوريا الجنوبية', 'سويسرا', 'إسبانيا', 'البرتغال'].map(team => (
            <span key={team} className="bg-orange-500/5 border border-orange-500/10 text-white/50 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              ⊘ {team} (دور الـ16)
            </span>
          ))}
          {['هولندا', 'البرازيل', 'إنجلترا', 'المغرب'].map(team => (
            <span key={team} className="bg-purple-500/5 border border-purple-500/10 text-white/50 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              ⊘ {team} (ربع النهائي)
            </span>
          ))}
          {['كرواتيا'].map(team => (
            <span key={team} className="bg-blue-500/5 border border-blue-500/10 text-white/50 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              🥉 {team} (المركز الثالث)
            </span>
          ))}
          {['المغرب'].map(team => (
            <span key={team} className="bg-amber-500/5 border border-amber-500/10 text-white/50 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              ⊘ {team} (نصف النهائي)
            </span>
          ))}
          {['فرنسا'].map(team => (
            <span key={team} className="bg-gray-300/10 border border-gray-300/20 text-white/60 text-xs px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Cairo' }}>
              🥈 {team} (الوصيف)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
