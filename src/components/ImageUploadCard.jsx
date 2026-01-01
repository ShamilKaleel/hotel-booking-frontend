import { useState } from 'react';
import Image from './Image';
import ProgressRing from './ProgressRing';
import UploadStatusBadge from './UploadStatusBadge';

export default function ImageUploadCard({
  imageUrl,
  uploadStatus = 'idle', // 'idle', 'uploading', 'processing', 'success', 'error'
  uploadProgress = 0,
  fileName = '',
  fileSize = '',
  error = '',
  isMainPhoto = false,
  onRemove,
  onSetAsMain,
  onRetry,
  className = ''
}) {
  const [showPreview, setShowPreview] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCardStyles = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'border-lime-500/50 bg-lime-900/10 shadow-lg shadow-lime-500/20';
      case 'processing':
        return 'border-blue-500/50 bg-blue-900/10 shadow-lg shadow-blue-500/20';
      case 'success':
        return 'border-green-500/30 bg-green-900/5 hover:bg-green-900/10';
      case 'error':
        return 'border-red-500/50 bg-red-900/10 shadow-lg shadow-red-500/20';
      default:
        return 'border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800/50';
    }
  };

  return (
    <div className={`
      relative h-32 rounded-2xl border-2 transition-all duration-300 ease-out group
      ${getCardStyles()}
      ${className}
    `}>
      {/* Main image display */}
      {imageUrl && uploadStatus === 'success' && (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={fileName}
          />

          {/* Image overlay for controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

          {/* Main photo indicator */}
          {isMainPhoto && (
            <div className="absolute top-2 left-2 bg-lime-500 text-black text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Main
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Set as main photo button */}
            {!isMainPhoto && onSetAsMain && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSetAsMain(e);
                }}
                className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors duration-200"
                title="Set as main photo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            )}

            {/* Remove button */}
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(e);
                }}
                className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                title="Remove photo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload progress overlay */}
      {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-xl">
          <div className="text-center">
            {uploadStatus === 'uploading' && (
              <ProgressRing
                progress={uploadProgress}
                size="large"
                color="lime"
                className="mb-2"
              />
            )}

            {uploadStatus === 'processing' && (
              <div className="mb-2">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
              </div>
            )}

            <div className="text-white text-sm font-medium">
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Processing...'}
            </div>

            {fileName && (
              <div className="text-gray-400 text-xs mt-1 max-w-24 truncate">
                {fileName}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {uploadStatus === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm rounded-xl border-2 border-red-500/50">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <div className="text-red-400 text-sm font-medium mb-2">
              Upload failed
            </div>

            {error && (
              <div className="text-red-300 text-xs mb-3 max-w-24 mx-auto">
                {error}
              </div>
            )}

            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg border border-red-500/30 transition-colors duration-200"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* File preview for pending uploads */}
      {uploadStatus === 'idle' && fileName && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="text-gray-300 text-xs max-w-24 truncate">
              {fileName}
            </div>

            {fileSize && (
              <div className="text-gray-500 text-xs mt-1">
                {typeof fileSize === 'number' ? formatFileSize(fileSize) : fileSize}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pulse animation for active states */}
      {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
        <div className="absolute inset-0 rounded-xl border-2 border-lime-400 animate-pulse opacity-30 pointer-events-none" />
      )}
    </div>
  );
}