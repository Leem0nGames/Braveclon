import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn('Supabase not configured - running in offline mode');
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          rank: number;
          level: number;
          exp: number;
          energy: number;
          max_energy: number;
          last_energy_update: string;
          gems: number;
          zel: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          rank?: number;
          level?: number;
          exp?: number;
          energy?: number;
          max_energy?: number;
          last_energy_update?: string;
          gems?: number;
          zel?: number;
        };
        Update: {
          username?: string;
          rank?: number;
          level?: number;
          exp?: number;
          energy?: number;
          max_energy?: number;
          last_energy_update?: string;
          gems?: number;
          zel?: number;
          updated_at?: string;
        };
      };
      units: {
        Row: {
          id: string;
          profile_id: string;
          instance_id: string;
          template_id: string;
          level: number;
          exp: number;
          equipment: {
            weapon: string | null;
            armor: string | null;
            accessory: string | null;
          };
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          instance_id: string;
          template_id: string;
          level?: number;
          exp?: number;
          equipment?: {
            weapon: string | null;
            armor: string | null;
            accessory: string | null;
          };
        };
        Update: {
          level?: number;
          exp?: number;
          equipment?: {
            weapon: string | null;
            armor: string | null;
            accessory: string | null;
          };
        };
      };
      equipment: {
        Row: {
          id: string;
          profile_id: string;
          instance_id: string;
          template_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          instance_id: string;
          template_id: string;
        };
        Update: {};
      };
      team: {
        Row: {
          id: string;
          profile_id: string;
          slot_position: number;
          unit_instance_id: string | null;
        };
        Insert: {
          profile_id: string;
          slot_position: number;
          unit_instance_id?: string | null;
        };
        Update: {
          unit_instance_id?: string | null;
        };
      };
      qr_state: {
        Row: {
          id: string;
          profile_id: string;
          scans_today: number;
          last_scan_date: string;
          scanned_hashes: string[];
        };
        Insert: {
          profile_id: string;
          scans_today?: number;
          last_scan_date?: string;
          scanned_hashes?: string[];
        };
        Update: {
          scans_today?: number;
          last_scan_date?: string;
          scanned_hashes?: string[];
        };
      };
      summon_pity: {
        Row: {
          id: string;
          profile_id: string;
          star5_pulls: number;
          star4_pulls: number;
          last_star5_pull: number;
        };
        Insert: {
          profile_id: string;
          star5_pulls?: number;
          star4_pulls?: number;
          last_star5_pull?: number;
        };
        Update: {
          star5_pulls?: number;
          star4_pulls?: number;
          last_star5_pull?: number;
        };
      };
    };
  };
}