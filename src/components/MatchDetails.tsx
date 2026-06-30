import { useMemo } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import AsyncDetailedAnalysis from './AsyncDetailedAnalysis';
import ManualNote from './ManualNote';
import { Clock, MapPin, Tv, Globe } from 'lucide-react';

interface MatchDetailsProps {
  match: ProcessedMatch;
  getArabicName: (name: string) => string;
  settings: {
    showPredictions: boolean;
    showLiveOnly: boolean;
  };
}

export default function MatchDetails({ match, getArabicName, settings }: MatchDetailsProps) {
  const matchDate = new Date(match.date);
  const dateStr = matchDate.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = matchDate.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusText =
    match.status === 'live'
      ? `🔴 مباشر • ${match.clock}`
      : match.status === 'finished'
      ? '✅ انتهت المباراة'
      : `⏰ ${match.statusText || 'لم تبدأ بعد'}`;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-b border-white/10 p-4">
        <h3 className="text-sm font-bold text-white">تفاصيل المباراة</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-center text-center">
            <div className="flex flex-col items-center gap-2 min-w-0">
              <img src={match.homeLogo} alt="" className="h-12 w-12 rounded-full" loading="lazy" />
              <span className="text-sm font-semibold truncate">{getArabicName(match.homeTeam)}</span>
            </div>

            <div>
              <div className="text-4xl font-black" style={{ fontFamily: 'Orbitron', direction: 'ltr' }}>
                {match.homeScore} - {match.awayScore}
              </div>
              <div className="text-xs text-white/50 mt-1">{statusText}</div>
            </div>

            <div className="flex flex-col items-center gap-2 min-w-0">
              <img src={match.awayLogo} alt="" className="h-12 w-12 rounded-full" loading="lazy" />
              <span className="text-sm font-semibold truncate">{getArabicName(match.awayTeam)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">تحليل المباراة</h4>
              <p className="text-xs text-white/50">عرض توقعات واحتمالات الفوز.</p>
            </div>
          </div>
          {settings.showPredictions ? (
            <AsyncDetailedAnalysis match={match} />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-4 text-sm text-white/60">
              عرض التنبؤات معطل من الإعدادات.
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-green-400" />
              <span>التوقيت</span>
            </div>
            <p className="text-sm text-white">{dateStr}</p>
            <p className="text-sm text-white/60 mt-1">{timeStr}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-green-400" />
              <span>الملاعب</span>
            </div>
            <p className="text-sm text-white">{match.venue || 'غير متوفر'}</p>
            {match.city && <p className="text-sm text-white/60 mt-1">{match.city}</p>}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <div className="flex items-center gap-2 mb-3">
            <Tv className="h-4 w-4 text-green-400" />
            <span>البث</span>
          </div>
          <p className="text-sm text-white">{match.broadcasts || 'غير متوفر'}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-3 text-sm font-semibold">ملاحظة محرر</h4>
          <ManualNote matchId={match.id} />
        </div>
      </div>
    </div>
  );
}
