# 🐱💗 Our Little Universe — Two Little Cats, One Little Universe

> “Two little cats. One little universe. A thousand memories.”

A private, romantic, full-stack couple universe built with **React, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, and Web Audio API**. Features kawaii chibi cartoon cat mascots (inspired by Peach & Goma / Mochi Cat couple), interactive love questions with runaway NO buttons, 5-song playlist managers with synchronized listening, a private Ask Me Anything Q&A dashboard, relationship memory timeline, and real-time in-app and push notifications.

---

## 🌸 Visual Aesthetic & Characters

- **Character A (Peach 🌸)**: Sweet white cat with rosy pink blush, big sparkling eyes, and gentle loving expressions.
- **Character B (Goma 🌙)**: Chubby warm-grey cat with rosy cheeks, playful expressions, and cuddly hugs.
- **Color Palette**:
  - Warm Cream: `#FFF8F0`
  - Blush Pink: `#F6C9D2`
  - Pastel Rose: `#ECA4B2`
  - Soft Lavender: `#E8DFF8`
  - Butter Yellow: `#FFE8A3`
  - Pale Mint: `#DCEFE3`
  - Chocolate Brown: `#54382F` (Outlines, borders & typography)
- **Decorations**: Falling flower petals on HTML5 canvas, roses, tulips, daisies, butterflies, soft floating clouds, and twinkling stars.

---

## ✨ Features Breakdown

### 1. 🎀 Opening Screen & Background Music
- Dreamy pastel garden with Peach holding a tiny flower while Goma hugs gently.
- Floating hearts, drifting clouds, and sparkling stars.
- Romantic quote: *“Out of all the people in the world, you are the person I want to keep making beautiful memories with.”*
- Integrated Web Audio romantic music box synthesizer (zero external dependencies, user gesture initiated, volume & mute controls).

### 2. 🎧 Section 1: Our Mood, Our Music
- **Her Songs 🌷** (Up to 5 songs) & **My Songs 🌙** (Up to 5 songs).
- **Strict 5-Song Limit**: Enforced both via UI and database trigger (`check_five_song_limit()`).
- **Listen Together 🎧💗**: Synchronized shared listening player supporting YouTube embeds, Spotify embeds, and audio streaming with active session status.
- **Song Replies**: Quick romantic reactions (*“This song is so us. 💗”*, *“I thought about you when I heard this.”*) or custom love notes that trigger partner notifications.

### 3. 🌹 Section 2: Would You Like to Go on a Date with Me?
- Rose garden with two cats holding paws.
- **Playful Runaway NO Button**:
  - On desktop hover or mobile tap, the button dodges smoothly to safe positions inside the card.
  - Accompanied by a mischievous running cat and quotes like: *“Ehehe, catch me if you can! 🙈”*, *“Wrong button, madam! 😂🌷”*.
  - Completely preserves screen accessibility and never causes accidental YES submissions.
- **YES Celebration**:
  - Cats jump happily with confetti and falling flower petals.
  - Unlocks the **Date Planning Card** (Preferred Date, Time, Place She Wants to Visit, Food She Wants to Eat, Personal Note).
  - Automatically records into the private memory garden and notifies him!

### 4. 🌙 Section 3: A Precious Life Together
- Nighttime starry scene under the crescent moon with cats holding paws.
- Question: *“I know life is short, but would you like to share your precious life with me? 💗”*
- **YES Interaction**:
  - Dims the sky into deep twilight, stars glow softly, cats embrace in a warm hug (`CatHug`).
  - Heartfelt vow:
    > *“My love, I know life won't always be perfect. But I want to keep choosing you, supporting you, listening to you, and growing with you. I want to celebrate your happiest moments, stand beside you through difficult days, and create little memories that we will smile about years from now... I'm always here to love you and support you. 💗🌷”*
  - **“Save This Little Promise ✨”** button preserves the vow in the timeline forever.

### 5. 🌻 Section 4: Shall We Make More Memories?
- Question: *“Would you like to make more beautiful memories with me? 🌻”*
- **YES Celebration**:
  - Confetti and exact reaction: **“Chal g mg jau date var ❤️😂🌷”**
  - Bucket list selector with 10 illustrated cards (e.g., *Watching sunset together*, *Cozy movie night*, *Eating our favorite food*) plus custom memory idea input.

### 6. 💌 Section 5: Ask Me Anything, My Love
- Form with categories: *About Us*, *Our Future*, *Memories*, *Feelings*, *Fun Questions*, *Random Thoughts*, *Anything on Your Mind*.
- Support for anonymous option: *“Send as Your Shy Secret Cat 🐱”*.
- **Private Answer Dashboard for Him**:
  - Filter questions by All, Awaiting Answer, Answered.
  - Type, submit, and edit answers.
  - Read tracking (*“Seen by her 🌸”*).

### 7. 🌸 Section 6: Our Little Memory Garden
- Vertical and desktop relationship timeline.
- Aggregates shared songs, date plans, promises, bucket list items, and custom milestones.
- Custom memory creator with flower/mascot icon picker.

### 8. 🔔 Section 7: Notifications
- Navigation bell with real-time unread counter badge.
- Event-driven notifications with Web Audio chime sound effect.
- Instant jump links directly to relevant sections.
- Browser Push Notifications API integration.

### 9. ⚙️ Section 8: Private Couple Space & Authentication
- Secure **Couple Invite Link** with unique code (`OUR-LITTLE-UNIVERSE-XXXX`).
- Quick partner switcher to test or view as either **Peach 🌸** or **Goma 🌙**.
- Persistent offline / local storage backing alongside live Supabase PostgreSQL support.

---

## 🛠️ Project Structure

```text
c:/Users/USER/OneDrive/Desktop/Golu/
├── .env.example                                      # Environment variable placeholders
├── index.html                                        # Google Fonts, romantic metadata
├── package.json                                      # Dependencies & scripts
├── postcss.config.js                                 # PostCSS config
├── tailwind.config.js                                # Romantic color tokens & animations
├── tsconfig.json / tsconfig.app.json                 # TypeScript configurations
├── vite.config.ts                                    # Vite configuration
├── supabase/
│   └── migrations/
│       └── 20261018000000_our_little_universe.sql    # PostgreSQL schema, 5-song trigger, RLS
└── src/
    ├── main.tsx                                      # React entry point
    ├── App.tsx                                       # Main container with tab routing
    ├── index.css                                     # Romantic design system & utilities
    ├── types.ts                                      # TypeScript interfaces
    ├── vite-env.d.ts                                 # Environment typings
    ├── lib/
    │   └── supabase.ts                               # Supabase client & connection tester
    ├── context/
    │   └── AppContext.tsx                            # Central couple state & event system
    └── components/
        ├── KawaiiCats.tsx                            # Reusable Peach & Goma SVG characters
        ├── FloralDecorations.tsx                     # Petal canvas & flower accents
        ├── BackgroundMusic.tsx                       # Romantic music box synthesizer
        ├── OpeningScreen.tsx                         # Opening entrance screen
        ├── Navbar.tsx                                # Responsive header & mobile bottom bar
        ├── HomeSection.tsx                           # Love dashboard & day counter
        ├── MusicSection.tsx                          # 5-song playlist & shared player
        ├── LoveQuestions.tsx                         # 3 interactive romantic questions
        ├── AMASection.tsx                            # Q&A submission & answer dashboard
        ├── MemoryGardenSection.tsx                   # Private relationship timeline
        ├── NotificationsDrawer.tsx                   # Real-time alert drawer
        └── AccountModal.tsx                          # Couple settings & Supabase status
```

---

## 🚀 Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🗄️ Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261018000000_our_little_universe.sql` and run the entire query. This creates:
   - `profiles`, `couples`, `couple_members`
   - `songs` (with 5-song maximum trigger `check_five_song_limit()`)
   - `song_replies`
   - `romantic_responses`
   - `questions` & `question_replies`
   - `saved_memories`
   - `notifications`
   - Row Level Security (RLS) policies protecting couples from unauthorized access.
   - Realtime publication subscriptions.
4. Copy your project credentials from **Project Settings -> API**:
   - `Project URL`
   - `anon public key`
5. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```
6. Restart the dev server. The database status badge in Account Settings will turn **"Supabase Connected"**!

*(Note: Out-of-the-box, the app runs with complete local persistent storage, allowing you to test every single feature immediately even before configuring Supabase.)*

---

## 🌐 Vercel Deployment Instructions

1. Push this repository to GitHub or GitLab.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Deploy! Your private romantic world is live at `https://your-little-universe.vercel.app`.

---

## 🔒 Security & Testing Checklist

- [x] **Two-Partner Isolation**: Couple spaces enforce strict membership validation.
- [x] **5-Song Maximum**: Enforced both client-side and at the PostgreSQL database level via trigger function.
- [x] **Row Level Security (RLS)**: Public users cannot read or write to couple records without membership.
- [x] **Safe Runaway Button**: NO button maneuvers safely within visible card bounds, ensuring YES is never accidentally pressed.
- [x] **Non-Intrusive Audio**: Background music never auto-plays without explicit user interaction.
- [x] **Mobile Responsiveness**: Clean bottom navigation bar on mobile with large touch targets.
