import React from 'react';
import type { Template } from '../data/templates';

interface TemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onStartColoring: (template: Template) => void;
  stars: number;
  unlockedTemplates: string[];
  onUnlock: (id: string) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  template,
  isOpen,
  onClose,
  onStartColoring,
  stars,
  unlockedTemplates,
  onUnlock,
}) => {
  if (!isOpen || !template) return null;

  const isUnlocked = !template.isPremium || unlockedTemplates.includes(template.id);
  const canUnlock = stars >= 10;

  const handleUnlockClick = () => {
    if (canUnlock) {
      onUnlock(template.id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>❌</button>
        
        <div className="modal-grid">
          <div className="modal-preview-side">
            <div className="modal-svg-preview">
              {template.svgContent.includes('.png') || template.svgContent.startsWith('data:image/') ? (
                <img src={template.svgContent} alt={template.title} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: template.svgContent }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              )}
            </div>
          </div>
          
          <div className="modal-details-side">
            <div>
              <span className="modal-category">{template.category}</span>
              <h2 className="modal-title">{template.title}</h2>
              
              <div className="modal-badge-row">
                <span className={`difficulty-badge diff-${template.difficulty.toLowerCase()}`}>
                  {template.difficulty} Mode
                </span>
                {template.isPremium ? (
                  <span className="premium-badge">💎 Premium Template</span>
                ) : (
                  <span className="free-badge">🎉 Free to Color</span>
                )}
              </div>
              
              <p className="modal-description">
                {template.isPremium 
                  ? "This is a special premium drawing. Unlock it with your shining stars to start coloring!" 
                  : "Grab your virtual paint bucket and brushes, and let's bring this beautiful drawing to life!"}
              </p>
            </div>

            <div className="modal-action-box">
              {isUnlocked ? (
                <button 
                  className="start-coloring-btn bouncy-btn" 
                  onClick={() => onStartColoring(template)}
                >
                  Start Coloring 🎨
                </button>
              ) : (
                <div className="unlock-container">
                  <div className="unlock-info">
                    <span>Cost to Unlock:</span>
                    <span className="star-price">⭐ 10 Stars</span>
                  </div>
                  {canUnlock ? (
                    <button 
                      className="unlock-btn bouncy-btn" 
                      onClick={handleUnlockClick}
                    >
                      Unlock Now! ✨
                    </button>
                  ) : (
                    <div className="not-enough-stars">
                      <span>Need {10 - stars} more ⭐ to unlock!</span>
                      <button className="unlock-disabled-btn" disabled>
                        Color Free Images to Earn Stars!
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
