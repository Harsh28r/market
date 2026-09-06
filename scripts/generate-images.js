const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const products = [
  {
    slug: 'nag-champa-aarti',
    title: 'NAG CHAMPA AARTI',
    hindi: 'नाग चंपा आरती',
    bg1: '#2e140b',
    bg2: '#140804',
    border: '#d4a017',
    tag: 'HOUSE STAPLE',
    stickColor: '#7a4229',
    subtitle: 'Temple-Grade Halmaddi & Champaca',
    details: '40 STICKS · 45 MIN BURN',
    accentGraphic: `
      <!-- Champaca Flower -->
      <g transform="translate(200, 160) scale(0.85)">
        <path d="M0,-30 C8,-15 12,0 0,30 C-12,0 -8,-15 0,-30 Z" fill="#e8c96a" opacity="0.9"/>
        <path d="M-25,-12 C-12,-8 0,0 25,12 C8,15 -8,12 -25,-12 Z" fill="#f4d78a" opacity="0.8"/>
        <path d="M25,-12 C12,-8 0,0 -25,12 C-8,15 8,12 25,-12 Z" fill="#f4d78a" opacity="0.8"/>
        <circle cx="0" cy="0" r="6" fill="#d4a017"/>
      </g>
    `
  },
  {
    slug: 'mysore-chandan',
    title: 'MYSORE CHANDAN',
    hindi: 'मैसूर चंदन',
    bg1: '#2d1e0d',
    bg2: '#140c05',
    border: '#e8c96a',
    tag: '100% PURE SANDAL',
    stickColor: '#c4a574',
    subtitle: 'Ground Sandalwood & Cold-Pressed Oil',
    details: '30 STICKS · 50 MIN BURN',
    accentGraphic: `
      <!-- Sandalwood Log Cut -->
      <g transform="translate(200, 160) scale(0.85)">
        <ellipse cx="0" cy="0" rx="32" ry="22" fill="#c4a574" stroke="#8b5a2b" stroke-width="2.5"/>
        <ellipse cx="0" cy="0" rx="20" ry="14" fill="none" stroke="#a47c47" stroke-width="1.8"/>
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="#8b5a2b"/>
      </g>
    `
  },
  {
    slug: 'gulab-raj',
    title: 'GULAB RAJ',
    hindi: 'गुलाब राज',
    bg1: '#380c19',
    bg2: '#17030a',
    border: '#c47b7b',
    tag: 'KANNAUJ ROSE ATTAR',
    stickColor: '#8b3044',
    subtitle: 'Damask Rose Petals & Pure Attar',
    details: '35 STICKS · 40 MIN BURN',
    accentGraphic: `
      <!-- Rose Blossom -->
      <g transform="translate(200, 160) scale(0.85)">
        <circle cx="0" cy="0" r="24" fill="#c47b7b" opacity="0.35"/>
        <path d="M0,-20 C10,-12 12,4 0,20 C-12,4 -10,-12 0,-20 Z" fill="#e88b8b"/>
        <path d="M-20,0 C-12,10 4,12 20,0 C4,-12 -12,-10 -20,0 Z" fill="#d46b6b"/>
        <circle cx="0" cy="0" r="7" fill="#8b2233"/>
      </g>
    `
  },
  {
    slug: 'loban-resin',
    title: 'LOBAN RESIN DHOOP',
    hindi: 'लोहबान धुप',
    bg1: '#2e160a',
    bg2: '#120703',
    border: '#c45c26',
    tag: 'ENERGY CLEANSING',
    stickColor: '#8b5a2b',
    subtitle: 'Benzoin & Frankincense Tree Resin',
    details: '25 STICKS + 8 CONES',
    accentGraphic: `
      <!-- Resin Dhoop Burner Cup -->
      <g transform="translate(200, 160) scale(0.85)">
        <path d="M-22,-8 L22,-8 L16,18 L-16,18 Z" fill="#c45c26" stroke="#e8c96a" stroke-width="1.8"/>
        <path d="M-24,-8 Q0,-14 24,-8 Q0,-2 -24,-8 Z" fill="#e8c96a"/>
        <path d="M0,-12 Q-6,-26 0,-38 Q6,-26 0,-12 Z" fill="#ffd89a" opacity="0.8"/>
      </g>
    `
  },
  {
    slug: 'mogra-raat',
    title: 'MOGRA RAAT',
    hindi: 'मोगरा रात',
    bg1: '#122112',
    bg2: '#060f06',
    border: '#cfc6a8',
    tag: 'NIGHT JASMINE',
    stickColor: '#d8d0c0',
    subtitle: 'Night-Blooming White Jasmine',
    details: '35 STICKS · 42 MIN BURN',
    accentGraphic: `
      <!-- Mogra Jasmine Petals -->
      <g transform="translate(200, 160) scale(0.85)">
        <circle cx="0" cy="0" r="5" fill="#e8c96a"/>
        <path d="M0,-22 Q5,-10 0,0 Q-5,-10 0,-22 Z" fill="#ffffff"/>
        <path d="M22,0 Q10,5 0,0 Q10,-5 22,0 Z" fill="#ffffff"/>
        <path d="M0,22 Q-5,10 0,0 Q5,10 0,22 Z" fill="#ffffff"/>
        <path d="M-22,0 Q-10,-5 0,0 Q-10,5 -22,0 Z" fill="#ffffff"/>
      </g>
    `
  },
  {
    slug: 'kapur-jyoti',
    title: 'KAPUR JYOTI',
    hindi: 'कपूर ज्योति',
    bg1: '#121b26',
    bg2: '#060a10',
    border: '#9ec4d4',
    tag: 'PURE BHIMSENI',
    stickColor: '#e8e4dc',
    subtitle: 'Clean Spotless Aarti Camphor',
    details: '20 TABLETS + 20 STICKS',
    accentGraphic: `
      <!-- Camphor Crystal & Diya Flame -->
      <g transform="translate(200, 160) scale(0.85)">
        <polygon points="0,-26 18,-8 13,18 -13,18 -18,-8" fill="#ffffff" stroke="#9ec4d4" stroke-width="1.8" opacity="0.9"/>
        <path d="M0,-40 Q-8,-22 0,-4 Q8,-22 0,-40 Z" fill="#e8c96a"/>
      </g>
    `
  },
  {
    slug: 'tulsi-vana',
    title: 'TULSI VANA',
    hindi: 'तुलसी वन',
    bg1: '#0e2414',
    bg2: '#041007',
    border: '#6a9a5a',
    tag: 'HOLY BASIL',
    stickColor: '#3d6b45',
    subtitle: 'Crushed Basil Leaf & Spice Oils',
    details: '40 STICKS · 38 MIN BURN',
    accentGraphic: `
      <!-- Tulsi Leaf Sprig -->
      <g transform="translate(200, 160) scale(0.85)">
        <path d="M0,-26 Q12,-12 0,12 Q-12,-12 0,-26 Z" fill="#6a9a5a"/>
        <path d="M0,0 Q16,-8 24,4 Q8,8 0,0 Z" fill="#528243"/>
        <path d="M0,0 Q-16,-8 -24,4 Q-8,8 0,0 Z" fill="#528243"/>
      </g>
    `
  },
  {
    slug: 'kewra-ghar',
    title: 'KEWRA GHAR',
    hindi: 'केवड़ा घर',
    bg1: '#2b230a',
    bg2: '#120f03',
    border: '#d4a017',
    tag: 'GANJAM KEWRA',
    stickColor: '#b8a040',
    subtitle: 'Festive Wedding Fragrance',
    details: '30 STICKS · 44 MIN BURN',
    accentGraphic: `
      <!-- Kewra Flower Spathe -->
      <g transform="translate(200, 160) scale(0.85)">
        <path d="M0,-30 C16,-12 12,12 0,30 C-12,12 -16,-12 0,-30 Z" fill="#f0e8a0"/>
        <path d="M0,-20 Q6,0 0,20 Q-6,0 0,-20 Z" fill="#d4a017"/>
      </g>
    `
  },
  {
    slug: 'ganesh-utsav-kit',
    title: 'GANESH UTSAV KIT',
    hindi: 'गणेश उत्सव किट',
    bg1: '#380a0f',
    bg2: '#170306',
    border: '#e8c96a',
    tag: 'FESTIVAL SET',
    stickColor: '#c45c26',
    subtitle: '3 Fragrances + Solid Brass Holder',
    details: '90 STICKS · 3 PACKS + BRASS',
    accentGraphic: `
      <!-- Sacred Ganesha Silhouette -->
      <g transform="translate(200, 160) scale(0.85)">
        <circle cx="0" cy="0" r="24" fill="#d4a017" stroke="#e8c96a" stroke-width="1.8"/>
        <path d="M0,-15 C-10,-15 -12,-4 -6,4 C-2,10 0,15 -4,18 M4,4 C10,4 12,-4 6,-15" fill="none" stroke="#2b080b" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    `
  },
  {
    slug: 'nitya-box',
    title: 'NITYA BOX',
    hindi: 'नित्य बॉक्स',
    bg1: '#210d16',
    bg2: '#0e0409',
    border: '#d4a017',
    tag: 'SUBSCRIPTION',
    stickColor: '#8b5a3c',
    subtitle: '4 Rotating Temple Blends',
    details: '120 STICKS / MONTH',
    accentGraphic: `
      <!-- Subscription Box Icon -->
      <g transform="translate(200, 160) scale(0.85)">
        <rect x="-22" y="-15" width="44" height="30" rx="3" fill="#d4a017" stroke="#e8c96a" stroke-width="1.8"/>
        <path d="M-22,-5 L0,8 L22,-5" fill="none" stroke="#210d16" stroke-width="2"/>
        <line x1="0" y1="8" x2="0" y2="15" stroke="#210d16" stroke-width="2"/>
      </g>
    `
  }
];

function generateSVG(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="60%" stop-color="${p.bg2}"/>
      <stop offset="100%" stop-color="#050201"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4a017"/>
      <stop offset="50%" stop-color="#f4ead8"/>
      <stop offset="100%" stop-color="#d4a017"/>
    </linearGradient>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180c07"/>
      <stop offset="50%" stop-color="#070302"/>
      <stop offset="100%" stop-color="#140905"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${p.border}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${p.border}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background Layer -->
  <rect width="400" height="520" fill="url(#bgGrad)"/>
  <rect width="400" height="520" fill="url(#glow)"/>

  <!-- Clean Outer Frame -->
  <rect x="12" y="12" width="376" height="496" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" rx="4" opacity="0.65"/>
  <rect x="18" y="18" width="364" height="484" fill="none" stroke="${p.border}" stroke-width="0.6" rx="3" stroke-dasharray="4,4" opacity="0.45"/>

  <!-- Top Header Seal: ARPAN (Clear, Spaced) -->
  <g transform="translate(200, 48)">
    <rect x="-80" y="-15" width="160" height="30" rx="4" fill="#090403" stroke="url(#goldGrad)" stroke-width="1.2"/>
    <text x="-38" y="4" font-family="'Noto Serif Devanagari', serif" font-weight="bold" font-size="13" fill="#d4a017">अर्पण</text>
    <line x1="-6" y1="-7" x2="-6" y2="7" stroke="#d4a017" stroke-width="0.8" opacity="0.5"/>
    <text x="6" y="3" font-family="system-ui, sans-serif" font-weight="800" font-size="10" letter-spacing="2.5" fill="#f4ead8">ARPAN</text>
  </g>

  <!-- Product Tag Badge -->
  <g transform="translate(320, 48)">
    <rect x="-35" y="-10" width="70" height="20" rx="10" fill="#d4a017"/>
    <text x="0" y="3" font-family="system-ui, sans-serif" font-weight="800" font-size="8" text-anchor="middle" fill="#090403" letter-spacing="0.8">${p.tag}</text>
  </g>

  <!-- Central Graphic Illustration Area -->
  ${p.accentGraphic}

  <!-- 3D Agarbatti Packaging Box Mockup (Well Spaced) -->
  <g transform="translate(200, 290)">
    <!-- Box Shadow -->
    <rect x="-130" y="-55" width="260" height="120" rx="5" fill="#000000" opacity="0.5" transform="rotate(-1)"/>
    
    <!-- Main Box Body -->
    <rect x="-135" y="-60" width="270" height="115" rx="4" fill="url(#boxGrad)" stroke="url(#goldGrad)" stroke-width="1.2" transform="rotate(-1)"/>
    <rect x="-129" y="-54" width="258" height="103" fill="none" stroke="${p.border}" stroke-width="0.6" opacity="0.35" transform="rotate(-1)"/>

    <!-- Box Branding Text -->
    <g transform="rotate(-1)">
      <text x="0" y="-34" font-family="'Noto Serif Devanagari', serif" font-weight="bold" font-size="11" text-anchor="middle" fill="#d4a017" letter-spacing="1.5">अर्पण · ARPAN DHUPA</text>
      <text x="0" y="-10" font-family="'Times New Roman', serif" font-weight="bold" font-size="16" text-anchor="middle" fill="#ffffff" letter-spacing="1.2">${p.title}</text>
      <line x1="-75" y1="2" x2="75" y2="2" stroke="#d4a017" stroke-width="0.8" opacity="0.5"/>
      <text x="0" y="16" font-family="system-ui, sans-serif" font-weight="600" font-size="9" text-anchor="middle" fill="#e8c96a" letter-spacing="0.8">${p.subtitle.toUpperCase()}</text>
      <text x="0" y="32" font-family="system-ui, sans-serif" font-weight="400" font-size="8" text-anchor="middle" fill="#8b7e74" letter-spacing="0.8">100% CHARCOAL-FREE ORGANIC MASALA</text>
    </g>
  </g>

  <!-- Hand-Rolled Agarbatti Sticks Bundle Render -->
  <g transform="translate(200, 405)">
    <g transform="translate(-36, 0) rotate(-5)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${p.stickColor}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="2.5" fill="#e8c96a"/>
    </g>
    <g transform="translate(-18, -3) rotate(-2.5)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${p.stickColor}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="3" fill="#f4d78a"/>
    </g>
    <g transform="translate(0, -5)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${p.stickColor}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="3.5" fill="#ffffff"/>
      <circle cx="0" cy="0" r="7" fill="#e8c96a" opacity="0.35"/>
    </g>
    <g transform="translate(18, -3) rotate(2.5)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${p.stickColor}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="3" fill="#f4d78a"/>
    </g>
    <g transform="translate(36, 0) rotate(5)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="${p.stickColor}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="2.5" fill="#e8c96a"/>
    </g>
  </g>

  <!-- Bottom Footer Box Label -->
  <g transform="translate(200, 475)">
    <rect x="-165" y="-12" width="330" height="24" rx="3" fill="#090403" stroke="${p.border}" stroke-width="0.8" opacity="0.9"/>
    <text x="-150" y="4" font-family="'Noto Serif Devanagari', serif" font-size="10" fill="#d4a017">${p.hindi}</text>
    <text x="0" y="4" font-family="system-ui, sans-serif" font-weight="600" font-size="8.5" text-anchor="middle" fill="#f4ead8" letter-spacing="0.8">${p.details}</text>
    <text x="150" y="4" font-family="system-ui, sans-serif" font-weight="700" font-size="8.5" text-anchor="end" fill="#d4a017">0% CHARCOAL</text>
  </g>
</svg>`;
}

products.forEach(p => {
  const filePath = path.join(outDir, `${p.slug}.svg`);
  fs.writeFileSync(filePath, generateSVG(p), 'utf8');
});

console.log('All 10 product images successfully updated with spacious layout!');
