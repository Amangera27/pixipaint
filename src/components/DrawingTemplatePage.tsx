import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import type { Template } from '../data/templates';
import { TemplateCard } from './TemplateCard';

interface DrawingTemplatePageProps {
  onSelectTemplate: (template: Template) => void;
  onBack: () => void;
}

const CATEGORIES = ['All', 'Animals', 'Space', 'Fantasy', 'Cute'];

export const DrawingTemplatePage: React.FC<DrawingTemplatePageProps> = ({ onSelectTemplate, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter templates based on search query and category
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="library-outlines-wrapper">
      {/* Back button to go back to dashboard */}
      <div className="library-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className="library-back-btn bouncy-btn control-btn-pill" 
          onClick={onBack}
        >
          👈 Back to Main Menu
        </button>
        <h3 className="library-header-title">📖 Templates Library</h3>
      </div>

      {/* Playful Search Bar Section */}
      <div className="search-section" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <span className="search-emoji-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search for your favorite drawings (e.g. Bear, Castle)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="kids-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>❌</button>
          )}
        </div>
      </div>

      {/* Sweet Candy-like Category Filter Tabs */}
      <div className="category-section">
        <h3 className="section-subtitle">🎈 Choose a Category</h3>
        <div className="category-tabs-container">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`category-pill pill-${category.toLowerCase()} ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="pill-emoji">
                {category === 'All' && '⭐'}
                {category === 'Animals' && '🦁'}
                {category === 'Space' && '🚀'}
                {category === 'Fantasy' && '🦄'}
                {category === 'Cute' && '💖'}
              </span>
              <span className="pill-text">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="templates-section">
        <div className="section-header-row">
          <h2 className="section-title">🎨 Select a Design to Color</h2>
          <span className="count-indicator">{filteredTemplates.length} Designs</span>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="templates-grid">
            {filteredTemplates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        ) : (
          <div className="no-results-bubble">
            <span className="no-results-emoji">😢</span>
            <h3>Oops! No drawings found...</h3>
            <p>Try searching for something else, or choose a category above!</p>
            <button className="bouncy-btn reset-search-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              Show All Drawings!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
