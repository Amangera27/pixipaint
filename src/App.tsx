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

// Data
import { TEMPLATES } from './data/templates';
import type { Template } from './data/templates';

function App() {
  // --- Persistent Kids States ---
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('pixipaint_stars');
    return saved ? Number(saved) : 20; // Start with 20 stars so they can unlock at least one premium template immediately!
  });

  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('pixipaint_profile');
    return saved ? JSON.parse(saved) : { name: 'Little Picasso', avatar: '🦊' };
  });

  const [unlockedTemplates, setUnlockedTemplates] = useState<string[]>(() => {
    const saved = localStorage.getItem('pixipaint_unlocked');
    return saved ? JSON.parse(saved) : [];
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('pixipaint_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI Routing States ---
  const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'profile'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Active Coloring States ---
  const [activeColoringTemplate, setActiveColoringTemplate] = useState<Template | null>(null);
  const [activeSavedImgData, setActiveSavedImgData] = useState<string | undefined>(undefined);

  // --- LocalStorage Synchronization ---
  useEffect(() => {
    localStorage.setItem('pixipaint_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('pixipaint_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('pixipaint_unlocked', JSON.stringify(unlockedTemplates));
  }, [unlockedTemplates]);

  useEffect(() => {
    localStorage.setItem('pixipaint_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

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
    setActiveColoringTemplate(customTemplate);
    setActiveSavedImgData(imgData);
  };

  // --- Render Layout ---
  return (
    <div className="kids-app-container">
      {/* 1. Canvas Editor Screen overlay (takes over full window for focused drawing) */}
      {activeColoringTemplate ? (
        <ColoringCanvas
          template={activeColoringTemplate}
          savedImgData={activeSavedImgData}
          onBack={() => {
            setActiveColoringTemplate(null);
            setActiveSavedImgData(undefined);
          }}
          onAddStars={handleAddStars}
          onSaveToGallery={handleSaveToGallery}
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
