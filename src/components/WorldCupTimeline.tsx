import { useState } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import Countdown from './Countdown';

interface Props {
  matches: ProcessedMatch[];
  getArabicName: (name: string) => string;
}

interface MatchEntry {
  teams: string;
  stadium?: string;
  result?: string;
  highlight?: boolean;
}

interface DayEntry {
  day: number;
  date: string;
  label: string;
  stage: 'group' | 'round16' | 'quarter' | 'semi' | 'final';
  matches: MatchEntry[];
}

const allMatches: DayEntry[] = [
  // === GROUP A ===
  { day: 1, date: '2022-11-20', label: 'الأحد 20 نوفمبر - الافتتاح', stage: 'group', matches: [
    { teams: 'قطر × الإكوادور', stadium: 'ملعب البيت', result: '0-2', highlight: true },
  ]},
  { day: 2, date: '2022-11-21', label: 'الإثنين 21 نوفمبر', stage: 'group', matches: [
    { teams: 'إنجلترا × إيران', stadium: 'ملعب خليفة الدولي', result: '6-2' },
    { teams: 'السنغال × هولندا', stadium: 'استاد الثمامة', result: '0-2' },
    { teams: 'الولايات المتحدة × ويلز', stadium: 'استاد أحمد بن علي', result: '1-1' },
  ]},
  { day: 3, date: '2022-11-22', label: 'الثلاثاء 22 نوفمبر', stage: 'group', matches: [
    { teams: 'الأرجنتين × السعودية', stadium: 'ملعب لوسيل', result: '1-2', highlight: true },
    { teams: 'الدنمارك × تونس', stadium: 'المدينة التعليمية', result: '0-0' },
    { teams: 'المكسيك × بولندا', stadium: 'استاد 974', result: '0-0' },
    { teams: 'فرنسا × أستراليا', stadium: 'ملعب الجنوب', result: '4-1' },
  ]},
  { day: 4, date: '2022-11-23', label: 'الأربعاء 23 نوفمبر', stage: 'group', matches: [
    { teams: 'المغرب × كرواتيا', stadium: 'ملعب البيت', result: '0-0' },
    { teams: 'ألمانيا × اليابان', stadium: 'خليفة الدولي', result: '1-2', highlight: true },
    { teams: 'إسبانيا × كوستاريكا', stadium: 'استاد الثمامة', result: '7-0', highlight: true },
    { teams: 'بلجيكا × كندا', stadium: 'أحمد بن علي', result: '1-0' },
  ]},
  { day: 5, date: '2022-11-24', label: 'الخميس 24 نوفمبر', stage: 'group', matches: [
    { teams: 'سويسرا × الكاميرون', stadium: 'ملعب الجنوب', result: '1-0' },
    { teams: 'الأوروغواي × كوريا الجنوبية', stadium: 'المدينة التعليمية', result: '0-0' },
    { teams: 'البرتغال × غانا', stadium: 'استاد 974', result: '3-2' },
    { teams: 'البرازيل × صربيا', stadium: 'ملعب لوسيل', result: '2-0' },
  ]},
  { day: 6, date: '2022-11-25', label: 'الجمعة 25 نوفمبر', stage: 'group', matches: [
    { teams: 'ويلز × إيران', stadium: 'أحمد بن علي', result: '0-2' },
    { teams: 'قطر × السنغال', stadium: 'استاد الثمامة', result: '1-3' },
    { teams: 'هولندا × الإكوادور', stadium: 'خليفة الدولي', result: '1-1' },
    { teams: 'إنجلترا × الولايات المتحدة', stadium: 'ملعب البيت', result: '0-0' },
  ]},
  { day: 7, date: '2022-11-26', label: 'السبت 26 نوفمبر', stage: 'group', matches: [
    { teams: 'تونس × أستراليا', stadium: 'ملعب الجنوب', result: '0-1' },
    { teams: 'بولندا × السعودية', stadium: 'المدينة التعليمية', result: '2-0' },
    { teams: 'فرنسا × الدنمارك', stadium: 'استاد 974', result: '2-1' },
    { teams: 'الأرجنتين × المكسيك', stadium: 'ملعب لوسيل', result: '2-0' },
  ]},
  // === GROUP E & F ===
  { day: 8, date: '2022-11-27', label: 'الأحد 27 نوفمبر', stage: 'group', matches: [
    { teams: 'اليابان × كوستاريكا', stadium: 'أحمد بن علي', result: '0-1' },
    { teams: 'بلجيكا × المغرب', stadium: 'استاد الثمامة', result: '0-2', highlight: true },
    { teams: 'كرواتيا × كندا', stadium: 'خليفة الدولي', result: '4-1' },
    { teams: 'إسبانيا × ألمانيا', stadium: 'ملعب البيت', result: '1-1' },
  ]},
  { day: 9, date: '2022-11-28', label: 'الإثنين 28 نوفمبر', stage: 'group', matches: [
    { teams: 'الكاميرون × صربيا', stadium: 'ملعب الجنوب', result: '3-3' },
    { teams: 'كوريا الجنوبية × غانا', stadium: 'المدينة التعليمية', result: '2-3' },
    { teams: 'البرازيل × سويسرا', stadium: 'استاد 974', result: '1-0' },
    { teams: 'البرتغال × الأوروغواي', stadium: 'ملعب لوسيل', result: '2-0' },
  ]},
  // === GROUP A & B final round ===
  { day: 10, date: '2022-11-29', label: 'الثلاثاء 29 نوفمبر', stage: 'group', matches: [
    { teams: 'الإكوادور × السنغال', stadium: 'خليفة الدولي', result: '1-2' },
    { teams: 'هولندا × قطر', stadium: 'ملعب البيت', result: '2-0' },
    { teams: 'إيران × الولايات المتحدة', stadium: 'استاد الثمامة', result: '0-1' },
    { teams: 'ويلز × إنجلترا', stadium: 'أحمد بن علي', result: '0-3' },
  ]},
  // === GROUP C & D final round ===
  { day: 11, date: '2022-11-30', label: 'الأربعاء 30 نوفمبر', stage: 'group', matches: [
    { teams: 'تونس × فرنسا', stadium: 'المدينة التعليمية', result: '1-0' },
    { teams: 'أستراليا × الدنمارك', stadium: 'ملعب الجنوب', result: '1-0' },
    { teams: 'بولندا × الأرجنتين', stadium: 'استاد 974', result: '0-2' },
    { teams: 'السعودية × المكسيك', stadium: 'ملعب لوسيل', result: '1-2' },
  ]},
  // === GROUP E & F final round ===
  { day: 12, date: '2022-12-01', label: 'الخميس 1 ديسمبر', stage: 'group', matches: [
    { teams: 'كرواتيا × بلجيكا', stadium: 'أحمد بن علي', result: '0-0' },
    { teams: 'كندا × المغرب', stadium: 'استاد الثمامة', result: '1-2' },
    { teams: 'اليابان × إسبانيا', stadium: 'خليفة الدولي', result: '2-1', highlight: true },
    { teams: 'كوستاريكا × ألمانيا', stadium: 'ملعب البيت', result: '2-4' },
  ]},
  // === GROUP G & H final round ===
  { day: 13, date: '2022-12-02', label: 'الجمعة 2 ديسمبر', stage: 'group', matches: [
    { teams: 'كوريا الجنوبية × البرتغال', stadium: 'المدينة التعليمية', result: '2-1', highlight: true },
    { teams: 'غانا × الأوروغواي', stadium: 'ملعب الجنوب', result: '0-2' },
    { teams: 'صربيا × سويسرا', stadium: 'استاد 974', result: '2-3' },
    { teams: 'الكاميرون × البرازيل', stadium: 'ملعب لوسيل', result: '1-0' },
  ]},
  // === ROUND OF 16 ===
  { day: 14, date: '2022-12-03', label: 'السبت 3 ديسمبر - دور الـ16', stage: 'round16', matches: [
    { teams: 'هولندا × الولايات المتحدة', stadium: 'خليفة الدولي', result: '3-1', highlight: true },
    { teams: 'الأرجنتين × أستراليا', stadium: 'أحمد بن علي', result: '2-1' },
  ]},
  { day: 15, date: '2022-12-04', label: 'الأحد 4 ديسمبر - دور الـ16', stage: 'round16', matches: [
    { teams: 'فرنسا × بولندا', stadium: 'استاد الثمامة', result: '3-1' },
    { teams: 'إنجلترا × السنغال', stadium: 'ملعب البيت', result: '3-0' },
  ]},
  { day: 16, date: '2022-12-05', label: 'الإثنين 5 ديسمبر - دور الـ16', stage: 'round16', matches: [
    { teams: 'اليابان × كرواتيا', stadium: 'ملعب الجنوب', result: '1-1 (1-3 p)' },
    { teams: 'البرازيل × كوريا الجنوبية', stadium: 'استاد 974', result: '4-1' },
  ]},
  { day: 17, date: '2022-12-06', label: 'الثلاثاء 6 ديسمبر - دور الـ16', stage: 'round16', matches: [
    { teams: 'المغرب × إسبانيا', stadium: 'المدينة التعليمية', result: '0-0 (3-0 p)', highlight: true },
    { teams: 'البرتغال × سويسرا', stadium: 'ملعب لوسيل', result: '6-1' },
  ]},
  // === QUARTERFINALS ===
  { day: 18, date: '2022-12-09', label: 'الجمعة 9 ديسمبر - ربع النهائي', stage: 'quarter', matches: [
    { teams: 'كرواتيا × البرازيل', stadium: 'المدينة التعليمية', result: '1-1 (4-2 p)', highlight: true },
    { teams: 'هولندا × الأرجنتين', stadium: 'ملعب لوسيل', result: '2-2 (3-4 p)', highlight: true },
  ]},
  { day: 19, date: '2022-12-10', label: 'السبت 10 ديسمبر - ربع النهائي', stage: 'quarter', matches: [
    { teams: 'المغرب × البرتغال', stadium: 'استاد الثمامة', result: '1-0', highlight: true },
    { teams: 'إنجلترا × فرنسا', stadium: 'ملعب البيت', result: '1-2' },
  ]},
  // === SEMIFINALS ===
  { day: 20, date: '2022-12-13', label: 'الثلاثاء 13 ديسمبر - نصف النهائي', stage: 'semi', matches: [
    { teams: 'الأرجنتين × كرواتيا', stadium: 'ملعب لوسيل', result: '3-0', highlight: true },
  ]},
  { day: 21, date: '2022-12-14', label: 'الأربعاء 14 ديسمبر - نصف النهائي', stage: 'semi', matches: [
    { teams: 'فرنسا × المغرب', stadium: 'ملعب البيت', result: '2-0', highlight: true },
  ]},
  // === THIRD PLACE & FINAL ===
  { day: 22, date: '2022-12-17', label: 'السبت 17 ديسمبر - تحديد المركز الثالث', stage: 'final', matches: [
    { teams: 'كرواتيا × المغرب', stadium: 'خليفة الدولي', result: '2-1' },
  ]},
  { day: 23, date: '2022-12-18', label: 'الأحد 18 ديسمبر - 🏆 النهائي', stage: 'final', matches: [
    { teams: 'الأرجنتين × فرنسا', stadium: 'ملعب لوسيل', result: '3-3 (4-2 p)', highlight: true },
  ]},
];

export default function WorldCupTimeline({ matches, getArabicName }: Props) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [view, setView] = useState<'static' | 'live'>('static');

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setView('static')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            view === 'static' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Cairo' }}
        >
          📅 جدول البطولة الكامل
        </button>
        <button onClick={() => setView('live')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            view === 'live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Cairo' }}
        >
          🔴 المباريات المتاحة
        </button>
      </div>

      {view === 'live' && (
        <div className="flex flex-col gap-3">
          {matches.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm" style={{ fontFamily: 'Cairo' }}>لا توجد مباريات متاحة حالياً</div>
          ) : matches.map(match => (
            <div key={match.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/30">{match.group}</span>
                {match.status === 'live' && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">🔴 {match.clock}</span>}
                {match.status === 'upcoming' && <span className="text-blue-400 text-[10px] font-bold"><Countdown targetDate={match.date} /></span>}
                {match.status === 'finished' && <span className="text-gray-400 text-[10px] font-bold">✅ انتهت</span>}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img src={match.homeLogo} alt="" className="w-6 h-6 shrink-0" />
                  <span className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.homeTeam)}</span>
                </div>
                <span className={`text-sm font-black shrink-0 ${match.status === 'upcoming' ? 'text-white/30' : 'text-white'}`} style={{ fontFamily: 'Orbitron' }}>
                  {match.status === 'upcoming' ? 'VS' : `${match.homeScore}-${match.awayScore}`}
                </span>
                <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                  <span className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.awayTeam)}</span>
                  <img src={match.awayLogo} alt="" className="w-6 h-6 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'static' && (
        <div>
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'مباراة', count: 64, color: 'text-white' },
              { label: 'هدف', count: 172, color: 'text-yellow-400' },
              { label: 'منتخب', count: 32, color: 'text-green-400' },
              { label: 'ملعب', count: 8, color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 text-center">
                <span className={`text-lg font-black block ${s.color}`} style={{ fontFamily: 'Orbitron' }}>{s.count}</span>
                <span className="text-white/40 text-[10px]" style={{ fontFamily: 'Cairo' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {allMatches.map(day => {
            const isExpanded = expandedDay === day.day;
            const isKO = day.stage !== 'group';
            return (
              <div key={day.day} className={`mb-2 rounded-xl border transition-all duration-300 ${
                day.stage === 'final' ? 'border-yellow-500/40 bg-gradient-to-l from-yellow-500/10 to-transparent' :
                day.stage === 'semi' ? 'border-amber-500/30 bg-amber-500/5' :
                day.stage === 'quarter' ? 'border-purple-500/20 bg-purple-500/5' :
                day.stage === 'round16' ? 'border-blue-500/20 bg-blue-500/5' :
                'border-white/5 bg-white/[0.02]'
              }`}>
                <button onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                  className="w-full text-right p-3 flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    day.stage === 'final' ? 'bg-yellow-500/20' : 'bg-white/5'
                  }`}>
                    <span className={`text-sm font-black ${day.stage === 'final' ? 'text-yellow-400' : 'text-white/40'}`} style={{ fontFamily: 'Orbitron' }}>{day.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-bold block leading-tight ${day.stage === 'final' ? 'text-yellow-400' : 'text-white'}`} style={{ fontFamily: 'Cairo' }}>{day.label}</span>
                    <span className="text-[10px] text-white/30">{day.date}</span>
                  </div>
                  <div className="text-left shrink-0">
                    <span className="text-[10px] text-white/30 block">{day.matches.length} مباراة</span>
                  </div>
                  <span className={`text-white/30 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3">
                    <div className="border-t border-white/5 pt-2 flex flex-col gap-2">
                      {day.matches.map((m, i) => (
                        <div key={i} className={`rounded-lg px-4 py-2.5 flex items-center justify-between ${
                          m.highlight ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/[0.03] border border-white/5'
                        }`}>
                          <span className="text-sm font-bold text-white/90" style={{ fontFamily: 'Cairo' }}>{m.teams}</span>
                          <div className="flex items-center gap-3">
                            {m.stadium && <span className="text-[10px] text-white/30 hidden md:inline">{m.stadium}</span>}
                            {m.result && (
                              <span className={`text-sm font-black ${m.highlight ? 'text-yellow-400' : 'text-white/60'}`} style={{ fontFamily: 'Orbitron' }}>{m.result}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
