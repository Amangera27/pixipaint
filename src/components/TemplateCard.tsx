import React from 'react';
import type { Template } from '../data/templates';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'diff-easy';
      case 'Medium': return 'diff-medium';
      case 'Hard': return 'diff-hard';
      default: return '';
    }
  };

  return (
    <div 
      className={`template-card ${template.isPremium ? 'premium-border' : ''}`}
      onClick={() => onSelect(template)}
    >
      <div className="card-preview-container">
        {/* Render the preview (SVG outline or PNG image) */}
        <div className="card-svg-preview">
          {template.svgContent.includes('.png') || template.svgContent.startsWith('data:image/') ? (
            <img src={template.svgContent} alt={template.title} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: template.svgContent }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          )}
        </div>
        
        {/* Badges */}
        <div className="card-badges">
          <span className={`difficulty-badge ${getDifficultyColor(template.difficulty)}`}>
            {template.difficulty}
          </span>
          {template.isPremium ? (
            <span className="premium-badge">💎 Premium</span>
          ) : (
            <span className="free-badge">🎉 Free</span>
          )}
        </div>
      </div>
      
      <div className="card-info">
        <h3 className="card-title">{template.title}</h3>
        <span className="card-category-tag">{template.category}</span>
      </div>
    </div>
  );
};
