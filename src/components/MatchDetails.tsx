import type { ProcessedMatch } from '../services/espnApi';
import analyzeMatch from '../utils/matchAnalysis';
import ManualNote from './ManualNote';
import AsyncDetailedAnalysis from './AsyncDetailedAnalysis';
import { Clock, MapPin, Tv, Globe } from 'lucide-react';

interface MatchDetailsProps {
  match: ProcessedMatch;
  getArabicName: (name: string) => string;
  settings?: { showPredictions?: boolean };
}

export default function MatchDetails({ match, getArabicName, settings }: MatchDetailsProps) {
  const matchDate = new Date(match.date);
  const dateStr = matchDate.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = matchDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-green-500/5 border-b border-white/10 p-3">
        <h3 className="text-white font-bold text-xs" style={{ fontFamily: 'Cairo' }}>📊 تفاصيل المباراة</h3>
      </div>
      <div className="p-3 space-y-3">
        {/* Score */}
        <div className="flex items-center justify-between bg-white/[0.03] rounded-lg p-2.5">
          <div className="flex items-center gap-1.5">
            <img src={match.homeLogo} alt="" loading="lazy" decoding="async" className="w-6 h-6" />
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.homeTeam)}</span>
          </div>
          <span className="text-lg font-black text-white" style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>
            {match.homeScore} - {match.awayScore}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-[11px] font-bold" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.awayTeam)}</span>
            <img src={match.awayLogo} alt="" loading="lazy" decoding="async" className="w-6 h-6" />
          </div>
        </div>
        {/* Analysis */}
        <div className="p-4">
          <h4 className="text-white font-bold text-xs mb-2" style={{ fontFamily: 'Cairo' }}>🧠 تحليل المباراة</h4>
          {settings?.showPredictions === false ? (
            <p className="text-white/30 text-[12px]">عرض التنبؤات معطّل من الإعدادات.</p>
          ) : (
            (() => {
              try {
                  return (
                    <div className="space-y-2">
                      <AsyncDetailedAnalysis match={match} />
                );
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-[11px] text-white/60">احتمالات الفوز</div>
                      <div className="text-white font-bold text-[12px]">{a.homeWinProb}%</div>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-full" style={{ width: `${a.homeWinProb}%` }} />
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 text-[11px] text-white/60">تعادل</div>
                      <div className="text-white font-bold text-[12px]">{a.drawProb}%</div>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="bg-gray-500 h-full" style={{ width: `${a.drawProb}%` }} />
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 text-[11px] text-white/60">فرص فوز الضيف</div>
                      <div className="text-white font-bold text-[12px]">{a.awayWinProb}%</div>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full" style={{ width: `${a.awayWinProb}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/60 mt-2">
                      <div>التنبؤ: <span className="text-white font-bold">{a.prediction}</span></div>
                      <div>ثقة: <span className="text-green-400 font-bold">{a.confidence}%</span></div>
                    </div>

                    {a.keyPlayers.length > 0 && (
                      <div className="mt-2">
                        <div className="text-white/60 text-[11px] mb-1">لاعبون مقترحون للتتبّع</div>
                        <div className="flex gap-2 flex-wrap">
                          {a.keyPlayers.map((p, i) => (
                            <div key={i} className="bg-white/5 text-white/70 px-2 py-1 rounded-lg text-[11px]">{p}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              } catch (e) {
                return <p className="text-white/30 text-[12px]">لا توجد بيانات كافية لتحليل المباراة.</p>;
              }
            })()
          )}
        </div>

        {/* Manual notes (saved in localStorage) */}
        <div className="p-4 border-t border-white/5">
          <h4 className="text-white font-bold text-xs mb-2">✍️ ملاحظة محرّرة</h4>
          <ManualNote matchId={match.id} />
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-[11px] text-white/50">
          <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-green-400 shrink-0" /><span>{dateStr} - {timeStr}</span></div>
          <div className="flex items-center gap-1.5"><Tv className="w-3 h-3 text-green-400 shrink-0" /><span>beIN Sports {match.broadcasts && `(${match.broadcasts})`}</span></div>
          {match.venue && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-green-400 shrink-0" /><span>{match.venue}{match.city ? `, ${match.city}` : ''}</span></div>}
          {match.group && <div className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-green-400 shrink-0" /><span>{match.group}</span></div>}
        </div>

        {/* Status */}
        <div className={`rounded-lg p-2.5 text-center text-xs font-bold ${
          match.status === 'live' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
          match.status === 'finished' ? 'bg-gray-500/10 border border-gray-500/30 text-gray-400' :
          'bg-blue-500/10 border border-blue-500/30 text-blue-400'
        }`} style={{ fontFamily: 'Cairo' }}>
          {match.status === 'live' ? `🔴 مباشر - ${match.clock}` :
           match.status === 'finished' ? '✅ انتهت المباراة' :
           `⏰ ${match.statusText}`}
        </div>
      </div>
    </div>
  );
}
