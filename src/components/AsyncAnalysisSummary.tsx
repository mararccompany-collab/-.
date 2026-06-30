import { useState, useEffect } from 'react';
import type { ProcessedMatch } from '../services/espnApi';
import type { MatchAnalysis } from '../utils/matchAnalysis';
import { enhancedAnalyzeMatch } from '../utils/matchAnalysis';

interface Props { match: ProcessedMatch; base: MatchAnalysis }

export default function AsyncAnalysisSummary({ match, base }: Props) {
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
    <div className="flex items-center justify-between">
      <div className="text-white/60 text-[12px]">تنبؤ سريع:</div>
      <div className="text-white font-bold text-[12px]">{a.prediction} • ثقة {a.confidence}% {loading && <span className="text-white/40 text-[10px] mr-2">(جاري تحديث)</span>}</div>
    </div>
  );
}
