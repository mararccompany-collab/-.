import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import FeaturedMatch from './components/FeaturedMatch';
import MatchCard from './components/MatchCard';
import MatchDetails from './components/MatchDetails';
import StatsBar from './components/StatsBar';
import GroupStandings from './components/GroupStandings';
import TopScorers from './components/TopScorers';
import SplashScreen from './components/SplashScreen';
import GoalNotification from './components/GoalNotification';
import FeaturesPanel from './components/FeaturesPanel';
import TeamsModal from './components/TeamsModal';
import AnalysesPage from './components/AnalysesPage';
import { fetchTodayMatches, fetchMatchesByDate, type ProcessedMatch } from './services/espnApi';
import { Settings, Heart, HeartOff } from 'lucide-react';

const teamNameAr: Record<string, string> = {
  'Mexico':'المكسيك','South Africa':'جنوب أفريقيا','South Korea':'كوريا الجنوبية',
  'Czech Republic':'التشيك','Czechia':'التشيك','United States':'أمريكا','USA':'أمريكا',
  'Australia':'أستراليا','Canada':'كندا','Qatar':'قطر','Switzerland':'سويسرا',
  'Brazil':'البرازيل','Haiti':'هايتي','Morocco':'المغرب','Scotland':'اسكتلندا',
  'Turkey':'تركيا','Paraguay':'باراغواي','Netherlands':'هولندا','Sweden':'السويد',
  'Germany':'ألمانيا','Ivory Coast':'ساحل العاج',"Côte d'Ivoire":'ساحل العاج',
  'Japan':'اليابان','Tunisia':'تونس','Spain':'إسبانيا','Saudi Arabia':'السعودية',
  'Belgium':'بلجيكا','Iran':'إيران','Egypt':'مصر','New Zealand':'نيوزيلندا',
  'Uruguay':'أوروغواي','Cape Verde':'الرأس الأخضر','Cabo Verde':'الرأس الأخضر',
  'Argentina':'الأرجنتين','Austria':'النمسا','France':'فرنسا','Iraq':'العراق',
  'Norway':'النرويج','Senegal':'السنغال','Algeria':'الجزائر','Jordan':'الأردن',
  'Ecuador':'الإكوادور','Curaçao':'كوراساو','Curacao':'كوراساو',
  'England':'إنجلترا','Croatia':'كرواتيا','Ghana':'غانا','Panama':'بنما',
  'Colombia':'كولومبيا','Uzbekistan':'أوزبكستان','Portugal':'البرتغال',
  'DR Congo':'الكونغو','Nigeria':'نيجيريا','Cameroon':'الكاميرون',
  'Bosnia-Herzegovina':'البوسنة','Bosnia and Herzegovina':'البوسنة',
  'Serbia':'صربيا','Denmark':'الدنمارك','Italy':'إيطاليا','Poland':'بولندا',
  'Chile':'تشيلي','Peru':'بيرو','Costa Rica':'كوستاريكا',
  'Wales':'ويلز','Ireland':'أيرلندا','Ukraine':'أوكرانيا',
};

function getArabicName(name: string): string {
  return teamNameAr[name] || name;
}

function dateFmt(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0].replace(/-/g, '');
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [allMatches, setAllMatches] = useState<ProcessedMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<ProcessedMatch | null>(null);
  const [showAnalyses, setShowAnalyses] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [showFeaturesPanel, setShowFeaturesPanel] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('fav') || '[]'); } catch { return []; }
  });
  const [settings, setSettings] = useState({ notifications: true, sound: false, darkMode: true, arabicNames: true, showPredictions: true });
  const [goalNotif, setGoalNotif] = useState<{ team: string; teamLogo: string; score: string } | null>(null);

  const selectedIdRef = useRef<string | null>(null);
  const prevScoresRef = useRef<Record<string, string>>({});
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // Keep ref in sync
  useEffect(() => { selectedIdRef.current = selectedMatch?.id || null; }, [selectedMatch]);
  useEffect(() => { localStorage.setItem('fav', JSON.stringify(favorites)); }, [favorites]);

  // Load matches function - no useCallback needed, uses refs
  const loadMatches = async () => {
    try {
      setError(null);
      const [today, yest, tmrw, after] = await Promise.all([
        fetchTodayMatches(),
        fetchMatchesByDate(dateFmt(-1)),
        fetchMatchesByDate(dateFmt(1)),
        fetchMatchesByDate(dateFmt(2)),
      ]);

      const all = [...today, ...yest, ...tmrw, ...after];
      const unique = all.filter((m, i, a) => a.findIndex(x => x.id === m.id) === i);

      if (unique.length === 0) { setLoading(false); return; }

      // Goal detection
      if (settingsRef.current.notifications) {
        for (const m of today) {
          if (m.status === 'live') {
            const prev = prevScoresRef.current[m.id];
            const curr = `${m.homeScore}-${m.awayScore}`;
            if (prev && prev !== curr) {
              const pH = parseInt(prev.split('-')[0]);
              const cH = parseInt(m.homeScore);
              setGoalNotif({
                team: getArabicName(cH > pH ? m.homeTeam : m.awayTeam),
                teamLogo: cH > pH ? m.homeLogo : m.awayLogo,
                score: curr,
              });
            }
            prevScoresRef.current[m.id] = curr;
          }
        }
      }

      setAllMatches(unique);
      setLastUpdate(new Date());

      // Auto-select
      const sid = selectedIdRef.current;
      const updated = sid ? unique.find(m => m.id === sid) : null;
      if (updated) {
        setSelectedMatch(updated);
      } else if (!sid) {
        const pick = unique.find(m => m.status === 'live' && (m.homeTeam.includes('Egypt') || m.awayTeam.includes('Egypt')))
          || unique.find(m => m.status === 'live')
          || unique.find(m => m.homeTeam.includes('Egypt') || m.awayTeam.includes('Egypt'))
          || unique.find(m => m.status === 'upcoming')
          || unique[0];
        if (pick) setSelectedMatch(pick);
      }
    } catch { setError('خطأ في تحميل البيانات'); }
    finally { setLoading(false); }
  };

  // Initial load after splash
  useEffect(() => {
    if (!showSplash) loadMatches();
  }, [showSplash]);

  // Handle deep link to /analyses on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onPop = () => {
        if (window.location.pathname === '/analyses') setShowAnalyses(true);
        else setShowAnalyses(false);
      };
      // check at mount
      if (window.location.pathname === '/analyses') setShowAnalyses(true);
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }
  }, []);

  // Auto refresh every 30s
  useEffect(() => {
    if (showSplash) return;
    const id = setInterval(loadMatches, 30000);
    return () => clearInterval(id);
  }, [showSplash]);

  const filteredMatches = activeFilter === 'all' ? allMatches
    : activeFilter === 'favorites' ? allMatches.filter(m => favorites.includes(m.id))
    : allMatches.filter(m => m.status === activeFilter);

  const liveCount = allMatches.filter(m => m.status === 'live').length;
  const upcomingCount = allMatches.filter(m => m.status === 'upcoming').length;
  const tickerMatches = allMatches.filter(m => m.status === 'live' || m.status === 'finished');

  if (showSplash) return <SplashScreen onEnter={() => setShowSplash(false)} />;

  const openAnalyses = () => {
    setShowAnalyses(true);
    try {
      window.history.pushState({}, '', '/analyses');
      document.title = 'تحليلات اليوم — العرباوية ماتش';
      let md = document.querySelector('meta[name="description"]');
      if (!md) { md = document.createElement('meta'); md.setAttribute('name', 'description'); document.head.appendChild(md); }
      md.setAttribute('content', 'تحليلات يومية للمباريات: توقعات، احتمالات، وملاحظات خبيرية قابلة للمشاركة.');
    } catch {}
  };

  const closeAnalyses = () => {
    setShowAnalyses(false);
    try { window.history.replaceState({}, '', '/'); document.title = 'العرباوية ماتش'; } catch {}
  };

  // Analyses page
  if (showAnalyses) return (
    <div className="min-h-screen bg-[#050510]">
      <div className="container mx-auto px-3 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">🧠 تحليلات اليوم</h2>
          <div>
            <button onClick={() => closeAnalyses()} className="bg-white/5 text-white/60 px-3 py-1 rounded-lg">عودة</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 py-4">
        {/* Lazy import component to avoid heavy initial bundle */}
        <AnalysesPage matches={allMatches} getArabicName={getArabicName} settings={settings} />
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#050510]" dir="rtl">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-base font-bold" style={{ fontFamily: 'Cairo' }}>⚽ العرباوية ماتش</p>
        <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Cairo' }}>جاري تحميل المباريات...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#050510]" dir="rtl">
      {goalNotif && <GoalNotification {...goalNotif} onClose={() => setGoalNotif(null)} />}
      <TeamsModal isOpen={showTeamsModal} onClose={() => setShowTeamsModal(false)} getArabicName={getArabicName} />
      <FeaturesPanel isOpen={showFeaturesPanel} onClose={() => setShowFeaturesPanel(false)}
        settings={settings} onSettingsChange={(k, v) => setSettings(p => ({ ...p, [k]: v }))}
        favorites={favorites} onToggleFavorite={(id) => setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])} />

      <Header onOpenAnalyses={() => openAnalyses()} />
      <Ticker matches={tickerMatches.length > 0 ? tickerMatches : allMatches.slice(0, 5)} getArabicName={getArabicName} />

      {/* Update bar */}
      <div className="bg-[#080820] border-b border-white/5 py-1">
        <div className="container mx-auto px-3 flex items-center justify-between text-[10px] text-white/30">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span style={{ fontFamily: 'Cairo' }}>تحديث تلقائي</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{lastUpdate.toLocaleTimeString('ar-EG')}</span>
            <button onClick={() => setShowFeaturesPanel(true)}
              className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full cursor-pointer">
              <Settings className="w-3 h-3" /><span>إعدادات</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-3 py-4 space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-400 text-sm text-center" style={{ fontFamily: 'Cairo' }}>
            {error} - <button onClick={loadMatches} className="underline cursor-pointer">إعادة المحاولة</button>
          </div>
        )}

        <StatsBar liveCount={liveCount} totalCount={allMatches.length} upcomingCount={upcomingCount}
          activeFilter={activeFilter} onFilterChange={setActiveFilter} onShowTeams={() => setShowTeamsModal(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Match List */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-sm font-bold" style={{ fontFamily: 'Cairo' }}>📅 المباريات</h2>
              <button onClick={loadMatches} className="text-green-400 text-[10px] bg-green-500/10 px-2 py-0.5 rounded-full cursor-pointer">🔄</button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'all', label: 'الكل', icon: '📋' },
                { id: 'live', label: 'مباشر', icon: '🔴' },
                { id: 'upcoming', label: 'قادمة', icon: '⏰' },
                { id: 'finished', label: 'انتهت', icon: '✅' },
                { id: 'favorites', label: 'المفضلة', icon: '⭐' },
              ].map(f => (
                <button key={f.id} onClick={() => setActiveFilter(f.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                    activeFilter === f.id ? 'bg-green-500 text-white' : 'bg-white/5 text-white/50 border border-white/10'
                  }`} style={{ fontFamily: 'Cairo' }}>
                  <span>{f.icon}</span><span>{f.label}</span>
                  {f.id === 'favorites' && favorites.length > 0 && <span className="bg-yellow-500 text-black text-[8px] px-1 rounded-full">{favorites.length}</span>}
                </button>
              ))}
            </div>

            {/* Match Cards */}
            <div className="space-y-2 max-h-[500px] lg:max-h-[650px] overflow-y-auto custom-scrollbar">
              {filteredMatches.map(match => (
                <div key={match.id} className="relative">
                  <MatchCard match={match} onSelect={setSelectedMatch} isSelected={selectedMatch?.id === match.id} getArabicName={getArabicName} />
                  <button onClick={() => setFavorites(p => p.includes(match.id) ? p.filter(x => x !== match.id) : [...p, match.id])}
                    className="absolute top-2 left-2 p-1 rounded-full bg-black/50 cursor-pointer z-10">
                    {favorites.includes(match.id)
                      ? <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                      : <HeartOff className="w-3 h-3 text-white/20" />
                    }
                  </button>
                </div>
              ))}
              {filteredMatches.length === 0 && (
                <div className="text-center py-6 text-white/30">
                  <p className="text-2xl mb-1">{activeFilter === 'favorites' ? '⭐' : '🔍'}</p>
                  <p className="text-[11px]" style={{ fontFamily: 'Cairo' }}>
                    {activeFilter === 'favorites' ? 'لم تضف مباريات للمفضلة' : 'لا توجد مباريات'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Center */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-sm font-bold" style={{ fontFamily: 'Cairo' }}>🎬 العرباوية ماتش</h2>
              <span className="text-[10px] text-white/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />ESPN
              </span>
            </div>

            {selectedMatch && <FeaturedMatch match={selectedMatch} getArabicName={getArabicName} settings={settings} />}

            {/* Quick switcher */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {allMatches.filter(m => m.status === 'live' || m.status === 'upcoming').slice(0, 6).map(m => (
                <button key={m.id} onClick={() => setSelectedMatch(m)}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] cursor-pointer ${
                    selectedMatch?.id === m.id ? 'bg-green-500/20 border border-green-500/40 text-green-400' : 'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                  <img src={m.homeLogo} alt="" loading="lazy" decoding="async" className="w-4 h-4" />
                  <span className="font-bold" style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>{m.homeScore}-{m.awayScore}</span>
                  <img src={m.awayLogo} alt="" loading="lazy" decoding="async" className="w-4 h-4" />
                  {m.status === 'live' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 order-3 space-y-3">
            <h2 className="text-white text-sm font-bold" style={{ fontFamily: 'Cairo' }}>📊 التفاصيل</h2>
            {selectedMatch && <MatchDetails match={selectedMatch} getArabicName={getArabicName} settings={settings} />}
            <GroupStandings />
            <TopScorers />
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
              <h3 className="text-white font-bold text-[11px] mb-2" style={{ fontFamily: 'Cairo' }}>📺 القنوات الناقلة</h3>
              <div className="grid grid-cols-2 gap-1">
                {['beIN Max 1','beIN Max 2','beIN Max 3','beIN Max 4','المجانية','TOD TV'].map(ch => (
                  <div key={ch} className="bg-green-500/5 border border-green-500/15 rounded-lg p-1.5 text-center">
                    <p className="text-white/70 text-[10px] font-bold" style={{ fontFamily: 'Cairo' }}>{ch}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-4 py-3">
        <div className="container mx-auto px-3 text-center text-white/15 text-[10px]" style={{ fontFamily: 'Cairo' }}>
          <p>⚽ العرباوية ماتش | كأس العالم 2026 🏆</p>
        </div>
      </footer>
    </div>
  );
}
