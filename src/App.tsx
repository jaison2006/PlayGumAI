import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'landing' | 'analyzing' | 'dna' | 'discovery' | 'gap' | 'generating' | 'game' | 'remix' | 'passport' | 'discover'

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXAMPLE_PROMPTS = ['Dark Sci-Fi', 'Relaxing Puzzle', 'Cyberpunk Shooter', 'Fantasy Adventure', 'Cozy Multiplayer']

type DnaField = { label: string; value: string; score: number | null }
type GameResult = { title: string; match: number; genre: string; platform: string; tags: string[]; missing: string[]; explanation: string }
type GameProfile = {
  aiReply: string
  dna: DnaField[]
  games: GameResult[]
  genTags: string[]
  genSteps: string[]
  gapExists: string[]
  gapMissing: string[]
}

function detectProfile(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes('relaxing') || p.includes('puzzle') || p.includes('calm') || p.includes('casual')) return 'relaxing-puzzle'
  if (p.includes('cyberpunk') || p.includes('shooter') || p.includes('neon') || p.includes('cyber')) return 'cyberpunk-shooter'
  if (p.includes('fantasy') || p.includes('adventure') || p.includes('magic') || p.includes('dragon')) return 'fantasy-adventure'
  if (p.includes('cozy') || p.includes('multiplayer') || p.includes('friends') || p.includes('social')) return 'cozy-multiplayer'
  return 'dark-scifi'
}

const PROFILES: Record<string, GameProfile> = {
  'dark-scifi': {
    aiReply: "Got it. I'm looking for a dark sci-fi survival experience with exploration, collection and escape mechanics.",
    dna: [
      { label: 'Theme', value: 'Dark Sci-Fi', score: 96 },
      { label: 'Setting', value: 'Abandoned Planet', score: null },
      { label: 'Player', value: 'Lone Astronaut', score: null },
      { label: 'Core Loop', value: 'Explore → Collect → Escape', score: null },
      { label: 'Enemies', value: 'Robots', score: null },
      { label: 'Collectible', value: 'Energy Crystals', score: null },
      { label: 'Tone', value: 'Suspenseful / Lonely', score: null },
      { label: 'Camera', value: '2D Side-Scroll', score: null },
      { label: 'Difficulty', value: 'High', score: 88 },
      { label: 'Session', value: '10 minutes', score: null },
      { label: 'Exploration', value: 'Very High', score: 90 },
      { label: 'Combat', value: 'Medium', score: 60 },
      { label: 'Story', value: 'Medium', score: 55 },
    ],
    games: [
      { title: 'Dead Space: Origins', match: 92, genre: 'Sci-Fi Survival', platform: 'PC / Console', tags: ['Dark Sci-Fi', 'Exploration', 'Survival', 'Robot enemies'], missing: ['10-min sessions', 'Crystal collection'], explanation: 'Shares your dark sci-fi setting, exploration and survival loop. Lacks crystal collection and short-session design.' },
      { title: 'Lone Echo II', match: 81, genre: 'Sci-Fi Adventure', platform: 'VR / PC', tags: ['Dark Sci-Fi', 'Exploration', 'Lone Astronaut'], missing: ['2D view', 'Robot escape', 'Crystal collection'], explanation: 'Strong astronaut and abandoned-space atmosphere. Missing 2D perspective and the robot escape mechanic.' },
      { title: 'Metroid Dread', match: 74, genre: '2D Action', platform: 'Nintendo Switch', tags: ['2D', 'Exploration', 'Enemies', 'Difficult'], missing: ['Crystal collection', 'Robot enemies', 'Sci-Fi tone'], explanation: 'Excellent 2D exploration and high difficulty. Setting and enemy types differ significantly from your request.' },
    ],
    genTags: ['2D Platformer', 'High Difficulty', '10-min Session', 'Robot Enemies', 'Crystal Collection'],
    genSteps: ['Understanding your idea', 'Creating Experience DNA', 'Selecting gameplay loop', 'Selecting 2D Platformer template', 'Mapping Astronaut character', 'Building Abandoned Planet environment', 'Configuring Robot enemies', 'Placing Energy Crystals', 'Tuning difficulty to High', 'Building playable prototype'],
    gapExists: ['Dark Sci-Fi', 'Exploration', 'Survival', 'Difficult gameplay'],
    gapMissing: ['2D presentation', 'Crystal collection mechanic', '10-minute sessions', 'Robot escape loop'],
  },
  'relaxing-puzzle': {
    aiReply: "Understood. You want a calm, low-stress puzzle experience with satisfying progression and no time pressure.",
    dna: [
      { label: 'Theme', value: 'Relaxing / Zen', score: 94 },
      { label: 'Setting', value: 'Tranquil Garden / Abstract', score: null },
      { label: 'Player', value: 'Solo Thinker', score: null },
      { label: 'Core Loop', value: 'Observe → Think → Solve', score: null },
      { label: 'Enemies', value: 'None', score: null },
      { label: 'Collectible', value: 'Stars / Gems', score: null },
      { label: 'Tone', value: 'Peaceful / Satisfying', score: null },
      { label: 'Camera', value: 'Top-Down / 2D', score: null },
      { label: 'Difficulty', value: 'Gentle Ramp', score: 55 },
      { label: 'Session', value: '5–15 minutes', score: null },
      { label: 'Exploration', value: 'Low', score: 25 },
      { label: 'Combat', value: 'None', score: 0 },
      { label: 'Story', value: 'Minimal / Optional', score: 30 },
    ],
    games: [
      { title: 'Monument Valley 2', match: 89, genre: 'Puzzle / Art', platform: 'Mobile / PC', tags: ['Relaxing', 'Puzzle', 'Beautiful visuals', 'No enemies'], missing: ['Gem collection', 'Longer sessions'], explanation: 'Gorgeous, calming puzzle experience with gentle difficulty ramp. Lacks a collection system and shorter session design.' },
      { title: 'Unpacking', match: 82, genre: 'Puzzle Sim', platform: 'PC / Console', tags: ['Relaxing', 'Satisfying', 'No time pressure', 'Solo'], missing: ['Active puzzle solving', 'Progression stars'], explanation: 'Supremely calming and satisfying. More ambient than puzzle-focused — lacks active solving mechanics.' },
      { title: 'A Little to the Left', match: 76, genre: 'Tidying Puzzle', platform: 'PC / Mobile', tags: ['Relaxing', 'Puzzle', 'No enemies', 'Solo'], missing: ['Visual exploration', 'Session length control'], explanation: 'Satisfying puzzle feel with no stress. Missing visual richness and explicit progression rewards.' },
    ],
    genTags: ['Puzzle / Maze', 'Gentle Difficulty', 'No Enemies', 'Gem Collection', 'Ambient Sound'],
    genSteps: ['Understanding your idea', 'Creating Experience DNA', 'Selecting Puzzle gameplay loop', 'Selecting Puzzle / Maze template', 'Removing all combat systems', 'Building tranquil garden environment', 'Designing puzzle grid levels', 'Placing collectible gems', 'Tuning difficulty to Gentle Ramp', 'Building playable prototype'],
    gapExists: ['Relaxing tone', 'No enemies', 'Puzzle-based', 'Solo play'],
    gapMissing: ['Custom gem collection loop', 'Zen garden aesthetic', 'Seamless level progression', 'Ambient procedural music'],
  },
  'cyberpunk-shooter': {
    aiReply: "Copy that. You want a fast, aggressive cyberpunk shooter — neon city, high-stakes combat, slick movement.",
    dna: [
      { label: 'Theme', value: 'Cyberpunk / Neon Noir', score: 97 },
      { label: 'Setting', value: 'Neon City Streets', score: null },
      { label: 'Player', value: 'Augmented Mercenary', score: null },
      { label: 'Core Loop', value: 'Move → Shoot → Survive', score: null },
      { label: 'Enemies', value: 'Corp Guards / Drones', score: null },
      { label: 'Collectible', value: 'Credits / Tech Parts', score: null },
      { label: 'Tone', value: 'Intense / Cinematic', score: null },
      { label: 'Camera', value: 'Top-Down', score: null },
      { label: 'Difficulty', value: 'High', score: 85 },
      { label: 'Session', value: '15–20 minutes', score: null },
      { label: 'Exploration', value: 'Medium', score: 55 },
      { label: 'Combat', value: 'Very High', score: 95 },
      { label: 'Story', value: 'High', score: 75 },
    ],
    games: [
      { title: 'Ghostrunner 2', match: 91, genre: 'Action Shooter', platform: 'PC / Console', tags: ['Cyberpunk', 'Fast combat', 'Cinematic', 'Neon city'], missing: ['Top-down view', 'Credit collection'], explanation: 'Captures the cyberpunk intensity and fluid movement perfectly. Missing the top-down perspective and loot loop.' },
      { title: 'Ruiner', match: 84, genre: 'Top-Down Shooter', platform: 'PC / Console', tags: ['Cyberpunk', 'Top-Down', 'Intense', 'Corp enemies'], missing: ['Upgrade system', 'Open city'], explanation: 'Closest visual and gameplay match — top-down, cyberpunk, brutal combat. Lacks open-city traversal.' },
      { title: 'Neon Abyss', match: 77, genre: 'Roguelite Shooter', platform: 'PC / Console', tags: ['Neon', 'Shooter', 'Intense', 'Procedural'], missing: ['Cyberpunk city', 'Story', 'Fixed levels'], explanation: 'Great neon aesthetic and shooting feel. Randomized rather than story-driven; setting is more dungeon than city.' },
    ],
    genTags: ['Top-Down Shooter', 'High Difficulty', '15-min Session', 'Corp Enemies', 'Credit Collection'],
    genSteps: ['Understanding your idea', 'Creating Experience DNA', 'Selecting top-down shooter loop', 'Selecting Top-Down Shooter template', 'Mapping Augmented Mercenary character', 'Building Neon City environment', 'Configuring Corp Guard & Drone enemies', 'Placing Credits and Tech Parts', 'Tuning difficulty to High', 'Building playable prototype'],
    gapExists: ['Cyberpunk aesthetic', 'Fast-paced combat', 'Corp enemies', 'Neon visuals'],
    gapMissing: ['Open neon city traversal', 'Augmentation upgrade tree', 'Story-driven missions', 'Drone wave system'],
  },
  'fantasy-adventure': {
    aiReply: "Perfect. You're after an epic fantasy world with exploration, magic, and rich lore to uncover.",
    dna: [
      { label: 'Theme', value: 'High Fantasy', score: 93 },
      { label: 'Setting', value: 'Enchanted Kingdom / Ruins', score: null },
      { label: 'Player', value: 'Hero / Mage', score: null },
      { label: 'Core Loop', value: 'Explore → Quest → Battle', score: null },
      { label: 'Enemies', value: 'Monsters / Dark Sorcerers', score: null },
      { label: 'Collectible', value: 'Relics / Spell Tomes', score: null },
      { label: 'Tone', value: 'Epic / Wonder', score: null },
      { label: 'Camera', value: '2D Side-Scroll', score: null },
      { label: 'Difficulty', value: 'Medium', score: 65 },
      { label: 'Session', value: '20–30 minutes', score: null },
      { label: 'Exploration', value: 'Very High', score: 88 },
      { label: 'Combat', value: 'High', score: 78 },
      { label: 'Story', value: 'Very High', score: 90 },
    ],
    games: [
      { title: 'Hollow Knight', match: 90, genre: 'Metroidvania', platform: 'PC / Console', tags: ['Dark Fantasy', 'Exploration', 'Difficult', 'Lore-rich'], missing: ['Magic system', 'Relic collection'], explanation: 'Outstanding exploration and lore depth in a fantasy setting. Lacks spellcasting and a relic-gathering loop.' },
      { title: 'Ori and the Will of the Wisps', match: 85, genre: 'Platformer / Adventure', platform: 'PC / Xbox', tags: ['Fantasy', 'Beautiful', 'Exploration', 'Hero journey'], missing: ['Combat depth', 'Dark tone', 'Quest system'], explanation: 'Breathtaking fantasy world with rich exploration. Combat is lighter and tone is warmer than your request.' },
      { title: 'Dead Cells: Return to Castlevania', match: 78, genre: 'Roguelite Action', platform: 'PC / Console', tags: ['Fantasy', 'Combat', 'Exploration', 'Magic'], missing: ['Story', 'Fixed world', 'Relic system'], explanation: 'Excellent combat with magic weapons in a dark fantasy castle. Procedural design limits world depth and story.' },
    ],
    genTags: ['2D Platformer', 'Medium Difficulty', '20-min Session', 'Monster Enemies', 'Relic Collection'],
    genSteps: ['Understanding your idea', 'Creating Experience DNA', 'Selecting adventure gameplay loop', 'Selecting 2D Platformer template', 'Mapping Hero / Mage character', 'Building Enchanted Kingdom environment', 'Configuring Monster & Sorcerer enemies', 'Placing Relics and Spell Tomes', 'Tuning difficulty to Medium', 'Building playable prototype'],
    gapExists: ['High Fantasy theme', 'World exploration', 'Combat system', 'Story elements'],
    gapMissing: ['Spell-casting magic system', 'Quest chain progression', 'NPC dialogue system', 'Relic lore unlock mechanic'],
  },
  'cozy-multiplayer': {
    aiReply: "Got it! You want something warm and social — low stakes, fun with friends, short engaging sessions.",
    dna: [
      { label: 'Theme', value: 'Cozy / Social', score: 91 },
      { label: 'Setting', value: 'Friendly Village / Island', score: null },
      { label: 'Player', value: 'Character (Customisable)', score: null },
      { label: 'Core Loop', value: 'Gather → Craft → Share', score: null },
      { label: 'Enemies', value: 'None / Mild', score: null },
      { label: 'Collectible', value: 'Resources / Gifts', score: null },
      { label: 'Tone', value: 'Warm / Cheerful', score: null },
      { label: 'Camera', value: 'Top-Down / Isometric', score: null },
      { label: 'Difficulty', value: 'Very Low', score: 20 },
      { label: 'Session', value: '10–20 minutes', score: null },
      { label: 'Exploration', value: 'Medium', score: 50 },
      { label: 'Combat', value: 'None / Minimal', score: 10 },
      { label: 'Story', value: 'Light / Charming', score: 45 },
    ],
    games: [
      { title: 'Animal Crossing: New Horizons', match: 88, genre: 'Life Sim', platform: 'Nintendo Switch', tags: ['Cozy', 'Multiplayer', 'Resource gathering', 'Cheerful'], missing: ['Active co-op missions', 'Faster sessions'], explanation: 'Perfect cozy tone and social loop. Sessions are open-ended rather than structured short bursts.' },
      { title: 'Stardew Valley', match: 83, genre: 'Farming Sim', platform: 'PC / Console / Mobile', tags: ['Cozy', 'Multiplayer', 'Crafting', 'Resource collection'], missing: ['Quick sessions', 'Island setting', 'Instant co-op'], explanation: 'Beloved cozy multiplayer with rich crafting. Sessions tend to run long and co-op setup can be complex.' },
      { title: 'Overcooked! 2', match: 79, genre: 'Co-op Party', platform: 'PC / Console', tags: ['Multiplayer', 'Cozy chaos', 'Short sessions', 'Friends'], missing: ['Relaxed tone', 'Resource gathering', 'Open world'], explanation: 'Great for friends and short sessions. More frantic than cozy — lacks the open-world gathering loop.' },
    ],
    genTags: ['Top-Down Sim', 'Very Low Difficulty', '15-min Session', 'No Enemies', 'Resource Collection'],
    genSteps: ['Understanding your idea', 'Creating Experience DNA', 'Selecting cozy gather-craft loop', 'Selecting Endless Runner template (village)', 'Mapping customisable character', 'Building Friendly Village environment', 'Disabling all combat systems', 'Placing Resources and Gift collectibles', 'Tuning difficulty to Very Low', 'Building playable prototype'],
    gapExists: ['Cozy tone', 'Multiplayer support', 'Resource gathering', 'Short sessions'],
    gapMissing: ['Real-time co-op island', 'Custom character creator', 'Gift-sending mechanic', 'Seasonal event system'],
  },
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 36, showText = false }: { size?: number; showText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src="/PlayGumAI/image.png" alt="PlayGumAI" style={{ width: size, height: size, objectFit: 'contain' }} />
      {showText && (
        <span className="font-orbitron font-bold text-lg metallic-text tracking-wide">playGumAi</span>
      )}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ screen, onNav }: { screen: Screen; onNav: (s: Screen) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 silver-border" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <button onClick={() => onNav('landing')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <Logo size={32} showText />
      </button>
      <div className="hidden md:flex items-center gap-8">
        {(['discover', 'landing', 'passport'] as Screen[]).map((s, i) => {
          const labels = ['Discover', 'Create', 'My Games']
          return (
            <button key={s} onClick={() => onNav(s)} className="text-sm font-medium transition-colors" style={{ color: screen === s ? '#e5e5e5' : '#666', fontFamily: 'Inter, sans-serif' }}>
              {labels[i]}
            </button>
          )
        })}
      </div>
      <button onClick={() => onNav('landing')} className="metallic-btn font-orbitron text-xs px-5 py-2 rounded-sm tracking-widest" style={{ letterSpacing: '0.12em' }}>
        LAUNCH AI
      </button>
    </nav>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function Landing({ onSubmit }: { onSubmit: (p: string) => void }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = () => {
    const val = prompt.trim() || 'I want a dark 2D game where a lone astronaut explores an abandoned planet, collects energy crystals and escapes robots. Make it difficult but playable in around 10 minutes.'
    onSubmit(val)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0f0f0f 0%, #000 100%)' }}>
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(207,207,207,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(207,207,207,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Hero logo */}
      <div className="animate-float mb-10">
        <img src="/PlayGumAI/image.png" alt="PlayGumAI" className="w-28 h-28 object-contain" style={{ filter: 'drop-shadow(0 0 30px rgba(229,229,229,0.15))' }} />
      </div>

      <div className="animate-fade-up text-center max-w-3xl">
        <p className="font-orbitron text-xs tracking-widest mb-6" style={{ color: '#555', letterSpacing: '0.3em' }}>AI-POWERED GAME DISCOVERY + CREATION</p>
        <h1 className="font-orbitron font-black mb-6 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1 }}>
          <span className="metallic-text">Don't search for a game.</span>
          <br />
          <span style={{ color: '#e5e5e5' }}>Describe the experience.</span>
        </h1>
        <p className="text-base mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#777' }}>
          PlayGumAI understands what you want to feel, finds the closest game, or creates one when it doesn't exist.
        </p>

        {/* Main prompt */}
        <div className="relative w-full max-w-2xl mx-auto mb-6">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
            placeholder="Describe the game you want to play..."
            rows={3}
            className="input-silver w-full rounded-sm px-6 py-4 text-base resize-none"
            style={{ borderRadius: 2 }}
          />
          <button
            onClick={handleSubmit}
            className="metallic-btn font-orbitron text-xs tracking-widest absolute right-3 bottom-3 px-5 py-2"
            style={{ borderRadius: 2, letterSpacing: '0.1em' }}
          >
            ASK PLAYGUMAI →
          </button>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {EXAMPLE_PROMPTS.map(chip => (
            <button
              key={chip}
              onClick={() => { setPrompt(chip); }}
              className="px-4 py-2 text-xs font-medium transition-all hover:border-opacity-60 silver-border"
              style={{ background: '#080808', color: '#888', borderRadius: 2, fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <p className="mt-20 font-orbitron text-xs tracking-widest shimmer-text" style={{ letterSpacing: '0.4em' }}>
        DESCRIBE IT · DISCOVER IT · PLAY IT
      </p>
    </div>
  )
}

// ─── Analyzing ────────────────────────────────────────────────────────────────
function Analyzing({ prompt }: { prompt: string }) {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <img src="/PlayGumAI/image.png" alt="PlayGumAI" className="w-20 h-20 object-contain mb-8 animate-glow" style={{ filter: 'drop-shadow(0 0 20px rgba(229,229,229,0.2))' }} />
      <div className="w-full max-w-xl card-dark p-6 mb-8" style={{ borderRadius: 2 }}>
        <p className="text-xs mb-1" style={{ color: '#555', fontFamily: 'Inter, sans-serif' }}>YOUR PROMPT</p>
        <p className="text-sm leading-relaxed" style={{ color: '#cfcfcf' }}>{prompt}</p>
      </div>
      <p className="font-orbitron text-sm metallic-text tracking-widest mb-3" style={{ letterSpacing: '0.2em' }}>
        ANALYZING EXPERIENCE{dots}
      </p>
      <div className="w-64 h-px mt-2" style={{ background: 'linear-gradient(90deg, transparent, #e5e5e5, transparent)', animation: 'shimmer 1.5s linear infinite', backgroundSize: '200% auto' }} />
    </div>
  )
}

// ─── DNA ──────────────────────────────────────────────────────────────────────
function ExperienceDNA({ prompt, profile, onContinue }: { prompt: string; profile: GameProfile; onContinue: () => void }) {
  const [visible, setVisible] = useState(0)
  const fields = profile.dna
  useEffect(() => {
    setVisible(0)
    const t = setInterval(() => setVisible(v => v < fields.length ? v + 1 : v), 160)
    return () => clearInterval(t)
  }, [fields.length])

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10 animate-fade-up">
        <p className="font-orbitron text-xs tracking-widest mb-4" style={{ color: '#555', letterSpacing: '0.3em' }}>STEP 1 OF 3</p>
        <h2 className="font-orbitron font-black text-3xl metallic-text mb-3">Experience DNA</h2>
        <p className="text-sm mb-3" style={{ color: '#666' }}>Extracted from: "{prompt.slice(0, 80)}{prompt.length > 80 ? '…' : ''}"</p>
        <div className="inline-block px-4 py-2 silver-border text-xs italic" style={{ borderRadius: 2, color: '#888', fontFamily: 'Inter' }}>
          "{profile.aiReply}"
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {fields.map((field, i) => (
          <div
            key={field.label}
            className="card-dark p-4 flex flex-col gap-2"
            style={{ borderRadius: 2, opacity: i < visible ? 1 : 0, transform: i < visible ? 'none' : 'translateY(8px)', transition: 'opacity 0.3s, transform 0.3s' }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium" style={{ color: '#555', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>{field.label.toUpperCase()}</span>
              {field.score !== null && field.score > 0 && <span className="font-orbitron text-xs metallic-text">{field.score}%</span>}
            </div>
            <span className="text-sm font-medium" style={{ color: '#e5e5e5' }}>{field.value}</span>
            {field.score !== null && field.score > 0 && (
              <div className="h-px w-full" style={{ background: '#111' }}>
                <div className="progress-bar" style={{ '--bar-target': `${field.score}%` } as any} />
              </div>
            )}
          </div>
        ))}
      </div>

      {visible >= fields.length && (
        <div className="text-center animate-fade-up">
          <p className="text-sm mb-2" style={{ color: '#777' }}>Understanding complete.</p>
          <p className="text-xs mb-8" style={{ color: '#555' }}>Searching the game universe...</p>
          <button onClick={onContinue} className="metallic-btn font-orbitron text-xs px-8 py-3 tracking-widest" style={{ borderRadius: 2, letterSpacing: '0.15em' }}>
            VIEW RESULTS →
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Discovery ────────────────────────────────────────────────────────────────
function Discovery({ profile, onGap, onPlay }: { profile: GameProfile; onGap: () => void; onPlay: (gameTitle: string) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12 animate-fade-up">
        <p className="font-orbitron text-xs tracking-widest mb-4" style={{ color: '#555', letterSpacing: '0.3em' }}>STEP 2 OF 3</p>
        <h2 className="font-orbitron font-black text-3xl metallic-text mb-3">Game Discovery</h2>
        <p className="text-sm" style={{ color: '#666' }}>3 experiences found — none fully match your request</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {profile.games.map((game, i) => (
          <div key={game.title} className="card-dark flex flex-col" style={{ borderRadius: 2, animationDelay: `${i * 0.1}s` }}>
            {/* Match score header */}
            <div className="p-4 border-b" style={{ borderColor: 'rgba(207,207,207,0.1)' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-orbitron font-bold text-xs" style={{ color: '#e5e5e5', letterSpacing: '0.05em' }}>{game.title}</span>
                <span className="font-orbitron font-black text-lg metallic-text">{game.match}%</span>
              </div>
              <div className="h-1 w-full rounded-full" style={{ background: '#111' }}>
                <div style={{ width: `${game.match}%`, height: '100%', background: `linear-gradient(90deg, #444, #e5e5e5)`, borderRadius: 9999, transition: 'width 1s ease' }} />
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs" style={{ color: '#555' }}>{game.genre}</span>
                <span style={{ color: '#333' }}>·</span>
                <span className="text-xs" style={{ color: '#555' }}>{game.platform}</span>
              </div>
            </div>

            <div className="p-4 flex-1">
              <div className="space-y-1 mb-3">
                {game.tags.map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: '#cfcfcf' }}>
                    <span style={{ color: '#aaa' }}>✓</span> {t}
                  </div>
                ))}
                {game.missing.map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: '#444' }}>
                    <span style={{ color: '#333' }}>✕</span> {t}
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#555', fontStyle: 'italic' }}>"{game.explanation}"</p>
            </div>

            <div className="p-4 flex gap-2 border-t" style={{ borderColor: 'rgba(207,207,207,0.08)' }}>
              <button
  onClick={() => onPlay(game.title)}
  className="flex-1 py-2 text-xs font-medium silver-border transition-all hover:bg-white hover:text-black"
  style={{
    borderRadius: 2,
    color: '#888',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif'
  }}
>
  Play
</button>
              <button className="flex-1 py-2 text-xs font-medium silver-border transition-all hover:border-white" style={{ borderRadius: 2, color: '#555', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center animate-fade-up">
        <p className="text-sm mb-6" style={{ color: '#555' }}>None of these sufficiently satisfy your requested experience.</p>
        <button onClick={onGap} className="metallic-btn font-orbitron text-xs px-10 py-3 tracking-widest" style={{ borderRadius: 2, letterSpacing: '0.15em' }}>
          SEE EXPERIENCE ANALYSIS →
        </button>
      </div>
    </div>
  )
}

// ─── Gap ──────────────────────────────────────────────────────────────────────
function ExperienceGap({ profile, onCreate }: { profile: GameProfile; onCreate: () => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center animate-fade-up">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 silver-border" style={{ borderRadius: 2 }}>
            <div className="w-2 h-2 rounded-full animate-glow" style={{ background: '#e5e5e5' }} />
            <span className="font-orbitron text-xs tracking-widest" style={{ color: '#888', letterSpacing: '0.2em' }}>STEP 3 OF 3</span>
          </div>
          <h2 className="font-orbitron font-black text-4xl mb-4" style={{ color: '#e5e5e5' }}>Experience Gap</h2>
          <h3 className="font-orbitron text-xl metallic-text mb-4">Detected</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
            We found related games, but none sufficiently satisfy your requested experience.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="card-dark p-5 text-left" style={{ borderRadius: 2 }}>
            <p className="font-orbitron text-xs mb-4 tracking-wider" style={{ color: '#777', letterSpacing: '0.15em' }}>WHAT EXISTS</p>
            {profile.gapExists.map(t => (
              <div key={t} className="flex items-center gap-3 mb-2">
                <span className="text-sm" style={{ color: '#888' }}>✓</span>
                <span className="text-sm" style={{ color: '#cfcfcf' }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="card-dark p-5 text-left" style={{ borderRadius: 2 }}>
            <p className="font-orbitron text-xs mb-4 tracking-wider" style={{ color: '#777', letterSpacing: '0.15em' }}>WHAT'S MISSING</p>
            {profile.gapMissing.map(t => (
              <div key={t} className="flex items-center gap-3 mb-2">
                <span className="text-sm" style={{ color: '#444' }}>✕</span>
                <span className="text-sm" style={{ color: '#555' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-orbitron text-sm mb-8 metallic-text" style={{ letterSpacing: '0.05em' }}>
          Your experience doesn't fully exist yet.
        </p>

        <button
          onClick={onCreate}
          className="metallic-btn font-orbitron font-black text-sm px-16 py-4 tracking-widest animate-glow"
          style={{ borderRadius: 2, letterSpacing: '0.2em', fontSize: '0.8rem' }}
        >
          CREATE MY GAME →
        </button>
      </div>
    </div>
  )
}

// ─── Generating ───────────────────────────────────────────────────────────────
function Generating({ profile, onDone }: { profile: GameProfile; onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const steps = profile.genSteps

  useEffect(() => {
    setStep(0); setDone(false)
    let current = 0
    const t = setInterval(() => {
      current++
      setStep(current)
      if (current >= steps.length) {
        clearInterval(t)
        setTimeout(() => setDone(true), 800)
      }
    }, 600)
    return () => clearInterval(t)
  }, [steps.length])

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10 animate-fade-up">
          <img src="/PlayGumAI/image.png" alt="PlayGumAI" className="w-14 h-14 object-contain mx-auto mb-6" style={{ animation: done ? 'none' : 'spin-slow 4s linear infinite', filter: 'drop-shadow(0 0 20px rgba(229,229,229,0.3))' }} />
          <h2 className="font-orbitron font-black text-2xl metallic-text mb-2">
            {done ? 'Your game is ready.' : 'Building your experience...'}
          </h2>
          {!done && <p className="text-xs" style={{ color: '#555' }}>{profile.genTags.slice(0, 3).join(' · ')}</p>}
        </div>

        <div className="card-dark p-6 mb-6" style={{ borderRadius: 2 }}>
          {steps.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-4 mb-3 transition-all duration-300"
              style={{ opacity: i <= step ? 1 : 0.2 }}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {i < step ? (
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#cfcfcf" strokeWidth="1" />
                    <path d="M5 8l2 2 4-4" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === step ? (
                  <div className="w-2 h-2 rounded-full animate-glow" style={{ background: '#e5e5e5' }} />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ background: '#222' }} />
                )}
              </div>
              <span className="text-sm" style={{ color: i < step ? '#cfcfcf' : i === step ? '#fff' : '#333', fontFamily: 'Inter, sans-serif' }}>{s}</span>
            </div>
          ))}
        </div>

        {done && (
          <div className="text-center animate-fade-up">
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {profile.genTags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs silver-border" style={{ borderRadius: 2, color: '#888', background: '#080808', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
              ))}
            </div>
            <button onClick={onDone} className="metallic-btn font-orbitron font-black text-sm px-14 py-4 tracking-widest animate-glow" style={{ borderRadius: 2, letterSpacing: '0.2em' }}>
              PLAY NOW →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Game ─────────────────────────────────────────────────────────────────────
function Game({ onExit, onRemix }: { onExit: () => void; onRemix: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    player: { x: 80, y: 300, vx: 0, vy: 0, onGround: false, health: 100 },
    crystals: [{ x: 200, y: 270 }, { x: 380, y: 200 }, { x: 520, y: 260 }, { x: 650, y: 180 }, { x: 750, y: 250 }, { x: 320, y: 130 }, { x: 480, y: 100 }, { x: 600, y: 90 }, { x: 150, y: 160 }, { x: 700, y: 150 }],
    robots: [{ x: 300, y: 330, dir: 1, speed: 1.2 }, { x: 500, y: 250, dir: -1, speed: 1.5 }, { x: 650, y: 280, dir: 1, speed: 1.0 }],
    platforms: [
      { x: 0, y: 360, w: 900, h: 30 },
      { x: 150, y: 300, w: 120, h: 12 },
      { x: 320, y: 240, w: 140, h: 12 },
      { x: 460, y: 180, w: 160, h: 12 },
      { x: 260, y: 150, w: 100, h: 12 },
      { x: 600, y: 120, w: 140, h: 12 },
      { x: 720, y: 200, w: 100, h: 12 },
      { x: 100, y: 200, w: 90, h: 12 },
    ],
    keys: {} as Record<string, boolean>,
    score: 0,
    time: 600,
    tick: 0,
    alive: true,
    won: false,
    exit: { x: 820, y: 330 },
  })

  const rafRef = useRef(0)
  const [hud, setHud] = useState({ score: 0, health: 100, time: 600, crystals: 0 })
  const [ended, setEnded] = useState<'win' | 'lose' | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      stateRef.current.keys[e.code] = e.type === 'keydown'
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const s = stateRef.current

    let lastTime = 0
    const loop = (ts: number) => {
      const dt = Math.min((ts - lastTime) / 1000, 0.05)
      lastTime = ts
      s.tick++

      if (!s.alive || s.won) { rafRef.current = requestAnimationFrame(loop); return }

      // Keys
      const { keys, player, platforms } = s
      const spd = 160
      player.vx = 0
      if (keys['ArrowLeft'] || keys['KeyA']) player.vx = -spd
      if (keys['ArrowRight'] || keys['KeyD']) player.vx = spd
      if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && player.onGround) {
        player.vy = -360
        player.onGround = false
      }

      // Physics
      player.vy += 700 * dt
      player.x += player.vx * dt
      player.y += player.vy * dt

      // Platform collision
      player.onGround = false
      const pw = 24, ph = 32
      for (const p of platforms) {
        const prevY = player.y - player.vy * dt
        if (player.x + pw > p.x && player.x < p.x + p.w) {
          if (prevY + ph <= p.y + 4 && player.y + ph >= p.y) {
            player.y = p.y - ph
            player.vy = 0
            player.onGround = true
          }
        }
      }

      // Bounds
      if (player.x < 0) player.x = 0
      if (player.x + pw > 900) player.x = 900 - pw
      if (player.y > 450) { s.alive = false; setEnded('lose') }

      // Crystals
      s.crystals = s.crystals.filter(c => {
        const inRange = Math.abs(player.x + pw / 2 - c.x) < 20 && Math.abs(player.y + ph / 2 - c.y) < 20
        if (inRange) { s.score += 100; return false }
        return true
      })

      // Robots
      for (const r of s.robots) {
        r.x += r.dir * r.speed * (60 * dt * 2)
        if (r.x > 860 || r.x < 40) r.dir *= -1
        const inRange = Math.abs(player.x + pw / 2 - (r.x + 16)) < 28 && Math.abs(player.y + ph / 2 - (r.y + 20)) < 28
        if (inRange && s.tick % 30 === 0) {
          player.health -= 10
          if (player.health <= 0) { s.alive = false; setEnded('lose') }
        }
      }

      // Time
      if (s.tick % 60 === 0) {
        s.time--
        if (s.time <= 0) { s.alive = false; setEnded('lose') }
      }

      // Exit
      const nearExit = Math.abs(player.x + pw / 2 - (s.exit.x + 16)) < 30 && Math.abs(player.y + ph / 2 - (s.exit.y + 20)) < 30
      if (nearExit && s.crystals.length === 0) { s.won = true; setEnded('win') }

      // HUD
      if (s.tick % 10 === 0) {
        setHud({ score: s.score, health: player.health, time: s.time, crystals: 10 - s.crystals.length })
      }

      // Draw
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, 900, 450)

      // Stars bg
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      for (let i = 0; i < 60; i++) {
        const sx = (i * 137 + 42) % 900, sy = (i * 83 + 17) % 360
        ctx.fillRect(sx, sy, 1, 1)
      }

      // Platforms
      for (const p of platforms) {
        const g = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h)
        g.addColorStop(0, '#3a3a3a')
        g.addColorStop(1, '#1a1a1a')
        ctx.fillStyle = g
        ctx.fillRect(p.x, p.y, p.w, p.h)
        ctx.fillStyle = 'rgba(207,207,207,0.2)'
        ctx.fillRect(p.x, p.y, p.w, 1)
      }

      // Exit marker
      if (s.crystals.length === 0) {
        ctx.fillStyle = 'rgba(229,229,229,0.9)'
        ctx.font = 'bold 10px Orbitron, monospace'
        ctx.fillText('EXIT', s.exit.x, s.exit.y - 8)
      }
      ctx.strokeStyle = s.crystals.length === 0 ? 'rgba(229,229,229,0.8)' : 'rgba(100,100,100,0.5)'
      ctx.lineWidth = 2
      ctx.strokeRect(s.exit.x, s.exit.y, 32, 32)
      ctx.fillStyle = s.crystals.length === 0 ? 'rgba(229,229,229,0.15)' : 'rgba(100,100,100,0.05)'
      ctx.fillRect(s.exit.x, s.exit.y, 32, 32)

      // Crystals
      for (const c of s.crystals) {
        const t = s.tick * 0.05
        const pulse = 1 + Math.sin(t + c.x) * 0.15
        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.scale(pulse, pulse)
        ctx.rotate(t)
        ctx.beginPath()
        ctx.moveTo(0, -8); ctx.lineTo(6, 0); ctx.lineTo(0, 8); ctx.lineTo(-6, 0)
        ctx.closePath()
        const cg = ctx.createLinearGradient(-6, -8, 6, 8)
        cg.addColorStop(0, '#cfcfcf')
        cg.addColorStop(0.5, '#ffffff')
        cg.addColorStop(1, '#aaaaaa')
        ctx.fillStyle = cg
        ctx.fill()
        ctx.restore()
      }

      // Robots
      for (const r of s.robots) {
        ctx.fillStyle = '#2a2a2a'
        ctx.fillRect(r.x, r.y, 32, 36)
        ctx.fillStyle = '#444'
        ctx.fillRect(r.x + 4, r.y + 4, 10, 8)
        ctx.fillRect(r.x + 18, r.y + 4, 10, 8)
        ctx.fillStyle = 'rgba(200,200,200,0.6)'
        ctx.fillRect(r.x + 6, r.y + 6, 6, 4)
        ctx.fillRect(r.x + 20, r.y + 6, 6, 4)
        ctx.strokeStyle = 'rgba(150,150,150,0.3)'
        ctx.lineWidth = 1
        ctx.strokeRect(r.x, r.y, 32, 36)
      }

      // Player
      const pa = ctx.createLinearGradient(player.x, player.y, player.x + pw, player.y + ph)
      pa.addColorStop(0, '#d0d0d0')
      pa.addColorStop(1, '#888')
      ctx.fillStyle = pa
      ctx.fillRect(player.x, player.y, pw, ph)
      // Helmet
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.fillRect(player.x + 4, player.y + 2, pw - 8, 14)
      // Visor
      ctx.fillStyle = 'rgba(100,100,100,0.5)'
      ctx.fillRect(player.x + 7, player.y + 5, pw - 14, 8)

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [])

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* HUD */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-6">
            <div>
              <span className="font-orbitron text-xs" style={{ color: '#555', letterSpacing: '0.1em' }}>HEALTH </span>
              <span className="font-orbitron text-sm metallic-text">{hud.health}</span>
            </div>
            <div>
              <span className="font-orbitron text-xs" style={{ color: '#555', letterSpacing: '0.1em' }}>CRYSTALS </span>
              <span className="font-orbitron text-sm metallic-text">{hud.crystals}/10</span>
            </div>
          </div>
          <span className="font-orbitron font-black text-sm metallic-text">{hud.score}</span>
          <div className="flex items-center gap-6">
            <div>
              <span className="font-orbitron text-xs" style={{ color: '#555', letterSpacing: '0.1em' }}>TIME </span>
              <span className="font-orbitron text-sm" style={{ color: hud.time < 30 ? '#e5e5e5' : '#888' }}>{hud.time}s</span>
            </div>
            <div className="flex gap-2">
              <button onClick={onExit} className="px-3 py-1 text-xs silver-border" style={{ borderRadius: 2, color: '#666', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter' }}>Exit</button>
              <button onClick={onRemix} className="px-3 py-1 text-xs metallic-btn font-orbitron" style={{ borderRadius: 2, letterSpacing: '0.05em', fontSize: '0.65rem' }}>REMIX</button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative silver-border" style={{ borderRadius: 2 }}>
          <canvas ref={canvasRef} width={900} height={450} className="w-full block" style={{ aspectRatio: '900/450' }} />
          {ended && (
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
              <h3 className="font-orbitron font-black text-2xl metallic-text mb-2">{ended === 'win' ? 'MISSION COMPLETE' : 'MISSION FAILED'}</h3>
              <p className="text-sm mb-6" style={{ color: '#666' }}>Score: {hud.score}</p>
              <div className="flex gap-4">
                <button onClick={() => { window.location.reload() }} className="metallic-btn font-orbitron text-xs px-8 py-3 tracking-widest" style={{ borderRadius: 2 }}>PLAY AGAIN</button>
                <button onClick={onRemix} className="px-8 py-3 text-xs font-orbitron silver-border tracking-widest" style={{ borderRadius: 2, color: '#888', background: 'transparent', cursor: 'pointer', letterSpacing: '0.1em' }}>REMIX</button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-3" style={{ color: '#333', fontFamily: 'Inter' }}>WASD / Arrow Keys to move · Space to jump · Collect all crystals to unlock the exit</p>
      </div>
    </div>
  )
}

// ─── Remix ────────────────────────────────────────────────────────────────────
function Remix({ onDone }: { onDone: () => void }) {
  const [prompt, setPrompt] = useState('')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const handleRemix = () => {
    if (!prompt.trim()) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setDone(true) }, 2500)
  }

  if (done) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full text-center animate-fade-up">
          <h2 className="font-orbitron font-black text-2xl metallic-text mb-2">Version 2 Ready</h2>
          <p className="text-sm mb-8" style={{ color: '#666' }}>Changes applied from your remix instructions</p>
          <div className="card-dark p-5 mb-8 text-left" style={{ borderRadius: 2 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-orbitron text-xs" style={{ color: '#555', letterSpacing: '0.1em' }}>VERSION 1 → REMIX → VERSION 2</span>
            </div>
            {['Alien enemies (replaces robots)', 'Final boss added', 'Boss health bar', 'Boss arena phase'].map(c => (
              <div key={c} className="flex items-center gap-3 mb-2">
                <span className="text-xs" style={{ color: '#e5e5e5' }}>+</span>
                <span className="text-sm" style={{ color: '#cfcfcf' }}>{c}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={onDone} className="metallic-btn font-orbitron text-xs px-10 py-3 tracking-widest" style={{ borderRadius: 2, letterSpacing: '0.15em' }}>PLAY VERSION 2 →</button>
            <button onClick={onDone} className="px-8 py-3 text-xs font-orbitron silver-border tracking-widest" style={{ borderRadius: 2, color: '#666', background: 'transparent', cursor: 'pointer', letterSpacing: '0.1em' }}>PASSPORT</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full animate-fade-up">
        <div className="text-center mb-10">
          <h2 className="font-orbitron font-black text-2xl metallic-text mb-3">Remix Your Game</h2>
          <p className="text-sm" style={{ color: '#666' }}>Tell PlayGumAI what to change.</p>
        </div>
        <div className="card-dark p-5 mb-4 text-sm" style={{ borderRadius: 2, color: '#777', fontStyle: 'italic' }}>
          "Replace the robots with aliens and add a final boss."
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your changes..."
          rows={4}
          className="input-silver w-full px-5 py-4 text-sm resize-none mb-4"
          style={{ borderRadius: 2 }}
          disabled={processing}
        />
        <button
          onClick={handleRemix}
          disabled={processing || !prompt.trim()}
          className="metallic-btn font-orbitron text-xs w-full py-3 tracking-widest"
          style={{ borderRadius: 2, letterSpacing: '0.15em', opacity: (!prompt.trim() && !processing) ? 0.5 : 1 }}
        >
          {processing ? 'GENERATING VERSION 2...' : 'APPLY REMIX →'}
        </button>
      </div>
    </div>
  )
}

// ─── Passport ─────────────────────────────────────────────────────────────────
function Passport({ onPlay }: { onPlay: () => void }) {
  const lineage = ['Original Prompt', 'Lost Planet v1', 'Alien Remix', 'Final Boss Remix']
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-3xl mx-auto animate-fade-up">
      <div className="text-center mb-10">
        <p className="font-orbitron text-xs tracking-widest mb-4" style={{ color: '#555', letterSpacing: '0.3em' }}>GAME PASSPORT</p>
        <h2 className="font-orbitron font-black text-3xl metallic-text">Astronaut: Lost Planet</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          ['Game ID', 'PG-8A92F'],
          ['Template', '2D Platformer'],
          ['Creator', 'PlayGumAI User'],
          ['Version', '2'],
          ['Parent', 'PG-8A92F-V1'],
          ['Created', '10 Aug 2026'],
          ['Config Hash', 'VERIFIED ✓'],
          ['Status', 'Playable'],
        ].map(([k, v]) => (
          <div key={k} className="card-dark p-4 flex justify-between items-center" style={{ borderRadius: 2 }}>
            <span className="text-xs" style={{ color: '#555', fontFamily: 'Inter', letterSpacing: '0.08em' }}>{k.toUpperCase()}</span>
            <span className="font-orbitron text-sm" style={{ color: k === 'Config Hash' ? '#cfcfcf' : '#e5e5e5' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Lineage */}
      <div className="card-dark p-6 mb-8" style={{ borderRadius: 2 }}>
        <p className="font-orbitron text-xs mb-6" style={{ color: '#555', letterSpacing: '0.15em' }}>LINEAGE</p>
        <div className="flex flex-col items-center gap-0">
          {lineage.map((node, i) => (
            <div key={node} className="flex flex-col items-center">
              <div className="px-5 py-2 silver-border text-sm font-medium" style={{ borderRadius: 2, color: i === lineage.length - 1 ? '#e5e5e5' : '#777', background: i === lineage.length - 1 ? '#111' : 'transparent', fontFamily: 'Inter' }}>
                {node}
              </div>
              {i < lineage.length - 1 && <div className="w-px h-6" style={{ background: 'rgba(207,207,207,0.2)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button onClick={onPlay} className="metallic-btn font-orbitron text-xs px-12 py-3 tracking-widest" style={{ borderRadius: 2, letterSpacing: '0.15em' }}>PLAY AGAIN →</button>
      </div>
    </div>
  )
}

// ─── Discover ─────────────────────────────────────────────────────────────────
const DISCOVER_GAMES = [
  { title: 'Hollow Knight', genre: 'Metroidvania', theme: 'Dark Fantasy', difficulty: 'Hard', match: 88 },
  { title: 'Dead Cells', genre: 'Roguelike', theme: 'Dark Action', difficulty: 'Hard', match: 84 },
  { title: 'Stardew Valley', genre: 'Farming Sim', theme: 'Cozy', difficulty: 'Easy', match: 61 },
  { title: 'Hades', genre: 'Action RPG', theme: 'Mythology', difficulty: 'Medium', match: 79 },
  { title: 'Celeste', genre: 'Platformer', theme: 'Emotional', difficulty: 'Hard', match: 73 },
  { title: 'Outer Wilds', genre: 'Exploration', theme: 'Sci-Fi Mystery', difficulty: 'Medium', match: 82 },
]

function Discover({ onStart }: { onStart: () => void }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Action', 'Puzzle', 'Exploration', 'Multiplayer']

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto animate-fade-up">
      <div className="mb-10">
        <p className="font-orbitron text-xs tracking-widest mb-3" style={{ color: '#555', letterSpacing: '0.3em' }}>GAME LIBRARY</p>
        <h2 className="font-orbitron font-black text-3xl metallic-text mb-2">Discover</h2>
        <p className="text-sm" style={{ color: '#666' }}>Or describe what you want and let AI find it.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 text-xs font-medium transition-all"
            style={{
              borderRadius: 2,
              fontFamily: 'Inter',
              border: `1px solid ${filter === f ? 'rgba(229,229,229,0.5)' : 'rgba(207,207,207,0.12)'}`,
              background: filter === f ? '#111' : '#050505',
              color: filter === f ? '#e5e5e5' : '#555',
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {DISCOVER_GAMES.map(game => (
          <div key={game.title} className="card-dark p-5 cursor-pointer" style={{ borderRadius: 2 }}>
            <div className="flex justify-between items-start mb-3">
              <span className="font-orbitron font-bold text-sm" style={{ color: '#e5e5e5' }}>{game.title}</span>
              <span className="font-orbitron text-xs metallic-text">{game.match}%</span>
            </div>
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className="px-2 py-1 text-xs silver-border" style={{ borderRadius: 2, color: '#666', background: '#070707', fontFamily: 'Inter' }}>{game.genre}</span>
              <span className="px-2 py-1 text-xs silver-border" style={{ borderRadius: 2, color: '#666', background: '#070707', fontFamily: 'Inter' }}>{game.difficulty}</span>
            </div>
            <p className="text-xs" style={{ color: '#444', fontFamily: 'Inter' }}>{game.theme}</p>
          </div>
        ))}
      </div>

      <div className="text-center silver-border p-10" style={{ borderRadius: 2 }}>
        <p className="font-orbitron text-sm metallic-text mb-2">Can't find what you're looking for?</p>
        <p className="text-sm mb-6" style={{ color: '#555' }}>Describe the experience — PlayGumAI will create it.</p>
        <button onClick={onStart} className="metallic-btn font-orbitron text-xs px-10 py-3 tracking-widest" style={{ borderRadius: 2, letterSpacing: '0.15em' }}>DESCRIBE YOUR GAME →</button>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [prompt, setPrompt] = useState('')
  const [profile, setProfile] = useState<GameProfile>(PROFILES['dark-scifi'])

  const nav = useCallback((s: Screen) => setScreen(s), [])

  const handlePrompt = (p: string) => {
    setPrompt(p)
    const key = detectProfile(p)
    setProfile(PROFILES[key])
    setScreen('analyzing')
    setTimeout(() => setScreen('dna'), 2800)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Navbar screen={screen} onNav={nav} />

      {screen === 'landing' && <Landing onSubmit={handlePrompt} />}
      {screen === 'analyzing' && <Analyzing prompt={prompt} />}
      {screen === 'dna' && <ExperienceDNA prompt={prompt} profile={profile} onContinue={() => nav('discovery')} />}
      {screen === 'discovery' && (
  <Discovery
    profile={profile}
    onGap={() => nav('gap')}
    onPlay={(gameTitle) => {
  if (gameTitle === 'Lone Echo II') {
    window.location.href = '/PlayGumAI/games/lon.html'
    return
  }

  if (gameTitle === 'Metroid Dread') {
    window.location.href = '/PlayGumAI/games/meteroid.html'
    return
  }

  if (gameTitle === 'Monument Valley 2') {
    window.location.href = '/PlayGumAI/games/monument.html'
    return
  }

  if (gameTitle === 'Unpacking') {
    window.location.href = '/PlayGumAI/games/unpacking.html'
    return
  }

  if (gameTitle === 'A Little to the Left') {
    window.location.href = '/PlayGumAI/games/a_little_to_the_left.html'
    return
  }

  if (gameTitle === 'Ghostrunner 2') {
  window.location.href = '/PlayGumAI/games/ghostrunner2.html'
  return
}

if (gameTitle === 'Ruiner') {
  window.location.href = '/PlayGumAI/games/ruiner.html'
  return
}

if (gameTitle === 'Neon Abyss') {
  window.location.href = '/PlayGumAI/games/neon_abyss.html'
  return
}

if (gameTitle === 'Hollow Knight') {
  window.location.href = '/PlayGumAI/games/hollow_knight.html'
  return
}

if (gameTitle === 'Ori and the Will of the Wisps') {
  window.location.href = '/PlayGumAI/games/ori_and_the_will_of_the_wisps.html'
  return
}

if (gameTitle === 'Dead Cells: Return to Castlevania') {
  window.location.href = '/PlayGumAI/games/dead_cells_return_to_castlevania.html'
  return
}

if (gameTitle === 'Animal Crossing: New Horizons') {
  window.location.href = '/PlayGumAI/games/animal_crossing_new_horizons.html'
  return
}

if (gameTitle === 'Stardew Valley') {
  window.location.href = '/PlayGumAI/games/stardew_valley.html'
  return
}

if (gameTitle === 'Overcooked! 2') {
  window.location.href = '/PlayGumAI/games/overcooked_2.html'
  return
}

  nav('game')
}}
  />
)}
      {screen === 'gap' && <ExperienceGap profile={profile} onCreate={() => nav('generating')} />}
      {screen === 'generating' && <Generating profile={profile} onDone={() => nav('game')} />}
      {screen === 'game' && <Game onExit={() => nav('landing')} onRemix={() => nav('remix')} />}
      {screen === 'remix' && <Remix onDone={() => nav('passport')} />}
      {screen === 'passport' && <Passport onPlay={() => window.location.href = '/PlayGumAI/games/astronaut_lost_planet.html'} />}
      {screen === 'discover' && <Discover onStart={() => nav('landing')} />}
    </div>
  )
}
