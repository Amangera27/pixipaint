import React, { useState } from 'react';

export interface ProfileData {
  name: string;
  avatar: string; // Emoji representing avatar
}

interface ProfileTabProps {
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
  stars: number;
  unlockedCount: number;
  completedCount: number;
}

const AVATARS = [
  { emoji: '🦊', name: 'Friendly Fox' },
  { emoji: '🦁', name: 'Brave Lion' },
  { emoji: '🐼', name: 'Sleepy Panda' },
  { emoji: '🐰', name: 'Happy Bunny' },
  { emoji: '🐻', name: 'Gentle Bear' },
  { emoji: '🐨', name: 'Cute Koala' },
];

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  onUpdateProfile,
  stars,
  unlockedCount,
  completedCount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const handleSaveName = () => {
    onUpdateProfile({ ...profile, name: tempName || 'Super Artist' });
    setIsEditing(false);
  };

  // Fun badges based on stats
  const achievements = [
    {
      id: 'first_splash',
      title: 'First Splash 🌊',
      description: 'Color your very first drawing!',
      isUnlocked: completedCount >= 1,
      badge: '🎨'
    },
    {
      id: 'star_collector',
      title: 'Star Collector ⭐',
      description: 'Unlock at least 1 premium template!',
      isUnlocked: unlockedCount > 0,
      badge: '🔑'
    },
    {
      id: 'rainbow_maker',
      title: 'Rainbow Maker 🌈',
      description: 'Complete 3 coloring creations!',
      isUnlocked: completedCount >= 3,
      badge: '🏆'
    },
    {
      id: 'canvas_master',
      title: 'Canvas Master 👑',
      description: 'Earn 30 or more shining stars!',
      isUnlocked: stars >= 30,
      badge: '✨'
    }
  ];

  return (
    <div className="profile-tab-container">
      {/* Playful Profile card */}
      <div className="profile-card">
        <div className="profile-avatar-container">
          <div className="profile-avatar-display">{profile.avatar}</div>
          <span className="profile-badge-bubble">Artist</span>
        </div>

        <div className="profile-info-container">
          {isEditing ? (
            <div className="profile-name-edit">
              <input 
                type="text" 
                maxLength={15} 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
                className="profile-name-input"
                placeholder="Your Name"
              />
              <button className="save-profile-btn bouncy-btn" onClick={handleSaveName}>Save</button>
            </div>
          ) : (
            <div className="profile-name-display">
              <h2>{profile.name}</h2>
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>✏️ Edit Name</button>
            </div>
          )}
          <p className="profile-tagline">PixiPaint Creative Explorer</p>
        </div>
      </div>

      {/* Avatar Selector */}
      <div className="profile-section">
        <h3 className="section-subtitle">🦊 Pick Your Character</h3>
        <div className="avatars-grid">
          {AVATARS.map((av) => (
            <button
              key={av.emoji}
              className={`avatar-choice-btn ${profile.avatar === av.emoji ? 'active' : ''}`}
              onClick={() => onUpdateProfile({ ...profile, avatar: av.emoji })}
              title={av.name}
            >
              <span className="avatar-choice-emoji">{av.emoji}</span>
              <span className="avatar-choice-name">{av.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Board */}
      <div className="profile-section">
        <h3 className="section-subtitle">📊 My Artist Stats</h3>
        <div className="stats-grid">
          <div className="stat-box box-stars">
            <span className="stat-emoji">⭐</span>
            <span className="stat-value">{stars}</span>
            <span className="stat-label">Stars Earned</span>
          </div>
          <div className="stat-box box-drawings">
            <span className="stat-emoji">🖼️</span>
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Masterpieces</span>
          </div>
          <div className="stat-box box-unlocked">
            <span className="stat-emoji">💎</span>
            <span className="stat-value">{unlockedCount}</span>
            <span className="stat-label">Premium Unlocked</span>
          </div>
        </div>
      </div>

      {/* Achievements Room */}
      <div className="profile-section">
        <h3 className="section-subtitle">🏆 My Trophy Room</h3>
        <div className="achievements-container">
          {achievements.map((ach) => (
            <div key={ach.id} className={`achievement-item ${ach.isUnlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-badge-icon">{ach.badge}</div>
              <div className="achievement-details">
                <h4>{ach.title}</h4>
                <p>{ach.description}</p>
              </div>
              <div className="achievement-status-badge">
                {ach.isUnlocked ? '✅ Unlocked' : '🔒 Locked'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
