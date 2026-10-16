import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_ID = 'nukaujxoonylvqnpwwtv';
const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const DEFAULT_SUPABASE_KEY = 'sb_publishable_555OSLuVF2HjHaeZOuXGNg_82_NtDsA';

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AppointmentRecord {
  id?: string;
  reference_id: string;
  full_name: string;
  phone: string;
  email: string;
  inquiry_type: 'trial' | 'membership' | 'contact';
  plan_or_program: string;
  preferred_date: string;
  preferred_time_slot: string;
  goal_notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  synced_to_supabase?: boolean;
}

const LOCAL_APPOINTMENTS_KEY = 'khudgyan_gym_appointments_v1';

export function getLocalAppointments(): AppointmentRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_APPOINTMENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalAppointments(records: AppointmentRecord[]) {
  try {
    localStorage.setItem(LOCAL_APPOINTMENTS_KEY, JSON.stringify(records));
  } catch {
    // Ignore storage quota errors
  }
}

export async function createBookingAppointment(
  input: Omit<AppointmentRecord, 'id' | 'created_at' | 'status' | 'synced_to_supabase'>
): Promise<{
  record: AppointmentRecord;
  savedToSupabase: boolean;
  needsTableSetup: boolean;
  errorMessage?: string;
}> {
  const createdAt = new Date().toISOString();
  const dbPayload = {
    reference_id: input.reference_id,
    full_name: input.full_name,
    phone: input.phone,
    email: input.email,
    inquiry_type: input.inquiry_type,
    plan_or_program: input.plan_or_program,
    preferred_date: input.preferred_date,
    preferred_time_slot: input.preferred_time_slot,
    goal_notes: input.goal_notes,
    status: 'pending' as const,
    created_at: createdAt,
  };

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      const isMissingTable =
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('bookings');

      const fallbackRecord: AppointmentRecord = {
        ...dbPayload,
        synced_to_supabase: false,
      };
      const existing = getLocalAppointments();
      saveLocalAppointments([fallbackRecord, ...existing]);

      return {
        record: fallbackRecord,
        savedToSupabase: false,
        needsTableSetup: isMissingTable,
        errorMessage: error.message,
      };
    }

    const savedRecord: AppointmentRecord = {
      ...(data as AppointmentRecord),
      synced_to_supabase: true,
    };

    const existing = getLocalAppointments().filter(
      (item) => item.reference_id !== savedRecord.reference_id
    );
    saveLocalAppointments([savedRecord, ...existing]);

    return {
      record: savedRecord,
      savedToSupabase: true,
      needsTableSetup: false,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unable to reach Supabase';
    const fallbackRecord: AppointmentRecord = {
      ...dbPayload,
      synced_to_supabase: false,
    };
    const existing = getLocalAppointments();
    saveLocalAppointments([fallbackRecord, ...existing]);

    return {
      record: fallbackRecord,
      savedToSupabase: false,
      needsTableSetup: false,
      errorMessage: message,
    };
  }
}

export async function fetchAllBookingAppointments(): Promise<{
  appointments: AppointmentRecord[];
  tableReady: boolean;
  errorMessage?: string;
}> {
  const localRecords = getLocalAppointments();

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      const isMissingTable =
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('bookings');

      return {
        appointments: localRecords,
        tableReady: !isMissingTable,
        errorMessage: error.message,
      };
    }

    const remoteRecords: AppointmentRecord[] = ((data as AppointmentRecord[]) || []).map(
      (row) => ({
        ...row,
        synced_to_supabase: true,
      })
    );

    // Merge any unsynced local records so none are lost before syncing
    const remoteRefIds = new Set(remoteRecords.map((r) => r.reference_id));
    const unsyncedLocal = localRecords.filter((l) => !remoteRefIds.has(l.reference_id));
    const merged = [...unsyncedLocal, ...remoteRecords];
    saveLocalAppointments(merged);

    return {
      appointments: merged,
      tableReady: true,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch appointments';
    return {
      appointments: localRecords,
      tableReady: false,
      errorMessage: message,
    };
  }
}

export async function updateBookingAppointmentStatus(
  referenceId: string,
  status: AppointmentRecord['status']
): Promise<boolean> {
  const local = getLocalAppointments().map((item) =>
    item.reference_id === referenceId ? { ...item, status } : item
  );
  saveLocalAppointments(local);

  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('reference_id', referenceId);

    return !error;
  } catch {
    return false;
  }
}

export async function syncPendingAppointmentsToSupabase(): Promise<{
  syncedCount: number;
  errorMessage?: string;
}> {
  const local = getLocalAppointments();
  const unsynced = local.filter((item) => !item.synced_to_supabase);

  if (unsynced.length === 0) {
    return { syncedCount: 0 };
  }

  const payloads = unsynced.map((item) => ({
    reference_id: item.reference_id,
    full_name: item.full_name,
    phone: item.phone,
    email: item.email,
    inquiry_type: item.inquiry_type,
    plan_or_program: item.plan_or_program,
    preferred_date: item.preferred_date,
    preferred_time_slot: item.preferred_time_slot,
    goal_notes: item.goal_notes,
    status: item.status,
    created_at: item.created_at,
  }));

  try {
    const { error } = await supabase.from('bookings').insert(payloads);
    if (error) {
      return { syncedCount: 0, errorMessage: error.message };
    }

    const updatedLocal = local.map((item) => ({
      ...item,
      synced_to_supabase: true,
    }));
    saveLocalAppointments(updatedLocal);
    return { syncedCount: unsynced.length };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Sync failed';
    return { syncedCount: 0, errorMessage: message };
  }
}

export const SUPABASE_TABLE_SETUP_SQL = `-- Run this once in your Supabase SQL Editor (Project: nukaujxoonylvqnpwwtv)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference_id text unique not null,
  full_name text not null,
  phone text not null,
  email text not null,
  inquiry_type text not null,
  plan_or_program text not null,
  preferred_date text,
  preferred_time_slot text,
  goal_notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS) and allow booking inserts & reads
alter table public.bookings enable row level security;

create policy "Allow public insert on bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Allow public select on bookings"
  on public.bookings for select
  to anon, authenticated
  using (true);

create policy "Allow public update on bookings"
  on public.bookings for update
  to anon, authenticated
  using (true);`;
