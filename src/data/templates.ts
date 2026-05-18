export interface Template {
  id: string;
  title: string;
  category: 'Animals' | 'Space' | 'Fantasy' | 'Cute';
  isPremium: boolean;
  svgContent: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const TEMPLATES: Template[] = [
  {
    id: 'butterfly',
    title: 'Magic Butterfly',
    category: 'Cute',
    isPremium: false,
    difficulty: 'Easy',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Body -->
      <path d="M 200,100 C 205,100 210,130 210,200 C 210,270 205,300 200,300 C 195,300 190,270 190,200 C 190,130 195,100 200,100 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Head -->
      <circle cx="200" cy="80" r="20" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Antennae -->
      <path d="M 190,65 Q 170,40 150,45" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <path d="M 210,65 Q 230,40 250,45" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <circle cx="150" cy="45" r="6" fill="#111111"/>
      <circle cx="250" cy="45" r="6" fill="#111111"/>
      <!-- Left Wings -->
      <path d="M 192,150 C 150,80 50,100 80,180 C 100,230 150,220 192,210 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 192,220 C 140,220 70,250 90,310 C 110,360 170,300 192,260 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Right Wings -->
      <path d="M 208,150 C 250,80 350,100 320,180 C 300,230 250,220 208,210 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 208,220 C 260,220 330,250 310,310 C 290,360 230,300 208,260 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Left Wing Patterns -->
      <circle cx="120" cy="150" r="15" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="130" cy="270" r="12" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <!-- Right Wing Patterns -->
      <circle cx="280" cy="150" r="15" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="270" cy="270" r="12" fill="#ffffff" stroke="#111111" stroke-width="6"/>
    </svg>`
  },
  {
    id: 'rocket',
    title: 'Space Rocket',
    category: 'Space',
    isPremium: false,
    difficulty: 'Medium',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Background Stars -->
      <path d="M 50,50 L 55,60 L 65,60 L 57,67 L 60,77 L 50,70 L 40,77 L 43,67 L 35,60 L 45,60 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <path d="M 330,80 L 333,86 L 340,86 L 335,90 L 337,97 L 330,92 L 323,97 L 325,90 L 320,86 L 327,86 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <path d="M 80,300 L 83,306 L 90,306 L 85,310 L 87,317 L 80,312 L 73,317 L 75,310 L 70,306 L 77,306 Z" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <!-- Rocket Body -->
      <path d="M 200,80 C 230,130 240,200 240,260 L 160,260 C 160,200 170,130 200,80 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Rocket Nose Cone -->
      <path d="M 200,80 C 215,105 222,130 225,150 L 175,150 C 178,130 185,105 200,80 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Round Window -->
      <circle cx="200" cy="190" r="22" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Fins Left -->
      <path d="M 160,220 L 120,260 C 120,260 125,280 160,270 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Fins Right -->
      <path d="M 240,220 L 280,260 C 280,260 275,280 240,270 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Thrust Engine -->
      <rect x="180" y="260" width="40" height="20" rx="5" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Flame -->
      <path d="M 180,280 C 160,330 200,360 200,360 C 200,360 240,330 220,280 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 190,280 C 180,310 200,330 200,330 C 200,330 220,310 210,280 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
    </svg>`
  },
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
    id: 'dino',
    title: 'Cute Dino',
    category: 'Animals',
    isPremium: true,
    difficulty: 'Medium',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Body -->
      <path d="M 130,220 C 130,220 90,250 110,310 C 130,370 210,370 230,320 C 250,270 280,260 310,270 C 330,280 340,300 350,290 C 360,280 340,240 310,230 C 260,210 240,240 210,230 C 180,220 180,180 180,180" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Head & Neck -->
      <path d="M 120,160 C 100,120 140,80 180,90 C 210,100 200,150 180,180 C 160,210 130,220 120,160 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Eyes -->
      <circle cx="150" cy="115" r="7" fill="#111111"/>
      <circle cx="172" cy="115" r="5" fill="#111111"/>
      <!-- Cheeks -->
      <circle cx="145" cy="128" r="5" fill="#ffffff" stroke="#111111" stroke-width="3"/>
      <!-- Spikes -->
      <path d="M 180,90 L 192,80 L 195,95 L 205,88 L 205,105 L 215,98 L 210,118" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <path d="M 230,230 L 245,215 L 250,235 L 265,220 L 268,242 L 285,230 L 285,250" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <!-- Feet -->
      <circle cx="140" cy="350" r="18" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <circle cx="200" cy="350" r="18" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Spots -->
      <circle cx="170" cy="270" r="10" fill="#ffffff" stroke="#111111" stroke-width="4"/>
      <circle cx="205" cy="290" r="12" fill="#ffffff" stroke="#111111" stroke-width="4"/>
    </svg>`
  },
  {
    id: 'castle',
    title: 'Magic Castle',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Base Ground -->
      <path d="M 40,360 Q 200,340 360,360" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>
      <!-- Main Castle Block -->
      <rect x="120" y="220" width="160" height="130" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Left Tower -->
      <rect x="80" y="160" width="40" height="190" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Right Tower -->
      <rect x="280" y="160" width="40" height="190" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Left Tower Roof -->
      <polygon points="70,160 100,90 130,160" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Right Tower Roof -->
      <polygon points="270,160 300,90 330,160" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Middle Tower -->
      <rect x="170" y="150" width="60" height="70" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <polygon points="160,150 200,70 240,150" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Flag -->
      <path d="M 200,70 L 200,40 L 230,50 L 200,60" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <!-- Main Gate -->
      <path d="M 170,350 L 170,300 C 170,270 230,270 230,300 L 230,350 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Windows -->
      <rect x="92" y="200" width="16" height="30" rx="8" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <rect x="292" y="200" width="16" height="30" rx="8" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="200" cy="180" r="14" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <!-- Clouds -->
      <path d="M 50,80 C 40,80 35,90 45,95 C 40,105 55,115 65,105 C 75,115 90,105 85,95 C 95,90 90,80 80,80 C 75,70 55,70 50,80 Z" fill="#ffffff" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'unicorn',
    title: 'Pretty Unicorn',
    category: 'Fantasy',
    isPremium: true,
    difficulty: 'Hard',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
      <rect width="400" height="400" fill="#ffffff"/>
      <!-- Body -->
      <path d="M 120,240 C 90,260 90,340 140,340 C 180,340 220,330 240,290 C 260,250 280,260 300,270 C 310,280 320,260 310,240 C 290,200 240,210 200,220 C 160,230 140,220 120,240 Z" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Neck & Head -->
      <path d="M 180,230 C 190,170 170,140 180,100 C 190,60 250,70 250,110 C 250,140 220,180 220,220" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Muzzle -->
      <path d="M 235,90 C 245,90 265,100 250,115 C 240,125 225,115 225,105" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="242" cy="100" r="3" fill="#111111"/>
      <!-- Eye (Sleeping) -->
      <path d="M 205,105 Q 212,112 220,105" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>
      <path d="M 208,109 L 205,114 M 213,110 L 213,116 M 217,108 L 219,113" stroke="#111111" stroke-width="3" stroke-linecap="round"/>
      <!-- Horn -->
      <polygon points="190,85 220,30 205,80" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <path d="M 200,65 L 210,60 M 197,50 L 213,44" stroke="#111111" stroke-width="4"/>
      <!-- Mane -->
      <path d="M 180,100 C 150,100 140,130 160,150 C 140,160 145,190 170,190 C 150,200 160,230 190,220" fill="#ffffff" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>
      <!-- Legs -->
      <rect x="130" y="320" width="22" height="50" rx="5" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <rect x="180" y="320" width="22" height="50" rx="5" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <rect x="225" y="280" width="22" height="60" rx="5" fill="#ffffff" stroke="#111111" stroke-width="8"/>
      <!-- Tail -->
      <path d="M 100,250 C 60,250 40,280 50,320 C 70,300 85,310 95,290" fill="#ffffff" stroke="#111111" stroke-width="7" stroke-linejoin="round"/>
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
