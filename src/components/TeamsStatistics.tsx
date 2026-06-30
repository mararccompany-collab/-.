import { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy, Zap, Users, Globe, TrendingUp } from 'lucide-react';
import { teamsDatabase, worldCup2026Groups, getTeamPredictions } from '../data/worldCup2026';

export default function TeamsStatistics() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('A');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const groups = Object.entries(worldCup2026Groups).sort((a, b) => a[0].localeCompare(b[0]));

  const getRankColor = (rank: number): string => {
    if (rank <= 10) return 'from-red-500/30 to-red-600/20 border-red-400/30';
    if (rank <= 20) return 'from-orange-500/30 to-orange-600/20 border-orange-400/30';
    if (rank <= 35) return 'from-yellow-500/30 to-yellow-600/20 border-yellow-400/30';
    return 'from-green-500/30 to-green-600/20 border-green-400/30';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength >= 85) return 'text-red-400';
    if (strength >= 75) return 'text-orange-400';
    if (strength >= 65) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">🏆 المنتخبات والمجموعات 2026</h2>
        <p className="text-white/70 text-base">12 مجموعة - 48 منتخب - 80 مباراة في المجموعات</p>
      </div>

      {groups.map(([groupLetter, teamNames]) => (
        <div key={groupLetter} className="space-y-2">
          <button
            onClick={() => setExpandedGroup(expandedGroup === groupLetter ? null : groupLetter)}
            className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-blue-400">المجموعة {groupLetter}</span>
              <span className="text-sm text-white/50">{teamNames.length} فرق</span>
            </div>
            {expandedGroup === groupLetter ? (
              <ChevronUp className="text-blue-400" size={24} />
            ) : (
              <ChevronDown className="text-blue-400" size={24} />
            )}
          </button>

          {expandedGroup === groupLetter && (
            <div className="space-y-2 pl-2">
              {teamNames.map((teamName) => {
                const team = Object.values(teamsDatabase).find(t => t.name === teamName);
                if (!team) return null;

                const predictions = getTeamPredictions(team);
                const isSelected = selectedTeam === team.id;

                return (
                  <div key={team.id} className="space-y-0">
                    <button
                      onClick={() => setSelectedTeam(isSelected ? null : team.id)}
                      className={`w-full p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/40 border-blue-400/50'
                          : `bg-gradient-to-r ${getRankColor(team.fifaRank)} border`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{team.flag}</span>
                          <div className="text-left">
                            <p className="font-bold text-white text-lg">{team.nameAr}</p>
                            <p className="text-white/60 text-sm">{team.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-white/70 text-sm">الترتيب العالمي</p>
                            <p className="text-xl font-bold text-white">#{team.fifaRank}</p>
                          </div>
                          <div className={`text-right ${getStrengthColor(team.strength)}`}>
                            <Zap size={24} className="mb-1" />
                            <p className="text-lg font-bold">{team.strength}</p>
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-white/20 space-y-3">
                          {/* المدرب والتشكيلة */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 rounded p-2">
                              <p className="text-white/60 text-xs mb-1">المدرب</p>
                              <p className="text-white font-bold text-sm">{team.coachAr}</p>
                              <p className="text-white/50 text-xs">{team.coach}</p>
                            </div>
                            <div className="bg-white/5 rounded p-2">
                              <p className="text-white/60 text-xs mb-1">التشكيلة</p>
                              <p className="text-white font-bold text-sm">{team.formation}</p>
                            </div>
                          </div>

                          {/* الاحصائيات */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/5 rounded p-2 text-center">
                              <Trophy size={16} className="mx-auto mb-1 text-yellow-400" />
                              <p className="text-white/60 text-xs">الألقاب</p>
                              <p className="text-white font-bold text-lg">{team.titles}</p>
                            </div>
                            <div className="bg-white/5 rounded p-2 text-center">
                              <Users size={16} className="mx-auto mb-1 text-blue-400" />
                              <p className="text-white/60 text-xs">المشاركات</p>
                              <p className="text-white font-bold text-lg">{team.worldCupParticipations}</p>
                            </div>
                            <div className="bg-white/5 rounded p-2 text-center">
                              <Globe size={16} className="mx-auto mb-1 text-green-400" />
                              <p className="text-white/60 text-xs">القارة</p>
                              <p className="text-white font-bold text-xs">{team.continent}</p>
                            </div>
                          </div>

                          {/* التوقعات */}
                          <div className="bg-blue-500/10 rounded p-3 border border-blue-400/20">
                            <p className="text-blue-300 font-bold text-sm mb-2 flex items-center gap-2">
                              <TrendingUp size={16} /> توقعات الأداء
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/70">العبور للدور التالي</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 bg-white/10 rounded h-2 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-green-500 to-green-400 h-full"
                                      style={{ width: `${predictions.toAdvance}%` }}
                                    />
                                  </div>
                                  <span className="text-green-400 font-bold">{predictions.toAdvance.toFixed(1)}%</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/70">الحصول على المركز الأول</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 bg-white/10 rounded h-2 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full"
                                      style={{ width: `${predictions.toTopGroup}%` }}
                                    />
                                  </div>
                                  <span className="text-yellow-400 font-bold">{predictions.toTopGroup.toFixed(1)}%</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/70">الوصول لنصف النهائي</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 bg-white/10 rounded h-2 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-orange-500 to-orange-400 h-full"
                                      style={{ width: `${Math.min(predictions.toSemiFinal, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-orange-400 font-bold">{predictions.toSemiFinal.toFixed(1)}%</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-white/70">الفوز بالبطولة</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 bg-white/10 rounded h-2 overflow-hidden">
                                    <div
                                      className="bg-gradient-to-r from-red-500 to-red-400 h-full"
                                      style={{ width: `${Math.min(predictions.toWin, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-red-400 font-bold">{predictions.toWin.toFixed(1)}%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* النتيجة السابقة */}
                          {team.lastWorldCupResult && (
                            <div className="bg-purple-500/10 rounded p-2 border border-purple-400/20">
                              <p className="text-white/60 text-xs mb-1">آخر ظهور في كأس العالم</p>
                              <p className="text-purple-300 font-bold text-sm">{team.lastWorldCupResult}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* ملخص الفرق القوية */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Trophy size={24} className="text-yellow-400" /> أقوى 10 منتخبات
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.values(teamsDatabase)
            .sort((a, b) => b.strength - a.strength)
            .slice(0, 10)
            .map((team, idx) => (
              <div
                key={team.id}
                className="bg-white/5 rounded p-2 border border-white/10 text-center hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => setSelectedTeam(team.id)}
              >
                <p className="text-lg font-bold text-white">{idx + 1}</p>
                <p className="text-2xl my-1">{team.flag}</p>
                <p className="text-white/70 text-xs">{team.nameAr}</p>
                <p className="text-yellow-400 font-bold text-sm mt-1">💪 {team.strength}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
