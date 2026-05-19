import React, { useState } from 'react';
import type { Template } from '../data/templates';
import { DrawingTemplatePage } from './DrawingTemplatePage';
import { CustomPhotoPage } from './CustomPhotoPage';
import { ColorGame } from './ColorGame';

interface HomeTabProps {
  onSelectTemplate: (template: Template) => void;
  onCustomUpload: (imgData: string, title: string) => void;
  onEarnStars: (count: number) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onSelectTemplate, onCustomUpload, onEarnStars }) => {
  const [currentPage, setCurrentPage] = useState<'menu' | 'templates' | 'photo' | 'game'>('menu');

  return (
    <div className="home-tab-container">
      {currentPage === 'menu' && (
        /* --- Clean Home Portal / Dashboard View --- */
        <div className="portal-dashboard-wrapper">
          <h2 className="portal-welcome-title">🎈 Let's Start Creating, Artist!</h2>
          <p className="portal-welcome-subtitle">Choose a magical creative zone below to begin painting!</p>
          
          <div className="portal-cards-grid">
            {/* Card 1: Drawing Templates */}
            <div 
              className="portal-zone-card card-drawing-book bouncy-btn" 
              onClick={() => setCurrentPage('templates')}
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

            {/* Card 2: Custom Photo Outline */}
            <div 
              className="portal-zone-card card-photo-scanner bouncy-btn"
              onClick={() => setCurrentPage('photo')}
            >
              <div className="zone-card-emoji-container">
                <span className="zone-emoji">📸🪄</span>
              </div>
              <div className="zone-card-content">
                <div className="zone-badge accent-badge">Magic AI Outline</div>
                <h3>Custom Photo Outline</h3>
                <p>Upload a real-world picture from your camera/device and magically convert it into a coloring sketch! 🪄🎨</p>
                <div className="zone-action-btn">
                  Upload & Scan 📸 ➔
                </div>
              </div>
            </div>

            {/* Card 3: Colour Guess Game */}
            <div 
              className="portal-zone-card card-color-game bouncy-btn" 
              onClick={() => setCurrentPage('game')}
            >
              <div className="zone-card-emoji-container">
                <span className="zone-emoji">🎮🌈</span>
              </div>
              <div className="zone-card-content">
                <div className="zone-badge game-badge">Play & Earn 10 Stars ⭐</div>
                <h3>Colour Guess Game</h3>
                <p>Beat the 3-second timer and answer 6 magical color mixing questions to win 10 shiny stars! 🌟⏰</p>
                <div className="zone-action-btn">
                  Play Game 🎮 ➔
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'templates' && (
        <DrawingTemplatePage 
          onSelectTemplate={onSelectTemplate}
          onBack={() => setCurrentPage('menu')}
        />
      )}

      {currentPage === 'photo' && (
        <CustomPhotoPage 
          onCustomUpload={onCustomUpload}
          onBack={() => setCurrentPage('menu')}
        />
      )}

      {currentPage === 'game' && (
        <ColorGame 
          onBack={() => setCurrentPage('menu')}
          onEarnStars={onEarnStars}
        />
      )}
    </div>
  );
};
