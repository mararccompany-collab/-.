import { useState, useEffect, useRef } from 'react';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const calc = () => {
      const now = Date.now();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff <= 0) { setTimeLeft('الآن!'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (h > 24) {
        const d = Math.floor(h / 24);
        setTimeLeft(`${d} يوم ${h % 24} ساعة`);
      } else {
        setTimeLeft(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      }
    };
    calc();
    const interval = diffInHours(targetDate) > 24 ? 60000 : 1000;
    timerRef.current = setInterval(calc, interval);
    return () => clearInterval(timerRef.current);
  }, [targetDate]);

  return (
    <span className="text-green-400 font-bold text-xs" style={{ fontFamily: 'Orbitron', direction: 'ltr', display: 'inline-block' }}>
      {timeLeft}
    </span>
  );
}

function diffInHours(date: string): number {
  return (new Date(date).getTime() - Date.now()) / 3600000;
}
