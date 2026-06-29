import { Play, Clock, CheckCircle } from 'lucide-react';
import type { ProcessedMatch } from '../services/espnApi';
import Countdown from './Countdown';

interface MatchCardProps {
  match: ProcessedMatch;
  onSelect: (match: ProcessedMatch) => void;
  isSelected: boolean;
  getArabicName: (name: string) => string;
}

export default function MatchCard({ match, onSelect, isSelected, getArabicName }: MatchCardProps) {
  return (
    <button
      onClick={() => onSelect(match)}
      className={`w-full text-right rounded-xl cursor-pointer ${
        isSelected
          ? 'bg-green-500/15 border-2 border-green-500/50'
          : 'bg-white/[0.04] border border-white/10 active:bg-white/10'
      }`}
    >
      <div className="p-3">
        {/* League & Status */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/40 font-semibold" style={{ fontFamily: 'Cairo' }}>
            🏆 {match.group || 'كأس العالم'}
          </span>
          {match.status === 'live' && (
            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              <span className="w-1 h-1 bg-white rounded-full" />
              {match.clock}
            </span>
          )}
          {match.status === 'upcoming' && (
            <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              <Countdown targetDate={match.date} />
            </span>
          )}
          {match.status === 'finished' && (
            <span className="inline-flex items-center gap-1 bg-gray-500/20 text-gray-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              <CheckCircle className="w-2.5 h-2.5" />
              انتهت
            </span>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between flex-nowrap gap-1">
          <div className="flex items-center gap-1.5 overflow-hidden min-w-0 flex-1">
            <img src={match.homeLogo} alt="" className="w-5 h-5 shrink-0" />
            <span className="text-white text-[11px] font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.homeTeam)}</span>
          </div>
          <div className="px-1 shrink-0">
            {match.status === 'upcoming' ? (
              <span className="text-white/30 text-[10px]">VS</span>
            ) : (
              <span className={`text-sm font-black ${match.status === 'live' ? 'text-white' : 'text-white/60'}`} style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>
                {match.homeScore}-{match.awayScore}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-hidden min-w-0 flex-1 justify-end">
            <span className="text-white text-[11px] font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.awayTeam)}</span>
            <img src={match.awayLogo} alt="" className="w-5 h-5 shrink-0" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
          <span className="text-[9px] text-white/30">📺 beIN Sports</span>
          {match.status === 'live' && (
            <span className="inline-flex items-center gap-0.5 text-green-400 text-[9px] font-bold">
              <Play className="w-2.5 h-2.5" fill="currentColor" />شاهد
            </span>
          )}
          {match.status === 'finished' && match.events.length > 0 && (
            <span className="text-white/25 text-[9px]">⚽ {match.events.filter(e => e.type.toLowerCase().includes('goal')).length} أهداف</span>
          )}
          {match.status === 'upcoming' && match.venue && (
            <span className="text-white/20 text-[9px] truncate max-w-[100px]">📍 {match.venue}</span>
          )}
        </div>
      </div>
    </button>
  );
}
