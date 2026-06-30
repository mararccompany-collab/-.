import logoUrl from '../assets/logo.svg';

interface HeaderProps {
  onOpenAnalyses: () => void;
  onOpenSettings: () => void;
}

export default function Header({ onOpenAnalyses, onOpenSettings }: HeaderProps) {
  return (
    <header className="bg-[#0b1220] border-b border-white/10 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="logo" className="h-11 w-11 rounded-xl bg-white/5 p-2" />
          <div>
            <h1 className="text-xl font-black">العرباوية ماتش</h1>
            <p className="text-xs text-white/60">مواعيد المباريات والتحليلات المباشرة</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onOpenSettings} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">الإعدادات</button>
          <button onClick={onOpenAnalyses} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm text-white">التحليلات</button>
        </div>
      </div>
    </header>
  );
}
