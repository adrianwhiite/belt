-- Belt: run once in Supabase > SQL Editor > New query, then Run.
-- Creates saved takes, favorite songs, and a private bucket for recordings.
-- Every row and file is visible only to the signed-in person who made it.

create table if not exists public.takes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  song_id text not null,
  song_title text not null,
  score int,
  key_shift int not null default 0,
  audio_path text not null,
  created_at timestamptz not null default now()
);
alter table public.takes enable row level security;
create policy "Read own takes"   on public.takes for select to authenticated using (auth.uid() = user_id);
create policy "Add own takes"    on public.takes for insert to authenticated with check (auth.uid() = user_id);
create policy "Delete own takes" on public.takes for delete to authenticated using (auth.uid() = user_id);

create table if not exists public.favorites (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  song_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, song_id)
);
alter table public.favorites enable row level security;
create policy "Read own favorites"   on public.favorites for select to authenticated using (auth.uid() = user_id);
create policy "Add own favorites"    on public.favorites for insert to authenticated with check (auth.uid() = user_id);
create policy "Delete own favorites" on public.favorites for delete to authenticated using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('takes', 'takes', false)
on conflict (id) do nothing;

create policy "Read own recordings" on storage.objects for select to authenticated
  using (bucket_id = 'takes' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Upload own recordings" on storage.objects for insert to authenticated
  with check (bucket_id = 'takes' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Delete own recordings" on storage.objects for delete to authenticated
  using (bucket_id = 'takes' and (storage.foldername(name))[1] = auth.uid()::text);

-- Singing stats: one small row per finished take, so the profile can show your voice over time.
-- Numbers only, never audio. Rows go when the account goes (on delete cascade).
create table if not exists public.performances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  song_id text not null,
  song_title text not null,
  own boolean not null default false,
  mode text not null default 'karaoke',
  score int check (score between 0 and 100),
  cover real,
  sang_seconds real,
  finished boolean not null default true,
  low_midi real,
  high_midi real,
  key_shift int not null default 0,
  lines jsonb,
  sharp_flat jsonb,
  lag_ms int,
  device text
);
create index if not exists performances_user_time on public.performances (user_id, created_at desc);
alter table public.performances enable row level security;
create policy "Read own performances"   on public.performances for select to authenticated using ((select auth.uid()) = user_id);
create policy "Add own performances"    on public.performances for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Delete own performances" on public.performances for delete to authenticated using ((select auth.uid()) = user_id);

-- How long the song is, in seconds (for pins like "finish a 5-minute song").
alter table public.performances add column if not exists song_len real;
