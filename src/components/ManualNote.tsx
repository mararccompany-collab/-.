import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface ManualNoteProps { matchId: string }

export default function ManualNote({ matchId }: ManualNoteProps) {
  const key = `analysis_note_${matchId}`;
  const metaKey = `analysis_note_meta_${matchId}`;
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [expert, setExpert] = useState(false);
  const [confidence, setConfidence] = useState(50);

  useEffect(() => {
    try {
      const v = localStorage.getItem(key) || '';
      const meta = JSON.parse(localStorage.getItem(metaKey) || '{}');
      setText(v);
      setAuthor(meta.author || '');
      setExpert(Boolean(meta.expert));
      setConfidence(meta.confidence || 50);
    } catch { setText(''); }
  }, [key, metaKey]);

  const save = () => {
    try {
      localStorage.setItem(key, text);
      localStorage.setItem(metaKey, JSON.stringify({ author, expert, confidence }));
      alert('تم الحفظ');
    } catch { alert('فشل الحفظ'); }
  };

  const clear = () => {
    try { localStorage.removeItem(key); localStorage.removeItem(metaKey); setText(''); setAuthor(''); setExpert(false); setConfidence(50);} catch { }
  };

  const copyExpert = async () => {
    const prefix = expert ? '[ملاحظة معتمدة]\n' : '';
    const final = `${prefix}${text}\n\nمحرر: ${author || 'غير معروف'} • ثقة: ${confidence}%`;
    try { await navigator.clipboard.writeText(final); alert('نسخ للخبير'); } catch { alert('فشل النسخ'); }
  };

  return (
    <div>
      <div className="mb-2">
        <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="اسم المحرر (اختياري)" className="w-full p-2 mb-2 bg-white/5 rounded-md text-white text-sm" />
        <div className="flex items-center gap-2">
          <label className="text-white/60 text-sm">مُعتمد من خبير</label>
          <input type="checkbox" checked={expert} onChange={e => setExpert(e.target.checked)} />
          <label className="text-white/60 text-sm">ثقة {confidence}%</label>
          <input type="range" min={10} max={100} value={confidence} onChange={e => setConfidence(parseInt(e.target.value))} />
        </div>
      </div>

      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="أضف ملاحظتك التحليلية هنا (Markdown مدعوم)..." className="w-full p-3 bg-white/5 rounded-md text-white text-sm h-28 resize-none" />
      <div className="flex gap-2 mt-2">
        <button onClick={save} className="bg-green-500 px-3 py-1 rounded-lg text-white">حفظ</button>
        <button onClick={clear} className="bg-white/5 px-3 py-1 rounded-lg text-white/60">مسح</button>
        <button onClick={copyExpert} className="bg-yellow-500 px-3 py-1 rounded-lg text-white/80">نسخ كخبير</button>
      </div>

      <div className="mt-3">
        <div className="text-white/60 text-sm mb-1">معاينة (عرض Markdown)</div>
        <div className="p-3 bg-black/20 rounded-md text-white text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(text || '')) }} />
      </div>
    </div>
  );
}
