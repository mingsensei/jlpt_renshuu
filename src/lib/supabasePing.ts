import { supabase, isSupabaseConfigured } from './supabase';

const LAST_PING_KEY = 'jlpt_supabase_last_ping';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

let keepAliveIntervalId: ReturnType<typeof setInterval> | null = null;

/**
 * Pings Supabase DB by querying a single record from the database.
 * This counts as active traffic to reset Supabase free-tier 7-day auto-pause timer.
 */
export async function pingSupabase(): Promise<{ success: boolean; duration: number; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, duration: 0, error: 'Supabase is not configured' };
  }

  const start = Date.now();
  try {
    // Perform a lightweight query on lessons table
    const { error } = await supabase
      .from('lessons')
      .select('id')
      .limit(1);

    const duration = Date.now() - start;

    if (error) {
      console.warn('[Supabase Keep-Alive] Ping query returned notice:', error.message);
      return { success: false, duration, error: error.message };
    }

    try {
      localStorage.setItem(LAST_PING_KEY, Date.now().toString());
    } catch {
      // LocalStorage might be disabled in private mode
    }

    console.info(`[Supabase Keep-Alive] Pinged DB successfully (${duration}ms) at ${new Date().toLocaleTimeString()}`);
    return { success: true, duration };
  } catch (err: any) {
    const duration = Date.now() - start;
    console.warn('[Supabase Keep-Alive] Ping failed:', err?.message || err);
    return { success: false, duration, error: err?.message || String(err) };
  }
}

/**
 * Initializes automatic background ping to Supabase every 12 hours.
 * Runs on app mount if last ping was > 12h ago, and continues periodically.
 */
export function initSupabaseKeepAlive(): () => void {
  // Check if we should ping immediately on launch
  try {
    const lastPingStr = localStorage.getItem(LAST_PING_KEY);
    const lastPing = lastPingStr ? parseInt(lastPingStr, 10) : 0;
    const elapsed = Date.now() - lastPing;

    if (isNaN(lastPing) || elapsed >= TWELVE_HOURS_MS) {
      // Run in background without awaiting
      pingSupabase().catch(() => {});
    }
  } catch {
    pingSupabase().catch(() => {});
  }

  // Periodic ping every 12 hours while the app is active
  if (!keepAliveIntervalId) {
    keepAliveIntervalId = setInterval(() => {
      pingSupabase().catch(() => {});
    }, TWELVE_HOURS_MS);
  }

  // Return cleanup function
  return () => {
    if (keepAliveIntervalId) {
      clearInterval(keepAliveIntervalId);
      keepAliveIntervalId = null;
    }
  };
}

/**
 * Helper to get the last recorded ping timestamp
 */
export function getLastPingTime(): Date | null {
  try {
    const lastPingStr = localStorage.getItem(LAST_PING_KEY);
    if (!lastPingStr) return null;
    const ms = parseInt(lastPingStr, 10);
    return isNaN(ms) ? null : new Date(ms);
  } catch {
    return null;
  }
}
