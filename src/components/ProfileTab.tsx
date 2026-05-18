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

  // Multi-profile props
  profiles: Array<{
    id: string;
    name: string;
    avatar: string;
    stars: number;
    unlockedTemplates: string[];
    galleryItems: any[];
  }>;
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  onCreateProfile: (name: string, avatar: string) => void;
  onDeleteProfile: (id: string) => void;
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
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  // Profile creation states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState(AVATARS[0].emoji);

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
      {/* 🧑‍🤝‍🧑 Family / Kids Profile Switcher */}
      <div className="profile-section section-switcher" style={{ marginBottom: '2rem' }}>
        <h3 className="section-subtitle">🧑‍🤝‍🧑 Switch Profile / Account</h3>
        <div className="profiles-switcher-list">
          {profiles?.map((p) => (
            <div key={p.id} className={`profile-switcher-card ${p.id === activeProfileId ? 'active' : ''}`}>
              <div className="profile-switcher-tap-area" onClick={() => onSelectProfile(p.id)}>
                <span className="profile-switcher-avatar">{p.avatar}</span>
                <div className="profile-switcher-text-group">
                  <span className="profile-switcher-name">{p.name}</span>
                  <span className="profile-switcher-stars">⭐ {p.stars} Stars</span>
                </div>
              </div>
              {profiles.length > 1 && (
                <button className="delete-profile-icon" onClick={() => onDeleteProfile(p.id)} title="Delete Profile">
                  🗑️
                </button>
              )}
            </div>
          ))}
          
          {/* Create New Profile Button */}
          {profiles?.length < 6 && (
            <button className="add-profile-btn bouncy-btn" onClick={() => setShowCreateForm(true)}>
              <span>➕ Add Kid</span>
            </button>
          )}
        </div>
      </div>

      {showCreateForm && (
        <div className="create-profile-modal-overlay">
          <div className="create-profile-card">
            <h3>🎨 Add a New Artist!</h3>
            <p>Create a separate account for another child or artist.</p>
            
            <div className="create-profile-form-group">
              <label>Artist Name:</label>
              <input 
                type="text"
                maxLength={12}
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="Enter Name"
                className="new-profile-name-input"
              />
            </div>

            <div className="create-profile-form-group">
              <label>Choose your character:</label>
              <div className="new-profile-avatars">
                {AVATARS.map((av) => (
                  <button
                    key={av.emoji}
                    type="button"
                    className={`new-avatar-btn ${newProfileAvatar === av.emoji ? 'active' : ''}`}
                    onClick={() => setNewProfileAvatar(av.emoji)}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="create-profile-btn-row">
              <button className="cancel-create-btn control-btn-pill" onClick={() => setShowCreateForm(false)}>
                Cancel
              </button>
              <button 
                className="confirm-create-btn control-btn-pill accent-btn bouncy-btn" 
                onClick={() => {
                  onCreateProfile(newProfileName || 'New Artist', newProfileAvatar);
                  setNewProfileName('');
                  setShowCreateForm(false);
                }}
              >
                Create! ✨
              </button>
            </div>
          </div>
        </div>
      )}

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
