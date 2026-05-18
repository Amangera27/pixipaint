import React, { useState, useEffect, useRef } from 'react';
import type { Template } from '../data/templates';

interface ColoringCanvasProps {
  template: Template;
  savedImgData?: string;
  isNewCustomUpload?: boolean;
  onBack: () => void;
  onAddStars: (stars: number) => void;
  onSaveToGallery: (title: string, imgData: string) => void;
}

const COLORS = [
  '#ff4d6d', // Strawberry Pink
  '#ff9f1c', // Creamsicle Orange
  '#ffd166', // Sunshine Yellow
  '#06d6a0', // Mint Green
  '#118ab2', // Sky Blue
  '#8338ec', // Magic Purple
  '#fb5607', // Sunset Orange
  '#a06cd5', // Cute Lavender
  '#7f5539', // Teddy Bear Brown
  '#ffffff', // Cloud White
  '#111111', // Coal Black
];

function hexToRgba(hex: string): [number, number, number, number] {
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return [r, g, b, 255];
}

// Flood Fill Algorithm
function floodFill(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillColorHex: string,
  tolerance = 60 
) {
  const canvas = ctx.canvas;
  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const targetColorIndex = (startY * w + startX) * 4;
  const targetR = data[targetColorIndex];
  const targetG = data[targetColorIndex + 1];
  const targetB = data[targetColorIndex + 2];
  const targetA = data[targetColorIndex + 3];

  const [fillR, fillG, fillB, fillA] = hexToRgba(fillColorHex);

  if (
    Math.abs(targetR - fillR) <= tolerance &&
    Math.abs(targetG - fillG) <= tolerance &&
    Math.abs(targetB - fillB) <= tolerance
  ) {
    return;
  }

  const stack = [[startX, startY]];
  const seen = new Uint8Array(w * h);

  while (stack.length) {
    const [cx, cy] = stack.pop()!;
    const idx = cy * w + cx;
    
    if (seen[idx]) continue;
    seen[idx] = 1;

    const dataIndex = idx * 4;
    const r = data[dataIndex];
    const g = data[dataIndex + 1];
    const b = data[dataIndex + 2];
    const a = data[dataIndex + 3];

    // Ensure we don't paint over the dark outline borders
    const isOutline = r < 50 && g < 50 && b < 50 && a > 150;

    if (
      !isOutline &&
      Math.abs(r - targetR) <= tolerance &&
      Math.abs(g - targetG) <= tolerance &&
      Math.abs(b - targetB) <= tolerance &&
      Math.abs(a - targetA) <= tolerance
    ) {
      data[dataIndex] = fillR;
      data[dataIndex + 1] = fillG;
      data[dataIndex + 2] = fillB;
      data[dataIndex + 3] = fillA;

      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < w - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < h - 1) stack.push([cx, cy + 1]);
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function convertToSketch(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  
  // 1. Convert to Grayscale & Blur slightly to reduce noise
  const grayscale = new Uint8Array(width * height);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    grayscale[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  
  // Simple 3x3 Box Blur on Grayscale to reduce photo noise
  const blurred = new Uint8Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          sum += grayscale[(y + ky) * width + (x + kx)];
        }
      }
      blurred[y * width + x] = sum / 9;
    }
  }
  
  const output = ctx.createImageData(width, height);
  const outData = output.data;
  
  // Sobel Operators
  const gx = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];
  const gy = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let valX = 0;
      let valY = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const pixelVal = blurred[(y + ky) * width + (x + kx)];
          valX += pixelVal * gx[ky + 1][kx + 1];
          valY += pixelVal * gy[ky + 1][kx + 1];
        }
      }
      
      const magnitude = Math.sqrt(valX * valX + valY * valY);
      
      // Keep dark outline strokes from original coloring sheet and add detected edges
      const isEdge = magnitude > 35;
      const originalIdx = (y * width + x) * 4;
      const isOriginalDark = data[originalIdx] < 80 && data[originalIdx+1] < 80 && data[originalIdx+2] < 80;
      
      const idx = (y * width + x) * 4;
      if (isEdge || isOriginalDark) {
        outData[idx] = 0;
        outData[idx+1] = 0;
        outData[idx+2] = 0;
        outData[idx+3] = 255;
      } else {
        outData[idx] = 255;
        outData[idx+1] = 255;
        outData[idx+2] = 255;
        outData[idx+3] = 255;
      }
    }
  }
  
  // Ensure border pixels are clean white
  for (let x = 0; x < width; x++) {
    const topIdx = x * 4;
    const bottomIdx = ((height - 1) * width + x) * 4;
    for (let c = 0; c < 3; c++) {
      outData[topIdx + c] = 255;
      outData[bottomIdx + c] = 255;
    }
    outData[topIdx + 3] = 255;
    outData[bottomIdx + 3] = 255;
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width) * 4;
    const rightIdx = (y * width + width - 1) * 4;
    for (let c = 0; c < 3; c++) {
      outData[leftIdx + c] = 255;
      outData[rightIdx + c] = 255;
    }
    outData[leftIdx + 3] = 255;
    outData[rightIdx + 3] = 255;
  }
  
  ctx.putImageData(output, 0, 0);
}

export const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  template,
  savedImgData,
  isNewCustomUpload,
  onBack,
  onAddStars,
  onSaveToGallery,
}) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [tool, setTool] = useState<'fill' | 'brush' | 'eraser'>('fill');
  const [brushSize, setBrushSize] = useState<number>(18);
  const [zoom, setZoom] = useState<number>(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationText, setCelebrationText] = useState('');

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const isDrawing = useRef(false);
  const lastPos = useRef<{x: number, y: number} | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    if (savedImgData) {
      if (template.id === 'custom' && isNewCustomUpload) {
        runCustomSketchScanner(savedImgData);
      } else {
        loadImageToCanvas(savedImgData, true);
      }
    } else {
      loadImageToCanvas(template.svgContent, false);
    }
  }, [template, savedImgData]);

  const runCustomSketchScanner = (imgUrl: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    setIsScanning(true);
    setScanProgress(0);

    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      canvas.width = 800;
      canvas.height = 800;

      // 1. Create a color canvas to hold the original color photo
      const colorCanvas = document.createElement('canvas');
      colorCanvas.width = 800;
      colorCanvas.height = 800;
      const colorCtx = colorCanvas.getContext('2d');
      if (colorCtx) {
        colorCtx.fillStyle = '#ffffff';
        colorCtx.fillRect(0, 0, 800, 800);
        colorCtx.drawImage(img, 0, 0, 800, 800);
      }

      // 2. Create a sketch canvas to hold the black-and-white outline sketch
      const sketchCanvas = document.createElement('canvas');
      sketchCanvas.width = 800;
      sketchCanvas.height = 800;
      const sketchCtx = sketchCanvas.getContext('2d', { willReadFrequently: true });
      if (sketchCtx) {
        sketchCtx.fillStyle = '#ffffff';
        sketchCtx.fillRect(0, 0, 800, 800);
        sketchCtx.drawImage(img, 0, 0, 800, 800);
        convertToSketch(sketchCtx, 800, 800);
      }

      // 3. Keep original canvas backup as the sketch for erasing back to outline
      originalCanvasRef.current = sketchCanvas;

      // 4. Run scanner loop
      let progress = 0;
      const scanDuration = 3000; // 3 seconds scan
      const startTime = performance.now();

      const animateScan = (time: number) => {
        const elapsed = time - startTime;
        progress = Math.min(elapsed / scanDuration, 1);
        setScanProgress(progress);

        ctx.clearRect(0, 0, 800, 800);
        
        // Draw sketch outlines first
        ctx.drawImage(sketchCanvas, 0, 0);

        // Draw color picture below scanline
        const sy = progress * 800;
        const sHeight = 800 - sy;
        if (sHeight > 0) {
          ctx.drawImage(colorCanvas, 0, sy, 800, sHeight, 0, sy, 800, sHeight);
        }

        if (progress < 1) {
          requestAnimationFrame(animateScan);
        } else {
          // Scanning complete!
          setIsScanning(false);
          
          ctx.clearRect(0, 0, 800, 800);
          ctx.drawImage(sketchCanvas, 0, 0);

          historyRef.current = [ctx.getImageData(0, 0, 800, 800)];
          setCanUndo(false);
          
          const phrases = ["Magic Outline Ready! 🪄", "Awesome Sketch! 🎨", "Perfect Outline! 💖"];
          setCelebrationText(phrases[Math.floor(Math.random() * phrases.length)]);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 3500);
        }
      };

      requestAnimationFrame(animateScan);
    };
  };

  const loadImageToCanvas = (srcString: string, isSavedImage: boolean) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const img = new Image();
    
    // Check if the image source is already a saved drawing, a base64 string, or a PNG asset
    const isImageFile = isSavedImage || 
                        srcString.startsWith('data:') || 
                        srcString.includes('.png') || 
                        srcString.includes('.jpg') || 
                        srcString.includes('.jpeg') || 
                        srcString.includes('.webp') || 
                        srcString.includes('/assets/');

    img.src = isImageFile ? srcString : 'data:image/svg+xml;utf8,' + encodeURIComponent(srcString);
    img.onload = () => {
      // templates load with a standard 800x800 size
      canvas.width = 800;
      canvas.height = 800;
      
      // Draw background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 800, 800);

      // Create pristine backup for erasing
      const origCanvas = document.createElement('canvas');
      origCanvas.width = 800;
      origCanvas.height = 800;
      const origCtx = origCanvas.getContext('2d');
      if (origCtx) {
        origCtx.fillStyle = '#ffffff';
        origCtx.fillRect(0, 0, 800, 800);
        
        if (isSavedImage) {
          // If we reopened a saved image, the pristine backup for eraser should still be the initial clean vector outline!
          // We can load the clean vector template into eraser backup.
          const cleanOutlineImg = new Image();
          const isTemplateImageFile = template.svgContent.startsWith('data:') || 
                                      template.svgContent.includes('.png') || 
                                      template.svgContent.includes('.jpg') || 
                                      template.svgContent.includes('.jpeg') || 
                                      template.svgContent.includes('.webp') || 
                                      template.svgContent.includes('/assets/');
                                      
          cleanOutlineImg.src = isTemplateImageFile ? template.svgContent : 'data:image/svg+xml;utf8,' + encodeURIComponent(template.svgContent);
          cleanOutlineImg.onload = () => {
            origCtx.drawImage(cleanOutlineImg, 0, 0, 800, 800);
          };
        } else {
          origCtx.drawImage(img, 0, 0, 800, 800);
        }
      }
      originalCanvasRef.current = origCanvas;

      historyRef.current = [];
      setCanUndo(false);
      setZoom(1); 
    };
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      if (historyRef.current.length > 25) {
        historyRef.current.shift();
      }
      setCanUndo(true);
    }
  };

  const handleUndo = () => {
    if (historyRef.current.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const lastState = historyRef.current.pop();
      if (lastState && ctx) {
        ctx.putImageData(lastState, 0, 0);
      }
      setCanUndo(historyRef.current.length > 0);
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY)
    };
  };

  // Restores original black outlines and white areas under the eraser brush
  const eraseAt = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (!originalCanvasRef.current) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.clip(); 
    ctx.drawImage(originalCanvasRef.current, 0, 0); 
    ctx.restore();
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isScanning) return;
    if (!('touches' in e)) {
      // Prevent running on right-click
      if (e.button !== 0) return;
    }
    
    saveState(); 
    const coords = getCoordinates(e);
    if (!coords) return;
    const { x, y } = coords;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (tool === 'fill') {
      floodFill(ctx, x, y, selectedColor, 60);
    } else {
      isDrawing.current = true;
      lastPos.current = { x, y };
      
      ctx.beginPath();
      if (tool === 'brush') {
        ctx.fillStyle = selectedColor;
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (tool === 'eraser') {
        eraseAt(ctx, x, y);
      }
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isScanning) return;
    if ('touches' in e) {
      // Multi-touch zooming/panning is skipped to keep coloring robust on touchscreens
    } else {
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    if (!isDrawing.current || !lastPos.current) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    const { x, y } = coords;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (tool === 'brush') {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      lastPos.current = { x, y };
    } else if (tool === 'eraser') {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(distance / (brushSize / 4))); 
      
      for (let i = 0; i <= steps; i++) {
        const ix = lastPos.current.x + (dx * i) / steps;
        const iy = lastPos.current.y + (dy * i) / steps;
        eraseAt(ctx, ix, iy);
      }
      lastPos.current = { x, y };
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const handleMouseLeave = () => {
    if (isScanning) return;
    setMousePos(null);
    stopDrawing();
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoom(1);

  // Triggered when kids complete and save their artwork
  const handleSaveMasterpiece = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');
    onSaveToGallery(template.title, imgData);
    
    // Add reward stars!
    onAddStars(5);
    
    // Celebratory phrases
    const phrases = ["Superb!", "Awesome Work!", "Magical Artist!", "So Beautiful!", "Splendid Job!"];
    setCelebrationText(phrases[Math.floor(Math.random() * phrases.length)]);
    
    // Show confetti explosion!
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  // Standard computer download
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}-pixipaint.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Reset entire canvas to initial outline
  const handleReset = () => {
    if (window.confirm("Are you sure you want to start over? Your colors will be cleared! 🧹")) {
      saveState();
      loadImageToCanvas(template.svgContent, false);
    }
  };

  const getScreenBrushSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return brushSize;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.width;
    return brushSize * scaleX;
  };

  return (
    <div 
      className="coloring-workspace-container"
      style={{ cursor: mousePos && tool !== 'fill' ? 'none' : 'default' }}
    >
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="confetti-overlay">
          <div className="confetti-celebration-card">
            <span className="celebration-emoji">✨🎉🏆🎉✨</span>
            <h2>{celebrationText}</h2>
            <p>You did a magical job coloring <strong>{template.title}</strong>!</p>
            <p className="earned-stars-row">⭐ +5 Shiny Stars Earned!</p>
            <button className="close-celebration-btn bouncy-btn" onClick={() => setShowConfetti(false)}>
              Keep Painting! 🎨
            </button>
          </div>
          {/* Create 40 floating confetti elements */}
          {Array.from({ length: 40 }).map((_, i) => {
            const colors = ['#ff4d6d', '#ff9f1c', '#ffd166', '#06d6a0', '#118ab2', '#8338ec', '#ff7096'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const style = {
              left: `${Math.random() * 100}%`,
              backgroundColor: randomColor,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${Math.random() * 0.8 + 0.4}) rotate(${Math.random() * 360}deg)`
            };
            return <div key={i} className="confetti-particle" style={style} />;
          })}
        </div>
      )}

      {/* Paint Brush Cursor */}
      {(tool === 'brush' || tool === 'eraser') && mousePos && (
        <div 
          className="brush-cursor"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: getScreenBrushSize(),
            height: getScreenBrushSize(),
            backgroundColor: tool === 'brush' ? selectedColor : 'transparent',
            opacity: tool === 'brush' ? 0.8 : 1,
            border: tool === 'eraser' ? '2px dashed #ff4d6d' : '2px solid #111111'
          }}
        />
      )}

      {/* Top Workspace Header Controls */}
      <div className={`coloring-top-controls ${isScanning ? 'disabled-toolbar-overlay' : ''}`}>
        <button className="back-home-btn bouncy-btn" onClick={onBack}>
          👈 Back to Studio
        </button>
        
        <div className="coloring-design-title">
          <h2>Coloring: {template.title}</h2>
          <span className="category-label">{template.category}</span>
        </div>

        <div className="coloring-top-action-group">
          <button onClick={handleReset} className="reset-canvas-btn control-btn-pill" title="Start Over">
            🧹 Clear All
          </button>
          <button onClick={handleSaveMasterpiece} className="save-masterpiece-btn control-btn-pill accent-btn bouncy-btn">
            🏆 Save to Gallery
          </button>
        </div>
      </div>

      {/* Main workspace splits: Toolbar left, canvas center, palette bottom */}
      <div className="coloring-main-body">
        
        {/* Playful Floating Toolbar */}
        <div className={`coloring-toolbar ${isScanning ? 'disabled-toolbar-overlay' : ''}`}>
          <button 
            className={`tool-btn ${tool === 'fill' ? 'active' : ''}`}
            onClick={() => setTool('fill')}
            title="Paint Bucket (Fill Areas)"
          >
            <span className="tool-emoji">🪣</span>
            <span className="tool-name">Fill Bucket</span>
          </button>

          <button 
            className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
            onClick={() => setTool('brush')}
            title="Magic Brush (Draw lines)"
          >
            <span className="tool-emoji">🖌️</span>
            <span className="tool-name">Magic Brush</span>
          </button>

          <button 
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Magic Eraser (Remove coloring)"
          >
            <span className="tool-emoji">🧽</span>
            <span className="tool-name">Eraser</span>
          </button>

          <div className="toolbar-divider" />

          <button 
            className={`tool-btn ${canUndo ? '' : 'disabled'}`}
            disabled={!canUndo}
            onClick={handleUndo}
            title="Undo last stroke"
          >
            <span className="tool-emoji">↩️</span>
            <span className="tool-name">Oops (Undo)</span>
          </button>

          <button className="tool-btn download-action-btn" onClick={handleDownload} title="Download to device">
            <span className="tool-emoji">💾</span>
            <span className="tool-name">Download PNG</span>
          </button>

          {/* Sizer for Brush & Eraser */}
          {(tool === 'brush' || tool === 'eraser') && (
            <div className="brush-size-control-box">
              <label>Size: <strong>{brushSize}px</strong></label>
              <input 
                type="range" 
                min="4" 
                max="80" 
                value={brushSize} 
                onChange={(e) => setBrushSize(Number(e.target.value))} 
                className="brush-size-slider"
              />
            </div>
          )}
        </div>

        {/* The Painting Canvas Area */}
        <div className="canvas-wrapper-outer">
          
          {/* Zoom and Pan indicators */}
          <div className={`canvas-floating-zoom-panel ${isScanning ? 'disabled-toolbar-overlay' : ''}`}>
            <button onClick={handleZoomOut} className="zoom-btn" title="Zoom Out">➖</button>
            <span onClick={handleZoomReset} className="zoom-label" title="Reset Zoom">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={handleZoomIn} className="zoom-btn" title="Zoom In">➕</button>
          </div>

          <div className="canvas-viewport">
            <div className="canvas-container-inner" style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
              <canvas 
                ref={canvasRef}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={stopDrawing}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={stopDrawing}
                style={{ 
                  width: `${zoom * 100}%`, 
                  height: 'auto', 
                  cursor: tool === 'fill' ? 'crosshair' : 'none'
                }}
              />
              {isScanning && (
                <div className="sketch-scanner-overlay">
                  <div className="scanner-line" style={{ top: `${scanProgress * 100}%` }} />
                  <div className="scanner-laser-glow" style={{ top: `${scanProgress * 100}%` }} />
                </div>
              )}
              {isScanning && (
                <div className="scanner-active-modal-indicator">
                  <h3>🪄 Magic Scanner</h3>
                  <p>Converting picture into a clean sketch coloring page... 🎨</p>
                  <div style={{ marginTop: '0.8rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {Math.round(scanProgress * 100)}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Yummy Color Palette Grid */}
      <div className={`palette-wrapper-bar ${isScanning ? 'disabled-toolbar-overlay' : ''}`}>
        <h4 className="palette-title">🎨 Pick a Beautiful Color:</h4>
        <div className="coloring-color-palette">
          {COLORS.map((color) => (
            <button
              key={color}
              className={`color-bubble-choice ${selectedColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
          <div className="custom-color-bubble-wrapper">
            <input 
              type="color" 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)} 
              className="custom-color-picker-input"
              title="Custom Magic Color"
            />
            <span className="custom-color-label">➕ Custom</span>
          </div>
        </div>
      </div>
    </div>
  );
};
