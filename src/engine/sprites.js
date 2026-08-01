// Procedural Pixel Art Sprite Dataset for 3000 MILES
// Matrices use character keys mapped to specific hex colors from our palettes.
// '.' is transparent.

export const PALETTE_MAP = {
  // Common & Skin
  'K': '#110C0B', // Pitch Black (Hair/Outline)
  'S': '#D99B75', // Warm Skin tone
  's': '#B87852', // Skin shade
  'W': '#FFFFFF', // White (Eyes/Highlights/Plane)
  'w': '#CCCCCC', // Light gray
  'R': '#E64C4C', // Red Heart / Blush
  'r': '#992626', // Deep red
  'G': '#F4C95D', // Gold / Night accent
  'g': '#C79A2B', // Gold shade

  // India (Saketh) accents
  'I1': '#2B1B12', 'I2': '#6B3F2A', 'I3': '#C97B3D', 'I4': '#F2A65A', 'I5': '#FFE3B3',

  // Bahrain (Sharon) accents
  'B1': '#0E2A2E', 'B2': '#1F5E5E', 'B3': '#4FA9A0', 'B4': '#F2D49B', 'B5': '#FFF6E0',

  // Mystic Palmistry
  'M1': '#1A0B2E', 'M2': '#3D1E5C', 'M3': '#7B3FA0', 'M4': '#E0A8F2', 'M5': '#FFFFFF'
};

// 16x16 to 16x24 character & icon sprite maps
export const SPRITES = {
  // 16x24 Overworld Saketh ("Him" - India warm accent)
  saketh_idle: [
    "....KKKKKK......",
    "...KKKKKKKK.....",
    "..KKKKKKKKKK....",
    "..KSSSWWSWSS....",
    "..KSSSsKWsK.....",
    "..KKssssSSS.....",
    "....ssssss......",
    "....I3I3I3......",
    "...I3I3I4I3I3...",
    "..I3I3I3I4I3I3..",
    "..I3I3I3I4I3I3..",
    "..SSS.I3I3.SSS..",
    "...SS.I2I2.SS...",
    "......I2I2......",
    "......I2I2......",
    "......K..K......",
    "......K..K......",
    ".....KK..KK.....",
    "................"
  ],
  saketh_walk1: [
    "....KKKKKK......",
    "...KKKKKKKK.....",
    "..KKKKKKKKKK....",
    "..KSSSWWSWSS....",
    "..KSSSsKWsK.....",
    "..KKssssSSS.....",
    "....ssssss......",
    "....I3I3I3......",
    "...I3I3I4I3I3...",
    "..I3I3I3I4I3I3..",
    "..SSS.I3I3.SSS..",
    "......I2I2......",
    "......I2I2......",
    ".....I2..I2.....",
    ".....K....K.....",
    "....KK....KK...."
  ],

  // 16x24 Overworld Sharon ("Her" - Bahrain teal accent)
  sharon_idle: [
    "....KKKKKK......",
    "...KKKKKKKKK....",
    "..KKKKKKKKKKK...",
    "..KKSSSWWSWSS...",
    ".KKKSSSsKWsKK...",
    ".KKKKKssSSSKK...",
    ".KK..sssss..KK..",
    ".K...B3B3B3..K..",
    "....B3B3B4B3....",
    "...B3B3B3B4B3...",
    "...B3B3B3B3B3...",
    "...SSS.B3B3.SS..",
    ".......B2B2.....",
    ".......B2B2.....",
    ".......K..K.....",
    "......KK..KK...."
  ],
  sharon_walk1: [
    "....KKKKKK......",
    "...KKKKKKKKK....",
    "..KKKKKKKKKKK...",
    "..KKSSSWWSWSS...",
    ".KKKSSSsKWsKK...",
    ".KKKKKssSSSKK...",
    ".KK..sssss..KK..",
    ".K...B3B3B3..K..",
    "....B3B3B4B3....",
    "...B3B3B3B4B3...",
    "...SSS.B3B3.SS..",
    ".......B2B2.....",
    "......B2..B2....",
    ".....K.....K....",
    "....KK.....KK..."
  ],

  // Emotion Portraits (16x16 scaled up for dialogue box)
  saketh_portrait_neutral: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWWKSSSKK.",
    ".KKKSSSSSSSSSKK.",
    ".KKKKKSSSSsSSKK.",
    "..KKKKSSSSSSKK..",
    "....sSSSSSSSs...",
    "...I3I3I4I4I3I3.",
    "..I3I3I3I4I3I3I3",
    ".I3I3I3I3I4I3I3I",
    ".I3I3I3I3I3I3I3I"
  ],
  saketh_portrait_happy: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWGKWSSKK.",
    ".KKKRRSSSSRRSKK.",
    ".KKKKKSSWWSSKK..",
    "..KKKKSSSSSSKK..",
    "....sSSSSSSSs...",
    "...I3I3I4I4I3I3.",
    "..I3I3I3I4I3I3I3"
  ],
  saketh_portrait_blush: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWKWWSSKK.",
    ".KKKRRSSSSRRSKK.",
    ".KKKKKSSsSSSKK..",
    "..KKKKSSSSSSKK..",
    "....sSSSSSSSs...",
    "...I3I3I4I4I3I3."
  ],
  saketh_portrait_shocked: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWWWSSKK..",
    ".KKKSSKWWKWSSKK.",
    ".KKKSSSSSSSSSKK.",
    ".KKKKSSsWWsSSKK.",
    "..KKKKSSWWSKK...",
    "....sSSSSSSSs...",
    "...I3I3I4I4I3I3."
  ],
  saketh_portrait_nervous: [
    "....KKKKKKKK.W..",
    "..KKKKKKKKKKKWW.",
    ".KKKKKKKKKKKKW..",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWKWWSSKK.",
    ".KKKRRSSSSRRSKK.",
    ".KKKKKSSwwwSSKK.",
    "..KKKKSSSSSSKK..",
    "....sSSSSSSSs..."
  ],
  saketh_portrait_crying_happy: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKWWWKWGKWWWWK.",
    ".KKWWWRRSSRRWWK.",
    ".KKKWKSSWWSSKKK.",
    "..KKKKSSSSSSKK..",
    "....sSSSSSSSs..."
  ],

  sharon_portrait_neutral: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWWKSSSKK.",
    ".KKKKSSSSSSSSKK.",
    ".KKKKKSSSSsSSKK.",
    ".K.KKKSSSSSSKK.K",
    "....sSSSSSSSs...",
    "...B3B3B4B4B3B3.",
    "..B3B3B3B4B3B3B3",
    ".B3B3B3B3B4B3B3B",
    ".B3B3B3B3B3B3B3B"
  ],
  sharon_portrait_happy: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWGKWSSKK.",
    ".KKRRRSSSSRRRKK.",
    ".KKKKSSWWWWSSKK.",
    ".K.KKKSSSSSSKK.K",
    "....sSSSSSSSs...",
    "...B3B3B4B4B3B3."
  ],
  sharon_portrait_blush: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKKSSKWKWWSSKK.",
    ".KKRRRSSSSRRRKK.",
    ".KKKKKSSsSSSKK..",
    ".K.KKKSSSSSSKK.K",
    "....sSSSSSSSs...",
    "...B3B3B4B4B3B3."
  ],
  sharon_portrait_shocked: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWWWSSKK..",
    ".KKKSSKWWKWSSKK.",
    ".KKKSSSSSSSSSKK.",
    ".KKKKSSsWWsSSKK.",
    ".K.KKKSSWWSKK..K",
    "....sSSSSSSSs..."
  ],
  sharon_portrait_crying_happy: [
    "....KKKKKKKK....",
    "..KKKKKKKKKKKK..",
    ".KKKKKKKKKKKKKK.",
    ".KKKSSWWSWWSSKK.",
    ".KKWWWKWGKWWWWK.",
    ".KKWWWRRRRWWK.K.",
    ".KKKWKSSWWSSKKK.",
    ".K.KKKSSSSSSKK.K",
    "....sSSSSSSSs..."
  ],

  // Signature Motif: Paper Airplane
  airplane: [
    "...............W",
    "..............WW",
    ".............WGW",
    "............WGGW",
    "...........WGGGW",
    "..........WGGGGW",
    "....W....WGGGGGW",
    "....WW..WGGGGWW.",
    "....WGGWGGGGWW..",
    ".....WGGGGGWW...",
    "......WGGGWW....",
    ".......WGWW.....",
    "........WW......",
    ".........W......"
  ],

  // 8x8 Particles & Icons
  heart: [
    ".RR..RR.",
    "RRRRRRRR",
    "RRRRRRRR",
    ".RRRRRR.",
    "..RRRR..",
    "...RR...",
    "........"
  ],
  star: [
    "...WW...",
    "..WGGW..",
    ".WGGGGW.",
    "WWWWWWWW",
    ".WGGGGW.",
    "..WGGW..",
    "...WW..."
  ],
  sparkle: [
    "....W...",
    "...WMW..",
    "..WMMMW.",
    ".WMMMMMW",
    "..WMMMW.",
    "...WMW..",
    "....W..."
  ],
  suitcase: [
    "....GGGG....",
    "...G....G...",
    "..KKKKKKKK..",
    ".KIIIIIIIIK.",
    ".KIIGGIIIIK.",
    ".KIIIIIIIIK.",
    ".KIIIIIIIIK.",
    "..KKKKKKKK.."
  ],
  passport: [
    "..BBBBBB..",
    ".BBGGGGBB.",
    ".BGGGGGGB.",
    ".BGGGGGGB.",
    ".BBGGGGBB.",
    "..BBBBBB.."
  ],
  palm_rune: [
    "...M4M4...",
    "..M4..M4..",
    ".M4.M5.M4.",
    ".M4....M4.",
    "..M4M4M4..",
    "...M4M4..."
  ],
  phone: [
    "..KKKKKK..",
    ".KWBBBBWK.",
    ".KB3B3B3K.",
    ".KBBBBBBK.",
    ".KB3B3B3K.",
    ".KB3WWB3K.",
    ".KBBBBBBK.",
    ".KW..W..K.",
    "..KKKKKK.."
  ],
  laptop: [
    "..........",
    "..KKKKKK..",
    ".KBBBBBBK.",
    ".KBBWWBBK.",
    ".KBBBBBBK.",
    ".KKKKKKKK.",
    "KWWWWWWWWK",
    "KKKKKKKKKK"
  ],
  roblox_block: [
    "..KKKKKK..",
    ".KI4I4I4K.",
    ".KI4KWI4K.",
    ".KI4I4I4K.",
    "KKIIIIIIKK",
    "K.IIIIII.K",
    "..I3..I3..",
    "..I3..I3.."
  ],
  reel_play: [
    "..M3M3M3..",
    ".M3WWWWM3.",
    ".M3W..WM3.",
    ".M3W.W.M3.",
    ".M3W..WM3.",
    ".M3WWWWM3.",
    "..M3M3M3.."
  ],
  window_icon: [
    ".KKKKKKKK.",
    ".KB3KKB3K.",
    ".KWWKKWWK.",
    ".KKKKKKKK.",
    ".KB3KKB3K.",
    ".KB3KKB3K.",
    ".KKKKKKKK."
  ],
  calendar_icon: [
    ".KW.WW.WK.",
    ".KWWWWWWK.",
    ".KKKKKKKK.",
    ".KWWGWWWK.",
    ".KWWWWWWK.",
    ".KKKKKKKK."
  ]
};
