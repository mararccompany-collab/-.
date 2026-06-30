import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Zap, Target, Brain } from 'lucide-react';
import { teamsDatabase, getTeamPredictions, worldCup2026Groups } from '../data/worldCup2026';

export default function AdvancedPredictions() {
  const [selectedMetric, setSelectedMetric] = useState<'advance' | 'topgroup' | 'semifinal' | 'final' | 'win'>('advance');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const groups = Object.entries(worldCup2026Groups).sort((a, b) => a[0].localeCompare(b[0]));

  interface PredictionData {
    team: string;
    nameAr: string;
    flag: string;
    percentage: number;
    strength: number;
  }

  const getPredictionData = (metric: 'advance' | 'topgroup' | 'semifinal' | 'final' | 'win'): PredictionData[] => {
    return Object.values(teamsDatabase)
      .map((team) => {
        const predictions = getTeamPredictions(team);
        const metricMap = {
          advance: predictions.toAdvance,
          topgroup: predictions.toTopGroup,
          semifinal: predictions.toSemiFinal,
          final: predictions.toFinal,
          win: predictions.toWin,
        };

        return {
          team: team.name,
          nameAr: team.nameAr,
          flag: team.flag,
          percentage: metricMap[metric],
          strength: team.strength,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  };

  const metricLabels = {
    advance: { ar: 'العبور للدور التالي', en: 'Advance to Next Round', icon: '➡️' },
    topgroup: { ar: 'الحصول على المركز الأول', en: 'Top of Group', icon: '👑' },
    semifinal: { ar: 'الوصول لنصف النهائي', en: 'Reach Semi-Final', icon: '🏆' },
    final: { ar: 'الوصول للنهائي', en: 'Reach Final', icon: '👥' },
    win: { ar: 'الفوز بالبطولة', en: 'Win Trophy', icon: '🥇' },
  };

  const getPredictionColor = (percentage: number) => {
    if (percentage >= 80) return 'from-red-600 to-red-500';
    if (percentage >= 60) return 'from-orange-600 to-orange-500';
    if (percentage >= 40) return 'from-yellow-600 to-yellow-500';
    if (percentage >= 20) return 'from-green-600 to-green-500';
    return 'from-blue-600 to-blue-500';
  };

  const getPredictionBg = (percentage: number) => {
    if (percentage >= 80) return 'from-red-500/20 to-red-600/10 border-red-400/30';
    if (percentage >= 60) return 'from-orange-500/20 to-orange-600/10 border-orange-400/30';
    if (percentage >= 40) return 'from-yellow-500/20 to-yellow-600/10 border-yellow-400/30';
    if (percentage >= 20) return 'from-green-500/20 to-green-600/10 border-green-400/30';
    return 'from-blue-500/20 to-blue-600/10 border-blue-400/30';
  };

  const topPredictions = getPredictionData(selectedMetric).slice(0, 10);
  const totalPercentage = topPredictions.reduce((sum, team) => sum + team.percentage, 0);

  return (
    <div className="space-y-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* رأس القسم */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Brain size={28} className="text-indigo-400" /> التنبؤات والاحصائيات المتقدمة
        </h2>
        <p className="text-white/70 text-base">تحليلات دقيقة بناءً على قوة الفرق والترتيب العالمي</p>
      </div>

      {/* اختيار نوع التنبؤ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(metricLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key as any)}
            className={`p-2 rounded-lg border transition-all text-sm font-bold ${
              selectedMetric === key
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-300 text-white'
                : 'bg-slate-700/40 border-slate-600/40 text-white/70 hover:text-white'
            }`}
          >
            <div className="text-lg mb-1">{label.icon}</div>
            <div className="text-xs">{label.ar}</div>
          </button>
        ))}
      </div>

      {/* أفضل 10 فرق للتنبؤ المختار */}
      <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-slate-600/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <TrendingUp size={24} className="text-indigo-400" /> أفضل 10 فرق - {metricLabels[selectedMetric].ar}
        </h3>

        <div className="space-y-2 mb-4">
          {topPredictions.map((team, idx) => (
            <div
              key={team.team}
              className={`bg-gradient-to-r ${getPredictionBg(team.percentage)} border rounded-lg p-3`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-2xl font-bold text-white/50 w-8">{idx + 1}</span>
                  <span className="text-3xl">{team.flag}</span>
                  <div className="flex-1">
                    <p className="text-white font-bold">{team.nameAr}</p>
                    <p className="text-white/60 text-xs">{team.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold bg-gradient-to-r ${getPredictionColor(team.percentage)} bg-clip-text text-transparent`}>
                    {team.percentage.toFixed(1)}%
                  </p>
                  <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
                    <Zap size={12} /> {team.strength}
                  </div>
                </div>
              </div>

              {/* شريط النسبة المئوية */}
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getPredictionColor(team.percentage)} transition-all duration-300`}
                  style={{ width: `${team.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ملخص إحصائي */}
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-white/60 text-xs mb-1">المتوسط</p>
              <p className="text-lg font-bold text-indigo-400">{(totalPercentage / topPredictions.length).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">الأعلى</p>
              <p className="text-lg font-bold text-green-400">{Math.max(...topPredictions.map(t => t.percentage)).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">المجموع</p>
              <p className="text-lg font-bold text-yellow-400">{totalPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* التنبؤات حسب المجموعات */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedGroup(expandedGroup ? null : 'all')}
          className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
        >
          <span className="text-lg font-bold text-indigo-300">📊 التنبؤات حسب المجموعات</span>
          {expandedGroup ? (
            <ChevronUp className="text-indigo-400" />
          ) : (
            <ChevronDown className="text-indigo-400" />
          )}
        </button>

        {expandedGroup && (
          <div className="space-y-2 pl-2">
            {groups.map(([groupLetter, teamNames]) => {
              const groupTeams = teamNames
                .map((name) => {
                  const team = Object.values(teamsDatabase).find(t => t.name === name);
                  if (!team) return null;
                  const predictions = getTeamPredictions(team);
                  return {
                    team,
                    prediction: predictions,
                  };
                })
                .filter(Boolean)
                .sort((a, b) => (b?.prediction.toAdvance ?? 0) - (a?.prediction.toAdvance ?? 0));

              return (
                <div
                  key={groupLetter}
                  className="bg-gradient-to-r from-slate-700/40 to-slate-800/40 border border-slate-600/40 rounded-lg p-3"
                >
                  <h4 className="text-base font-bold text-white mb-2">المجموعة {groupLetter}</h4>
                  <div className="space-y-1.5">
                    {groupTeams.map((teamData) => {
                      if (!teamData) return null;
                      const { team, prediction } = teamData;
                      const currentMetricValue = {
                        advance: prediction.toAdvance,
                        topgroup: prediction.toTopGroup,
                        semifinal: prediction.toSemiFinal,
                        final: prediction.toFinal,
                        win: prediction.toWin,
                      }[selectedMetric];

                      return (
                        <div
                          key={team.id}
                          className="bg-white/5 rounded p-2 flex items-center justify-between hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-2xl">{team.flag}</span>
                            <div className="flex-1">
                              <p className="text-white font-bold text-sm">{team.nameAr}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-white/10 rounded h-2 overflow-hidden">
                              <div
                                className={`bg-gradient-to-r ${getPredictionColor(currentMetricValue)} h-full`}
                                style={{ width: `${currentMetricValue}%` }}
                              />
                            </div>
                            <span className="text-white/70 font-bold text-sm w-12 text-right">
                              {currentMetricValue.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* نصائح تحليلية */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
          <Target size={24} /> ملاحظات تحليلية مهمة
        </h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <span className="text-purple-400">💡</span>
            <span>التنبؤات مبنية على ترتيب FIFA العالمي وقوة الفرق التاريخية</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">⚽</span>
            <span>الفرق العربية (مصر، السعودية، الجزائر، تونس، العراق، الأردن) لديها فرصة متوسطة</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">🔥</span>
            <span>البرازيل وألمانيا والأرجنتين وفرنسا يتمتعون بأعلى احتمالية للفوز</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">📈</span>
            <span>هذه التحليلات تقريبية وقد تتغير بناءً على الإصابات والتشكيلات</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
