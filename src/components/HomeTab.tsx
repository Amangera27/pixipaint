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
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

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

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 0) {
      setIsLibraryOpen(true);
    }
  };

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
              onChange={(e) => handleSearchChange(e.target.value)}
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

      {!isLibraryOpen ? (
        /* --- Clean Home Portal / Dashboard View --- */
        <div className="portal-dashboard-wrapper">
          <h2 className="portal-welcome-title">🎈 Let's Start Creating, Artist!</h2>
          <p className="portal-welcome-subtitle">Choose a magical creative zone below to begin painting!</p>
          
          <div className="portal-cards-grid">
            {/* Zone 1: Magic Drawing Book */}
            <div 
              className="portal-zone-card card-drawing-book bouncy-btn" 
              onClick={() => setIsLibraryOpen(true)}
            >
              <div className="zone-card-emoji-container">
                <span className="zone-emoji">🎨📖</span>
              </div>
              <div className="zone-card-content">
                <div className="zone-badge">10+ Premium Designs</div>
                <h3>Drawing Templates</h3>
                <p>Explore unicorns, dragons, dinosaurs, heroes & castles to paint with magical colors! 🦄✨</p>
                <div className="zone-action-btn">
                  Open Drawing Book 📖 ➔
                </div>
              </div>
            </div>

            {/* Zone 2: Magic Custom Photo Scanner */}
            <div className="portal-zone-card card-photo-scanner">
              <div className="zone-card-emoji-container">
                <span className="zone-emoji">📸🪄</span>
              </div>
              <div className="zone-card-content">
                <div className="zone-badge accent-badge">Magic AI Outline</div>
                <h3>Custom Photo Outline</h3>
                <p>Upload a real-world picture from your camera/device and magically convert it into a coloring sketch! 🪄🎨</p>
                <label className="zone-action-btn bouncy-btn" style={{ display: 'inline-flex', cursor: 'pointer', margin: 0 }}>
                  Upload & Scan 📸 ➔
                  <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- Library Outlines View --- */
        <div className="library-outlines-wrapper">
          {/* Back button to go back to dashboard */}
          <div className="library-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              className="library-back-btn bouncy-btn control-btn-pill" 
              onClick={() => {
                setIsLibraryOpen(false);
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              👈 Back to Main Menu
            </button>
            <h3 className="library-header-title">📖 Templates Library</h3>
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
      )}
    </div>
  );
};
