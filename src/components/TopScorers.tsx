import { useState, useEffect } from 'react';
import { fetchTopScorers, type TopScorer } from '../services/espnApi';

const teamAr: Record<string, string> = {
  'Argentina':'الأرجنتين','Mexico':'المكسيك','Brazil':'البرازيل','Germany':'ألمانيا',
  'Spain':'إسبانيا','France':'فرنسا','Netherlands':'هولندا','Japan':'اليابان',
  'Canada':'كندا','England':'إنجلترا','Egypt':'مصر','Morocco':'المغرب',
  'Norway':'النرويج','South Korea':'كوريا الجنوبية','Austria':'النمسا',
  'Senegal':'السنغال','Colombia':'كولومبيا','Portugal':'البرتغال',
  'Turkey':'تركيا','Saudi Arabia':'السعودية','Uruguay':'أوروغواي',
};

export default function TopScorers() {
  const [scorers, setScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopScorers().then(s => { setScorers(s); setLoading(false); });
  }, []);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-yellow-500/5 border-b border-white/10 p-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-[11px]" style={{ fontFamily: 'Cairo' }}>🏅 هدافي البطولة</h3>
        <span className="text-white/30 text-[9px]">ESPN حقيقي</span>
      </div>
      <div className="p-2">
        {loading ? (
          <p className="text-white/30 text-[10px] text-center py-4" style={{ fontFamily: 'Cairo' }}>جاري التحميل...</p>
        ) : scorers.length === 0 ? (
          <p className="text-white/30 text-[10px] text-center py-4" style={{ fontFamily: 'Cairo' }}>لا توجد بيانات</p>
        ) : (
          <div className="space-y-1">
            {scorers.map((s, i) => (
              <div key={s.name} className={`flex items-center gap-2 p-1.5 rounded-lg ${i < 3 ? 'bg-yellow-500/5' : ''}`}>
                <span className={`text-[11px] font-black w-5 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-white/30'}`}
                  style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>{i + 1}</span>
                <img src={s.teamLogo} alt="" loading="lazy" decoding="async" className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[10px] font-bold truncate">{s.name}</p>
                  <p className="text-white/30 text-[8px]">{teamAr[s.team] || s.team}</p>
                </div>
                <span className="text-green-400 text-xs font-black" style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>
                  {s.goals} ⚽
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
