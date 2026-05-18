import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import type { Template } from '../data/templates';
import { TemplateCard } from './TemplateCard';

interface HomeTabProps {
  onSelectTemplate: (template: Template) => void;
  onCustomUpload: (imgData: string, title: string) => void;
}

const CATEGORIES = ['All', 'Animals', 'Space', 'Fantasy', 'Cute'];

export const HomeTab: React.FC<HomeTabProps> = ({ onSelectTemplate, onCustomUpload }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCustomUpload(event.target.result as string, file.name.split('.')[0]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter templates based on search query and category
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-tab-container">
      {/* Playful Search Bar Section */}
      <div className="search-section">
        <div className="search-input-wrapper" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
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
          
          <label className="bouncy-btn bouncy-btn-upload" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.4rem',
            backgroundColor: 'var(--color-primary-soft)',
            color: 'var(--color-dark)',
            borderRadius: 'var(--radius-pill)',
            border: 'var(--border-thick)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '1.05rem',
            boxShadow: 'var(--shadow-comic-small)'
          }}>
            <span>📸 Custom Photo</span>
            <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
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
