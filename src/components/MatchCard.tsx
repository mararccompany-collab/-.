import type { ProcessedMatch } from '../services/espnApi';
import Countdown from './Countdown';

interface MatchCardProps {
  match: ProcessedMatch;
  onSelect: (match: ProcessedMatch) => void;
  isSelected: boolean;
  getArabicName: (name: string) => string;
}

export default function MatchCard({ match, onSelect, isSelected, getArabicName }: MatchCardProps) {
  const statusEl = match.status === 'live' ? (
    <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
      <span className="w-1 h-1 bg-white rounded-full" />{match.clock}
    </span>
  ) : match.status === 'upcoming' ? (
    <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
      <Countdown targetDate={match.date} />
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-gray-500/20 text-gray-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
      ✅ انتهت
    </span>
  );

  const bottomEl = match.status === 'live' ? (
    <span className="inline-flex items-center gap-0.5 text-green-400 text-[9px] font-bold">▶ شاهد</span>
  ) : match.status === 'finished' && match.events.length > 0 ? (
    <span className="text-white/25 text-[9px]">⚽ {match.events.filter(e => e.type.toLowerCase().includes('goal')).length} أهداف</span>
  ) : match.status === 'upcoming' && match.venue ? (
    <span className="text-white/20 text-[9px] truncate max-w-[100px]">📍 {match.venue}</span>
  ) : null;

  return (
    <button
      onClick={() => onSelect(match)}
      className={`w-full text-right rounded-xl cursor-pointer ${
        isSelected
          ? 'bg-green-500/15 border-2 border-green-500/50'
          : 'bg-white/[0.04] border border-white/10 active:bg-white/10'
      }`}
    >
      <div className="p-2.5" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gridTemplateRows: 'auto auto auto', gap: '6px 4px', alignItems: 'center' }}>
        {/* Row 1: League */}
        <span className="text-[10px] text-white/40 font-semibold truncate col-span-3" style={{ fontFamily: 'Cairo' }}>
          🏆 {match.group || 'كأس العالم'}
        </span>

        {/* Row 2: Home team */}
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0 justify-start">
          <img src={match.homeLogo} alt="" className="w-5 h-5 shrink-0" />
          <span className="text-white text-[11px] font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.homeTeam)}</span>
        </div>

        {/* Row 2: Score */}
        <div className="text-center shrink-0">
          {match.status === 'upcoming' ? (
            <span className="text-white/30 text-[10px]">VS</span>
          ) : (
            <span className={`text-sm font-black ${match.status === 'live' ? 'text-white' : 'text-white/60'}`} style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>
              {match.homeScore}-{match.awayScore}
            </span>
          )}
        </div>

        {/* Row 2: Away team */}
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0 justify-end">
          <span className="text-white text-[11px] font-bold truncate" style={{ fontFamily: 'Cairo' }}>{getArabicName(match.awayTeam)}</span>
          <img src={match.awayLogo} alt="" className="w-5 h-5 shrink-0" />
        </div>

        {/* Row 3: Info */}
        <div className="flex items-center gap-2 col-span-3 pt-1.5 border-t border-white/5 mt-0.5">
          <span className="text-[9px] text-white/30">📺 beIN Sports</span>
          <div className="mr-auto">{statusEl}</div>
          {bottomEl}
        </div>
      </div>
    </button>
  );
}
