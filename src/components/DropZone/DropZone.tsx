import React, { useState, useRef, DragEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DropZoneProps {
  /** Callback when files are dropped or selected */
  onDrop: (files: File[]) => void;
  /** Accepted file types (e.g., 'image/*', '.pdf', etc.) */
  accept?: string;
  /** Maximum number of files */
  maxFiles?: number;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show file preview */
  showPreview?: boolean;
  /** Custom class name */
  className?: string;
}

export function DropZone({
  onDrop,
  accept,
  maxFiles,
  maxSize,
  multiple = true,
  disabled = false,
  showPreview = true,
  className = '',
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: File[]): { valid: File[]; errors: string[] } => {
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    for (const file of fileList) {
      if (maxFiles && validFiles.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
        break;
      }

      if (maxSize && file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        newErrors.push(`${file.name} exceeds maximum size of ${sizeMB}MB`);
        continue;
      }

      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim());
        const fileExtension = '.' + file.name.split('.').pop();
        const mimeType = file.type;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            return mimeType.startsWith(type.replace('/*', ''));
          }
          return mimeType === type;
        });

        if (!isAccepted) {
          newErrors.push(`${file.name} is not an accepted file type`);
          continue;
        }
      }

      validFiles.push(file);
    }

    return { valid: validFiles, errors: newErrors };
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    const { valid, errors: validationErrors } = validateFiles(droppedFiles);

    setErrors(validationErrors);

    if (valid.length > 0) {
      const newFiles = multiple ? [...files, ...valid] : valid;
      setFiles(newFiles);
      onDrop(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const { valid, errors: validationErrors } = validateFiles(selectedFiles);

    setErrors(validationErrors);

    if (valid.length > 0) {
      const newFiles = multiple ? [...files, ...valid] : valid;
      setFiles(newFiles);
      onDrop(newFiles);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onDrop(newFiles);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      <div
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8',
          'text-center cursor-pointer transition-all',
          isDragging
            ? 'border-cyan-500 bg-cyan-900/30'
            : disabled
            ? 'border-slate-700 bg-slate-900 cursor-not-allowed'
            : 'border-slate-700 hover:border-cyan-500 hover:bg-cyan-900/20'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <Upload
            className={cn(
              'h-12 w-12',
              isDragging ? 'text-cyan-400' : 'text-slate-500'
            )}
          />
          <div>
            <p className="text-sm font-medium text-slate-100">
              {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {accept && `Accepted: ${accept}`}
              {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
              {maxFiles && ` • Max files: ${maxFiles}`}
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-3 space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-xs text-red-400">
              {error}
            </p>
          ))}
        </div>
      )}

      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-800 border border-slate-700 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-3 text-red-400 hover:text-red-300 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropZone;
