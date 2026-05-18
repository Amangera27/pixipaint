import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'gallery' | 'profile';
  setActiveTab: (tab: 'home' | 'gallery' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} 
        onClick={() => setActiveTab('home')}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
        {activeTab === 'home' && <span className="nav-dot"></span>}
      </button>

      <button 
        className={`nav-item ${activeTab === 'gallery' ? 'active' : ''}`} 
        onClick={() => setActiveTab('gallery')}
      >
        <span className="nav-icon">🎨</span>
        <span className="nav-label">Gallery</span>
        {activeTab === 'gallery' && <span className="nav-dot"></span>}
      </button>

      <button 
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} 
        onClick={() => setActiveTab('profile')}
      >
        <span className="nav-icon">🦊</span>
        <span className="nav-label">Profile</span>
        {activeTab === 'profile' && <span className="nav-dot"></span>}
      </button>
    </nav>
  );
};
