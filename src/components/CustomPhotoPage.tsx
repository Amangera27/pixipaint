import React, { useState } from 'react';

interface CustomPhotoPageProps {
  onCustomUpload: (imgData: string, title: string) => void;
  onBack: () => void;
}

export const CustomPhotoPage: React.FC<CustomPhotoPageProps> = ({ onCustomUpload, onBack }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onCustomUpload(event.target.result as string, file.name.split('.')[0]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        processFile(file);
      } else {
        alert("Oops! Please drop a valid image file (PNG or JPEG) 📸");
      }
    }
  };

  return (
    <div className="custom-photo-page-wrapper" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Back Header */}
      <div className="library-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className="library-back-btn bouncy-btn control-btn-pill" 
          onClick={onBack}
        >
          👈 Back to Main Menu
        </button>
        <h3 className="library-header-title">📸 Photo Outline Scanner</h3>
      </div>

      <div className="photo-scan-intro-card" style={{
        background: 'white',
        border: 'var(--border-thick)',
        borderRadius: '32px',
        padding: '2.5rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-comic)',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <span style={{ fontSize: '4.5rem', display: 'inline-block', marginBottom: '1rem' }}>📸🪄</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.8rem' }}>
          Magic Sketch Edge Extractor!
        </h2>
        <p style={{ fontWeight: 600, color: 'var(--color-dark)', opacity: 0.85, fontSize: '1.05rem', marginBottom: '2rem' }}>
          Upload any colorful cartoon photo, selfie, or pet picture from your computer. Our Magic Laser Scanner will remove all colors and leave only clean, dark outlines for you to color! ⚡✨
        </p>

        {/* Drag & Drop Upload Zone */}
        <label 
          className={`upload-drop-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px dashed var(--color-primary-soft)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            backgroundColor: dragActive ? 'rgba(255, 77, 109, 0.05)' : '#fdfdfd',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '2rem',
            position: 'relative'
          }}
        >
          <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>📥</span>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
            {dragActive ? 'Drop your picture here!' : 'Click to Upload or Drag & Drop'}
          </h4>
          <p style={{ fontWeight: 600, color: 'var(--color-dark)', opacity: 0.6, fontSize: '0.9rem' }}>
            Supports JPG, JPEG, PNG format images
          </p>
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />
        </label>

        {/* Tip Box */}
        <div style={{
          background: 'var(--color-bg-light)',
          border: 'var(--border-thin)',
          borderRadius: '18px',
          padding: '1.2rem',
          textAlign: 'left'
        }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
            💡 Quick Tips for Best Results:
          </h4>
          <ul style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-dark)', opacity: 0.85, paddingLeft: '1.2rem', margin: 0, lineHeight: 1.5 }}>
            <li>Bright, high-contrast images work best.</li>
            <li>Cartoon drawings and clean sketches yield excellent coloring outlines.</li>
            <li>Make sure there is a profile avatar selected to save your work!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
