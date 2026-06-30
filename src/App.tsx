import { useEffect, useState } from 'react';
import Header from './components/Header';
import MatchCard from './components/MatchCard';
import MatchDetails from './components/MatchDetails';
import FeaturesPanel from './components/FeaturesPanel';
import AnalysesPage from './components/AnalysesPage';
import { fetchTodayMatches, type ProcessedMatch } from './services/espnApi';

const teamNameAr: Record<string, string> = {
  Mexico: 'المكسيك',
  'South Africa': 'جنوب أفريقيا',
  'South Korea': 'كوريا الجنوبية',
  'United States': 'الولايات المتحدة',
  USA: 'أمريكا',
  Australia: 'أستراليا',
  Canada: 'كندا',
  Brazil: 'البرازيل',
  Morocco: 'المغرب',
  France: 'فرنسا',
  Argentina: 'الأرجنتين',
  England: 'إنجلترا',
  Spain: 'إسبانيا',
  Germany: 'ألمانيا',
  Portugal: 'البرتغال',
  Japan: 'اليابان',
  Iran: 'إيران',
  'Saudi Arabia': 'السعودية',
  Egypt: 'مصر',
  Netherlands: 'هولندا',
  Belgium: 'بلجيكا',
  Denmark: 'الدانمارك',
  Croatia: 'كرواتيا',
};

function getArabicName(name: string) {
  return teamNameAr[name] || name;
}

interface AppSettings {
  showPredictions: boolean;
  showLiveOnly: boolean;
}

export default function App() {
  const [matches, setMatches] = useState<ProcessedMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<ProcessedMatch | null>(null);
  const [showAnalyses, setShowAnalyses] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>({ showPredictions: true, showLiveOnly: false });

  useEffect(() => {
    const stored = localStorage.getItem('app_settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        // ignore invalid stored data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    async function loadMatches() {
      try {
        setError(null);
        setLoading(true);
        const todayMatches = await fetchTodayMatches();
        const filtered = settings.showLiveOnly ? todayMatches.filter((match) => match.status === 'live') : todayMatches;
        setMatches(filtered);
        setSelectedMatch((current) => {
          if (filtered.length === 0) return null;
          if (current && filtered.some((match) => match.id === current.id)) return current;
          return filtered[0];
        });
      } catch {
        setError('فشل تحميل المباريات. حاول مرة أخرى لاحقا.');
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [settings.showLiveOnly]);

  const handleSettingsChange = (next: AppSettings) => setSettings(next);

  if (showAnalyses) {
    return (
      <div className="min-h-screen bg-[#070a14] text-white">
        <Header onOpenAnalyses={() => setShowAnalyses(true)} onOpenSettings={() => setShowSettings(true)} />
        <main className="container mx-auto px-4 py-6">
          <button
            type="button"
            onClick={() => setShowAnalyses(false)}
            className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold"
          >
            العودة إلى الصفحة الرئيسية
          </button>
          <AnalysesPage matches={matches} getArabicName={getArabicName} />
        </main>
        <FeaturesPanel isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} onChange={handleSettingsChange} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a14] text-white">
      <Header onOpenAnalyses={() => setShowAnalyses(true)} onOpenSettings={() => setShowSettings(true)} />
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-lg font-semibold">مباريات اليوم</h2>
              <p className="mt-2 text-sm text-white/60">اختر مباراة لعرض التفاصيل والتحليل الفوري.</p>
            </div>
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">جاري التحميل...</div>
            ) : error ? (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-100">{error}</div>
            ) : matches.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/60">لا توجد مباريات متاحة حاليا.</div>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    isSelected={selectedMatch?.id === match.id}
                    onSelect={setSelectedMatch}
                    getArabicName={getArabicName}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-4">
            {selectedMatch ? (
              <MatchDetails match={selectedMatch} getArabicName={getArabicName} settings={settings} />
            ) : (
              <div className="py-20 text-center text-white/60">اختر مباراة من القائمة لعرض التفاصيل.</div>
            )}
          </section>
        </div>
      </main>
      <FeaturesPanel isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} onChange={handleSettingsChange} />
    </div>
  );
}
