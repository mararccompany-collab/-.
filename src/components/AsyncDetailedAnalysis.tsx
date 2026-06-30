import { useState, useEffect } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import type { MatchAnalysis } from '../utils/matchAnalysis';
import { enhancedAnalyzeMatch } from '../utils/matchAnalysis';
import analyzeMatch from '../utils/matchAnalysis';

interface Props { match: ProcessedMatch; }

export default function AsyncDetailedAnalysis({ match }: Props) {
  const base = analyzeMatch(match);
  const [a, setA] = useState<MatchAnalysis | null>(base);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    enhancedAnalyzeMatch(match).then(res => { if (mounted) setA(res); }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [match]);

  if (!a) return null;

  return (
    <div className="space-y-2">
      <p className="text-white/40 text-[12px]">{a.summary} {loading && <span className="text-white/30 text-xs">(تحديث خارجي...)</span>}</p>

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
}
