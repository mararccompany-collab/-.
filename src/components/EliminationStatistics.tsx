import { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3, TrendingDown, Globe, Award } from 'lucide-react';

export default function EliminationStatistics() {
  const [expandedYear, setExpandedYear] = useState<number | null>(2022);

  // إحصائيات الدول التي خرجت من البطولات السابقة
  const eliminationHistory = [
    {
      year: 2022,
      yearAr: '2022',
      champion: 'Argentina',
      championAr: 'الأرجنتين',
      eliminated: [
        { name: 'Saudi Arabia', nameAr: 'السعودية', stage: 'Group', icon: '🇸🇦' },
        { name: 'Qatar', nameAr: 'قطر', stage: 'Group', icon: '🇶🇦' },
        { name: 'Iran', nameAr: 'إيران', stage: 'Group', icon: '🇮🇷' },
        { name: 'Wales', nameAr: 'ويلز', stage: 'Group', icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
        { name: 'Germany', nameAr: 'ألمانيا', stage: 'Group', icon: '🇩🇪' },
        { name: 'Canada', nameAr: 'كندا', stage: 'Group', icon: '🇨🇦' },
        { name: 'Denmark', nameAr: 'الدنمارك', stage: 'Group', icon: '🇩🇰' },
        { name: 'Australia', nameAr: 'أستراليا', stage: 'RO16', icon: '🇦🇺' },
        { name: 'Spain', nameAr: 'إسبانيا', stage: 'RO16', icon: '🇪🇸' },
        { name: 'Japan', nameAr: 'اليابان', stage: 'RO16', icon: '🇯🇵' },
        { name: 'Senegal', nameAr: 'السنغال', stage: 'RO16', icon: '🇸🇳' },
        { name: 'Switzerland', nameAr: 'سويسرا', stage: 'RO16', icon: '🇨🇭' },
        { name: 'Netherlands', nameAr: 'هولندا', stage: 'RO16', icon: '🇳🇱' },
        { name: 'Brazil', nameAr: 'البرازيل', stage: 'QF', icon: '🇧🇷' },
        { name: 'France', nameAr: 'فرنسا', stage: 'QF', icon: '🇫🇷' },
        { name: 'Morocco', nameAr: 'المغرب', stage: 'SF', icon: '🇲🇦' },
      ],
    },
    {
      year: 2018,
      yearAr: '2018',
      champion: 'France',
      championAr: 'فرنسا',
      eliminated: [
        { name: 'Egypt', nameAr: 'مصر', stage: 'Group', icon: '🇪🇬' },
        { name: 'Saudi Arabia', nameAr: 'السعودية', stage: 'Group', icon: '🇸🇦' },
        { name: 'Panama', nameAr: 'بنما', stage: 'Group', icon: '🇵🇦' },
        { name: 'Iran', nameAr: 'إيران', stage: 'Group', icon: '🇮🇷' },
        { name: 'Costa Rica', nameAr: 'كوستاريكا', stage: 'Group', icon: '🇨🇷' },
        { name: 'Germany', nameAr: 'ألمانيا', stage: 'Group', icon: '🇩🇪' },
        { name: 'Serbia', nameAr: 'صربيا', stage: 'Group', icon: '🇷🇸' },
        { name: 'Japan', nameAr: 'اليابان', stage: 'RO16', icon: '🇯🇵' },
        { name: 'Morocco', nameAr: 'المغرب', stage: 'RO16', icon: '🇲🇦' },
        { name: 'Tunisia', nameAr: 'تونس', stage: 'RO16', icon: '🇹🇳' },
        { name: 'Denmark', nameAr: 'الدنمارك', stage: 'RO16', icon: '🇩🇰' },
        { name: 'Sweden', nameAr: 'السويد', stage: 'RO16', icon: '🇸🇪' },
        { name: 'Spain', nameAr: 'إسبانيا', stage: 'RO16', icon: '🇪🇸' },
        { name: 'Russia', nameAr: 'روسيا', stage: 'RO16', icon: '🇷🇺' },
        { name: 'Brazil', nameAr: 'البرازيل', stage: 'QF', icon: '🇧🇷' },
        { name: 'Belgium', nameAr: 'بلجيكا', stage: 'SF', icon: '🇧🇪' },
      ],
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Group':
        return 'from-red-500/30 to-red-600/20 border-red-400/30';
      case 'RO16':
        return 'from-orange-500/30 to-orange-600/20 border-orange-400/30';
      case 'QF':
        return 'from-yellow-500/30 to-yellow-600/20 border-yellow-400/30';
      case 'SF':
        return 'from-green-500/30 to-green-600/20 border-green-400/30';
      default:
        return 'from-blue-500/30 to-blue-600/20 border-blue-400/30';
    }
  };

  const getStageLabelAr = (stage: string) => {
    switch (stage) {
      case 'Group':
        return 'دور المجموعات';
      case 'RO16':
        return '1/16 نهائي';
      case 'QF':
        return 'ربع النهائي';
      case 'SF':
        return 'نصف النهائي';
      default:
        return stage;
    }
  };

  return (
    <div className="space-y-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* رأس القسم */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <TrendingDown size={28} className="text-red-400" /> الدول التي خرجت من البطولات السابقة
        </h2>
        <p className="text-white/70 text-base">تحليل مراحل الخروج والدول المحظوظة والدول التي لم تحظ بالحظ</p>
      </div>

      {/* كل سنة */}
      {eliminationHistory.map((history) => (
        <div key={history.year}>
          <button
            onClick={() => setExpandedYear(expandedYear === history.year ? null : history.year)}
            className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all mb-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-yellow-400">🏆</span>
              <div className="text-left">
                <p className="text-lg font-bold text-white">كأس العالم {history.yearAr}</p>
                <p className="text-white/60 text-sm">الفائز: {history.championAr}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white/70">{history.eliminated.length}</span>
              <p className="text-white/50 text-xs">دولة خرجت</p>
              {expandedYear === history.year ? (
                <ChevronUp className="text-blue-400 mt-1" />
              ) : (
                <ChevronDown className="text-blue-400 mt-1" />
              )}
            </div>
          </button>

          {expandedYear === history.year && (
            <div className="space-y-2 pl-4 mb-4">
              {/* تقسيم حسب المرحلة */}
              {['Group', 'RO16', 'QF', 'SF'].map((stage) => {
                const teamsInStage = history.eliminated.filter(t => t.stage === stage);
                if (teamsInStage.length === 0) return null;

                return (
                  <div key={stage}>
                    <h3 className="text-base font-bold text-white/80 mb-2 py-2 border-b border-white/10">
                      {getStageLabelAr(stage)} ({teamsInStage.length} دول)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
                      {teamsInStage.map((team) => (
                        <div
                          key={team.name}
                          className={`bg-gradient-to-r ${getStageColor(stage)} border rounded-lg p-2 text-center hover:scale-105 transition-transform`}
                        >
                          <p className="text-2xl mb-1">{team.icon}</p>
                          <p className="text-white font-bold text-sm">{team.nameAr}</p>
                          <p className="text-white/60 text-xs">{team.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* احصائيات مقارنة */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
          <BarChart3 size={24} /> احصائيات المقارنة
        </h3>
        <div className="space-y-3">
          {eliminationHistory.map((history) => (
            <div key={history.year} className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">كأس العالم {history.yearAr}</span>
                <span className="text-blue-400 font-bold">{history.eliminated.length} دول</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-red-500/20 rounded p-2 border border-red-400/30">
                  <p className="text-red-400 font-bold">
                    {history.eliminated.filter(t => t.stage === 'Group').length}
                  </p>
                  <p className="text-white/60 text-xs mt-1">المجموعات</p>
                </div>
                <div className="bg-orange-500/20 rounded p-2 border border-orange-400/30">
                  <p className="text-orange-400 font-bold">
                    {history.eliminated.filter(t => t.stage === 'RO16').length}
                  </p>
                  <p className="text-white/60 text-xs mt-1">1/16</p>
                </div>
                <div className="bg-yellow-500/20 rounded p-2 border border-yellow-400/30">
                  <p className="text-yellow-400 font-bold">
                    {history.eliminated.filter(t => t.stage === 'QF').length}
                  </p>
                  <p className="text-white/60 text-xs mt-1">ربع</p>
                </div>
                <div className="bg-green-500/20 rounded p-2 border border-green-400/30">
                  <p className="text-green-400 font-bold">
                    {history.eliminated.filter(t => t.stage === 'SF').length}
                  </p>
                  <p className="text-white/60 text-xs mt-1">نصف</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ملاحظات إحصائية */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
          <Award size={24} /> ملاحظات مهمة
        </h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>في كأس العالم 2022 خرجت السعودية وقطر وإيران من المجموعات</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>الدول العربية الوحيدة التي تأهلت كانت المغرب الذي وصل لنصف النهائي</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>في 2026 سيشارك عدد أكبر من الدول العربية مع نظام 12 مجموعة جديد</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>مصر والعراق والجزائر والأردن سيشاركون للمرة الأولى منذ سنوات</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
