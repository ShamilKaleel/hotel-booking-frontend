export default function ImageUploadSkeleton({
  count = 1,
  className = '',
  animated = true
}) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`
        h-32 rounded-2xl border-2 border-zinc-700/50 bg-zinc-800/30 relative overflow-hidden
        ${animated ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {/* Shimmer overlay */}
      {animated && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {/* Skeleton content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Icon placeholder */}
          <div className="w-12 h-12 bg-zinc-700/50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Text placeholders */}
          <div className="space-y-1">
            <div className="h-3 bg-zinc-700/50 rounded w-16 mx-auto" />
            <div className="h-2 bg-zinc-700/30 rounded w-12 mx-auto" />
          </div>
        </div>
      </div>

      {/* Loading indicator dots */}
      <div className="absolute bottom-2 right-2">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {skeletons}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}

// Grid wrapper component for multiple skeletons
export function ImageUploadSkeletonGrid({
  count = 3,
  className = '',
  gridCols = 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
}) {
  return (
    <div className={`grid gap-2 ${gridCols} ${className}`}>
      <ImageUploadSkeleton count={count} />
    </div>
  );
}

// Loading placeholder for upload queue
export function UploadQueueSkeleton({ count = 2 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/30 animate-pulse"
        >
          {/* Progress circle placeholder */}
          <div className="w-8 h-8 bg-zinc-700/50 rounded-full flex-shrink-0" />

          {/* File info placeholder */}
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-zinc-700/50 rounded w-3/4" />
            <div className="h-2 bg-zinc-700/30 rounded w-1/2" />
          </div>

          {/* Action button placeholder */}
          <div className="w-12 h-6 bg-zinc-700/30 rounded flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}