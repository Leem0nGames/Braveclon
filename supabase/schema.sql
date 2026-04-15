-- Supabase Database Schema for Braveclon
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES table - main player data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL,
  rank INTEGER DEFAULT 1,
  level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  energy INTEGER DEFAULT 10,
  max_energy INTEGER DEFAULT 10,
  last_energy_update TIMESTAMPTZ DEFAULT NOW(),
  gems INTEGER DEFAULT 50,
  zel INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- UNITS table - player units inventory
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  instance_id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  equipment JSONB DEFAULT '{"weapon": null, "armor": null, "accessory": null}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, instance_id)
);

-- EQUIPMENT table - player equipment inventory
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  instance_id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, instance_id)
);

-- TEAM table - player team composition
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  slot_position INTEGER NOT NULL,
  unit_instance_id TEXT,
  UNIQUE(profile_id, slot_position)
);

-- QR_STATE table - QR hunt progress
CREATE TABLE IF NOT EXISTS qr_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  scans_today INTEGER DEFAULT 0,
  last_scan_date TEXT,
  scanned_hashes TEXT[] DEFAULT '{}'
);

-- SUMMON_PITY table - gacha pity system
CREATE TABLE IF NOT EXISTS summon_pity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  star5_pulls INTEGER DEFAULT 0,
  star4_pulls INTEGER DEFAULT 0,
  last_star5_pull INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE summon_pity ENABLE ROW LEVEL SECURITY;

-- Profile policy - users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Units policy
CREATE POLICY "Users can manage own units" ON units
  FOR ALL USING (auth.uid() = profile_id);

-- Equipment policy
CREATE POLICY "Users can manage own equipment" ON equipment
  FOR ALL USING (auth.uid() = profile_id);

-- Team policy
CREATE POLICY "Users can manage own team" ON team
  FOR ALL USING (auth.uid() = profile_id);

-- QR State policy
CREATE POLICY "Users can manage own qr state" ON qr_state
  FOR ALL USING (auth.uid() = profile_id);

-- Summon Pity policy
CREATE POLICY "Users can manage own summon pity" ON summon_pity
  FOR ALL USING (auth.uid() = profile_id);

-- Create indexes for performance
CREATE INDEX idx_units_profile ON units(profile_id);
CREATE INDEX idx_equipment_profile ON equipment(profile_id);
CREATE INDEX idx_team_profile ON team(profile_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();