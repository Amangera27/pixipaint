import { useState, useEffect } from 'react';
import './index.css';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { GalleryTab } from './components/GalleryTab';
import type { GalleryItem } from './components/GalleryTab';
import { ProfileTab } from './components/ProfileTab';
import type { ProfileData } from './components/ProfileTab';
import { TemplateModal } from './components/TemplateModal';
import { ColoringCanvas } from './components/ColoringCanvas';
import { ColorGame } from './components/ColorGame';

// Data
import { TEMPLATES } from './data/templates';
import type { Template } from './data/templates';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  unlockedTemplates: string[];
  galleryItems: GalleryItem[];
}

// Fallback default setup to migrate any single-profile data from older sessions seamlessly
const getInitialDefaultProfile = (): Profile => {
  const savedProfileStr = localStorage.getItem('pixipaint_profile');
  const savedProfile = savedProfileStr ? JSON.parse(savedProfileStr) : { name: 'Little Picasso', avatar: '🦊' };
  
  const savedStars = localStorage.getItem('pixipaint_stars');
  const starsVal = savedStars ? Number(savedStars) : 20;

  const savedUnlockedStr = localStorage.getItem('pixipaint_unlocked');
  const unlocked = savedUnlockedStr ? JSON.parse(savedUnlockedStr) : [];

  const savedGalleryStr = localStorage.getItem('pixipaint_gallery');
  const gallery = savedGalleryStr ? JSON.parse(savedGalleryStr) : [];

  return {
    id: 'profile_default',
    name: savedProfile.name,
    avatar: savedProfile.avatar,
    stars: starsVal,
    unlockedTemplates: unlocked,
    galleryItems: gallery,
  };
};

function App() {
  // --- Persistent Multi-Profile States ---
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const saved = localStorage.getItem('pixipaint_active_profile_id');
    return saved || 'profile_default';
  });

  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('pixipaint_profiles');
    if (saved) return JSON.parse(saved);
    return [getInitialDefaultProfile()];
  });

  // Derived current active profile configuration
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || getInitialDefaultProfile();

  // --- Persistent Reactive States ---
  const [stars, setStars] = useState<number>(activeProfile.stars);
  const [profile, setProfile] = useState<ProfileData>({ name: activeProfile.name, avatar: activeProfile.avatar });
  const [unlockedTemplates, setUnlockedTemplates] = useState<string[]>(activeProfile.unlockedTemplates);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(activeProfile.galleryItems);

  // --- UI Routing States ---
  const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'profile'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Active Coloring States ---
  const [activeColoringTemplate, setActiveColoringTemplate] = useState<Template | null>(null);
  const [activeSavedImgData, setActiveSavedImgData] = useState<string | undefined>(undefined);
  const [isNewCustomUpload, setIsNewCustomUpload] = useState(false);
  const [isColorGameActive, setIsColorGameActive] = useState(false);

  // Keep the active profile states updated inside the profiles array
  useEffect(() => {
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfileId) {
        return {
          ...p,
          name: profile.name,
          avatar: profile.avatar,
          stars,
          unlockedTemplates,
          galleryItems
        };
      }
      return p;
    }));
  }, [profile, stars, unlockedTemplates, galleryItems, activeProfileId]);

  // Save profiles array to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pixipaint_profiles', JSON.stringify(profiles));
  }, [profiles]);

  // --- Actions & Handlers ---
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleUnlockTemplate = (id: string) => {
    if (stars >= 10) {
      setStars((prev) => prev - 10);
      setUnlockedTemplates((prev) => [...prev, id]);
    }
  };

  const handleStartColoring = (template: Template) => {
    setIsModalOpen(false);
    setActiveSavedImgData(undefined);
    setActiveColoringTemplate(template);
  };

  const handleAddStars = (earnedCount: number) => {
    setStars((prev) => prev + earnedCount);
  };

  const handleSaveToGallery = (title: string, imgData: string) => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      templateId: activeColoringTemplate?.id || 'custom',
      title: title,
      imgData: imgData,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm('Are you sure you want to remove this drawing from your gallery? 🗑️')) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDownloadGalleryItem = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}-pixipaint.png`;
    link.href = item.imgData;
    link.click();
  };

  const handleReopenGalleryItem = (item: GalleryItem) => {
    // Find the original template in the library
    const original = TEMPLATES.find((t) => t.id === item.templateId);
    if (original) {
      setActiveColoringTemplate(original);
      setActiveSavedImgData(item.imgData); // Pass the saved Base64 drawing
    } else if (item.templateId === 'custom') {
      // Reopen a custom upload template
      const placeholder: Template = {
        id: 'custom',
        title: item.title,
        category: 'Cute',
        isPremium: false,
        difficulty: 'Medium',
        svgContent: '', // Empty, since loadImageToCanvas will load base64 direct
      };
      setActiveColoringTemplate(placeholder);
      setActiveSavedImgData(item.imgData);
    }
  };

  // Custom photo upload handler
  const handleCustomUpload = (imgData: string, title: string) => {
    const customTemplate: Template = {
      id: 'custom',
      title: title || 'My Custom Photo',
      category: 'Cute',
      isPremium: false,
      difficulty: 'Medium',
      svgContent: '', // Empty SVG, since loadImageToCanvas will load base64 direct
    };
    setIsNewCustomUpload(true);
    setActiveColoringTemplate(customTemplate);
    setActiveSavedImgData(imgData);
  };

  const handleSelectProfile = (id: string) => {
    // 1. First save current state of the active profile to profiles list
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfileId) {
        return {
          ...p,
          stars,
          name: profile.name,
          avatar: profile.avatar,
          unlockedTemplates,
          galleryItems
        };
      }
      return p;
    }));

    // 2. Load target profile states
    const target = profiles.find(p => p.id === id);
    if (target) {
      setActiveProfileId(id);
      setStars(target.stars);
      setProfile({ name: target.name, avatar: target.avatar });
      setUnlockedTemplates(target.unlockedTemplates);
      setGalleryItems(target.galleryItems);
      localStorage.setItem('pixipaint_active_profile_id', id);
    }
  };

  const handleCreateProfile = (name: string, avatar: string) => {
    const newId = 'profile_' + Date.now();
    const newProfile: Profile = {
      id: newId,
      name: name || 'Super Artist',
      avatar: avatar || '🦊',
      stars: 20, // Start new profile with 20 stars
      unlockedTemplates: [],
      galleryItems: []
    };
    
    setProfiles(prev => [...prev, newProfile]);
    
    // Auto-switch to the newly created profile
    setActiveProfileId(newId);
    setStars(newProfile.stars);
    setProfile({ name: newProfile.name, avatar: newProfile.avatar });
    setUnlockedTemplates(newProfile.unlockedTemplates);
    setGalleryItems(newProfile.galleryItems);
    localStorage.setItem('pixipaint_active_profile_id', newId);
  };

  const handleDeleteProfile = (id: string) => {
    if (profiles.length <= 1) {
      alert("You need to keep at least one profile! 🦊");
      return;
    }
    if (window.confirm("Are you sure you want to delete this profile? All stars and artworks will be lost forever! 🗑️")) {
      const remaining = profiles.filter(p => p.id !== id);
      setProfiles(remaining);
      
      if (activeProfileId === id) {
        const nextProfile = remaining[0];
        setActiveProfileId(nextProfile.id);
        setStars(nextProfile.stars);
        setProfile({ name: nextProfile.name, avatar: nextProfile.avatar });
        setUnlockedTemplates(nextProfile.unlockedTemplates);
        setGalleryItems(nextProfile.galleryItems);
        localStorage.setItem('pixipaint_active_profile_id', nextProfile.id);
      }
    }
  };

  // --- Render Layout ---
  return (
    <div className="kids-app-container">
      {/* 1. Canvas Editor Screen overlay (takes over full window for focused drawing) */}
      {activeColoringTemplate ? (
        <ColoringCanvas
          template={activeColoringTemplate}
          savedImgData={activeSavedImgData}
          isNewCustomUpload={isNewCustomUpload}
          onBack={() => {
            setActiveColoringTemplate(null);
            setActiveSavedImgData(undefined);
            setIsNewCustomUpload(false);
          }}
          onAddStars={handleAddStars}
          onSaveToGallery={handleSaveToGallery}
        />
      ) : isColorGameActive ? (
        <ColorGame
          onBack={() => setIsColorGameActive(false)}
          onEarnStars={handleAddStars}
        />
      ) : (
        /* 2. Main Responsive Tabs Dashboard */
        <>
          {/* Main Global Kids Header */}
          <Header stars={stars} />

          <main className="dashboard-content-area" style={{ minHeight: '60vh' }}>
            {activeTab === 'home' && (
              <HomeTab
                onSelectTemplate={handleSelectTemplate}
                onCustomUpload={handleCustomUpload}
                onStartColorGame={() => setIsColorGameActive(true)}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryTab
                galleryItems={galleryItems}
                onDelete={handleDeleteGalleryItem}
                onDownload={handleDownloadGalleryItem}
                onReopen={handleReopenGalleryItem}
                onNavigateHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                profile={profile}
                onUpdateProfile={setProfile}
                stars={stars}
                unlockedCount={unlockedTemplates.length}
                completedCount={galleryItems.length}
                profiles={profiles}
                activeProfileId={activeProfileId}
                onSelectProfile={handleSelectProfile}
                onCreateProfile={handleCreateProfile}
                onDeleteProfile={handleDeleteProfile}
              />
            )}
          </main>

          {/* Persistent Responsive Bottom Menu */}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Template Detail Preview Popup Modal */}
          <TemplateModal
            template={selectedTemplate}
            isOpen={isModalOpen}
            onClose={() => {
              setSelectedTemplate(null);
              setIsModalOpen(false);
            }}
            onStartColoring={handleStartColoring}
            stars={stars}
            unlockedTemplates={unlockedTemplates}
            onUnlock={handleUnlockTemplate}
          />
        </>
      )}
    </div>
  );
}

export default App;
