import { useEffect, useState } from 'react';

export default function ProgressRing({
  progress = 0,
  size = 'medium',
  strokeWidth = 4,
  className = '',
  showPercentage = true,
  color = 'lime'
}) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Size configurations
  const sizes = {
    small: { width: 32, height: 32, fontSize: 'text-xs' },
    medium: { width: 48, height: 48, fontSize: 'text-sm' },
    large: { width: 64, height: 64, fontSize: 'text-base' },
    xlarge: { width: 80, height: 80, fontSize: 'text-lg' }
  };

  const { width, height, fontSize } = sizes[size] || sizes.medium;
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  // Color configurations
  const colors = {
    lime: {
      progress: '#CBF901',
      background: '#374151',
      text: 'text-lime-500'
    },
    blue: {
      progress: '#3B82F6',
      background: '#374151',
      text: 'text-blue-500'
    },
    red: {
      progress: '#EF4444',
      background: '#374151',
      text: 'text-red-500'
    },
    green: {
      progress: '#10B981',
      background: '#374151',
      text: 'text-green-500'
    }
  };

  const colorConfig = colors[color] || colors.lime;

  // Animate progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={colorConfig.background}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={colorConfig.progress}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 6px ${colorConfig.progress}40)`
          }}
        />
      </svg>

      {/* Percentage text */}
      {showPercentage && (
        <div className={`absolute inset-0 flex items-center justify-center ${fontSize} font-medium ${colorConfig.text}`}>
          {Math.round(displayProgress)}%
        </div>
      )}

      {/* Pulse effect for active uploading */}
      {progress > 0 && progress < 100 && (
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            backgroundColor: colorConfig.progress,
            animationDuration: '2s'
          }}
        />
      )}
    </div>
  );
}