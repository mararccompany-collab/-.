import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, BarChart3, TrendingUp, Award } from 'lucide-react';
import { worldCupWinners } from '../data/worldCup2026';

export default function WorldCupTimeline2026() {
  const [expandedSection, setExpandedSection] = useState<string | null>('schedule');

  // جدول زمني لكأس العالم 2026
  const timeline = [
    {
      phase: 'الدور التمهيدي - المجموعات',
      phaseAr: 'المرحلة الأولى',
      startDate: '12 يونيو 2026',
      endDate: '13 يوليو 2026',
      description: 'مباريات المجموعات (80 مباراة)',
      icon: '🏟️',
      status: 'upcoming',
      matches: 80,
    },
    {
      phase: 'دور الستة عشر',
      phaseAr: '١/١٦ نهائي',
      startDate: '14 يوليو 2026',
      endDate: '21 يوليو 2026',
      description: '32 فريق يتنافسون على 8 مقاعد',
      icon: '⚽',
      status: 'upcoming',
      matches: 16,
    },
    {
      phase: 'ربع النهائي',
      phaseAr: '١/٨ نهائي',
      startDate: '22 يوليو 2026',
      endDate: '25 يوليو 2026',
      description: 'أفضل 8 فرق يتنافسون',
      icon: '🥇',
      status: 'upcoming',
      matches: 8,
    },
    {
      phase: 'نصف النهائي',
      phaseAr: '١/٤ نهائي',
      startDate: '26 يوليو 2026',
      endDate: '29 يوليو 2026',
      description: 'أفضل 4 فرق يتنافسون',
      icon: '👑',
      status: 'upcoming',
      matches: 4,
    },
    {
      phase: 'مباراة تحديد المركز الثالث',
      phaseAr: 'مباراة البرونزية',
      startDate: '30 يوليو 2026',
      endDate: '30 يوليو 2026',
      description: 'الفريق الخاسر من نصف النهائي الأول vs الخاسر الثاني',
      icon: '🥉',
      status: 'upcoming',
      matches: 1,
    },
    {
      phase: 'المباراة النهائية',
      phaseAr: 'النهائي',
      startDate: '31 يوليو 2026',
      endDate: '31 يوليو 2026',
      description: 'أفضل فريقين يتنافسان على البطولة',
      icon: '🏆',
      status: 'upcoming',
      matches: 1,
    },
  ];

  // احصائيات تاريخية
  const statistics = [
    {
      category: 'أكثر الفرق فوزاً',
      items: [
        { name: 'البرازيل', value: '5 بطولات', icon: '🇧🇷', detail: '1958, 1962, 1970, 1994, 2002' },
        { name: 'ألمانيا', value: '4 بطولات', icon: '🇩🇪', detail: '1954, 1974, 1990, 2014' },
        { name: 'إيطاليا', value: '4 بطولات', icon: '🇮🇹', detail: '1934, 1938, 1982, 2006' },
        { name: 'فرنسا', value: '2 بطولة', icon: '🇫🇷', detail: '1998, 2018' },
        { name: 'الأرجنتين', value: '3 بطولات', icon: '🇦🇷', detail: '1978, 1986, 2022' },
      ],
    },
    {
      category: 'احصائيات النهائي',
      items: [
        { name: 'ألمانيا', value: '4 مرات في النهائي', icon: '🥇', detail: 'الفائز 4 مرات' },
        { name: 'إيطاليا', value: '4 مرات في النهائي', icon: '🥇', detail: 'الفائز 4 مرات' },
        { name: 'البرازيل', value: '7 مرات في النهائي', icon: '🥇', detail: 'الفائز 5 مرات' },
        { name: 'فرنسا', value: '3 مرات في النهائي', icon: '🥇', detail: 'الفائز مرتان' },
        { name: 'الأرجنتين', value: '3 مرات في النهائي', icon: '🥇', detail: 'الفائز ثلاث مرات' },
      ],
    },
    {
      category: 'أكثر الفرق مشاركة',
      items: [
        { name: 'البرازيل', value: '23 مشاركة', icon: '🌎', detail: 'كل نسخة' },
        { name: 'ألمانيا', value: '20 مشاركة', icon: '🌍', detail: 'أكثر الفرق الأوروبية' },
        { name: 'إيطاليا', value: '18 مشاركة', icon: '🌍', detail: 'ثاني أوروبي' },
        { name: 'فرنسا', value: '16 مشاركة', icon: '🌍', detail: 'فريق قوي' },
        { name: 'إسبانيا', value: '16 مشاركة', icon: '🌍', detail: 'فريق منظم' },
      ],
    },
  ];

  return (
    <div className="space-y-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* رأس القسم */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Calendar size={28} className="text-purple-400" /> الجدول الزمني للبطولة 2026
        </h2>
        <p className="text-white/70 text-base">80 مباراة في 80 يوماً - البطولة الأولى بـ 48 منتخب</p>
      </div>

      {/* الجدول الزمني */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedSection(expandedSection === 'schedule' ? null : 'schedule')}
          className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
        >
          <span className="text-lg font-bold text-purple-300">📅 مراحل البطولة</span>
          {expandedSection === 'schedule' ? (
            <ChevronUp className="text-purple-400" />
          ) : (
            <ChevronDown className="text-purple-400" />
          )}
        </button>

        {expandedSection === 'schedule' && (
          <div className="space-y-2 pl-2">
            {timeline.map((event, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-slate-700/40 to-slate-800/40 border border-slate-600/40 rounded-lg p-3 hover:from-slate-600/40 hover:to-slate-700/40 transition-all"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-3xl">{event.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{event.phaseAr}</h3>
                    <p className="text-white/60 text-sm">{event.phase}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-400">{event.matches}</span>
                    <p className="text-white/50 text-xs">مباراة</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded p-2 mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/70">📅 من:</span>
                    <span className="text-white font-bold">{event.startDate}</span>
                    <span className="text-white/70 mx-2">إلى:</span>
                    <span className="text-white font-bold">{event.endDate}</span>
                  </div>
                </div>

                <p className="text-white/70 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* الاحصائيات التاريخية */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedSection(expandedSection === 'stats' ? null : 'stats')}
          className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
        >
          <span className="text-lg font-bold text-blue-300">📊 احصائيات وسجلات</span>
          {expandedSection === 'stats' ? (
            <ChevronUp className="text-blue-400" />
          ) : (
            <ChevronDown className="text-blue-400" />
          )}
        </button>

        {expandedSection === 'stats' && (
          <div className="space-y-3 pl-2">
            {statistics.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-400/30 rounded-lg p-3"
              >
                <h3 className="text-base font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <BarChart3 size={20} /> {stat.category}
                </h3>
                <div className="space-y-2">
                  {stat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white/5 rounded p-2 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-white font-bold text-sm">{item.name}</p>
                          <p className="text-white/50 text-xs">{item.detail}</p>
                        </div>
                      </div>
                      <span className="text-yellow-400 font-bold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* الفائزون السابقون */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedSection(expandedSection === 'winners' ? null : 'winners')}
          className="w-full bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border border-slate-600/30 rounded-lg p-3 flex items-center justify-between transition-all"
        >
          <span className="text-lg font-bold text-yellow-300">🏆 الفائزون بالبطولات السابقة</span>
          {expandedSection === 'winners' ? (
            <ChevronUp className="text-yellow-400" />
          ) : (
            <ChevronDown className="text-yellow-400" />
          )}
        </button>

        {expandedSection === 'winners' && (
          <div className="space-y-2 pl-2">
            {worldCupWinners.map((winner, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border border-yellow-400/30 rounded-lg p-3 hover:from-yellow-600/30 hover:to-yellow-700/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{winner.image}</span>
                    <div>
                      <p className="text-lg font-bold text-white">{winner.winnerAr}</p>
                      <p className="text-white/60 text-sm">{winner.winner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400">{winner.year}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded p-2 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-white/70 text-xs">🥈 الوصيف</p>
                    <p className="text-white font-bold text-sm">{winner.runnerAr}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">⚽ النتيجة</p>
                    <p className="text-white font-bold text-sm">{winner.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ملخص إحصائي */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
          <TrendingUp size={24} /> ملخص البطولة
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded p-3 text-center border border-green-400/20">
            <p className="text-3xl font-bold text-green-400">48</p>
            <p className="text-white/70 text-sm mt-1">منتخب</p>
          </div>
          <div className="bg-white/5 rounded p-3 text-center border border-green-400/20">
            <p className="text-3xl font-bold text-green-400">12</p>
            <p className="text-white/70 text-sm mt-1">مجموعة</p>
          </div>
          <div className="bg-white/5 rounded p-3 text-center border border-green-400/20">
            <p className="text-3xl font-bold text-green-400">80</p>
            <p className="text-white/70 text-sm mt-1">مباراة</p>
          </div>
          <div className="bg-white/5 rounded p-3 text-center border border-green-400/20">
            <p className="text-3xl font-bold text-green-400">80</p>
            <p className="text-white/70 text-sm mt-1">يوم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
