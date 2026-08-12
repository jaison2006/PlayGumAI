You are a senior full-stack engineer, AI product designer, game-engine developer and UI/UX designer.

We are building a hackathon MVP called:

PLAYGUMAI

Tagline:
"Describe it. Discover it. Play it."

PlayGumAI is an AI-powered Game Discovery + Game Creation platform.

The user talks to PlayGumAI naturally, just like ChatGPT, and describes the type of gaming experience they want.

Example:

"I want a dark 2D game where a lone astronaut explores an abandoned planet, collects energy crystals and escapes robots. Make it difficult but playable in around 10 minutes."

PlayGumAI must understand the request.

It then performs TWO major actions:

1. GAME DISCOVERY
   Search and rank existing games that match the user's desired experience.

2. GAME CREATION
   If no existing game sufficiently satisfies the requested experience, detect the experience gap and allow the user to generate a simple playable browser game.

The product must feel like an AI product, NOT a traditional game website.

==================================================
IMPORTANT PRODUCT PRINCIPLE
==================================================

Do NOT simply generate a game every time.

First understand the user's desired experience.

Convert the natural-language prompt into structured "Experience DNA".

Then compare Experience DNA against Game DNA.

Decision:

STRONG MATCH
→ Recommend existing games.

PARTIAL MATCH
→ Recommend games and clearly show what is missing.

WEAK MATCH
→ Detect an Experience Gap and offer:
   "Create Your Game"

This is the central innovation of PlayGumAI.

==================================================
DESIGN DIRECTION
==================================================

Use the uploaded PlayGumAI logo as the official logo.

The entire interface must be designed around the logo.

Primary visual identity:

BLACK + SHINING SILVER

Do NOT use the typical purple AI aesthetic.

Do NOT use excessive blue.

Do NOT use colorful gradients.

Do NOT use childish gaming colors.

The design should feel:

- premium
- futuristic
- cinematic
- intelligent
- minimal
- powerful
- gaming-focused
- metallic
- sophisticated

Color direction:

Background:
#000000
#050505
#0A0A0A

Primary silver:
#E5E5E5
#CFCFCF

Bright silver:
#FFFFFF

Dark metallic:
#777777
#444444

Use subtle silver gradients only where appropriate.

Use glass/metal surfaces very subtly.

Buttons should have metallic silver borders/highlights.

Use black cards with subtle silver borders.

Use white/silver typography.

The uploaded PlayGumAI logo should be used in:

- landing page
- navbar
- AI chat interface
- loading screen
- game generation screen
- game player
- Game Passport

Do not modify the logo.

==================================================
OVERALL EXPERIENCE
==================================================

The website should feel like:

ChatGPT + Steam + AI Game Studio

but with its own identity.

The main interaction should be a large AI prompt box.

Landing page headline:

"Tell us what you want to play."

Subheading:

"PlayGumAI understands the experience you're looking for, finds the closest games, and creates one when it doesn't exist."

Main prompt:

"What do you want to play?"

Example prompts:

"I want a dark sci-fi survival game with robots."

"Recommend me a relaxing multiplayer game for short sessions."

"I want something like Minecraft but darker and more mysterious."

"Create a 2D ninja game in a cyberpunk city."

"Give me a difficult puzzle game I can finish in 10 minutes."

==================================================
PAGE STRUCTURE
==================================================

Create these major screens:

1. LANDING / AI HOME
2. AI CONVERSATION
3. EXPERIENCE DNA
4. GAME DISCOVERY RESULTS
5. EXPERIENCE GAP
6. GAME GENERATION
7. PLAYABLE GAME
8. REMIX
9. GAME PASSPORT
10. DISCOVER / GAME LIBRARY

==================================================
1. LANDING PAGE
==================================================

Create a premium cinematic landing page.

Navbar:

[PlayGumAI Logo]

Discover
Create
My Games
About

Right side:

"Launch AI"

Hero:

"Don't search for a game.
Describe the experience."

Subheading:

"PlayGumAI understands what you want to feel, finds the closest game, or creates one when it doesn't exist."

Large prompt input.

Placeholder:

"Describe the game you want to play..."

Button:

"Ask PlayGumAI →"

Below prompt show suggested prompts as clickable chips.

Example:

Dark Sci-Fi
Relaxing Puzzle
Cyberpunk Shooter
Fantasy Adventure
Cozy Multiplayer

Add subtle animations.

==================================================
2. AI CONVERSATION INTERFACE
==================================================

Make the AI interaction look similar to a premium conversational AI interface.

Left sidebar:

PlayGumAI logo

New Session
Discover
Create
My Games
Game Passport

Bottom:

Settings
Profile

Main area:

Conversation messages.

User message:

"I want a dark 2D game where a lone astronaut explores an abandoned planet, collects energy crystals and escapes robots."

AI response:

"Got it. I'm looking for a dark sci-fi survival experience with exploration, collection and escape mechanics."

Then show an expandable:

"Experience DNA"

==================================================
3. EXPERIENCE DNA
==================================================

Convert the user's prompt into structured Experience DNA.

Example:

EXPERIENCE DNA

Theme
Dark Sci-Fi — 96%

Setting
Abandoned Planet

Player
Lone Astronaut

Core Loop
Explore → Collect → Escape

Enemies
Robots

Collectible
Energy Crystals

Tone
Suspenseful / Lonely

Camera
2D

Difficulty
High

Session
10 minutes

Exploration
High

Combat
Medium

Story
Medium

Display this as beautiful metallic cards.

Add animated progress bars.

At the bottom:

"Understanding complete."

Then:

"Searching the game universe..."

==================================================
4. GAME DISCOVERY
==================================================

Search the game catalog.

For the MVP, implement a local structured game catalog containing at least 30-50 games across genres.

Each game should have:

title
description
genre
platform
theme
combat
exploration
story
difficulty
strategy
relaxation
freedom
multiplayer
session length
tone
tags
image
game URL

Convert each game into Game DNA.

Use semantic/weighted matching.

MVP matching weights:

Experience Similarity: 40%
Required Feature Match: 25%
Difficulty / Session Fit: 15%
Theme / Tone: 10%
Player Preference Fit: 10%

Mandatory requirements must receive a strong penalty when missing.

Example:

If user says:

"multiplayer is mandatory"

then a single-player game cannot receive a high match score simply because other attributes match.

==================================================
DISCOVERY RESULTS UI
==================================================

Show:

"3 experiences found"

Game cards should contain:

Game image

Game title

92% MATCH

Genre

Platform

Short AI explanation

Example:

CYBER SURVIVOR

92% Match

✓ Dark Sci-Fi
✓ Exploration
✓ Survival
✓ Robot enemies

✕ 10-minute sessions
✕ Crystal collection

AI explanation:

"This is the closest match because it shares your dark sci-fi setting, exploration and survival mechanics. However, it lacks crystal collection and short-session design."

Buttons:

"View Game"

"Play"

"Why this match?"

"Create Instead"

Make the matching score visually impressive.

==================================================
5. EXPERIENCE GAP ENGINE
==================================================

If no existing game satisfies the request sufficiently, show a dedicated cinematic state.

Title:

"Experience Gap Detected"

Subtitle:

"We found related games, but none sufficiently satisfy your requested experience."

Show:

WHAT EXISTS

✓ Dark Sci-Fi
✓ Exploration
✓ Survival

WHAT'S MISSING

✕ 2D presentation
✕ Crystal collection
✕ 10-minute sessions
✕ Robot escape loop

Then:

"Your experience doesn't fully exist yet."

Large button:

"CREATE MY GAME →"

This is the main hackathon WOW moment.

==================================================
6. GAME GENERATION
==================================================

Do NOT allow unrestricted AI code generation.

Use template-grounded generation.

Implement 3 reliable Phaser.js game templates:

1. 2D Platformer
2. Top-Down Shooter
3. Endless Runner

If time permits:

4. Puzzle / Maze

Each template should already contain:

player movement
collision
enemies
collectibles
health
score
failure state
level boundaries
difficulty configuration
asset slots

The AI should configure the template rather than randomly generate game code.

Pipeline:

User Prompt
↓
Experience DNA
↓
Gameplay Loop
↓
Template Selection
↓
Asset Selection
↓
Parameter Configuration
↓
Playable Game

==================================================
GENERATION UI
==================================================

When user clicks Create Game:

Show a cinematic generation screen.

Title:

"Building your experience..."

Show real progress steps:

✓ Understanding your idea
✓ Creating Experience DNA
✓ Selecting gameplay loop
✓ Selecting game template
✓ Mapping player
✓ Mapping environment
✓ Configuring enemies
✓ Configuring collectibles
✓ Tuning difficulty
✓ Building playable prototype

Do not use a fake generic loading spinner.

Animate each stage.

Show:

"2D Platformer selected"

"High difficulty"

"10-minute session"

"Robot enemies"

"Crystal collection"

Then:

"Your game is ready."

Button:

"PLAY NOW →"

==================================================
7. PLAYABLE GAME
==================================================

Embed the Phaser game directly inside PlayGumAI.

The user must actually be able to play.

For the astronaut demo:

Player:
Astronaut

Environment:
Dark abandoned planet

Enemies:
Robots

Collectibles:
Energy crystals

Goal:
Reach the extraction point

Mechanics:

Move
Jump
Collect crystals
Avoid/shoot robots
Reach exit

HUD:

HEALTH
CRYSTALS
TIME
SCORE

Add:

Pause
Restart
Exit Game

The game should run directly in the browser.

==================================================
8. AI REMIX
==================================================

After the user finishes or pauses the game, show:

"Want to change your game?"

Prompt:

"Tell PlayGumAI what to change."

Example:

"Replace the robots with aliens and add a final boss."

AI should interpret the modification.

Show:

VERSION 1
↓
REMIX
↓
VERSION 2

Display changes:

+ Alien enemies
+ Final boss
+ Boss health
+ Boss arena

Button:

"PLAY VERSION 2"

The actual game configuration should change.

Do not create a completely unrelated game.

==================================================
9. GAME PASSPORT
==================================================

Every generated game should receive a Game Passport.

Example:

GAME PASSPORT

Game ID:
PG-8A92F

Title:
Astronaut: Lost Planet

Creator:
PlayGumAI User

Template:
2D Platformer

Version:
2

Parent:
PG-8A92F-V1

Created:
10 Aug 2026

Configuration Hash:
VERIFIED ✓

Status:
Playable

Show a lineage graph:

Original
   ↓
Astronaut: Lost Planet
   ↓
Alien Remix
   ↓
Final Boss Remix

For the hackathon MVP, blockchain can be implemented as a lightweight provenance layer or mocked behind a clean abstraction if a real chain integration cannot be completed.

Do NOT make NFTs or tokens.

The purpose is provenance and attribution.

==================================================
10. GAME LIBRARY / DISCOVER
==================================================

Create a beautiful Discover page.

Sections:

Recommended For You

Trending Experiences

Recently Created

Community Remixes

Popular Genres

Game cards.

Add filters:

Genre
Platform
Difficulty
Session
Multiplayer
Theme

But keep natural-language search as the primary discovery method.

==================================================
AI ARCHITECTURE
==================================================

Use an LLM API through a backend.

Do NOT expose API keys in frontend code.

Frontend:

React
TypeScript
Tailwind CSS
Framer Motion

Game Engine:

Phaser.js

Backend:

FastAPI + Python

Database:

Supabase/PostgreSQL

AI:

LLM for:

intent extraction
Experience DNA
Game DNA
story interpretation
classification
template selection
match explanation
remix interpretation

Embeddings:

Use embeddings for semantic game search where practical.

If embeddings are too time-consuming for the 2-day MVP, implement a clean weighted structured matching engine first, while keeping the architecture ready for embeddings.

==================================================
EXPERIENCE DNA JSON
==================================================

The LLM should produce structured JSON similar to:

{
  "theme": "Dark Sci-Fi",
  "setting": "Abandoned Planet",
  "player": "Lone Astronaut",
  "enemy": "Robots",
  "collectible": "Energy Crystals",
  "tone": ["Suspenseful", "Lonely"],
  "core_loop": ["Explore", "Collect", "Escape"],
  "difficulty": "High",
  "camera": "2D",
  "session_minutes": 10,
  "exploration": 90,
  "combat": 60,
  "story": 60,
  "multiplayer": false,
  "required_features": [
    "2D",
    "crystal collection",
    "robot enemies",
    "10 minute session"
  ]
}

The backend must validate this JSON before using it.

==================================================
GAME MATCHING
==================================================

Create a matching function.

Example:

score =
experienceSimilarity * 0.40
+
requiredFeatureMatch * 0.25
+
difficultySessionFit * 0.15
+
themeToneFit * 0.10
+
playerPreferenceFit * 0.10

Then apply mandatory-feature penalties.

Example:

if multiplayer is mandatory
and game.multiplayer === false:

apply major penalty.

The AI must explain the score in natural language.

==================================================
EXPERIENCE GAP
==================================================

Use thresholds:

80-100:
STRONG MATCH

55-79:
PARTIAL MATCH

0-54:
EXPERIENCE GAP

These values should be configurable.

Strong Match:

"Already exists"

Partial:

"Closest experiences found, but some requested features are missing."

Weak:

"Experience Gap Detected"

==================================================
STORY → GAME
==================================================

The user does not need game-development vocabulary.

If the user says:

"A young astronaut is stranded on an abandoned planet. She needs to collect energy crystals while escaping hostile robots."

The AI should derive:

Character
World
Goal
Enemies
Collectibles
Gameplay Loop
Template

Then generate the game configuration.

==================================================
TRUST / GENERATION CONTRACT
==================================================

Never pretend that the system created features it cannot actually implement.

If user asks:

"Make GTA 7"

Respond:

"A full AAA open-world game is outside the current generation space.

I can create a top-down city escape prototype with:

✓ vehicles
✓ missions
✓ police pursuit
✓ city environment

Create this version?"

The UI should show:

Included
✓

Simplified
△

Unavailable
×

This creates trust.

==================================================
PLAYABLE GAME CONFIGURATION
==================================================

The AI should return a structured configuration such as:

{
  "template": "platformer",
  "title": "Lost Planet",
  "player": {
    "name": "Astronaut",
    "speed": 220,
    "jump": 420,
    "health": 100
  },
  "environment": {
    "theme": "abandoned_planet",
    "darkness": 0.8
  },
  "enemies": {
    "type": "robot",
    "count": 6,
    "speed": 80
  },
  "collectibles": {
    "type": "energy_crystal",
    "count": 10
  },
  "difficulty": "high",
  "session_minutes": 10,
  "goal": "reach_exit"
}

Phaser consumes this configuration.

The AI should NOT directly write arbitrary Phaser code for every prompt.

==================================================
DEMO MODE
==================================================

Because this is a hackathon and the demo must be reliable, implement a "Demo Mode".

Have 3 pre-tested demo scenarios:

DEMO 1:
Astronaut / Abandoned Planet / Robots

DEMO 2:
Cyberpunk Ninja / Robots / Boss

DEMO 3:
Fantasy Puzzle / Increasing Difficulty

The AI interface should still look fully dynamic.

If generation fails, fall back to a known working template/configuration rather than showing an error.

The judge must NEVER see a broken game.

==================================================
DATABASE
==================================================

Create tables/models for:

users

games

game_dna

player_profiles

player_dna

generated_games

game_versions

game_remixes

game_configurations

gameplay_events

recommendations

assets

asset_metadata

licenses

parent_child_relationships

For the 2-day MVP, simplify where necessary.

==================================================
GAMEPLAY TELEMETRY
==================================================

Record:

deaths
completion time
distance travelled
collectibles gathered
restarts
failed sections
completion
session duration

Implement simple rule-based evolution.

Example:

Deaths > 5
→ obstacle density -15%

Completion too quickly
→ movement speed +10%

Few collectibles collected
→ collectible visibility +20%

Then display:

"Gameplay analysis"

"You died 6 times in Section 2."

"Obstacle density appears too high."

"Create Version 2?"

==================================================
IMPORTANT HACKATHON DEMO FLOW
==================================================

The entire demo should take approximately 3-5 minutes.

FLOW:

1.
Open PlayGumAI.

Hero:

"Don't search for a game.
Describe the experience."

2.
Enter:

"I want a dark 2D game where a lone astronaut explores an abandoned planet, collects energy crystals and escapes robots. It should be difficult but playable in around 10 minutes."

3.
AI understands the request.

Show Experience DNA.

4.
Show existing game recommendations.

Example:

92% match
81% match
74% match

5.
Show gaps.

"None sufficiently satisfy your experience."

6.
Show:

EXPERIENCE GAP DETECTED

7.
Click:

CREATE MY GAME

8.
Show generation pipeline.

9.
Launch playable Phaser game.

10.
Judge plays.

Collect crystals.

Avoid robots.

Reach extraction.

11.
Return to AI.

Type:

"Replace the robots with aliens and add a final boss."

12.
Generate Version 2.

13.
Play Version 2.

14.
Show Game Passport.

15.
Show lineage:

Original
↓
Alien Remix
↓
Final Boss Remix

End screen:

"PlayGumAI"

"Describe it.
Discover it.
Play it."

==================================================
RESPONSIVE DESIGN
==================================================

Desktop-first because this is a hackathon presentation.

Also support mobile.

No horizontal overflow.

No broken cards.

No tiny text.

The game player must resize correctly.

==================================================
PERFORMANCE
==================================================

The application must load quickly.

Do not add unnecessary libraries.

Do not use huge assets.

Use compressed images.

Lazy-load game assets where possible.

==================================================
SECURITY
==================================================

Never expose API keys.

All AI requests go through backend.

Use environment variables.

Provide:

.env.example

==================================================
ERROR HANDLING
==================================================

Never show:

"Something went wrong."

Instead show useful messages.

Example:

"PlayGumAI couldn't generate that exact experience.

Try one of these supported game styles:

2D Platformer
Top-Down Shooter
Endless Runner
Puzzle / Maze"

Always provide a fallback.

==================================================
FINAL UI QUALITY
==================================================

This is a hackathon submission.

The interface must look like a real startup product, not a college project.

Use:

cinematic transitions
subtle silver glow
smooth hover states
animated cards
beautiful typography
micro-interactions
clean spacing
premium dark surfaces
metallic silver accents

Avoid:

excessive animations
neon rainbow colors
generic AI purple gradients
cheap-looking cards
emoji overload
clutter

==================================================
MOST IMPORTANT REQUIREMENT
==================================================

Do not build a fake UI where buttons only animate.

The following MUST actually work:

1. User enters natural-language prompt.
2. AI converts prompt to Experience DNA.
3. Game matching happens.
4. Recommendations appear.
5. Match score is calculated.
6. Missing features are identified.
7. Experience Gap is detected.
8. User can create a game.
9. Phaser game launches.
10. Game is playable.
11. User can remix the game using natural language.
12. Version 2 is generated from the configuration.
13. Game Passport is displayed.
14. Lineage is displayed.

If an advanced feature cannot be completed reliably within the hackathon timeline, implement a clean deterministic MVP version rather than a broken fake feature.

==================================================
DEVELOPMENT PRIORITY
==================================================

Priority 1:
Premium UI

Priority 2:
Prompt → Experience DNA

Priority 3:
Game recommendation engine

Priority 4:
Experience Gap

Priority 5:
Playable Phaser game

Priority 6:
Natural-language remix

Priority 7:
Game Passport / lineage

Priority 8:
Gameplay evolution

Do NOT spend the majority of development time on blockchain.

The actual WOW moment is:

USER IDEA
→ AI UNDERSTANDS
→ EXISTING GAMES DON'T FULLY MATCH
→ EXPERIENCE GAP
→ CREATE GAME
→ PLAY IT
→ REMIX IT

==================================================
FINAL BRAND
==================================================

Name:
PlayGumAI

Use the uploaded logo.

Tagline:

"Describe it. Discover it. Play it."

Alternative hero line:

"Don't search for a game.
Describe the experience."

Brand personality:

Intelligent.
Creative.
Futuristic.
Premium.
Gaming-first.

Build the complete working MVP now.