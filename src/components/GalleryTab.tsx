import React from 'react';

export interface GalleryItem {
  id: string;
  templateId: string;
  title: string;
  imgData: string; // Base64 Canvas data URL
  date: string;
}

interface GalleryTabProps {
  galleryItems: GalleryItem[];
  onDelete: (id: string) => void;
  onDownload: (item: GalleryItem) => void;
  onReopen: (item: GalleryItem) => void;
  onNavigateHome: () => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({
  galleryItems,
  onDelete,
  onDownload,
  onReopen,
  onNavigateHome,
}) => {
  return (
    <div className="gallery-tab-container">
      <div className="section-header-row">
        <h2 className="section-title">🏆 My Masterpiece Gallery</h2>
        <span className="count-indicator">{galleryItems.length} Saved</span>
      </div>

      {galleryItems.length > 0 ? (
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-card">
              <div className="gallery-preview-wrapper">
                <img src={item.imgData} alt={item.title} className="gallery-image" />
                <div className="gallery-card-hover-overlay">
                  <button 
                    className="gallery-btn reopen-btn"
                    onClick={() => onReopen(item)}
                    title="Color Again"
                  >
                    ✏️ Color
                  </button>
                  <button 
                    className="gallery-btn download-btn"
                    onClick={() => onDownload(item)}
                    title="Save to Computer"
                  >
                    💾 Save
                  </button>
                </div>
              </div>
              <div className="gallery-card-info">
                <h3 className="gallery-card-title">{item.title}</h3>
                <div className="gallery-card-meta">
                  <span className="gallery-date">{item.date}</span>
                  <button 
                    className="delete-gallery-item-btn"
                    onClick={() => onDelete(item.id)}
                    title="Remove Drawing"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-gallery-bubble">
          <div className="empty-gallery-emoji">🖼️</div>
          <h3>Your Art Gallery is Empty!</h3>
          <p>You haven't colored any pictures yet. Go to the Home tab, pick a drawing, and paint it with beautiful colors!</p>
          <button className="bouncy-btn start-coloring-cta" onClick={onNavigateHome}>
            Start Painting Now! 🎨
          </button>
        </div>
      )}
    </div>
  );
};
