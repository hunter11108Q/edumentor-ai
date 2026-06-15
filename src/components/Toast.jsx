import React from 'react';
import { useLearn } from '../context/LearnContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, setToast } = useLearn();

  if (!toast || !toast.show) return null;

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          icon: <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-red-500/10 border-red-500/20 text-red-400',
          icon: <AlertCircle size={16} className="text-red-500 shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          icon: <Info size={16} className="text-blue-500 shrink-0" />
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300 max-w-sm ${styles.bg}`}>
        {styles.icon}
        <p className="text-xs font-medium leading-normal">{toast.message}</p>
      </div>
    </div>
  );
}
