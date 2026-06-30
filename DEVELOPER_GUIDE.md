# 💻 التوثيق التقني - دليل المطورين

## 📖 مقدمة

هذا الدليل موجه للمطورين الذين يريدون فهم وتطوير موقع **العرباوية ماتش 2026**.

---

## 🏗️ معمارية المشروع

### التقسيم العام:

```
Data Layer
    ↓
Component Layer
    ↓
Page Layer
    ↓
App Layer
```

### المستويات:

#### 1. **Data Layer** 🗄️
- `src/data/worldCup2026.ts` - قاعدة البيانات الرئيسية
- `src/data/matches.ts` - بيانات المباريات
- `src/data/teamsData.ts` - البيانات الديمية

#### 2. **Component Layer** 🧩
- مكونات معاد استخدامها
- منطق الحالة المحلي
- معالجة الأحداث

#### 3. **Page Layer** 📄
- `App.tsx` - المنطق الرئيسي للصفحات
- تحديد الصفحة الحالية
- التنقل

#### 4. **Utils Layer** 🔧
- `utils/cn.ts` - دوال المساعدة
- `utils/matchAnalysis.ts` - تحليل المباريات
- `utils/sanitize.ts` - تنظيف البيانات

---

## 📦 استخدام البيانات

### استيراد البيانات:

```typescript
import { 
  teamsDatabase,
  worldCup2026Groups,
  worldCupWinners,
  getTeamPredictions,
  getTeamStats
} from '../data/worldCup2026';
```

### الوصول للبيانات:

#### 1. **الحصول على فريق محدد:**
```typescript
const team = teamsDatabase['brazil'];
console.log(team.name);        // Brazil
console.log(team.nameAr);      // البرازيل
console.log(team.fifaRank);    // 1
console.log(team.group);       // C
```

#### 2. **الحصول على فرق مجموعة:**
```typescript
const groupATeams = worldCup2026Groups['A'];
// ['usa', 'mexico', 'canada', 'panama']

groupATeams.forEach(teamId => {
  const team = teamsDatabase[teamId];
  console.log(team.name);
});
```

#### 3. **الحصول على التوقعات:**
```typescript
const team = teamsDatabase['brazil'];
const predictions = getTeamPredictions(team);

console.log(predictions.advancePercentage);      // نسبة العبور
console.log(predictions.topGroupPercentage);    // قيادة المجموعة
console.log(predictions.semifinalPercentage);   // نصف النهائي
console.log(predictions.finalPercentage);       // النهائي
console.log(predictions.winPercentage);         // الفوز
```

#### 4. **الحصول على احصائيات الفريق:**
```typescript
const stats = getTeamStats('brazil');
console.log(stats.worldCupTitles);    // الألقاب
console.log(stats.appearances);       // المشاركات
console.log(stats.players);           // اللاعبون
```

---

## 🧩 استخدام المكونات

### المكون الأول: TeamsStatistics

```typescript
import TeamsStatistics from './components/TeamsStatistics';

// الاستخدام:
<TeamsStatistics />

// الوظائف:
- عرض جميع المجموعات
- توسيع/تصغير المجموعة
- عرض بيانات الفريق
- اختيار فريق لعرض التفاصيل
- ترتيب أفضل 10 فرق
```

### المكون الثاني: WorldCupTimeline2026

```typescript
import WorldCupTimeline2026 from './components/WorldCupTimeline2026';

// الاستخدام:
<WorldCupTimeline2026 />

// الوظائف:
- عرض مراحل البطولة
- عرض الفائزين السابقين
- احصائيات تاريخية
- توسيع/تصغير الأقسام
```

### المكون الثالث: AdvancedPredictions

```typescript
import AdvancedPredictions from './components/AdvancedPredictions';

// الاستخدام:
<AdvancedPredictions />

// الوظائف:
- اختيار نوع التوقع
- عرض أفضل 10 فرق
- شرائط بصرية للنسب المئوية
- احصائيات شاملة
```

### المكون الرابع: EliminationStatistics

```typescript
import EliminationStatistics from './components/EliminationStatistics';

// الاستخدام:
<EliminationStatistics />

// الوظائف:
- عرض الدول التي خرجت
- تقسيم حسب المرحلة
- مقارنات احصائية
- توسيع/تصغير السنوات
```

### المكون الخامس: RoundAnalysis

```typescript
import RoundAnalysis from './components/RoundAnalysis';

// الاستخدام:
<RoundAnalysis />

// الوظائف:
- شرح كل مرحلة
- احتمالات الخروج
- معادلات توضيحية
- حقائق مهمة
```

---

## 🎨 التعديل والتخصيص

### تغيير البيانات:

#### إضافة فريق جديد:
```typescript
// في worldCup2026.ts
export const teamsDatabase: Record<string, Team> = {
  // ...فرق موجودة...
  
  // فريق جديد:
  'algeria': {
    id: 'algeria',
    name: 'Algeria',
    nameAr: 'الجزائر',
    group: 'L',
    flag: '🇩🇿',
    logo: '/teams/algeria.png',
    coach: 'Coach Name',
    coachAr: 'اسم المدرب',
    fifaRank: 40,
    worldCupParticipations: 5,
    titles: 0,
    keyPlayers: ['Player 1', 'Player 2'],
    keyPlayersAr: ['لاعب 1', 'لاعب 2'],
    formation: '4-3-3',
    strength: 65,
    lastWorldCupResult: '2022 - Group Stage',
    continent: 'Africa'
  }
};
```

#### تحديث التوقعات:
```typescript
export function getTeamPredictions(team: Team): Predictions {
  // حسب قوة الفريق
  const strength = team.strength;
  
  // يمكن تعديل المعادلات
  const advancePercentage = strength * 1.2;
  const finalPercentage = strength * 0.5;
  // ...إلخ
  
  return {
    advancePercentage,
    topGroupPercentage,
    semifinalPercentage,
    finalPercentage,
    winPercentage
  };
}
```

---

## 🎨 تعديل الألوان والأنماط

### تخصيص Tailwind:

في `index.css`:
```css
/* تخصيص الألوان الأساسية */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... */
}

/* تخصيص الخطوط */
body {
  font-size: 18px;
  line-height: 1.7;
  font-family: 'Cairo', sans-serif;
}
```

### تعديل حجم الخطوط:
```tsx
// في أي مكون
<h1 className="text-4xl font-bold text-gradient">عنوان كبير</h1>
<p className="text-lg">نص عادي</p>
```

---

## 🔄 إدارة الحالة

### استخدام useState:

```typescript
import { useState } from 'react';

export default function MyComponent() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  const handleToggle = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };
  
  return (
    <button onClick={() => handleToggle('A')}>
      {expandedGroup === 'A' ? '▼' : '▶'} المجموعة A
    </button>
  );
}
```

### استخدام Props:

```typescript
interface TeamProps {
  teamId: string;
  onSelect?: (teamId: string) => void;
}

export function TeamCard({ teamId, onSelect }: TeamProps) {
  const team = teamsDatabase[teamId];
  
  return (
    <div onClick={() => onSelect?.(teamId)}>
      <h3>{team.name}</h3>
      <p>{team.nameAr}</p>
    </div>
  );
}
```

---

## 🧪 الاختبار

### اختبار البيانات:

```typescript
// اختبار للتحقق من البيانات
function validateTeamsData() {
  Object.entries(teamsDatabase).forEach(([id, team]) => {
    if (!team.name) console.error(`Missing name for ${id}`);
    if (!team.fifaRank) console.error(`Missing rank for ${id}`);
    if (team.strength < 1 || team.strength > 100) {
      console.error(`Invalid strength for ${id}`);
    }
  });
}

validateTeamsData();
```

### اختبار المكونات:

```typescript
// مثال لاختبار بسيط
import { render, screen } from '@testing-library/react';
import TeamsStatistics from './components/TeamsStatistics';

test('renders groups correctly', () => {
  render(<TeamsStatistics />);
  expect(screen.getByText(/المجموعة A/i)).toBeInTheDocument();
});
```

---

## 🚀 التحسينات الأداء

### استخدام React.memo:

```typescript
import { memo } from 'react';

const TeamCard = memo(({ team }: { team: Team }) => {
  return (
    <div>
      <h3>{team.name}</h3>
    </div>
  );
});

export default TeamCard;
```

### استخدام useMemo:

```typescript
import { useMemo } from 'react';

export function TeamsRanking() {
  const sortedTeams = useMemo(() => {
    return Object.values(teamsDatabase)
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 10);
  }, []);
  
  return (
    <div>
      {sortedTeams.map(team => (
        <div key={team.id}>{team.name}</div>
      ))}
    </div>
  );
}
```

---

## 📱 التجاوب (Responsive Design)

### استخدام Tailwind Breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {teams.map(team => (
    <TeamCard key={team.id} team={team} />
  ))}
</div>
```

### الشاشات:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🐛 استكشاف الأخطاء

### تفعيل console logging:

```typescript
// في المكونات
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);
```

### استخدام React DevTools:

1. ثبت React DevTools من Chrome Store
2. افتح DevTools (F12)
3. اذهب إلى تبويب React
4. تصفح المكونات والحالة

---

## 📚 الموارد الإضافية

### التوثيق الرسمي:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### مكتبات مفيدة:
- lucide-react (الرموز)
- axios (الطلبات HTTP)
- date-fns (معالجة التواريخ)
- zustand (إدارة الحالة)

---

## 🎯 أفضل الممارسات

### 1. **تسمية واضحة:**
```typescript
// ❌ سيء
const d = 'A';
const t = teamsDatabase[d];

// ✅ جيد
const groupId = 'A';
const groupTeams = worldCup2026Groups[groupId];
```

### 2. **الأنواع القوية:**
```typescript
// ❌ سيء
function getTeam(id: any) {
  return teamsDatabase[id];
}

// ✅ جيد
function getTeam(id: string): Team | undefined {
  return teamsDatabase[id];
}
```

### 3. **معالجة الأخطاء:**
```typescript
// ✅ جيد
try {
  const team = teamsDatabase[teamId];
  if (!team) throw new Error(`Team not found: ${teamId}`);
  return team;
} catch (error) {
  console.error(error);
  return null;
}
```

### 4. **التعليقات:**
```typescript
// ✅ استخدم تعليقات واضحة
/** 
 * احسب توقعات الفريق بناءً على قوته
 * @param team - البيانات الكاملة للفريق
 * @returns توقعات مع نسب مئوية
 */
function getTeamPredictions(team: Team): Predictions {
  // ...
}
```

---

## 🔒 الأمان

### تنظيف المدخلات:

```typescript
import DOMPurify from 'dompurify';

function sanitizeTeamName(name: string): string {
  return DOMPurify.sanitize(name);
}
```

### منع XSS:

```typescript
// ❌ خطر
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ آمن
<div>{userInput}</div>
```

---

## 📊 إضافة ميزات جديدة

### خطوات عامة:

1. **أنشئ البيانات** في `worldCup2026.ts`
2. **أنشئ المكون** في `components/`
3. **أضفه إلى App.tsx**
4. **أضف زر التنقل**
5. **اختبره في المتصفح**

---

## 🎉 الخلاصة

هذا الدليل يوفر أساساً متيناً لفهم واستخدام موقع **العرباوية ماتش 2026**.

للمزيد من المعلومات، راجع الملفات التوثيقية الأخرى أو التوثيق الرسمي للمكتبات المستخدمة.

---

**آخر تحديث:** 30 يونيو 2026  
**الإصدار:** 2026.2.0  
**المستوى:** متقدم
