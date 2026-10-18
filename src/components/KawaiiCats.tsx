import React from 'react';

interface CatProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

// 1. Peach Sparkling (Exact reference video 1: Peach leaning paws on edge with big sparkly eyes and stars)
export const PeachSparkle: React.FC<CatProps> = ({ className = '', size = 180, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 240 216"
        className={`w-full h-full drop-shadow-sm ${animated ? 'animate-bounce-cute' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sparkles around Peach */}
        {animated && (
          <g className="animate-pulse">
            <path d="M 28 80 Q 32 64 36 80 Q 52 84 36 88 Q 32 104 28 88 Q 12 84 28 80 Z" fill="#FFE8A3" />
            <path d="M 210 65 Q 213 52 216 65 Q 229 68 216 71 Q 213 84 210 71 Q 197 68 210 65 Z" fill="#FFE8A3" />
            <circle cx="48" cy="116" r="3" fill="#FFE8A3" />
            <circle cx="196" cy="108" r="3.5" fill="#FFE8A3" />
          </g>
        )}

        {/* Foreground table/shelf ledge */}
        <rect x="20" y="156" width="200" height="24" rx="10" fill="#E8C39E" stroke="#54382F" strokeWidth="5" />

        {/* Tail peeking on right */}
        <path
          d="M 175 140 C 195 140 205 125 198 115 C 192 105 180 115 178 126"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Cat Body */}
        <ellipse cx="120" cy="140" rx="64" ry="40" fill="#FFFFFF" stroke="#54382F" strokeWidth="5" />

        {/* Head */}
        <path
          d="M 68 85 
             C 54 80 48 56 60 46 
             C 70 38 88 56 98 62 
             C 112 59 128 59 142 62 
             C 152 56 170 38 180 46 
             C 192 56 186 80 172 85 
             C 192 102 188 132 170 142 
             C 145 152 95 152 70 142 
             C 52 132 48 102 68 85 Z"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Peach Tabby Stripes on forehead */}
        <g stroke="#D4CBC4" strokeWidth="4" strokeLinecap="round">
          <path d="M 120 62 L 120 74" />
          <path d="M 108 65 L 105 75" />
          <path d="M 132 65 L 135 75" />
        </g>

        {/* Pink Inner Ears */}
        <path d="M 65 52 C 67 62 76 68 82 70" stroke="#F6C9D2" strokeWidth="5" strokeLinecap="round" />
        <path d="M 175 52 C 173 62 164 68 158 70" stroke="#F6C9D2" strokeWidth="5" strokeLinecap="round" />

        {/* Cheeks Blush */}
        <ellipse cx="78" cy="115" rx="13" ry="9" fill="#F6C9D2" opacity="0.85" />
        <ellipse cx="162" cy="115" rx="13" ry="9" fill="#F6C9D2" opacity="0.85" />

        {/* Big Sparkling Eyes (Peach style) */}
        {/* Left Eye */}
        <ellipse cx="94" cy="102" rx="12" ry="14" fill="#54382F" />
        <circle cx="91" cy="97" r="5" fill="#FFFFFF" />
        <circle cx="98" cy="107" r="3.2" fill="#FFFFFF" />
        <circle cx="89" cy="106" r="1.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="146" cy="102" rx="12" ry="14" fill="#54382F" />
        <circle cx="143" cy="97" r="5" fill="#FFFFFF" />
        <circle cx="150" cy="107" r="3.2" fill="#FFFFFF" />
        <circle cx="141" cy="106" r="1.5" fill="#FFFFFF" />

        {/* Cute Mouth :3 */}
        <path
          d="M 112 112 C 114 116 118 117 120 114 C 122 117 126 116 128 112"
          fill="none"
          stroke="#54382F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Tiny Pink Tongue */}
        <path d="M 117 114 C 117 120 123 120 123 114 Z" fill="#EEA2B2" />

        {/* Cute Paws Resting on Shelf */}
        <g stroke="#54382F" strokeWidth="4.5" fill="#FFFFFF">
          {/* Left paw */}
          <path d="M 98 160 C 96 150 108 146 114 154 C 115 158 114 163 112 165 Z" />
          {/* Right paw */}
          <path d="M 126 165 C 124 160 125 152 130 152 C 137 152 142 158 138 165 Z" />
        </g>
      </svg>
    </div>
  );
};

// 2. Cat Hug (Exact reference video 2: Goma the grey cat hugging Peach from behind, swaying head lovingly)
export const CatHug: React.FC<CatProps> = ({ className = '', size = 200, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.95 }}>
      <svg
        viewBox="0 0 250 230"
        className={`w-full h-full drop-shadow-sm ${animated ? 'animate-float' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating Heart */}
        {animated && (
          <g className="animate-pulse">
            <path
              d="M 180 32 C 180 24 170 20 164 26 C 158 20 148 24 148 32 C 148 42 164 52 164 52 C 164 52 180 42 180 32 Z"
              fill="#F6C9D2"
              stroke="#54382F"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* === GOMA (Grey Cat) BEHIND === */}
        {/* Goma Tail */}
        <path
          d="M 205 160 C 225 160 232 145 228 135 C 224 125 212 132 208 142"
          fill="#A39A94"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Goma Body */}
        <ellipse cx="170" cy="155" rx="55" ry="46" fill="#A39A94" stroke="#54382F" strokeWidth="5" />

        {/* Goma Head */}
        <path
          d="M 125 80 
             C 115 72 110 50 122 42 
             C 132 35 148 52 158 56 
             C 172 53 190 53 204 56 
             C 214 50 230 35 240 42 
             C 252 50 246 72 236 80 
             C 252 98 248 126 230 136 
             C 206 148 152 148 130 136 
             C 114 124 110 98 125 80 Z"
          fill="#A39A94"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Goma Inner Ears */}
        <path d="M 128 50 C 130 58 138 64 144 65" stroke="#F6C9D2" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 234 50 C 232 58 224 64 218 65" stroke="#F6C9D2" strokeWidth="4.5" strokeLinecap="round" />

        {/* Goma Happy Closed Eyes (nuzzling) */}
        <path d="M 154 94 Q 162 87 170 94" stroke="#54382F" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 194 94 Q 202 87 210 94" stroke="#54382F" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Goma Blush */}
        <ellipse cx="146" cy="102" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
        <ellipse cx="218" cy="102" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />

        {/* Goma Mouth :3 */}
        <path d="M 178 102 Q 182 106 186 102 Q 190 106 194 102" stroke="#54382F" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* === PEACH (White Cat) IN FRONT === */}
        {/* Peach Body */}
        <ellipse cx="90" cy="165" rx="48" ry="38" fill="#FFFFFF" stroke="#54382F" strokeWidth="5" />

        {/* Peach Head (tilted cutely in Goma's embrace) */}
        <path
          d="M 45 105 
             C 32 98 28 78 40 70 
             C 50 63 65 78 74 83 
             C 86 80 102 80 114 83 
             C 122 78 138 63 148 70 
             C 160 78 154 98 142 105 
             C 158 120 152 146 136 155 
             C 114 165 68 165 48 155 
             C 34 144 32 120 45 105 Z"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Peach Inner Ears */}
        <path d="M 46 76 C 48 83 55 88 61 89" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />
        <path d="M 142 76 C 140 83 133 88 127 89" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />

        {/* Peach Gentle Eyes (curved soft happy) */}
        <path d="M 68 116 Q 75 122 82 116" stroke="#54382F" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 106 116 Q 113 122 120 116" stroke="#54382F" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Peach Blush */}
        <ellipse cx="60" cy="124" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
        <ellipse cx="128" cy="124" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />

        {/* Peach Mouth */}
        <path d="M 90 124 Q 94 128 98 124" stroke="#54382F" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Peach Paws held together in front */}
        <path
          d="M 76 172 C 78 162 90 160 94 168 C 98 160 110 162 112 172 Z"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="4"
        />

        {/* Goma's Paws wrapped around Peach (the hug!) */}
        <path
          d="M 136 142 C 144 142 152 148 148 156 C 142 165 126 166 122 156 Z"
          fill="#A39A94"
          stroke="#54382F"
          strokeWidth="4.5"
        />
        <path
          d="M 52 155 C 50 148 56 142 64 142 C 70 142 75 148 72 156 Z"
          fill="#A39A94"
          stroke="#54382F"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

// 3. Peach Kneading Cushion (Reference image pose: stripes, shiny eyes, tongue sticking out, paws kneading a pink cushion)
export const PeachKnead: React.FC<CatProps> = ({ className = '', size = 180, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 240 220"
        className={`w-full h-full drop-shadow-sm ${animated ? 'animate-bounce-cute' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pink fluffy cushion/peach */}
        <path
          d="M 140 155 C 170 145 220 160 225 185 C 230 210 185 220 145 210 C 130 205 125 190 140 155 Z"
          fill="#F6C9D2"
          stroke="#54382F"
          strokeWidth="5"
        />
        {/* Cushion wrinkle creases */}
        <path d="M 175 180 Q 185 190 200 185" stroke="#ECA4B2" strokeWidth="4" strokeLinecap="round" />
        <path d="M 160 195 Q 170 202 185 198" stroke="#ECA4B2" strokeWidth="4" strokeLinecap="round" />

        {/* Peach body angled forward */}
        <ellipse cx="90" cy="150" rx="55" ry="40" fill="#FFFFFF" stroke="#54382F" strokeWidth="5" />
        {/* Back paw */}
        <ellipse cx="60" cy="170" rx="16" ry="12" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        {/* Tail curved up */}
        <path
          d="M 45 140 C 25 135 20 115 28 105 C 34 98 42 108 40 120"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Head */}
        <path
          d="M 75 75 
             C 62 68 56 46 68 36 
             C 78 28 95 46 106 52 
             C 120 49 138 49 152 52 
             C 162 46 180 28 190 36 
             C 202 46 196 68 184 75 
             C 202 92 198 122 180 132 
             C 155 144 105 144 80 132 
             C 62 120 58 92 75 75 Z"
          fill="#FFFFFF"
          stroke="#54382F"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Tabby stripes on head */}
        <g stroke="#C2B7B0" strokeWidth="4.5" strokeLinecap="round">
          <path d="M 128 50 L 128 62" />
          <path d="M 115 54 L 111 65" />
          <path d="M 141 54 L 145 65" />
        </g>

        {/* Pink Inner Ears */}
        <path d="M 72 44 C 74 52 82 58 88 59" stroke="#F6C9D2" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 186 44 C 184 52 176 58 170 59" stroke="#F6C9D2" strokeWidth="4.5" strokeLinecap="round" />

        {/* Rosy Blush */}
        <ellipse cx="85" cy="106" rx="14" ry="10" fill="#F6C9D2" opacity="0.9" />
        <ellipse cx="172" cy="106" rx="14" ry="10" fill="#F6C9D2" opacity="0.9" />

        {/* Big sparkling eyes */}
        <ellipse cx="102" cy="94" rx="12" ry="14" fill="#54382F" />
        <circle cx="99" cy="89" r="5" fill="#FFFFFF" />
        <circle cx="106" cy="99" r="3" fill="#FFFFFF" />

        <ellipse cx="155" cy="94" rx="12" ry="14" fill="#54382F" />
        <circle cx="152" cy="89" r="5" fill="#FFFFFF" />
        <circle cx="159" cy="99" r="3" fill="#FFFFFF" />

        {/* Tiny mouth with cute tongue sticking out */}
        <path d="M 124 102 Q 128 106 132 102" stroke="#54382F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path
          d="M 125 104 C 125 113 133 113 133 104 Z"
          fill="#EEA2B2"
          stroke="#54382F"
          strokeWidth="2.5"
        />

        {/* Kneading Front Paws pushing into cushion */}
        <g stroke="#54382F" strokeWidth="4.5" fill="#FFFFFF">
          {/* Left front paw extending */}
          <path d="M 130 148 C 138 142 152 150 156 160 C 158 168 152 172 144 170 Z" />
          {/* Right front paw pushing deep into cushion */}
          <path d="M 158 158 C 166 150 180 158 184 170 C 186 178 178 182 170 178 Z" />
        </g>
      </svg>
    </div>
  );
};

// 4. Cats Together Holding Flower (Romantic Rose Garden / Opening Screen)
export const CatsTogetherFlower: React.FC<CatProps> = ({ className = '', size = 220, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.85 }}>
      <svg
        viewBox="0 0 280 220"
        className={`w-full h-full drop-shadow-sm ${animated ? 'animate-float-slow' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft grass / garden mound beneath them */}
        <ellipse cx="140" cy="195" rx="125" ry="18" fill="#DCEFE3" stroke="#54382F" strokeWidth="3.5" />
        
        {/* Tiny garden daisies around */}
        <circle cx="45" cy="192" r="5" fill="#FFFFFF" stroke="#54382F" strokeWidth="2" />
        <circle cx="45" cy="192" r="2.5" fill="#FFE8A3" />
        <circle cx="235" cy="192" r="5" fill="#FFFFFF" stroke="#54382F" strokeWidth="2" />
        <circle cx="235" cy="192" r="2.5" fill="#FFE8A3" />

        {/* White Cat (Peach) on Left */}
        <g>
          {/* Body */}
          <ellipse cx="88" cy="148" rx="46" ry="36" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
          {/* Head */}
          <path
            d="M 52 92 C 40 85 36 65 48 58 C 58 52 72 68 82 72 C 94 69 108 69 118 72 C 126 68 140 52 150 58 C 160 65 156 85 144 92 C 158 106 154 130 138 138 C 118 148 76 148 58 138 C 42 128 40 106 52 92 Z"
            fill="#FFFFFF"
            stroke="#54382F"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Inner ears */}
          <path d="M 52 64 C 54 70 60 74 65 75" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />
          <path d="M 144 64 C 142 70 136 74 131 75" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />
          {/* Cheeks */}
          <ellipse cx="64" cy="110" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
          <ellipse cx="132" cy="110" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
          {/* Eyes smiling */}
          <ellipse cx="78" cy="98" rx="9" ry="11" fill="#54382F" />
          <circle cx="76" cy="94" r="3.5" fill="#FFFFFF" />
          <circle cx="82" cy="102" r="2" fill="#FFFFFF" />
          
          <ellipse cx="118" cy="98" rx="9" ry="11" fill="#54382F" />
          <circle cx="116" cy="94" r="3.5" fill="#FFFFFF" />
          <circle cx="122" cy="102" r="2" fill="#FFFFFF" />
          {/* Mouth */}
          <path d="M 94 106 Q 98 110 102 106" stroke="#54382F" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Grey Cat (Goma) on Right */}
        <g>
          {/* Body */}
          <ellipse cx="192" cy="148" rx="46" ry="36" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
          {/* Head */}
          <path
            d="M 156 92 C 144 85 140 65 152 58 C 162 52 176 68 186 72 C 198 69 212 69 222 72 C 230 68 244 52 254 58 C 264 65 260 85 248 92 C 262 106 258 130 242 138 C 222 148 180 148 162 138 C 146 128 144 106 156 92 Z"
            fill="#A39A94"
            stroke="#54382F"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Inner ears */}
          <path d="M 156 64 C 158 70 164 74 169 75" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />
          <path d="M 248 64 C 246 70 240 74 235 75" stroke="#F6C9D2" strokeWidth="4" strokeLinecap="round" />
          {/* Cheeks */}
          <ellipse cx="168" cy="110" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
          <ellipse cx="236" cy="110" rx="10" ry="7" fill="#F6C9D2" opacity="0.9" />
          {/* Eyes blushing happy */}
          <path d="M 174 98 Q 182 90 190 98" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 214 98 Q 222 90 230 98" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Mouth :3 */}
          <path d="M 198 104 Q 202 108 206 104" stroke="#54382F" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* The Flower being shared between them 🌷 */}
        <g className="animate-wiggle">
          {/* Stem */}
          <path d="M 130 160 Q 140 145 142 125" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Green Leaf */}
          <path d="M 138 144 Q 148 140 152 146" stroke="#54382F" strokeWidth="3" fill="#DCEFE3" />
          {/* Tulip Flower Head */}
          <path
            d="M 132 125 C 132 110 140 102 144 112 C 148 102 156 110 156 125 C 156 135 132 135 132 125 Z"
            fill="#ECA4B2"
            stroke="#54382F"
            strokeWidth="3.5"
          />
        </g>

        {/* Paws holding hands/flower */}
        <g stroke="#54382F" strokeWidth="4" fill="#FFFFFF">
          <ellipse cx="122" cy="155" rx="9" ry="7" />
        </g>
        <g stroke="#54382F" strokeWidth="4" fill="#A39A94">
          <ellipse cx="148" cy="155" rx="9" ry="7" />
        </g>
      </svg>
    </div>
  );
};

// 5. Cats Listening to Music with Headphones 🎧 (Our Mood, Our Music)
export const CatsMusicHeadphones: React.FC<CatProps> = ({ className = '', size = 200, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 260 220"
        className={`w-full h-full drop-shadow-sm ${animated ? 'animate-bounce-cute' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating Musical Notes */}
        {animated && (
          <g className="animate-pulse">
            <path d="M 35 60 L 35 40 L 52 35 L 52 55 M 35 48 L 52 43" stroke="#54382F" strokeWidth="3" fill="none" />
            <circle cx="30" cy="62" r="5" fill="#ECA4B2" stroke="#54382F" strokeWidth="2.5" />
            <circle cx="47" cy="57" r="5" fill="#ECA4B2" stroke="#54382F" strokeWidth="2.5" />

            <path d="M 220 50 L 220 32 L 235 30 L 235 48" stroke="#54382F" strokeWidth="3" fill="none" />
            <circle cx="215" cy="52" r="5" fill="#FFE8A3" stroke="#54382F" strokeWidth="2.5" />
            <circle cx="230" cy="50" r="5" fill="#FFE8A3" stroke="#54382F" strokeWidth="2.5" />
          </g>
        )}

        {/* Two Cats Sitting Cozy side by side */}
        {/* Peach (White) */}
        <ellipse cx="90" cy="150" rx="44" ry="36" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
        <ellipse cx="90" cy="105" rx="48" ry="40" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
        {/* Peach ears */}
        <polygon points="56,76 66,54 82,72" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        <polygon points="124,76 114,54 98,72" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        {/* Peach blush */}
        <ellipse cx="68" cy="116" rx="9" ry="6" fill="#F6C9D2" />
        <ellipse cx="112" cy="116" rx="9" ry="6" fill="#F6C9D2" />
        {/* Peach eyes closed humming */}
        <path d="M 72 104 Q 80 110 88 104" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 98 104 Q 106 110 114 104" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 90 114 Q 93 118 96 114" stroke="#54382F" strokeWidth="3" strokeLinecap="round" />

        {/* Goma (Grey) */}
        <ellipse cx="170" cy="150" rx="44" ry="36" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
        <ellipse cx="170" cy="105" rx="48" ry="40" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
        {/* Goma ears */}
        <polygon points="136,76 146,54 162,72" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
        <polygon points="204,76 194,54 178,72" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
        {/* Goma blush */}
        <ellipse cx="148" cy="116" rx="9" ry="6" fill="#F6C9D2" />
        <ellipse cx="192" cy="116" rx="9" ry="6" fill="#F6C9D2" />
        {/* Goma eyes */}
        <path d="M 152 104 Q 160 110 168 104" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 178 104 Q 186 110 194 104" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 170 114 Q 173 118 176 114" stroke="#54382F" strokeWidth="3" strokeLinecap="round" />

        {/* Cute Pastel Pink Headphones headband connecting both */}
        <path
          d="M 46 108 C 42 45 218 45 214 108"
          stroke="#54382F"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 46 108 C 42 45 218 45 214 108"
          stroke="#F6C9D2"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Headphone Ear Cushions */}
        <rect x="36" y="94" width="16" height="28" rx="8" fill="#ECA4B2" stroke="#54382F" strokeWidth="3.5" />
        <rect x="208" y="94" width="16" height="28" rx="8" fill="#ECA4B2" stroke="#54382F" strokeWidth="3.5" />

        {/* Paws on each other */}
        <ellipse cx="130" cy="155" rx="8" ry="6" fill="#FFFFFF" stroke="#54382F" strokeWidth="3" />
        <ellipse cx="142" cy="155" rx="8" ry="6" fill="#A39A94" stroke="#54382F" strokeWidth="3" />
      </svg>
    </div>
  );
};

// 6. Cats Under Crescent Moon & Stars (A Precious Life Together 🌙)
export const CatsUnderStars: React.FC<CatProps> = ({ className = '', size = 220, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 280 240"
        className={`w-full h-full drop-shadow-md ${animated ? 'animate-float-slow' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crescent Moon */}
        <path
          d="M 230 40 A 30 30 0 1 0 252 82 A 24 24 0 1 1 230 40 Z"
          fill="#FFE8A3"
          stroke="#54382F"
          strokeWidth="3.5"
        />

        {/* Soft Glowing Stars */}
        <g className="animate-pulse">
          <circle cx="50" cy="45" r="3" fill="#FFE8A3" />
          <circle cx="95" cy="25" r="2.5" fill="#FFE8A3" />
          <circle cx="160" cy="35" r="3.5" fill="#FFE8A3" />
          <circle cx="210" cy="95" r="2.5" fill="#FFE8A3" />
        </g>

        {/* Flowering branch / tree above */}
        <path d="M 10 30 Q 80 45 140 25" stroke="#54382F" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="36" r="6" fill="#F6C9D2" stroke="#54382F" strokeWidth="2" />
        <circle cx="105" cy="38" r="6" fill="#F6C9D2" stroke="#54382F" strokeWidth="2" />
        <circle cx="130" cy="26" r="5" fill="#FFFFFF" stroke="#54382F" strokeWidth="2" />

        {/* Sitting cats seen slightly from behind/side holding paws */}
        {/* Peach */}
        <ellipse cx="110" cy="170" rx="42" ry="46" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
        <ellipse cx="110" cy="115" rx="40" ry="34" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
        <polygon points="85,92 92,72 105,88" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        <polygon points="135,92 128,72 115,88" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        {/* Tail curved around Goma */}
        <path d="M 85 195 C 65 195 55 180 62 170 C 68 162 76 172 74 182" stroke="#54382F" strokeWidth="4.5" fill="#FFFFFF" strokeLinecap="round" />

        {/* Goma */}
        <ellipse cx="170" cy="170" rx="42" ry="46" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
        <ellipse cx="170" cy="115" rx="40" ry="34" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
        <polygon points="145,92 152,72 165,88" fill="#A39A94" stroke="#54382F" strokeWidth="3.5" />
        <polygon points="195,92 188,72 175,88" fill="#A39A94" stroke="#54382F" strokeWidth="3.5" />
        {/* Goma tail */}
        <path d="M 195 195 C 215 195 225 180 218 170 C 212 162 204 172 206 182" stroke="#54382F" strokeWidth="4.5" fill="#A39A94" strokeLinecap="round" />

        {/* Blushing cheeks & cute profile faces turned to each other */}
        <ellipse cx="132" cy="120" rx="7" ry="5" fill="#F6C9D2" />
        <ellipse cx="148" cy="120" rx="7" ry="5" fill="#F6C9D2" />
        <circle cx="126" cy="112" r="3" fill="#54382F" />
        <circle cx="154" cy="112" r="3" fill="#54382F" />

        {/* Floating Heart between them */}
        <path
          d="M 140 92 C 140 86 132 82 128 86 C 124 82 116 86 116 92 C 116 100 128 108 128 108 C 128 108 140 100 140 92 Z"
          fill="#F6C9D2"
          stroke="#54382F"
          strokeWidth="2.5"
        />

        {/* Paws held firmly together */}
        <ellipse cx="138" cy="174" rx="10" ry="7" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        <ellipse cx="144" cy="174" rx="10" ry="7" fill="#A39A94" stroke="#54382F" strokeWidth="3.5" />
      </svg>
    </div>
  );
};

// 7. Cats Jumping Happily (Celebration / YES animations 🎉)
export const CatsJumping: React.FC<CatProps> = ({ className = '', size = 220, animated = true }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 280 230"
        className={`w-full h-full drop-shadow-md ${animated ? 'animate-bounce' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating confetti & celebration stars */}
        <path d="M 30 45 L 35 30 L 40 45 L 55 50 L 40 55 L 35 70 L 30 55 L 15 50 Z" fill="#FFE8A3" />
        <path d="M 240 45 L 245 30 L 250 45 L 265 50 L 250 55 L 245 70 L 240 55 L 225 50 Z" fill="#FFE8A3" />
        <circle cx="140" cy="25" r="6" fill="#F6C9D2" />
        <circle cx="85" cy="20" r="5" fill="#ECA4B2" />
        <circle cx="195" cy="22" r="5" fill="#DCEFE3" />

        {/* Left Cat (Peach) leaping up */}
        <g transform="translate(15, 20) rotate(-8 80 120)">
          <ellipse cx="80" cy="130" rx="42" ry="36" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
          <ellipse cx="80" cy="85" rx="46" ry="38" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
          {/* Ears */}
          <polygon points="46,60 56,38 72,56" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
          <polygon points="114,60 104,38 88,56" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
          {/* Blush */}
          <ellipse cx="58" cy="95" rx="10" ry="7" fill="#F6C9D2" />
          <ellipse cx="102" cy="95" rx="10" ry="7" fill="#F6C9D2" />
          {/* Starry Happy Eyes */}
          <path d="M 68 80 L 72 72 L 76 80 L 84 84 L 76 88 L 72 96 L 68 88 L 60 84 Z" fill="#54382F" />
          <path d="M 88 80 L 92 72 L 96 80 L 104 84 L 96 88 L 92 96 L 88 88 L 80 84 Z" fill="#54382F" />
          {/* Open Joyful Mouth */}
          <ellipse cx="80" cy="100" rx="7" ry="9" fill="#EEA2B2" stroke="#54382F" strokeWidth="3" />
          {/* Raised Arms */}
          <path d="M 45 105 C 35 90 30 75 42 70 C 50 66 58 82 52 95" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
          <path d="M 115 105 C 125 90 130 75 118 70 C 110 66 102 82 108 95" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        </g>

        {/* Right Cat (Goma) leaping up */}
        <g transform="translate(145, 20) rotate(8 80 120)">
          <ellipse cx="80" cy="130" rx="42" ry="36" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
          <ellipse cx="80" cy="85" rx="46" ry="38" fill="#A39A94" stroke="#54382F" strokeWidth="4.5" />
          {/* Ears */}
          <polygon points="46,60 56,38 72,56" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
          <polygon points="114,60 104,38 88,56" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
          {/* Blush */}
          <ellipse cx="58" cy="95" rx="10" ry="7" fill="#F6C9D2" />
          <ellipse cx="102" cy="95" rx="10" ry="7" fill="#F6C9D2" />
          {/* Big Sparkle Eyes */}
          <ellipse cx="68" cy="82" rx="9" ry="11" fill="#54382F" />
          <circle cx="66" cy="78" r="4" fill="#FFFFFF" />
          <ellipse cx="94" cy="82" rx="9" ry="11" fill="#54382F" />
          <circle cx="92" cy="78" r="4" fill="#FFFFFF" />
          {/* Big Smile */}
          <ellipse cx="80" cy="100" rx="7" ry="9" fill="#EEA2B2" stroke="#54382F" strokeWidth="3" />
          {/* Raised Arms */}
          <path d="M 45 105 C 35 90 30 75 42 70 C 50 66 58 82 52 95" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
          <path d="M 115 105 C 125 90 130 75 118 70 C 110 66 102 82 108 95" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
};

// 8. Shy Running Cat (Mischievous Cat for Runaway NO button 🙈)
export const ShyRunningCat: React.FC<CatProps> = ({ className = '', size = 120 }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.8 }}>
      <svg
        viewBox="0 0 160 120"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Speed dust lines behind */}
        <g stroke="#54382F" strokeWidth="3" strokeLinecap="round" opacity="0.6">
          <line x1="15" y1="90" x2="35" y2="90" />
          <line x1="8" y1="80" x2="25" y2="80" />
          <line x1="18" y1="100" x2="30" y2="100" />
        </g>

        {/* Cat body dashing horizontally */}
        <ellipse cx="85" cy="75" rx="38" ry="26" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />

        {/* Stretched running paws */}
        <g stroke="#54382F" strokeWidth="4" fill="#FFFFFF">
          {/* Front paws reaching */}
          <path d="M 115 82 C 125 80 138 88 135 95 C 130 100 120 92 112 88" />
          {/* Back paws kicking */}
          <path d="M 55 82 C 45 88 35 98 40 104 C 48 108 55 96 62 88" />
        </g>

        {/* Waving tail */}
        <path d="M 50 68 C 30 65 24 50 32 40 C 38 34 46 44 42 56" stroke="#54382F" strokeWidth="4.5" fill="#FFFFFF" strokeLinecap="round" />

        {/* Head looking back cheekily */}
        <ellipse cx="110" cy="50" rx="32" ry="28" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        <polygon points="90,32 96,16 108,30" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        <polygon points="128,32 134,16 122,30" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />

        {/* Cheek blush */}
        <ellipse cx="100" cy="58" rx="8" ry="5" fill="#F6C9D2" />
        <ellipse cx="128" cy="58" rx="8" ry="5" fill="#F6C9D2" />

        {/* Winking cheeky face */}
        {/* Left eye winking > */}
        <path d="M 100 48 L 108 52 L 100 56" stroke="#54382F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Right eye big & round */}
        <circle cx="122" cy="50" r="6" fill="#54382F" />
        <circle cx="120" cy="48" r="2.5" fill="#FFFFFF" />

        {/* Tongue out */}
        <path d="M 112 58 C 112 64 118 64 118 58 Z" fill="#EEA2B2" stroke="#54382F" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// 9. Cats Sleeping Under Stars (Nighttime Cozy 🌙)
export const CatsSleeping: React.FC<CatProps> = ({ className = '', size = 180 }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.75 }}>
      <svg
        viewBox="0 0 220 160"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating zzz */}
        <text x="175" y="40" fill="#ECA4B2" fontFamily="Caveat, cursive" fontSize="24" fontWeight="bold">z</text>
        <text x="190" y="28" fill="#ECA4B2" fontFamily="Caveat, cursive" fontSize="20" fontWeight="bold">z</text>
        <text x="202" y="18" fill="#ECA4B2" fontFamily="Caveat, cursive" fontSize="16" fontWeight="bold">Z</text>

        {/* Warm Cozy Pastel Blanket */}
        <path
          d="M 30 115 C 30 90 70 80 110 80 C 150 80 190 90 190 115 C 190 145 30 145 30 115 Z"
          fill="#F6C9D2"
          stroke="#54382F"
          strokeWidth="4"
        />
        {/* Blanket floral pattern */}
        <circle cx="75" cy="115" r="4" fill="#FFFFFF" />
        <circle cx="110" cy="120" r="4" fill="#FFFFFF" />
        <circle cx="145" cy="115" r="4" fill="#FFFFFF" />

        {/* Peach Head sleeping on left */}
        <ellipse cx="75" cy="72" rx="30" ry="24" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        <polygon points="54,55 58,40 70,52" fill="#FFFFFF" stroke="#54382F" strokeWidth="3" />
        <polygon points="90,55 86,40 78,52" fill="#FFFFFF" stroke="#54382F" strokeWidth="3" />
        {/* Sleeping eyes */}
        <path d="M 64 74 Q 70 80 76 74" stroke="#54382F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="60" cy="78" rx="6" ry="4" fill="#EEA2B2" opacity="0.8" />

        {/* Goma Head sleeping nuzzled on right */}
        <ellipse cx="125" cy="72" rx="30" ry="24" fill="#A39A94" stroke="#54382F" strokeWidth="4" />
        <polygon points="108,55 112,40 122,52" fill="#A39A94" stroke="#54382F" strokeWidth="3" />
        <polygon points="144,55 140,40 132,52" fill="#A39A94" stroke="#54382F" strokeWidth="3" />
        {/* Sleeping eyes */}
        <path d="M 124 74 Q 130 80 136 74" stroke="#54382F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="140" cy="78" rx="6" ry="4" fill="#EEA2B2" opacity="0.8" />
      </svg>
    </div>
  );
};

// 10. Cat with Camera (Memory Garden Section 📸)
export const CatWithCamera: React.FC<CatProps> = ({ className = '', size = 160 }) => {
  return (
    <div className={`relative inline-block select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      <svg
        viewBox="0 0 180 160"
        className="w-full h-full drop-shadow-sm animate-wiggle"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flash sparkle */}
        <path d="M 30 35 L 34 22 L 38 35 L 50 38 L 38 42 L 34 54 L 30 42 L 18 38 Z" fill="#FFE8A3" />

        {/* Cat head */}
        <ellipse cx="90" cy="70" rx="46" ry="38" fill="#FFFFFF" stroke="#54382F" strokeWidth="4.5" />
        <polygon points="56,46 64,24 78,44" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        <polygon points="124,46 116,24 102,44" fill="#FFFFFF" stroke="#54382F" strokeWidth="4" />
        {/* Blush */}
        <ellipse cx="68" cy="80" rx="9" ry="6" fill="#F6C9D2" />
        <ellipse cx="112" cy="80" rx="9" ry="6" fill="#F6C9D2" />
        {/* Wink eye & open eye */}
        <path d="M 70 66 L 78 70 L 70 74" stroke="#54382F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="106" cy="68" r="6" fill="#54382F" />
        <circle cx="104" cy="65" r="2.5" fill="#FFFFFF" />

        {/* Retro Cute Camera in paws */}
        <rect x="55" y="90" width="70" height="48" rx="12" fill="#E8DFF8" stroke="#54382F" strokeWidth="4" />
        {/* Camera top dial & flash */}
        <rect x="68" y="82" width="16" height="8" rx="3" fill="#FFE8A3" stroke="#54382F" strokeWidth="3" />
        <circle cx="110" cy="85" r="4" fill="#F6C9D2" stroke="#54382F" strokeWidth="2.5" />
        {/* Lens */}
        <circle cx="90" cy="114" r="15" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        <circle cx="90" cy="114" r="9" fill="#54382F" />
        <circle cx="87" cy="111" r="3" fill="#FFFFFF" />

        {/* Cute paws holding sides of camera */}
        <ellipse cx="56" cy="112" rx="7" ry="9" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
        <ellipse cx="124" cy="112" rx="7" ry="9" fill="#FFFFFF" stroke="#54382F" strokeWidth="3.5" />
      </svg>
    </div>
  );
};
