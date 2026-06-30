import { useEffect, useState } from 'react';
import Header from './components/Header';
import MatchCard from './components/MatchCard';
import MatchDetails from './components/MatchDetails';
import FeaturedMatch from './components/FeaturedMatch';
import TopScorers from './components/TopScorers';
import FeaturesPanel from './components/FeaturesPanel';
import AnalysesPage from './components/AnalysesPage';
import Ticker from './components/Ticker';
import GroupStandings from './components/GroupStandings';
import PastWinners from './components/PastWinners';
import TeamFormation from './components/TeamFormation';
import AllTeamsPage from './components/AllTeamsPage';
import WorldCupTimeline from './components/WorldCupTimeline';
import WorldCupBracket from './components/WorldCupBracket';
import GroupPredictions from './components/GroupPredictions';
import WorldCupRecords from './components/WorldCupRecords';
import TeamsStatistics from './components/TeamsStatistics';
import WorldCupTimeline2026 from './components/WorldCupTimeline2026';
import AdvancedPredictions from './components/AdvancedPredictions';
import EliminationStatistics from './components/EliminationStatistics';
import RoundAnalysis from './components/RoundAnalysis';
import LiveMatch from './components/LiveMatch';
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
  Algeria: 'الجزائر',
  Iraq: 'العراق',
  Qatar: 'قطر',
  Tunisia: 'تونس',
  Senegal: 'السنغال',
  Poland: 'بولندا',
  Switzerland: 'سويسرا',
  Serbia: 'صربيا',
  Cameroon: 'الكاميرون',
  Ghana: 'غانا',
  Uruguay: 'الأوروغواي',
  Wales: 'ويلز',
  'Costa Rica': 'كوستاريكا',
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
  const [page, setPage] = useState<'home' | 'live' | 'timeline' | 'teams' | 'formations' | 'winners' | 'bracket' | 'predictions' | 'records' | 'teams-stats' | 'timeline-2026' | 'advanced-predictions' | 'elimination' | 'rounds'>('home');

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

  const [refreshTick, setRefreshTick] = useState(0);

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
    const interval = setInterval(() => {
      loadMatches();
      setRefreshTick(t => t + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, [settings.showLiveOnly]);

  const handleSettingsChange = (next: AppSettings) => setSettings(next);

  const liveMatchesCount = matches.filter((match) => match.status === 'live').length;
  const upcomingMatches = matches.filter((match) => match.status === 'upcoming').slice(0, 4);

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
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Ticker matches={matches} getArabicName={getArabicName} />

        {/* Navigation tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 overflow-x-auto">
          {[
            { key: 'home', label: 'الرئيسية', icon: '🏠' },
            { key: 'live', label: 'مباشر', icon: '🔴' },
            { key: 'timeline-2026', label: 'الجدول 2026', icon: '📅' },
            { key: 'teams-stats', label: 'المنتخبات', icon: '🏳️' },
            { key: 'teams', label: 'جميع الفرق', icon: '⚽' },
            { key: 'rounds', label: 'الأدوار', icon: '🎯' },
            { key: 'formations', label: 'التشكيلات', icon: '🧑‍🤝‍🧑' },
            { key: 'elimination', label: 'الخروج', icon: '📊' },
            { key: 'bracket', label: 'المشوار', icon: '🏟️' },
            { key: 'advanced-predictions', label: 'التوقعات', icon: '🔮' },
            { key: 'winners', label: 'السجلات', icon: '🏆' },
            { key: 'records', label: 'الأرقام', icon: '📈' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setPage(tab.key as typeof page)}
              className={`flex-shrink-0 min-w-[70px] px-3 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                page === tab.key
                  ? 'bg-green-500/15 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/5'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
              }`}
              style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}
            >
              <span className="block text-base md:text-lg mb-0.5">{tab.icon}</span>
              <span className="line-clamp-1">{tab.label}</span>
            </button>
          ))}
        </div>

        {page === 'live' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <LiveMatch />
          </div>
        )}

        {page === 'home' && (<>
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold">مواعيد المباريات</h2>
                  <p className="text-sm md:text-base text-white/50">أقرب المباريات القادمة وحالة المباريات اليوم.</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs md:text-sm font-semibold text-emerald-300">{liveMatchesCount} مباشر</span>
              </div>

              {upcomingMatches.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {upcomingMatches.map((match) => (
                    <div key={match.id} className="rounded-2xl border border-white/10 bg-[#081020] p-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs md:text-sm text-white/60">{new Date(match.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</div>
                        <div className="text-sm md:text-base font-semibold text-white">{getArabicName(match.homeTeam)} vs {getArabicName(match.awayTeam)}</div>
                      </div>
                      <div className="mt-1 text-xs text-white/40">{match.group || 'كأس العالم'} • {match.venue || 'الملعب غير معروف'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-sm text-white/50">لا توجد مباريات قادمة في القائمة.</div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-base font-semibold">كل المميزات</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>⚽ ترتيب المجموعات مباشر</li>
                <li>📺 مواقع البث المباشر الشائعة</li>
                <li>📰 شريط الأخبار للمباريات</li>
                <li>🧠 تحليلات الأهداف والبطاقات</li>
                <li>⏱️ مواعيد بداية المباريات</li>
              </ul>
            </div>
          </div>

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

              <div className="mt-4 space-y-4">
                <TopScorers />
                <GroupStandings />
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                {selectedMatch ? (
                  <MatchDetails match={selectedMatch} getArabicName={getArabicName} settings={settings} />
                ) : (
                  <div className="py-20 text-center text-white/60">اختر مباراة من القائمة لعرض التفاصيل.</div>
                )}
              </div>

              {selectedMatch && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <FeaturedMatch match={selectedMatch} getArabicName={getArabicName} settings={settings} />
                </div>
              )}
            </section>
          </div>
        </>)}

        {page === 'timeline' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>📅 الجدول الزمني لكأس العالم</h2>
            <WorldCupTimeline matches={matches} getArabicName={getArabicName} />
          </div>
        )}

        {page === 'timeline-2026' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <WorldCupTimeline2026 />
          </div>
        )}

        {page === 'teams-stats' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <TeamsStatistics />
          </div>
        )}

        {page === 'teams' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>🏳️ جميع المنتخبات المشاركة</h2>
            <AllTeamsPage />
          </div>
        )}

        {page === 'formations' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>🧑‍🤝‍🧑 تشكيلات الفرق والخطط</h2>
            <TeamFormation />
          </div>
        )}

        {page === 'bracket' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>🏟️ مشوار البطولة - من المجموعات إلى النهائي</h2>
            <WorldCupBracket />
          </div>
        )}

        {page === 'predictions' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>📊 التوقعات ونسب التأهل</h2>
            <GroupPredictions />
          </div>
        )}

        {page === 'advanced-predictions' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <AdvancedPredictions />
          </div>
        )}

        {page === 'elimination' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <EliminationStatistics />
          </div>
        )}

        {page === 'rounds' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <RoundAnalysis />
          </div>
        )}

        {page === 'winners' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>🏆 سجل الفائزين بكأس العالم</h2>
            <PastWinners />
          </div>
        )}

        {page === 'records' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ fontFamily: 'Cairo' }}>📈 أرقام قياسية وإحصائيات</h2>
            <WorldCupRecords />
          </div>
        )}
      </main>
      <FeaturesPanel isOpen={showSettings} onClose={() => setShowSettings(false)} settings={settings} onChange={handleSettingsChange} />
    </div>
  );
}
