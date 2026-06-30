import { useEffect, useState } from 'react';
import { Settings, X, Share2 } from 'lucide-react';
import external from '../services/externalAnalytics';

interface FeaturesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    showPredictions: boolean;
    showLiveOnly: boolean;
  };
  onChange: (next: { showPredictions: boolean; showLiveOnly: boolean }) => void;
}

interface AnalyticsConfig {
  xgApi?: string;
  eloApi?: string;
  optaApi?: string;
}

export default function FeaturesPanel({ isOpen, onClose, settings, onChange }: FeaturesPanelProps) {
  const [config, setConfig] = useState<AnalyticsConfig>({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ext_analytics') || '{}');
      setConfig({
        xgApi: stored.xgApi || '',
        eloApi: stored.eloApi || '',
        optaApi: stored.optaApi || '',
      });
    } catch {
      setConfig({});
    }
  }, []);

  const updateConfig = (key: keyof AnalyticsConfig, value: string) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const saveConfig = () => {
    external.saveConfig({
      xgApi: config.xgApi?.trim() || undefined,
      eloApi: config.eloApi?.trim() || undefined,
      optaApi: config.optaApi?.trim() || undefined,
    });
    alert('تم حفظ إعدادات التحليل الخارجي');
  };

  const clearConfig = () => {
    setConfig({});
    external.saveConfig({});
    alert('تم مسح إعدادات التحليل الخارجي');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-green-400" />
            <div>
              <h2 className="text-lg font-bold">الإعدادات</h2>
              <p className="text-xs text-white/50">تحكم في العرض والمصادر الخارجية.</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/5 p-2 text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
              <div>
                <p className="font-semibold">عرض المباريات المباشرة فقط</p>
                <p className="text-xs text-white/50">يظهر المباريات الجارية فقط.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showLiveOnly}
                onChange={() => onChange({ ...settings, showLiveOnly: !settings.showLiveOnly })}
                className="h-5 w-5 rounded-md border border-white/20 bg-slate-900 text-green-500"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
              <div>
                <p className="font-semibold">عرض التنبؤات</p>
                <p className="text-xs text-white/50">شغل أو أوقف تحليلات المباريات.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showPredictions}
                onChange={() => onChange({ ...settings, showPredictions: !settings.showPredictions })}
                className="h-5 w-5 rounded-md border border-white/20 bg-slate-900 text-green-500"
              />
            </label>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-3 text-sm font-semibold">مصادر التحليل الخارجي</h3>
            <div className="space-y-3">
              <input
                value={config.xgApi || ''}
                onChange={(e) => updateConfig('xgApi', e.target.value)}
                placeholder="نقطة نهاية xG API"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder:text-white/40"
              />
              <input
                value={config.eloApi || ''}
                onChange={(e) => updateConfig('eloApi', e.target.value)}
                placeholder="نقطة نهاية Elo API"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder:text-white/40"
              />
              <input
                value={config.optaApi || ''}
                onChange={(e) => updateConfig('optaApi', e.target.value)}
                placeholder="نقطة نهاية Opta API"
                className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder:text-white/40"
              />
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={saveConfig} className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">حفظ</button>
                <button type="button" onClick={clearConfig} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/60">مسح</button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'العرباوية ماتش',
                  text: 'تابع مباريات كأس العالم مباشرة مع تحليلات فورية.',
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ رابط التطبيق');
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-3xl bg-green-500 px-4 py-3 text-sm font-semibold text-white"
          >
            <Share2 className="w-4 h-4" /> مشاركة التطبيق
          </button>
        </div>
      </div>
    </div>
  );
}
