import { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy, Activity, BarChart3 } from 'lucide-react';
import { teamsDatabase, getTeamPredictions } from '../data/worldCup2026';

export default function RoundAnalysis() {
  const [expandedRound, setExpandedRound] = useState<string | null>('groups');

  // تحليل الأدوار المختلفة
  const roundsAnalysis = [
    {
      key: 'groups',
      name: 'دور المجموعات',
      icon: '🏟️',
      description: '48 منتخب في 12 مجموعة',
      teams: 48,
      advancing: 24,
      matches: 80,
      details:
        'كل مجموعة 4 فرق يلعب كل فريق 3 مباريات. أفضل 2 فريق يتقدمان',
    },
    {
      key: 'ro16',
      name: '1/16 نهائي',
      icon: '⚽',
      description: '32 → 16 فريق',
      teams: 32,
      advancing: 16,
      matches: 16,
      details: 'المرحلة الأولى من حذف الخاسر - نظام الإقصاء المباشر',
    },
    {
      key: 'qf',
      name: 'ربع النهائي',
      icon: '🥇',
      description: '16 → 8 فرق',
      teams: 16,
      advancing: 8,
      matches: 8,
      details: 'أفضل 8 فرق - تشديد المنافسة والمباريات الحاسمة',
    },
    {
      key: 'sf',
      name: 'نصف النهائي',
      icon: '👑',
      description: '8 → 4 فرق',
      teams: 8,
      advancing: 4,
      matches: 4,
      details: 'المرحلة الحاسمة - أقوى الفرق تبقى',
    },
    {
      key: 'third',
      name: 'مباراة البرونزية',
      icon: '🥉',
      description: 'تحديد المركز الثالث',
      teams: 2,
      advancing: 1,
      matches: 1,
      details: 'الخاسران من نصف النهائي يتنافسان على المركز الثالث',
    },
    {
      key: 'final',
      name: 'النهائي',
      icon: '🏆',
      description: 'تحديد البطل',
      teams: 2,
      advancing: 1,
      matches: 1,
      details: 'الفريقان الفائزان من نصف النهائي للفوز بالبطولة',
    },
  ];

  // تحليل احتمالات الخروج حسب القوة
  const eliminationProbabilities = [
    {
      category: 'الفرق القوية جداً (FIFA 1-10)',
      color: 'from-red-600 to-red-500',
      teams: Object.values(teamsDatabase).filter(t => t.fifaRank <= 10),
      stats: {
        groupElimination: 5,
        ro16Elimination: 15,
        qfElimination: 25,
        sfElimination: 40,
        win: 50,
      },
    },
    {
      category: 'الفرق القوية (FIFA 11-25)',
      color: 'from-orange-600 to-orange-500',
      teams: Object.values(teamsDatabase).filter(t => t.fifaRank > 10 && t.fifaRank <= 25),
      stats: {
        groupElimination: 15,
        ro16Elimination: 30,
        qfElimination: 35,
        sfElimination: 15,
        win: 8,
      },
    },
    {
      category: 'الفرق المتوسطة (FIFA 26-45)',
      color: 'from-yellow-600 to-yellow-500',
      teams: Object.values(teamsDatabase).filter(t => t.fifaRank > 25 && t.fifaRank <= 45),
      stats: {
        groupElimination: 35,
        ro16Elimination: 40,
        qfElimination: 20,
        sfElimination: 5,
        win: 1,
      },
    },
    {
      category: 'الفرق الضعيفة (FIFA 45+)',
      color: 'from-green-600 to-green-500',
      teams: Object.values(teamsDatabase).filter(t => t.fifaRank > 45),
      stats: {
        groupElimination: 70,
        ro16Elimination: 25,
        qfElimination: 5,
        sfElimination: 0,
        win: 0,
      },
    },
  ];

  return (
    <div className="space-y-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* رأس القسم */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Activity size={28} className="text-indigo-400" /> مخطط الأدوار والنسب المئوية
        </h2>
        <p className="text-white/70 text-base">تحليل احتمالات خروج الفرق في كل مرحلة</p>
      </div>

      {/* شرح الأدوار */}
      <div className="space-y-2">
        {roundsAnalysis.map((round) => (
          <div key={round.key}>
            <button
              onClick={() => setExpandedRound(expandedRound === round.key ? null : round.key)}
              className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{round.icon}</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-white">{round.name}</p>
                  <p className="text-white/60 text-sm">{round.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-white/70 text-xs">الفرق:</p>
                    <p className="text-xl font-bold text-indigo-400">{round.teams}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">يتقدم:</p>
                    <p className="text-xl font-bold text-green-400">{round.advancing}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">مباريات:</p>
                    <p className="text-xl font-bold text-blue-400">{round.matches}</p>
                  </div>
                </div>
                {expandedRound === round.key ? (
                  <ChevronUp className="text-indigo-400 mt-2" />
                ) : (
                  <ChevronDown className="text-indigo-400 mt-2" />
                )}
              </div>
            </button>

            {expandedRound === round.key && (
              <div className="mt-2 bg-white/5 rounded-lg p-4 border border-white/10 ml-2">
                <p className="text-white/80 text-base mb-3">{round.details}</p>

                {/* معادلة النسب */}
                <div className="bg-blue-500/10 rounded p-3 border border-blue-400/20">
                  <p className="text-blue-300 font-bold text-sm mb-2">📊 المعادلة:</p>
                  <p className="text-white/70 text-sm font-mono">
                    الفرق التي تخرج = الفرق الكاملة - الفرق المتقدمة
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    {round.teams} - {round.advancing} = {round.teams - round.advancing} فريق يخرج
                  </p>
                </div>

                {/* نسبة التقدم */}
                <div className="mt-3 bg-green-500/10 rounded p-3 border border-green-400/20">
                  <p className="text-green-300 font-bold text-sm mb-2">✅ نسبة التقدم:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-400 h-full"
                        style={{ width: `${(round.advancing / round.teams) * 100}%` }}
                      />
                    </div>
                    <span className="text-green-400 font-bold text-sm w-16 text-right">
                      {((round.advancing / round.teams) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* احتمالات الخروج حسب قوة الفريق */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
          <BarChart3 size={24} /> احتمالات الخروج حسب قوة الفريق
        </h3>

        <div className="space-y-3">
          {eliminationProbabilities.map((category, idx) => (
            <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-white">{category.category}</p>
                <span className="text-sm text-white/60">{category.teams.length} فريق</span>
              </div>

              {/* عرض الفرق */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {category.teams.slice(0, 6).map((team) => (
                  <div key={team.id} className="bg-white/10 rounded px-2 py-1 text-xs text-white/80 hover:bg-white/20 transition-all">
                    {team.flag} {team.nameAr}
                  </div>
                ))}
                {category.teams.length > 6 && (
                  <div className="bg-white/10 rounded px-2 py-1 text-xs text-white/60">
                    +{category.teams.length - 6} آخرين
                  </div>
                )}
              </div>

              {/* الاحصائيات */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">خروج من المجموعات</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/10 rounded h-2">
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${category.stats.groupElimination}%` }}
                      />
                    </div>
                    <span className="text-red-400 font-bold w-10 text-right">{category.stats.groupElimination}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">خروج من 1/16</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/10 rounded h-2">
                      <div
                        className="bg-orange-500 h-full"
                        style={{ width: `${category.stats.ro16Elimination}%` }}
                      />
                    </div>
                    <span className="text-orange-400 font-bold w-10 text-right">{category.stats.ro16Elimination}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">خروج من ربع</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/10 rounded h-2">
                      <div
                        className="bg-yellow-500 h-full"
                        style={{ width: `${category.stats.qfElimination}%` }}
                      />
                    </div>
                    <span className="text-yellow-400 font-bold w-10 text-right">{category.stats.qfElimination}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">خروج من نصف</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/10 rounded h-2">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${category.stats.sfElimination}%` }}
                      />
                    </div>
                    <span className="text-green-400 font-bold w-10 text-right">{category.stats.sfElimination}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-white/10 pt-1.5 mt-1.5">
                  <span className="text-white/70 font-bold">احتمالية الفوز</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/10 rounded h-2">
                      <div
                        className="bg-purple-500 h-full"
                        style={{ width: `${category.stats.win}%` }}
                      />
                    </div>
                    <span className="text-purple-400 font-bold w-10 text-right">{category.stats.win}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ملخص حقائق مهمة */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
          <Trophy size={24} /> حقائق مهمة عن الأدوار
        </h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>في دور المجموعات: 24 فريق يخرج من 48 (50% معدل الخروج)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>من 1/16 النهائي: 16 فريق يخرج من 32 (50% معدل الخروج)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>الفرق القوية جداً: احتمالية خروجها من المجموعات أقل من 5%</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>الفرق الضعيفة: احتمالية وصولها لربع النهائي أقل من 5%</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>المباريات الإقصائية تبدأ من 1/16: لا مجال للخطأ</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
