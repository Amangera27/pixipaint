import butterflyPng from '../assets/butterfly.png';
import rocketPng from '../assets/rocket.png';
import dinosaurPng from '../assets/dinosaur.png';
import castlePng from '../assets/castle.png';
import unicornPng from '../assets/unicorn.png';
import heroPng from '../assets/hero.png';
import dragonPng from '../assets/dragon.png';
import heartPng from '../assets/heart.png';
import mermaidPng from '../assets/mermaid.png';
import pandaPng from '../assets/panda.png';

export interface Template {
  id: string;
  title: string;
  category: 'Animals' | 'Space' | 'Fantasy' | 'Cute';
  isPremium: boolean;
  svgContent: string; // Used to hold raw SVG string OR imported PNG asset path/URL
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const TEMPLATES: Template[] = [
  {
    id: 'butterfly',
    title: 'Magic Butterfly',
    category: 'Cute',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: butterflyPng
  },
  {
    id: 'rocket',
    title: 'Space Rocket',
    category: 'Space',
    isPremium: false,
    difficulty: 'Medium',
    svgContent: rocketPng
  },
  {
    id: 'dino',
    title: 'Cute Dino',
    category: 'Animals',
    isPremium: true,
    difficulty: 'Medium',
    svgContent: dinosaurPng
  },
  {
    id: 'castle',
    title: 'Magic Castle',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: castlePng
  },
  {
    id: 'unicorn',
    title: 'Pretty Unicorn',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: unicornPng
  },
  {
    id: 'hero',
    title: 'Super Hero',
    category: 'Fantasy',
    isPremium: false,
    difficulty: 'Medium',
    svgContent: heroPng
  },
  {
    id: 'dragon',
    title: 'Magic Dragon',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: dragonPng
  },
  {
    id: 'heart',
    title: 'Love Heart',
    category: 'Cute',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: heartPng
  },
  {
    id: 'mermaid',
    title: 'Beautiful Mermaid',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: mermaidPng
  },
  {
    id: 'panda',
    title: 'Chubby Panda',
    category: 'Animals',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: pandaPng
  },
  // Keep standard vector SVGs for extra coloring fun!
  {
    id: 'kitty',
    title: 'Cute Kitten',
    category: 'Cute',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Body -->
      <path d="M 140,220 C 120,260 120,340 160,350 C 200,360 240,350 250,320 C 260,280 250,220 220,220 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Tail -->
      <path d="M 240,310 C 290,310 320,270 310,230 C 300,190 280,210 285,230 C 290,250 270,280 240,285" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <!-- Head -->
      <ellipse cx="200" cy="160" rx="75" ry="60" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Left Ear -->
      <path d="M 140,125 L 110,70 C 110,70 145,75 165,110 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 143,115 L 123,78 C 123,78 145,84 157,105 Z" fill="#ffffff" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>
      <!-- Right Ear -->
      <path d="M 260,125 L 290,70 C 290,70 255,75 235,110 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 257,115 L 277,78 C 277,78 255,84 243,105 Z" fill="#ffffff" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>
      <!-- Eyes -->
      <ellipse cx="175" cy="155" rx="8" ry="12" fill="#111111"/>
      <ellipse cx="225" cy="155" rx="8" ry="12" fill="#111111"/>
      <!-- Nose -->
      <polygon points="195,172 205,172 200,178" fill="#111111" stroke="#111111" stroke-width="2"/>
      <!-- Mouth -->
      <path d="M 190,185 Q 197,192 200,185 Q 203,192 210,185" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      <!-- Whiskers -->
      <path d="M 110,165 L 75,160 M 110,175 L 70,178 M 110,185 L 75,195" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      <path d="M 290,165 L 325,160 M 290,175 L 330,178 M 290,185 L 325,195" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      <!-- Paws -->
      <circle cx="165" cy="350" r="18" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="235" cy="350" r="18" fill="#ffffff" stroke="#111111" stroke-width="8"/>
    </svg>`
  },
  {
    id: 'teddy',
    title: 'Teddy Bear',
    category: 'Animals',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Body -->
      <circle cx="200" cy="260" r="70" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Head -->
      <circle cx="200" cy="150" r="60" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Left Ear -->
      <circle cx="145" cy="105" r="22" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="145" cy="105" r="12" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <!-- Right Ear -->
      <circle cx="255" cy="105" r="22" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="255" cy="105" r="12" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <!-- Snout -->
      <ellipse cx="200" cy="168" rx="22" ry="16" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <!-- Nose & Mouth -->
      <polygon points="194,160 206,160 200,166" fill="#111111"/>
      <path d="M 200,166 L 200,174 C 196,178 190,176 190,176 M 200,174 C 204,178 210,176 210,176" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>
      <!-- Eyes -->
      <circle cx="178" cy="142" r="8" fill="#111111"/>
      <circle cx="222" cy="142" r="8" fill="#111111"/>
      <!-- Arms -->
      <path d="M 135,230 C 110,230 90,260 110,280 C 130,300 150,260 150,240" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 265,230 C 290,230 310,260 290,280 C 270,300 250,260 250,240" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Legs -->
      <circle cx="150" cy="325" r="25" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="150" cy="325" r="14" fill="#ffffff" stroke="#111111" stroke-width="5"/>
      <circle cx="250" cy="325" r="25" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="250" cy="325" r="14" fill="#ffffff" stroke="#111111" stroke-width="5"/>
    </svg>`
  },
  {
    id: 'sub',
    title: 'Happy Fish',
    category: 'Cute',
    isPremium: true,
    difficulty: 'Easy',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Seaweed background -->
      <path d="M 60,360 Q 40,280 80,200 Q 100,240 70,360 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <path d="M 330,360 Q 350,290 320,220 Q 300,260 320,360 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <!-- Fish Body -->
      <path d="M 120,200 C 150,140 250,140 280,200 C 250,260 150,260 120,200 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Tail Fin -->
      <path d="M 120,200 L 70,160 L 90,200 L 70,240 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Top Fin -->
      <path d="M 180,158 C 200,120 230,120 240,152 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Bottom Fin -->
      <path d="M 190,242 C 200,270 220,270 230,246 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Big Eye -->
      <circle cx="245" cy="185" r="18" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="249" cy="181" r="8" fill="#111111"/>
      <circle cx="246" cy="178" r="3" fill="#ffffff"/>
      <!-- Smile -->
      <path d="M 265,205 Q 260,215 252,210" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      <!-- Bubbles -->
      <circle cx="300" cy="150" r="12" fill="#ffffff" stroke="#111111" stroke-width="5"/>
      <circle cx="320" cy="110" r="8" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <circle cx="310" cy="80" r="6" fill="#ffffff" stroke="#111111" stroke-width="4"/>
    </svg>`
  }
];
