-- =========================================================================
-- GPC Chaunaliya — Supabase schema
-- Run this once in your Supabase project: SQL Editor -> New Query -> paste
-- -> Run.
--
-- What this does:
--   1. Creates one table per editable content type.
--   2. Turns on Row Level Security (RLS) on every table.
--   3. Adds a policy so ANYONE (including logged-out visitors) can READ.
--   4. Adds a policy so ONLY a logged-in user can WRITE (insert/update/delete).
--
-- This means: the public website can read this data with no login, but
-- only someone who has signed in through Supabase Auth (i.e. your /admin
-- login) can change anything. That login is created separately in
-- Authentication -> Users, as described in the setup steps.
-- =========================================================================

-- ---------- NOTICES ----------
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null,
  tag text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- STAFF ----------
create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- COURSES ----------
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  description text not null,
  duration text not null,
  intake text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- FACILITIES ----------
create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  points text[] not null default '{}',
  icon text not null default 'book', -- 'book' | 'monitor' | 'mic'
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- GALLERY ----------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- IMPORTANT LINKS ----------
create table if not exists important_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- RULES & REGULATIONS (simple ordered list of strings) ----------
create table if not exists rules (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- ADMISSION STEPS (ordered list of strings) ----------
create table if not exists admission_steps (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- ANTI-RAGGING (single row: intro + definition; punishments below) ----------
create table if not exists anti_ragging_info (
  id int primary key default 1,
  intro text not null,
  definition text not null,
  constraint single_row check (id = 1)
);

create table if not exists anti_ragging_punishments (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- SITE SETTINGS (single row: name, phone, email, hours, etc.) ----------
create table if not exists site_settings (
  id int primary key default 1,
  name text not null,
  short_name text not null,
  district text not null,
  established int not null,
  address text not null,
  phone text not null,
  email text not null,
  hours text not null,
  constraint single_row check (id = 1)
);

-- =========================================================================
-- Row Level Security
-- =========================================================================
alter table notices enable row level security;
alter table staff enable row level security;
alter table courses enable row level security;
alter table facilities enable row level security;
alter table gallery enable row level security;
alter table important_links enable row level security;
alter table rules enable row level security;
alter table admission_steps enable row level security;
alter table anti_ragging_info enable row level security;
alter table anti_ragging_punishments enable row level security;
alter table site_settings enable row level security;

-- Public can read everything (the website itself, no login required)
create policy "public read notices" on notices for select using (true);
create policy "public read staff" on staff for select using (true);
create policy "public read courses" on courses for select using (true);
create policy "public read facilities" on facilities for select using (true);
create policy "public read gallery" on gallery for select using (true);
create policy "public read important_links" on important_links for select using (true);
create policy "public read rules" on rules for select using (true);
create policy "public read admission_steps" on admission_steps for select using (true);
create policy "public read anti_ragging_info" on anti_ragging_info for select using (true);
create policy "public read anti_ragging_punishments" on anti_ragging_punishments for select using (true);
create policy "public read site_settings" on site_settings for select using (true);

-- Only logged-in users (your admin account) can write
create policy "auth write notices" on notices for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write staff" on staff for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write courses" on courses for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write facilities" on facilities for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write important_links" on important_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write rules" on rules for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write admission_steps" on admission_steps for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write anti_ragging_info" on anti_ragging_info for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write anti_ragging_punishments" on anti_ragging_punishments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =========================================================================
-- Storage bucket for images (staff photos, gallery photos)
-- =========================================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "public read site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "auth upload site-images"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

create policy "auth update site-images"
  on storage.objects for update
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

create policy "auth delete site-images"
  on storage.objects for delete
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

-- =========================================================================
-- Seed data — pre-fills the tables with the content already on the site,
-- so nothing disappears when you switch over. Safe to run once.
-- =========================================================================
insert into site_settings (id, name, short_name, district, established, address, phone, email, hours)
values (
  1,
  'Government Polytechnic Chaunaliya',
  'GP Chaunaliya',
  'Almora, Uttarakhand',
  2007,
  'Government Polytechnic Chaunaliya, Almora – 263680, Uttarakhand',
  '+91-9690654009',
  'gpchaunaliya@gmail.com',
  '10:00 AM – 5:00 PM, Monday to Saturday (Second Saturday off)'
)
on conflict (id) do nothing;

insert into anti_ragging_info (id, intro, definition)
values (
  1,
  'Government Polytechnic Chaunaliya has maintained a "Ragging Free Campus" over the years, with invaluable support from students and their guardians in this endeavour.',
  'Ragging is treated as a cognizable and heinous offence. It includes any conduct — spoken, written or by act — that has the effect of teasing, treating or handling a fresher or any other student with rudeness; exploiting students for academic tasks or financial extortion; any act of physical or sexual abuse, forcing obscene acts or causing bodily harm; and any act that disrupts the regular academic activity of other students.'
)
on conflict (id) do nothing;

insert into notices (title, date, tag, sort_order) values
  ('JEEP counselling schedule released on ubter.in — check your rank and slot', 'Updated regularly', 'Admission', 1),
  ('Second Saturday remains off; regular hours 10:00 AM – 5:00 PM', 'Standing notice', 'General', 2),
  ('Library borrower cards issued on HoD recommendation — visit the library desk', 'Standing notice', 'Library', 3),
  ('Anti-Ragging Campaign guidelines applicable to all enrolled students', 'Standing notice', 'Student Welfare', 4)
on conflict do nothing;

insert into important_links (label, url, sort_order) values
  ('UBTER Official Website', 'https://ubter.in', 1),
  ('JEEP Application / Registration', 'https://ubterjeep.co.in', 2),
  ('JEEP Counselling & Results Login', 'https://admissions.ubterjeep.co.in', 3),
  ('AICTE', 'https://www.aicte-india.org', 4)
on conflict do nothing;

insert into courses (name, short_name, description, duration, intake, sort_order) values
  ('Civil and Environmental Engineering', 'Civil Engineering', 'A core discipline covering structural design, surveying, construction technology, environmental engineering and site management — preparing diploma holders for site supervision, government infrastructure works and private construction roles.', '3 Years (6 Semesters)', '60 Seats', 1),
  ('Computer Science and Engineering', 'Computer Science', 'Covers programming, data structures, networking, database management and web technologies, building the practical computing skills needed for IT support, software and hardware roles across industry and government.', '3 Years (6 Semesters)', '60 Seats', 2)
on conflict do nothing;

insert into facilities (title, description, points, icon, sort_order) values
  ('Library', 'Every student is issued a Borrower''s Card, recommended by the concerned Head of Department, for access to books and journals.',
   array['Limit: 2 books per student for 15 days', 'Issue hours: Mon–Sat, 10:30 AM–1:00 PM & 2:00 PM–4:30 PM', 'Overdue charge: ₹1 per day per book', 'Cost recovery applies on loss or damage of issued books'],
   'book', 1),
  ('Smart Classroom', 'Equipped to support short-term courses and AICTE programmes delivered through the SWAYAM portal, bringing digital learning into everyday classes.',
   array['Access to AICTE SWAYAM courses', 'Digital teaching aids for core subjects', 'Used for short-term skill certifications'],
   'monitor', 2),
  ('Language Lab', 'A dedicated lab for improving students'' communication skills in English, with focused attention on grammar and pronunciation.',
   array['Structured spoken-English practice', 'Grammar and pronunciation modules', 'Builds interview and workplace communication skills'],
   'mic', 3)
on conflict do nothing;

insert into rules (content, sort_order) values
  ('Each 3-year Diploma course offered by the institute is divided into 6 semesters.', 1),
  ('The Uttarakhand Board of Technical Education (UBTE), Roorkee conducts semester examinations twice a year.', 2),
  ('Students must maintain a minimum of 80% attendance in their classes to be eligible to appear in the board semester exams.', 3),
  ('Prior to each semester examination, every student must appear in two class tests and a mid-term examination.', 4),
  ('Sessional marks are awarded on the basis of attendance, marks obtained in class tests, and mid-term exam performance.', 5)
on conflict do nothing;

insert into admission_steps (content, sort_order) values
  ('Buy the JEEP application form from the designated distribution centre.', 1),
  ('Fill the form and submit it to the Uttarakhand Board of Technical Education, or any Government Polytechnic in Uttarakhand.', 2),
  ('Download your entrance exam admit card from www.ubter.in once issued.', 3),
  ('Check your JEEP result on www.ubter.in on the declared date.', 4),
  ('Attend counselling on your allotted date, based on your rank, to choose your branch and college.', 5),
  ('Report to the allotted college with original documents to confirm admission.', 6)
on conflict do nothing;

insert into anti_ragging_punishments (content, sort_order) values
  ('Cancellation of admission', 1),
  ('Suspension from attending classes', 2),
  ('Withholding of results, scholarships or other benefits', 3),
  ('Debarring from appearing in examinations', 4),
  ('Rustication from the institute for a specified period', 5),
  ('Expulsion from the institute', 6),
  ('Referral to the police where applicable', 7)
on conflict do nothing;

-- NOTE: Staff and Gallery are intentionally left for you to add through the
-- /admin dashboard, since their photos need to be uploaded as files rather
-- than seeded as text.
