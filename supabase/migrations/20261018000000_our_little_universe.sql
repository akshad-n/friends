-- =====================================================================
-- OUR LITTLE UNIVERSE 💗 — SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  nickname TEXT,
  role TEXT CHECK (role IN ('her', 'him')) NOT NULL,
  avatar_url TEXT,
  couple_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COUPLES TABLE
CREATE TABLE IF NOT EXISTS public.couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invite_code TEXT UNIQUE NOT NULL,
  her_name TEXT DEFAULT 'My Sweet Peach 🌸',
  him_name TEXT DEFAULT 'Her Loving Goma 🌙',
  anniversary_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COUPLE MEMBERS (Enforces maximum 2 authorized partners per couple)
CREATE TABLE IF NOT EXISTS public.couple_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('her', 'him')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(couple_id, user_id),
  UNIQUE(couple_id, role) -- Only one 'her' and one 'him' per couple!
);

-- Add foreign key back to profiles
ALTER TABLE public.profiles 
  DROP CONSTRAINT IF EXISTS fk_profiles_couple,
  ADD CONSTRAINT fk_profiles_couple FOREIGN KEY (couple_id) REFERENCES public.couples(id) ON DELETE SET NULL;

-- 4. SONGS TABLE (Max 5 songs per partner per couple)
CREATE TABLE IF NOT EXISTS public.songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  owner_role TEXT CHECK (owner_role IN ('her', 'him')) NOT NULL,
  owner_name TEXT NOT NULL,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  url TEXT NOT NULL,
  mood TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5-SONG MAXIMUM DATABASE TRIGGER
CREATE OR REPLACE FUNCTION check_five_song_limit()
RETURNS TRIGGER AS $$
DECLARE
  song_count INT;
BEGIN
  SELECT COUNT(*) INTO song_count
  FROM public.songs
  WHERE couple_id = NEW.couple_id AND owner_role = NEW.owner_role;

  IF song_count >= 5 THEN
    RAISE EXCEPTION 'A playlist can have a maximum of 5 songs. Please replace or remove an existing song before adding a new one.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_check_five_song_limit ON public.songs;
CREATE TRIGGER tr_check_five_song_limit
BEFORE INSERT ON public.songs
FOR EACH ROW
EXECUTE FUNCTION check_five_song_limit();

-- 5. SONG REPLIES
CREATE TABLE IF NOT EXISTS public.song_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  song_id UUID REFERENCES public.songs(id) ON DELETE CASCADE NOT NULL,
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_role TEXT CHECK (author_role IN ('her', 'him')) NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROMANTIC RESPONSES (Date, Precious Life, Memories)
CREATE TABLE IF NOT EXISTS public.romantic_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  partner_role TEXT CHECK (partner_role IN ('her', 'him')) NOT NULL,
  question_id TEXT NOT NULL,
  response_value TEXT NOT NULL,
  date_plan JSONB,
  promise_saved BOOLEAN DEFAULT FALSE,
  memory_ideas JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUESTIONS (Ask Me Anything)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  asker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  asker_role TEXT CHECK (asker_role IN ('her', 'him')) NOT NULL,
  asker_name TEXT NOT NULL,
  question_text TEXT NOT NULL,
  category TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('awaiting', 'answered')) DEFAULT 'awaiting',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. QUESTION REPLIES (His answers to her questions)
CREATE TABLE IF NOT EXISTS public.question_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  replier_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  replier_role TEXT CHECK (replier_role IN ('her', 'him')) NOT NULL,
  replier_name TEXT NOT NULL,
  reply_text TEXT NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- 9. SAVED MEMORIES (Memory Garden timeline)
CREATE TABLE IF NOT EXISTS public.saved_memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_role TEXT CHECK (author_role IN ('her', 'him')) NOT NULL,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  memory_date DATE NOT NULL,
  icon TEXT,
  related_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  couple_id UUID REFERENCES public.couples(id) ON DELETE CASCADE NOT NULL,
  recipient_role TEXT NOT NULL,
  sender_role TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  target_section TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.romantic_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an authorized member of a couple
CREATE OR REPLACE FUNCTION is_member_of_couple(couple_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.couple_members
    WHERE couple_id = couple_uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read and update their own profile
CREATE POLICY "Profiles viewable by self and couple partner" ON public.profiles
  FOR SELECT USING (
    id = auth.uid() OR
    (couple_id IS NOT NULL AND is_member_of_couple(couple_id))
  );

CREATE POLICY "Profiles updatable by self" ON public.profiles
  FOR ALL USING (id = auth.uid());

-- Couples: Couple members can view and update their couple
CREATE POLICY "Couples viewable by members" ON public.couples
  FOR SELECT USING (is_member_of_couple(id));

CREATE POLICY "Couples updatable by members" ON public.couples
  FOR UPDATE USING (is_member_of_couple(id));

-- Songs: Only couple members can view, owners can insert/update/delete
CREATE POLICY "Songs viewable by couple members" ON public.songs
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Songs insertable by couple members" ON public.songs
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id) AND auth.uid() = owner_id);

CREATE POLICY "Songs updatable by owner" ON public.songs
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Songs deletable by owner" ON public.songs
  FOR DELETE USING (auth.uid() = owner_id);

-- Song Replies
CREATE POLICY "Replies viewable by couple" ON public.song_replies
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Replies insertable by couple" ON public.song_replies
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id) AND auth.uid() = author_id);

-- Romantic Responses
CREATE POLICY "Romantic responses viewable by couple" ON public.romantic_responses
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Romantic responses insertable by couple" ON public.romantic_responses
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id));

-- Questions & Replies
CREATE POLICY "Questions viewable by couple" ON public.questions
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Questions insertable by couple" ON public.questions
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id) AND auth.uid() = asker_id);

CREATE POLICY "Replies viewable by couple" ON public.question_replies
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Replies insertable by couple" ON public.question_replies
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id) AND auth.uid() = replier_id);

CREATE POLICY "Replies updatable by replier" ON public.question_replies
  FOR UPDATE USING (auth.uid() = replier_id);

-- Saved Memories
CREATE POLICY "Memories viewable by couple" ON public.saved_memories
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Memories insertable by couple" ON public.saved_memories
  FOR INSERT WITH CHECK (is_member_of_couple(couple_id) AND auth.uid() = author_id);

CREATE POLICY "Memories deletable by author" ON public.saved_memories
  FOR DELETE USING (auth.uid() = author_id);

-- Notifications
CREATE POLICY "Notifications viewable by couple members" ON public.notifications
  FOR SELECT USING (is_member_of_couple(couple_id));

CREATE POLICY "Notifications updatable by recipient" ON public.notifications
  FOR UPDATE USING (is_member_of_couple(couple_id));

-- Enable Supabase Realtime for instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.songs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.song_replies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.questions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.question_replies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.romantic_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.saved_memories;
