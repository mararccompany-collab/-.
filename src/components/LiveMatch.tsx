export default function LiveMatch() {
  return (
    <div>
      <div className="bg-gradient-to-l from-red-500/15 via-red-500/5 to-transparent border border-red-500/20 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <div>
            <h2 className="text-red-400 text-sm font-bold" style={{ fontFamily: 'Cairo' }}>🔴 مباراة مباشر الآن</h2>
            <p className="text-white/40 text-xs" style={{ fontFamily: 'Cairo' }}>اضغط على الشاشة للمشاهدة</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
        <iframe
          src="https://xyzblond-nine-29-vercel-app.goalz.zip/?m=30689&lang=ar&domain_name=%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D8%A7%D9%88%D9%8A%D8%A9%20%D9%85%D8%A7%D8%AA%D8%B4"
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
          title="مباراة مباشر"
          style={{ border: 'none' }}
        />
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        <a
          href="https://xyzblond-nine-29-vercel-app.goalz.zip/?m=30689&lang=ar&domain_name=%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D8%A7%D9%88%D9%8A%D8%A9%20%D9%85%D8%A7%D8%AA%D8%B4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl px-4 py-2 text-xs font-bold hover:bg-red-500/25 transition-all cursor-pointer"
          style={{ fontFamily: 'Cairo' }}
        >
          🖥️ فتح في نافذة منفصلة
        </a>
      </div>
    </div>
  );
}
