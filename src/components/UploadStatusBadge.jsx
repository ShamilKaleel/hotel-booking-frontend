import ProgressRing from './ProgressRing';

export default function UploadStatusBadge({
  status = 'idle',
  progress = 0,
  fileName = '',
  fileSize = '',
  error = '',
  onRetry,
  className = ''
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          color: 'lime',
          bgColor: 'bg-zinc-800/90',
          borderColor: 'border-lime-500/30',
          textColor: 'text-lime-400',
          icon: null,
          message: 'Uploading...'
        };
      case 'processing':
        return {
          color: 'blue',
          bgColor: 'bg-zinc-800/90',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400',
          icon: (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ),
          message: 'Processing...'
        };
      case 'success':
        return {
          color: 'green',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          message: 'Uploaded successfully'
        };
      case 'error':
        return {
          color: 'red',
          bgColor: 'bg-red-900/20',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          message: error || 'Upload failed'
        };
      default:
        return {
          color: 'lime',
          bgColor: 'bg-zinc-800/50',
          borderColor: 'border-zinc-600',
          textColor: 'text-gray-400',
          icon: null,
          message: 'Ready to upload'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm
      ${config.bgColor} ${config.borderColor}
      transition-all duration-300 ease-out
      ${className}
    `}>
      {/* Status indicator */}
      <div className="flex-shrink-0">
        {status === 'uploading' && (
          <ProgressRing
            progress={progress}
            size="small"
            color={config.color}
            showPercentage={false}
          />
        )}
        {status !== 'uploading' && config.icon && (
          <div className={`${config.textColor}`}>
            {config.icon}
          </div>
        )}
        {status !== 'uploading' && !config.icon && (
          <div className={`w-4 h-4 rounded-full ${config.textColor.replace('text-', 'bg-')}`} />
        )}
      </div>

      {/* File info and status */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${config.textColor} truncate`}>
          {fileName || config.message}
        </div>

        {/* Progress or additional info */}
        {status === 'uploading' && (
          <div className="text-xs text-gray-400 mt-1">
            {progress}% • {fileSize}
          </div>
        )}

        {status === 'processing' && (
          <div className="text-xs text-gray-400 mt-1">
            Optimizing image...
          </div>
        )}

        {status === 'error' && (
          <div className="text-xs text-red-300 mt-1">
            {error || 'Something went wrong'}
          </div>
        )}

        {status === 'success' && fileSize && (
          <div className="text-xs text-gray-400 mt-1">
            {fileSize}
          </div>
        )}
      </div>

      {/* Actions */}
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg border border-red-500/20 transition-colors duration-200"
        >
          Retry
        </button>
      )}

      {/* Success animation */}
      {status === 'success' && (
        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-50 pointer-events-none" />
      )}
    </div>
  );
}