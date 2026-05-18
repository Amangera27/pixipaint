import React from 'react';

interface HeaderProps {
  stars: number;
}

export const Header: React.FC<HeaderProps> = ({ stars }) => {
  return (
    <header className="kids-header">
      <div className="header-logo-container">
        <div className="logo-icon-bubble">🎨</div>
        <div className="logo-text-group">
          <h1 className="logo-title">
            <span>P</span>
            <span>i</span>
            <span>x</span>
            <span>i</span>
            <span>P</span>
            <span>a</span>
            <span>i</span>
            <span>n</span>
            <span>t</span>
            <span className="logo-sub-tag">Kids</span>
          </h1>
          <p className="logo-subtitle">Your Magical Coloring World!</p>
        </div>
      </div>
      
      <div className="header-stars-badge">
        <span className="star-icon">⭐</span>
        <span className="star-count">{stars} Stars</span>
      </div>
    </header>
  );
};
