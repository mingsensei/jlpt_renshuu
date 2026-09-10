import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTick?: (remaining: number) => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onTimeUp,
  onTick,
  isPaused = false
}) => {
  const [remaining, setRemaining] = useState<number>(initialSeconds);

  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused) return;

    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (onTick) onTick(next);
        if (next <= 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, isPaused, onTimeUp, onTick]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isLowTime = remaining <= 60;
  const isWarningTime = remaining <= 300 && remaining > 60;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-mono font-medium border transition-colors ${
        isLowTime
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
          : isWarningTime
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-white border-gray-200 text-gray-700 shadow-sm'
      }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-rose-600" />
      ) : (
        <Clock className="w-4 h-4 text-gray-500" />
      )}
      <span>{formatTime(remaining)}</span>
    </div>
  );
};
