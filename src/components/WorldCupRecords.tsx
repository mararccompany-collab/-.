export default function WorldCupRecords() {
  const records = [
    { title: 'الأكثر تتويجاً', value: 'البرازيل', detail: '5 ألقاب (1958, 1962, 1970, 1994, 2002)', flag: '🇧🇷', color: 'text-yellow-400' },
    { title: 'الوصافة', value: 'ألمانيا', detail: '4 مرات وصيف (1966, 1982, 1986, 2002)', flag: '🇩🇪', color: 'text-gray-300' },
    { title: 'الهداف التاريخي', value: 'ميروسلاف كلوزه', detail: '16 هدفاً (2002-2014)', flag: '🇩🇪', color: 'text-green-400' },
    { title: 'الأكثر ظهوراً', value: 'ليونيل ميسي', detail: '26 مباراة (2006-2022)', flag: '🇦🇷', color: 'text-blue-400' },
    { title: 'أكثر هدف في نسخة', value: 'جوست فونتين', detail: '13 هدفاً (1958)', flag: '🇫🇷', color: 'text-red-400' },
    { title: 'أكبر فوز', value: 'المجر 9-0 كوريا', detail: '1954 + المجر 10-1 السلفادور 1982', flag: '🇭🇺', color: 'text-purple-400' },
    { title: 'أسرع هدف', value: 'هاكان شوكور', detail: '11 ثانية (2002)', flag: '🇹🇷', color: 'text-amber-400' },
    { title: 'أكبر جمهور', value: '199,854', detail: 'البرازيل × الأوروغواي 1950', flag: '🇧🇷', color: 'text-white' },
    { title: 'أكثر نسخة أهدافاً', value: '2014', detail: '171 هدفاً في 32 مباراة', flag: '⚽', color: 'text-orange-400' },
    { title: 'أصغر هداف', value: 'بيليه', detail: '17 عاماً و249 يوماً (1958)', flag: '🇧🇷', color: 'text-green-300' },
  ];

  return (
    <div>
      <div className="mb-4 p-4 rounded-2xl bg-gradient-to-l from-purple-500/10 via-indigo-500/5 to-transparent border border-purple-500/20">
        <h3 className="text-purple-400 text-sm font-bold" style={{ fontFamily: 'Cairo' }}>📊 أرقام قياسية في كأس العالم</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {records.map((r, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5">
            <span className="text-2xl block mb-1.5">{r.flag}</span>
            <span className="text-white/40 text-[9px] block" style={{ fontFamily: 'Cairo' }}>{r.title}</span>
            <span className={`text-sm font-black block ${r.color} leading-tight mt-0.5`} style={{ fontFamily: 'Cairo' }}>{r.value}</span>
            <span className="text-white/25 text-[8px] block mt-1 leading-tight" style={{ fontFamily: 'Cairo' }}>{r.detail}</span>
          </div>
        ))}
      </div>

      {/* Saudi Arabia vs Argentina highlight */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-l from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20">
        <h3 className="text-green-400 text-sm font-bold mb-2" style={{ fontFamily: 'Cairo' }}>🌟 مفاجأة البطولة</h3>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇸🇦</span>
          <div>
            <span className="text-white font-bold text-sm block" style={{ fontFamily: 'Cairo' }}>السعودية 2-1 الأرجنتين</span>
            <span className="text-white/40 text-[10px]" style={{ fontFamily: 'Cairo' }}>أكبر مفاجأة في تاريخ كأس العالم 🏆 — 22 نوفمبر 2022</span>
          </div>
        </div>
      </div>

      {/* Arab teams performance */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-l from-emerald-500/10 via-green-500/5 to-transparent border border-emerald-500/20">
        <h3 className="text-emerald-400 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>🌍 أداء المنتخبات العربية في كأس العالم 2022</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { team: 'المغرب', flag: '🇲🇦', stage: 'نصف النهائي (الرابع)', match: '6', highlight: true },
            { team: 'السعودية', flag: '🇸🇦', stage: 'دور المجموعات', match: '3', highlight: false },
            { team: 'تونس', flag: '🇹🇳', stage: 'دور المجموعات', match: '3', highlight: false },
            { team: 'قطر', flag: '🇶🇦', stage: 'دور المجموعات', match: '3', highlight: false },
          ].map(a => (
            <div key={a.team} className={`rounded-lg p-2.5 text-center border ${a.highlight ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/[0.03] border-white/5'}`}>
              <span className="text-xl block mb-0.5">{a.flag}</span>
              <span className="text-white text-xs font-bold block" style={{ fontFamily: 'Cairo' }}>{a.team}</span>
              <span className={`text-[9px] ${a.highlight ? 'text-amber-400' : 'text-white/40'}`} style={{ fontFamily: 'Cairo' }}>{a.stage}</span>
              <span className="text-white/30 text-[8px] block">{a.match} مباريات</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <span className="text-amber-400 text-xs font-bold" style={{ fontFamily: 'Cairo' }}>🏅 المغرب أول منتخب عربي وأفريقي يصل لنصف النهائي</span>
        </div>
      </div>

      {/* Tournament stats */}
      <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
        <h3 className="text-white/60 text-sm font-bold mb-3" style={{ fontFamily: 'Cairo' }}>📈 إحصائيات كأس العالم 2022</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'إجمالي المباريات', value: '64' },
            { label: 'إجمالي الأهداف', value: '172' },
            { label: 'متوسط الأهداف', value: '2.69' },
            { label: 'إجمالي الحضور', value: '3.4 مليون' },
            { label: 'ركلات الجزاء', value: '22' },
            { label: 'بطاقات صفراء', value: '224' },
            { label: 'بطاقات حمراء', value: '4' },
            { label: 'أهداف في الدقيقة 90+', value: '18' },
            { label: 'هدف في المباراة الافتتاحية', value: '2' },
            { label: 'أهداف في النهائي', value: '6' },
            { label: 'جمهور النهائي', value: '88,966' },
            { label: 'الدول المشاركة', value: '32' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between bg-white/[0.02] rounded-lg px-3 py-2">
              <span className="text-white/40 text-xs" style={{ fontFamily: 'Cairo' }}>{s.label}</span>
              <span className="text-white font-black text-sm" style={{ fontFamily: 'Orbitron' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top scorer info */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-l from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20">
        <h3 className="text-yellow-400 text-sm font-bold mb-2" style={{ fontFamily: 'Cairo' }}>⚽ هداف كأس العالم 2022</h3>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇫🇷</span>
          <div>
            <span className="text-white font-bold text-base block" style={{ fontFamily: 'Cairo' }}>كيليان مبابي</span>
            <span className="text-white/40 text-[11px]">8 أهداف · 4 تمريرات حاسمة · الكرة الذهبية</span>
          </div>
        </div>
      </div>

      {/* Golden Ball */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-l from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20">
        <h3 className="text-amber-400 text-sm font-bold mb-2" style={{ fontFamily: 'Cairo' }}>🏅 الكرة الذهبية 2022</h3>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇦🇷</span>
          <div>
            <span className="text-white font-bold text-base block" style={{ fontFamily: 'Cairo' }}>ليونيل ميسي</span>
            <span className="text-white/40 text-[11px]">7 أهداف · 3 تمريرات حاسمة · قائد الأرجنتين البطلة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
