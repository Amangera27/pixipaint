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
        {/* Render the SVG outline inside the card */}
        <div 
          className="card-svg-preview"
          dangerouslySetInnerHTML={{ __html: template.svgContent }}
        />
        
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
