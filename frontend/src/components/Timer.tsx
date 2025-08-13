import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useTestStore } from "../store/testStore";

interface TimerProps {
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const { timeRemaining, setTimeRemaining } = useTestStore();

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, setTimeRemaining, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const isLowTime = timeRemaining <= 60;
  const isCriticalTime = timeRemaining <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold transition-colors ${
        isCriticalTime
          ? "bg-red-100 text-red-800 animate-pulse"
          : isLowTime
          ? "bg-yellow-100 text-yellow-800"
          : "bg-blue-100 text-blue-800"
      }`}
    >
      <Clock size={20} />
      <span>{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
