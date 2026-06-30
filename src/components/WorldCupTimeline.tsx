import { useState, useMemo } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import Countdown from './Countdown';

interface Props {
  matches: ProcessedMatch[];
  getArabicName: (name: string) => string;
}

// Static match schedule for World Cup 2022 (group stage)
const worldCupSchedule = [
  { day: 1, date: '2022-11-20', label: 'الأحد 20 نوفمبر', matches: ['Qatar vs Ecuador'] },
  { day: 2, date: '2022-11-21', label: 'الإثنين 21 نوفمبر', matches: ['England vs Iran', 'Senegal vs Netherlands', 'USA vs Wales'] },
  { day: 3, date: '2022-11-22', label: 'الثلاثاء 22 نوفمبر', matches: ['Argentina vs Saudi Arabia', 'Denmark vs Tunisia', 'Mexico vs Poland', 'France vs Australia'] },
  { day: 4, date: '2022-11-23', label: 'الأربعاء 23 نوفمبر', matches: ['Morocco vs Croatia', 'Germany vs Japan', 'Spain vs Costa Rica', 'Belgium vs Canada'] },
  { day: 5, date: '2022-11-24', label: 'الخميس 24 نوفمبر', matches: ['Switzerland vs Cameroon', 'Uruguay vs South Korea', 'Portugal vs Ghana', 'Brazil vs Serbia'] },
  { day: 6, date: '2022-11-25', label: 'الجمعة 25 نوفمبر', matches: ['Wales vs Iran', 'Qatar vs Senegal', 'Netherlands vs Ecuador', 'England vs USA'] },
  { day: 7, date: '2022-11-26', label: 'السبت 26 نوفمبر', matches: ['Tunisia vs Australia', 'Poland vs Saudi Arabia', 'France vs Denmark', 'Argentina vs Mexico'] },
  { day: 8, date: '2022-11-27', label: 'الأحد 27 نوفمبر', matches: ['Japan vs Costa Rica', 'Belgium vs Morocco', 'Croatia vs Canada', 'Spain vs Germany'] },
  { day: 9, date: '2022-11-28', label: 'الإثنين 28 نوفمبر', matches: ['Cameroon vs Serbia', 'South Korea vs Ghana', 'Brazil vs Switzerland', 'Portugal vs Uruguay'] },
  { day: 10, date: '2022-11-29', label: 'الثلاثاء 29 نوفمبر', matches: ['Ecuador vs Senegal', 'Netherlands vs Qatar', 'Iran vs USA', 'Wales vs England'] },
  { day: 11, date: '2022-11-30', label: 'الأربعاء 30 نوفمبر', matches: ['Tunisia vs France', 'Australia vs Denmark', 'Poland vs Argentina', 'Saudi Arabia vs Mexico'] },
  { day: 12, date: '2022-12-01', label: 'الخميس 1 ديسمبر', matches: ['Croatia vs Belgium', 'Canada vs Morocco', 'Japan vs Spain', 'Costa Rica vs Germany'] },
  { day: 13, date: '2022-12-02', label: 'الجمعة 2 ديسمبر', matches: ['South Korea vs Portugal', 'Ghana vs Uruguay', 'Serbia vs Switzerland', 'Cameroon vs Brazil'] },
  { day: 14, date: '2022-12-03', label: 'السبت 3 ديسمبر', matches: ['Round of 16: Match 1', 'Round of 16: Match 2'] },
  { day: 15, date: '2022-12-04', label: 'الأحد 4 ديسمبر', matches: ['Round of 16: Match 3', 'Round of 16: Match 4'] },
  { day: 16, date: '2022-12-05', label: 'الإثنين 5 ديسمبر', matches: ['Round of 16: Match 5', 'Round of 16: Match 6'] },
  { day: 17, date: '2022-12-06', label: 'الثلاثاء 6 ديسمبر', matches: ['Round of 16: Match 7', 'Round of 16: Match 8'] },
  { day: 18, date: '2022-12-09', label: 'الجمعة 9 ديسمبر', matches: ['Quarterfinal: Match 1', 'Quarterfinal: Match 2'] },
  { day: 19, date: '2022-12-10', label: 'السبت 10 ديسمبر', matches: ['Quarterfinal: Match 3', 'Quarterfinal: Match 4'] },
  { day: 20, date: '2022-12-13', label: 'الثلاثاء 13 ديسمبر', matches: ['Semifinal: Match 1'] },
  { day: 21, date: '2022-12-14', label: 'الأربعاء 14 ديسمبر', matches: ['Semifinal: Match 2'] },
  { day: 22, date: '2022-12-17', label: 'السبت 17 ديسمبر', matches: ['Third Place Playoff'] },
  { day: 23, date: '2022-12-18', label: 'الأحد 18 ديسمبر', matches: ['🏆 FINAL'] },
];

export default function WorldCupTimeline({ matches, getArabicName }: Props) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [view, setView] = useState<'static' | 'live'>('static');

  if (matches.length === 0 && view === 'live') {
    return (
      <div className="text-center py-8">
        <span className="text-white/30 text-sm" style={{ fontFamily: 'Cairo' }}>لا توجد مباريات متاحة حالياً</span>
      </div>
    );
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView('static')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            view === 'static' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Cairo' }}
        >
          📅 جدول البطولة
        </button>
        <button onClick={() => setView('live')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            view === 'live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
          style={{ fontFamily: 'Cairo' }}
        >
          🔴 المباريات المتاحة
        </button>
      </div>

      {/* Live matches from API */}
      {view === 'live' && (
        <div className="flex flex-col gap-2">
          {matches.map(match => (
            <div key={match.id}
              className="bg-white/[0.04] border border-white/10 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-white/30">{match.group}</span>
                {match.status === 'live' && (
                  <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">🔴 {match.clock}</span>
                )}
                {match.status === 'upcoming' && (
                  <span className="text-blue-400 text-[8px] font-bold"><Countdown targetDate={match.date} /></span>
                )}
                {match.status === 'finished' && (
                  <span className="text-gray-400 text-[8px] font-bold">✅ انتهت</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <img src={match.homeLogo} alt="" className="w-5 h-5" />
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.homeTeam)}</span>
                </div>
                <span className={`text-xs font-black ${match.status === 'upcoming' ? 'text-white/30' : 'text-white'}`} style={{ fontFamily: 'Orbitron' }}>
                  {match.status === 'upcoming' ? 'VS' : `${match.homeScore}-${match.awayScore}`}
                </span>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.awayTeam)}</span>
                  <img src={match.awayLogo} alt="" className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Static World Cup schedule */}
      {view === 'static' && (
        <div>
          {worldCupSchedule.map(day => {
            const isExpanded = expandedDay === day.day;
            const isFinal = day.matches[0]?.includes('🏆');
            const isKO = day.matches[0]?.includes('Round') || day.matches[0]?.includes('Quarter') || day.matches[0]?.includes('Semi') || day.matches[0]?.includes('Third');
            return (
              <div key={day.day}
                className={`mb-2 rounded-xl border transition-all duration-300 ${
                  isFinal
                    ? 'border-yellow-500/40 bg-gradient-to-l from-yellow-500/10 to-transparent'
                    : isKO
                      ? 'border-amber-500/20 bg-amber-500/5'
                      : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                  className="w-full text-right p-3 flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isFinal ? 'bg-yellow-500/20' : 'bg-white/5'
                  }`}>
                    <span className={`text-xs font-black ${isFinal ? 'text-yellow-400' : 'text-white/40'}`} style={{ fontFamily: 'Orbitron' }}>{day.day}</span>
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-bold block ${isFinal ? 'text-yellow-400' : 'text-white'}`} style={{ fontFamily: 'Cairo' }}>{day.label}</span>
                    <span className="text-[9px] text-white/30">{day.date}</span>
                  </div>
                  <span className={`text-white/30 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3">
                    <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5">
                      {day.matches.map((m, i) => (
                        <div key={i} className={`rounded-lg px-3 py-2 text-xs font-bold ${
                          isFinal ? 'bg-yellow-500/10 text-yellow-300' : 'bg-white/[0.03] text-white/80'
                        }`} style={{ fontFamily: 'Cairo' }}>
                          {m}
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
