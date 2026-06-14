import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { HiCloudArrowUp, HiDocument, HiXMark } from 'react-icons/hi2';
import './ResumeUploader.scss';

const ResumeUploader = ({ file, onChange, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((selectedFile) => {
    if (selectedFile) onChange(selectedFile);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }, [handleFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (e) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="resume-uploader">
      <div
        className={clsx('resume-uploader__dropzone', {
          'resume-uploader__dropzone--active': isDragging,
          'resume-uploader__dropzone--has-file': file,
          'resume-uploader__dropzone--error': error,
        })}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {file ? (
          <div className="resume-uploader__preview">
            <HiDocument className="resume-uploader__file-icon" />
            <div className="resume-uploader__file-info">
              <span className="resume-uploader__file-name">{file.name}</span>
              <span className="resume-uploader__file-size">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <button className="resume-uploader__remove" onClick={removeFile} aria-label="Remove file">
              <HiXMark />
            </button>
          </div>
        ) : (
          <>
            <HiCloudArrowUp className="resume-uploader__icon" />
            <p className="resume-uploader__title">Click to upload or drag & drop</p>
            <p className="resume-uploader__subtitle">PDF only (Max 5MB)</p>
          </>
        )}
      </div>
      {error && <span className="resume-uploader__error">{error}</span>}
    </div>
  );
};

export default ResumeUploader;
