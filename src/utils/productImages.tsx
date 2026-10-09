import React from 'react';

interface HeadphoneGraphicProps {
  color?: 'black' | 'silver' | 'blue' | 'pink';
  view?: 'front' | 'side' | 'case' | 'lifestyle' | 'driver';
  className?: string;
}

export const HeadphoneGraphic: React.FC<HeadphoneGraphicProps> = ({
  color = 'black',
  view = 'front',
  className = 'w-full h-full'
}) => {
  // Theme palette based on selected color variant
  const palette = {
    black: {
      body: '#1e1f22',
      bodyDark: '#121315',
      bodyHighlight: '#36393e',
      cushion: '#2b2d31',
      accent: '#c5a059', // subtle gold Sony logo
      accentBand: '#2b2d31',
    },
    silver: {
      body: '#e2e4e8',
      bodyDark: '#c7cbd1',
      bodyHighlight: '#f5f6f8',
      cushion: '#d8dade',
      accent: '#b8924b',
      accentBand: '#c7cbd1',
    },
    blue: {
      body: '#1a273b',
      bodyDark: '#0e1724',
      bodyHighlight: '#293d5c',
      cushion: '#1c2638',
      accent: '#d4af37',
      accentBand: '#20304a',
    },
    pink: {
      body: '#dfc2ba',
      bodyDark: '#c8a89f',
      bodyHighlight: '#ebd8d2',
      cushion: '#cfaea6',
      accent: '#a66d5b',
      accentBand: '#c8a89f',
    }
  }[color];

  if (view === 'side') {
    return (
      <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#ffffff" />
        <defs>
          <radialGradient id={`side-grad-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.bodyHighlight} />
            <stop offset="70%" stopColor={palette.body} />
            <stop offset="100%" stopColor={palette.bodyDark} />
          </radialGradient>
          <filter id="shadow-side" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodOpacity="0.12" floodColor="#000000" />
          </filter>
        </defs>

        {/* Soft shadow on surface */}
        <ellipse cx="250" cy="440" rx="140" ry="18" fill="#e8eaed" />

        {/* Headband arch profile */}
        <path
          d="M245 80 C 180 80, 150 140, 160 230 L 175 230 C 168 150, 190 98, 245 98 C 300 98, 322 150, 315 230 L 330 230 C 340 140, 310 80, 245 80 Z"
          fill={palette.bodyDark}
          filter="url(#shadow-side)"
        />
        {/* Soft leather headband padding */}
        <path
          d="M 180 140 C 190 105, 220 95, 245 95 C 270 95, 300 105, 310 140 C 295 125, 265 118, 245 118 C 225 118, 195 125, 180 140 Z"
          fill={palette.cushion}
        />

        {/* Swivel Yoke */}
        <rect x="235" y="195" width="20" height="55" rx="10" fill={palette.bodyDark} />
        <circle cx="245" cy="225" r="5" fill={palette.accent} opacity="0.8" />

        {/* Circular Side Earcup */}
        <g filter="url(#shadow-side)">
          <ellipse cx="245" cy="300" rx="90" ry="115" fill={palette.bodyDark} />
          <ellipse cx="245" cy="300" rx="85" ry="108" fill={`url(#side-grad-${color})`} />
          <ellipse cx="245" cy="300" rx="72" ry="92" fill={palette.cushion} />
          
          {/* Touch sensor matte outer disc */}
          <ellipse cx="245" cy="300" rx="60" ry="78" fill={palette.body} />
          
          {/* Ambient microphone mesh port */}
          <rect x="220" y="222" width="16" height="4" rx="2" fill={palette.accent} />
          <rect x="254" y="222" width="16" height="4" rx="2" fill={palette.accent} />

          {/* SONY logo in gold/champagne */}
          <text x="245" y="275" fill={palette.accent} fontSize="12" fontWeight="700" letterSpacing="3" textAnchor="middle" fontFamily="sans-serif">
            SONY
          </text>

          {/* NC / Ambient button indicator & USB-C port */}
          <circle cx="210" cy="380" r="3.5" fill="#444" />
          <rect x="238" y="392" width="14" height="4" rx="2" fill="#333" />
        </g>
      </svg>
    );
  }

  if (view === 'case') {
    return (
      <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#ffffff" />
        <defs>
          <linearGradient id={`case-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e3136" />
            <stop offset="60%" stopColor="#1e2023" />
            <stop offset="100%" stopColor="#121315" />
          </linearGradient>
          <filter id="shadow-case">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodOpacity="0.16" floodColor="#000000" />
          </filter>
        </defs>

        <ellipse cx="250" cy="450" rx="170" ry="22" fill="#eaeded" />

        {/* Collapsible fabric travel case outer shell */}
        <g filter="url(#shadow-case)">
          <path
            d="M 140 160 C 140 120, 200 95, 250 95 C 300 95, 360 120, 360 160 L 375 360 C 375 410, 310 430, 250 430 C 190 430, 125 410, 125 360 Z"
            fill="url(#case-grad)"
          />
          {/* Fabric texture weave highlight */}
          <path
            d="M 144 163 C 144 125, 202 100, 250 100 C 298 100, 356 125, 356 163 L 370 358 C 370 405, 308 424, 250 424 C 192 424, 130 405, 130 358 Z"
            stroke="#474b52"
            strokeWidth="2"
            fill="none"
          />

          {/* Magnetic fold lid contour */}
          <path
            d="M 130 240 Q 250 270 370 240"
            stroke="#121315"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 130 238 Q 250 268 370 238"
            stroke="#5c616b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Magnetic clasp & pull tab */}
          <rect x="235" y="250" width="30" height="24" rx="4" fill="#36393e" />
          <circle cx="250" cy="262" r="3.5" fill={palette.accent} />

          {/* SONY Debossed Logo */}
          <text x="250" y="180" fill="#6d737d" fontSize="14" fontWeight="800" letterSpacing="4" textAnchor="middle" fontFamily="sans-serif">
            SONY
          </text>
        </g>
      </svg>
    );
  }

  if (view === 'driver') {
    return (
      <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="#ffffff" />
        <defs>
          <radialGradient id="acoustic-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3a847" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#cc0c39" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#007185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Acoustic waves representation */}
        <circle cx="250" cy="250" r="220" fill="none" stroke="#eaeded" strokeWidth="2" />
        <circle cx="250" cy="250" r="180" fill="none" stroke="#ffd814" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="250" cy="250" r="140" fill="url(#acoustic-glow)" />

        {/* Carbon fiber 30mm precision driver dome */}
        <circle cx="250" cy="250" r="110" fill="#181a1d" stroke="#36393e" strokeWidth="6" />
        <circle cx="250" cy="250" r="85" fill="#25282e" stroke="#c5a059" strokeWidth="2" />
        <circle cx="250" cy="250" r="55" fill="#111214" stroke="#444" strokeWidth="3" />

        {/* Neodymium magnetic ring indicators */}
        <circle cx="250" cy="250" r="35" fill="#2b2d31" />
        <circle cx="250" cy="250" r="18" fill="#c5a059" />

        {/* Callout technical notes */}
        <line x1="250" y1="140" x2="360" y2="90" stroke="#007185" strokeWidth="1.5" />
        <circle cx="360" cy="90" r="3" fill="#007185" />
        <text x="370" y="93" fill="#0f1111" fontSize="12" fontWeight="700">30mm Carbon Composite Dome</text>
        <text x="370" y="108" fill="#565959" fontSize="10">High-frequency sensitivity & clarity</text>

        <line x1="250" y1="360" x2="140" y2="410" stroke="#007185" strokeWidth="1.5" />
        <circle cx="140" cy="410" r="3" fill="#007185" />
        <text x="130" y="413" fill="#0f1111" fontSize="12" fontWeight="700" textAnchor="end">Integrated Processor V1</text>
        <text x="130" y="428" fill="#565959" fontSize="10" textAnchor="end">Unmatched noise canceling accuracy</text>
      </svg>
    );
  }

  if (view === 'lifestyle') {
    return (
      <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-life" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f2f5" />
            <stop offset="100%" stopColor="#dfe3e8" />
          </linearGradient>
          <filter id="shadow-life">
            <feDropShadow dx="0" dy="16" stdDeviation="24" floodOpacity="0.2" floodColor="#000" />
          </filter>
        </defs>
        <rect width="500" height="500" fill="url(#bg-life)" />

        {/* Minimalist architectural window background */}
        <line x1="380" y1="0" x2="380" y2="500" stroke="#cbd2d9" strokeWidth="2" />
        <line x1="0" y1="320" x2="500" y2="320" stroke="#cbd2d9" strokeWidth="1.5" />
        <rect x="400" y="60" width="80" height="220" rx="4" fill="#ffffff" opacity="0.6" />

        {/* Silhouette profile with headphones */}
        <path
          d="M 180 500 C 180 430, 210 390, 240 370 C 270 355, 300 320, 290 250 C 285 200, 260 170, 210 170 C 160 170, 130 205, 130 260 C 130 320, 150 355, 170 375 L 140 500 Z"
          fill="#c4c9d1"
        />

        {/* Matte XM5 Headphone resting over ear */}
        <g filter="url(#shadow-life)">
          {/* Headband arch */}
          <path
            d="M 170 175 C 190 145, 230 140, 265 160 C 275 166, 282 175, 288 185"
            stroke={palette.bodyDark}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Cushion underneath */}
          <path
            d="M 185 178 C 205 156, 235 152, 260 168"
            stroke={palette.cushion}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Earcup */}
          <ellipse cx="230" cy="275" rx="55" ry="75" fill={palette.bodyDark} transform="rotate(-10 230 275)" />
          <ellipse cx="230" cy="275" rx="50" ry="70" fill={palette.body} transform="rotate(-10 230 275)" />
          <ellipse cx="230" cy="275" rx="38" ry="54" fill={palette.bodyHighlight} transform="rotate(-10 230 275)" />
          
          {/* Sony logo accent */}
          <text x="230" y="255" fill={palette.accent} fontSize="9" fontWeight="700" letterSpacing="2" textAnchor="middle" transform="rotate(-10 230 255)">
            SONY
          </text>
        </g>

        {/* Feature badge in lifestyle */}
        <rect x="30" y="30" width="180" height="42" rx="4" fill="#ffffff" filter="url(#shadow-life)" />
        <circle cx="50" cy="51" r="10" fill="#007185" />
        <path d="M 46 51 L 49 54 L 55 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <text x="68" y="47" fill="#0f1111" fontSize="11" fontWeight="700">Auto NC Optimizer</text>
        <text x="68" y="60" fill="#565959" fontSize="9">Adapts to air pressure & wear</text>
      </svg>
    );
  }

  // DEFAULT: Front 3/4 Iconic Packshot
  return (
    <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="#ffffff" />
      <defs>
        <radialGradient id={`front-grad-${color}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={palette.bodyHighlight} />
          <stop offset="65%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.bodyDark} />
        </radialGradient>
        <linearGradient id={`earcup-ring-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bodyHighlight} />
          <stop offset="100%" stopColor={palette.bodyDark} />
        </linearGradient>
        <filter id="shadow-packshot" x="-15%" y="-15%" width="130%" height="135%">
          <feDropShadow dx="0" dy="24" stdDeviation="22" floodOpacity="0.14" floodColor="#000000" />
        </filter>
      </defs>

      {/* Surface drop shadow */}
      <ellipse cx="250" cy="450" rx="180" ry="20" fill="#eaeded" />
      <ellipse cx="250" cy="450" rx="120" ry="12" fill="#d5d9d9" opacity="0.6" />

      {/* MAIN HEADPHONES GROUP */}
      <g filter="url(#shadow-packshot)">
        {/* Continuous Slim Headband Arch */}
        <path
          d="M 130 250 C 130 110, 200 65, 250 65 C 300 65, 370 110, 370 250"
          stroke={palette.bodyDark}
          strokeWidth="24"
          strokeLinecap="round"
        />
        
        {/* Soft Leather Cushion Strip along the underband */}
        <path
          d="M 160 210 C 165 125, 210 82, 250 82 C 290 82, 335 125, 340 210"
          stroke={palette.cushion}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Stepless slider arms (Left and Right) */}
        <path d="M 130 220 L 130 280" stroke={palette.bodyHighlight} strokeWidth="16" strokeLinecap="round" />
        <path d="M 370 220 L 370 280" stroke={palette.bodyHighlight} strokeWidth="16" strokeLinecap="round" />

        {/* LEFT EARCUP (Angled) */}
        <g transform="translate(130, 310) rotate(-14)">
          {/* Plush earcup cushion back */}
          <ellipse cx="0" cy="0" rx="55" ry="85" fill={palette.cushion} />
          <ellipse cx="0" cy="0" rx="46" ry="74" fill={palette.bodyDark} />
          {/* Main outer shell */}
          <ellipse cx="-4" cy="0" rx="46" ry="76" fill={`url(#front-grad-${color})`} />
          <ellipse cx="-4" cy="0" rx="38" ry="65" fill={palette.body} />
          {/* Mic grill */}
          <rect x="-14" y="-55" width="20" height="4" rx="2" fill={palette.accent} />
          {/* Sony logo on Left Yoke */}
          <text x="-4" y="-15" fill={palette.accent} fontSize="11" fontWeight="800" letterSpacing="2.5" textAnchor="middle" fontFamily="sans-serif">
            SONY
          </text>
        </g>

        {/* RIGHT EARCUP (Angled) */}
        <g transform="translate(370, 310) rotate(14)">
          {/* Plush earcup cushion back */}
          <ellipse cx="0" cy="0" rx="55" ry="85" fill={palette.cushion} />
          <ellipse cx="0" cy="0" rx="46" ry="74" fill={palette.bodyDark} />
          {/* Main outer shell */}
          <ellipse cx="4" cy="0" rx="46" ry="76" fill={`url(#front-grad-${color})`} />
          <ellipse cx="4" cy="0" rx="38" ry="65" fill={palette.body} />
          {/* Mic grill */}
          <rect x="-6" y="-55" width="20" height="4" rx="2" fill={palette.accent} />
          {/* Sony logo on Right Yoke */}
          <text x="4" y="-15" fill={palette.accent} fontSize="11" fontWeight="800" letterSpacing="2.5" textAnchor="middle" fontFamily="sans-serif">
            SONY
          </text>
        </g>
      </g>
    </svg>
  );
};

export const AirPodsMaxGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="#ffffff" />
    <ellipse cx="250" cy="450" rx="160" ry="18" fill="#eaeded" />
    {/* Mesh Canopy */}
    <path d="M 160 210 C 160 110, 210 75, 250 75 C 290 75, 340 110, 340 210" stroke="#37393d" strokeWidth="22" strokeLinecap="round" />
    <path d="M 180 180 C 185 120, 220 90, 250 90 C 280 90, 315 120, 320 180" stroke="#505359" strokeWidth="12" strokeDasharray="3 3" />
    {/* Stainless steel arms */}
    <line x1="160" y1="200" x2="160" y2="280" stroke="#9da3ab" strokeWidth="12" strokeLinecap="round" />
    <line x1="340" y1="200" x2="340" y2="280" stroke="#9da3ab" strokeWidth="12" strokeLinecap="round" />
    {/* Anodized Aluminum Earcups */}
    <rect x="110" y="270" width="85" height="120" rx="42" fill="#2d3036" />
    <rect x="115" y="275" width="75" height="110" rx="37" fill="#4b5059" />
    <rect x="305" y="270" width="85" height="120" rx="42" fill="#2d3036" />
    <rect x="310" y="275" width="75" height="110" rx="37" fill="#4b5059" />
    {/* Digital Crown */}
    <rect x="160" y="260" width="16" height="10" rx="3" fill="#a4aab3" />
  </svg>
);

export const KindleGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="#ffffff" />
    <ellipse cx="250" cy="460" rx="140" ry="16" fill="#eaeded" />
    {/* Kindle Chasis */}
    <rect x="120" y="60" width="260" height="380" rx="14" fill="#1b1c1e" />
    {/* Flush e-ink screen */}
    <rect x="145" y="90" width="210" height="310" rx="4" fill="#ecefe6" />
    {/* Text simulation */}
    <text x="160" y="125" fill="#1b1c1e" fontSize="16" fontWeight="700" fontFamily="serif">Chapter One</text>
    <line x1="160" y1="150" x2="335" y2="150" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="170" x2="335" y2="170" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="190" x2="335" y2="190" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="210" x2="310" y2="210" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="240" x2="335" y2="240" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="260" x2="335" y2="260" stroke="#4a4c4e" strokeWidth="2.5" />
    <line x1="160" y1="280" x2="290" y2="280" stroke="#4a4c4e" strokeWidth="2.5" />
    {/* Kindle Logo bottom bezel */}
    <text x="250" y="424" fill="#696d75" fontSize="12" fontWeight="700" letterSpacing="1" textAnchor="middle" fontFamily="sans-serif">
      kindle
    </text>
  </svg>
);

export const StandAccessoryGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="#ffffff" />
    <ellipse cx="250" cy="450" rx="130" ry="16" fill="#eaeded" />
    {/* Aluminum base */}
    <ellipse cx="250" cy="430" rx="100" ry="24" fill="#64748b" />
    <ellipse cx="250" cy="426" rx="96" ry="22" fill="#94a3b8" />
    {/* Stem */}
    <rect x="242" y="140" width="16" height="286" rx="4" fill="#64748b" />
    <rect x="244" y="140" width="10" height="286" rx="3" fill="#cbd5e1" />
    {/* Top saddle cradle */}
    <path d="M 180 140 C 210 160, 290 160, 320 140" stroke="#475569" strokeWidth="28" strokeLinecap="round" />
    <path d="M 180 138 C 210 158, 290 158, 320 138" stroke="#1e293b" strokeWidth="22" strokeLinecap="round" />
  </svg>
);

