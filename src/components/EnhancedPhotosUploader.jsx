import axios from "axios";
import { useState, useCallback } from "react";
import ImageUploadCard from "./ImageUploadCard";
import UploadStatusBadge from "./UploadStatusBadge";
import { ImageUploadSkeletonGrid, UploadQueueSkeleton } from "./ImageUploadSkeleton";

export default function EnhancedPhotosUploader({ addedPhotos, onChange }) {
  // Upload state management
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);

  // Utility functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateFileId = (file) => {
    return `${file.name}-${file.size}-${Date.now()}`;
  };

  // Enhanced upload function with progress tracking
  const uploadPhoto = useCallback(async (ev) => {
    const files = Array.from(ev.target.files);
    if (!files.length) return;

    setIsUploading(true);

    // Add files to upload queue
    const queueItems = files.map(file => ({
      id: generateFileId(file),
      file,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'queued'
    }));

    setUploadQueue(prev => [...prev, ...queueItems]);

    // Process each file
    for (const queueItem of queueItems) {
      const { id, file, name, size } = queueItem;

      try {
        // Update status to uploading
        setUploadingFiles(prev => ({ ...prev, [id]: true }));
        setUploadQueue(prev =>
          prev.map(item =>
            item.id === id ? { ...item, status: 'uploading' } : item
          )
        );

        // Create form data
        const data = new FormData();
        data.append("photos", file);

        // Upload with progress tracking
        const response = await axios.post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(prev => ({ ...prev, [id]: percentCompleted }));
          },
        });

        // Update to processing status
        setUploadQueue(prev =>
          prev.map(item =>
            item.id === id ? { ...item, status: 'processing' } : item
          )
        );

        // Simulate processing delay (remove if not needed)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Success - add to photos
        const { data: filenames } = response;
        onChange((prev) => [...prev, ...filenames]);

        // Update to success status
        setUploadQueue(prev =>
          prev.map(item =>
            item.id === id ? { ...item, status: 'success', url: filenames[0] } : item
          )
        );

        // Clean up after delay
        setTimeout(() => {
          setUploadingFiles(prev => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
          });
          setUploadProgress(prev => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
          });
          setUploadQueue(prev => prev.filter(item => item.id !== id));
        }, 2000);

      } catch (error) {
        console.error("Upload failed:", error);

        const errorMessage = error.response?.data?.message || error.message || "Upload failed";

        setUploadErrors(prev => ({ ...prev, [id]: errorMessage }));
        setUploadQueue(prev =>
          prev.map(item =>
            item.id === id ? { ...item, status: 'error', error: errorMessage } : item
          )
        );
        setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }
    }

    setIsUploading(false);
    // Reset file input
    ev.target.value = '';
  }, [onChange]);

  // Retry failed upload
  const retryUpload = useCallback(async (queueItem) => {
    const { id, file } = queueItem;

    try {
      setUploadingFiles(prev => ({ ...prev, [id]: true }));
      setUploadErrors(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      setUploadQueue(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: 'uploading', error: null } : item
        )
      );

      const data = new FormData();
      data.append("photos", file);

      const response = await axios.post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(prev => ({ ...prev, [id]: percentCompleted }));
        },
      });

      const { data: filenames } = response;
      onChange((prev) => [...prev, ...filenames]);

      setUploadQueue(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: 'success', url: filenames[0] } : item
        )
      );

      setTimeout(() => {
        setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setUploadProgress(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setUploadQueue(prev => prev.filter(item => item.id !== id));
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Retry failed";
      setUploadErrors(prev => ({ ...prev, [id]: errorMessage }));
      setUploadQueue(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: 'error', error: errorMessage } : item
        )
      );
      setUploadingFiles(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  }, [onChange]);

  // Remove photo function
  const removePhoto = useCallback(async (ev, url) => {
    ev.preventDefault();
    try {
      const filename = url.split(
        `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.amazonaws.com/`
      )[1];

      await axios.delete(`/places/image/${filename}`);
      onChange([...addedPhotos.filter((photo) => photo !== url)]);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  }, [addedPhotos, onChange]);

  // Set as main photo function
  const selectAsMainPhoto = useCallback((ev, filename) => {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }, [addedPhotos, onChange]);

  return (
    <div className="space-y-4">
      {/* Upload Queue Status */}
      {uploadQueue.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Upload Progress</h4>
          <div className="space-y-2">
            {uploadQueue.map((item) => (
              <UploadStatusBadge
                key={item.id}
                status={item.status}
                progress={uploadProgress[item.id] || 0}
                fileName={item.name}
                fileSize={item.size}
                error={item.error}
                onRetry={() => retryUpload(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Images Grid */}
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Existing photos */}
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <ImageUploadCard
              key={`photo-${index}`}
              imageUrl={link}
              uploadStatus="success"
              isMainPhoto={index === 0}
              onRemove={(ev) => removePhoto(ev, link)}
              onSetAsMain={(ev) => selectAsMainPhoto(ev, link)}
            />
          ))}

        {/* Upload button */}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border-2 border-dashed border-zinc-600 hover:border-zinc-500 bg-transparent hover:bg-zinc-800/30 rounded-2xl p-2 text-2xl text-gray-400 hover:text-gray-300 transition-all duration-200 group">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={uploadPhoto}
            disabled={isUploading}
          />
          <div className="text-center">
            {isUploading ? (
              <>
                <div className="w-8 h-8 border-2 border-lime-500/30 border-t-lime-500 rounded-full animate-spin mx-auto mb-2" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                <span className="text-sm">Upload Photos</span>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Upload Statistics */}
      {(isUploading || uploadQueue.length > 0) && (
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-zinc-700">
          <span>
            {uploadQueue.filter(item => item.status === 'success').length} of {uploadQueue.length} uploaded
          </span>
          {isUploading && (
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              Uploading...
            </span>
          )}
        </div>
      )}
    </div>
  );
}