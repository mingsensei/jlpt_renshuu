#!/usr/bin/env node

/**
 * Supabase Keep-Alive Auto-Ping Script
 * Pings Supabase PostgreSQL Database via PostgREST and Auth endpoints
 * to keep the project active and prevent free-tier auto-pausing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse .env file manually without extra dependencies
function loadEnvFile() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      env[key] = val;
    }
  }
  return env;
}

const fileEnv = loadEnvFile();

const SUPABASE_URL = (
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  fileEnv.SUPABASE_URL ||
  fileEnv.VITE_SUPABASE_URL ||
  'https://ntodbclgjrphbezmdvan.supabase.co'
).replace(/\/$/, '');

const SUPABASE_KEY = (
  process.env.SUPABASE_KEY ||
  process.env.VITE_SUPABASE_KEY ||
  fileEnv.SUPABASE_KEY ||
  fileEnv.VITE_SUPABASE_KEY ||
  'sb_publishable_BEDFnyXJIGV66dz7wh0ihg_Acuzca1z'
);

async function pingDatabase() {
  const now = new Date();
  const utcString = now.toUTCString();
  const vnTime = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(now);

  console.log('='.repeat(60));
  console.log(' [Supabase Keep-Alive] Auto-Ping Database');
  console.log(` UTC Time: ${utcString}`);
  console.log(` VN Time:  ${vnTime}`);
  console.log(` Target:   ${SUPABASE_URL}`);
  console.log('='.repeat(60));

  const startTime = Date.now();
  let anySuccess = false;

  // Endpoint 1: PostgREST database query (actively executes PostgreSQL query)
  const restUrl = `${SUPABASE_URL}/rest/v1/lessons?select=id&limit=1`;
  try {
    console.log(`-> Pinging REST DB endpoint: ${restUrl}`);
    const res = await fetch(restUrl, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    const duration = Date.now() - startTime;
    if (res.ok) {
      const data = await res.json().catch(() => null);
      console.log(`✓ REST DB Ping SUCCESS: HTTP ${res.status} (${duration}ms)`);
      if (data) {
        console.log(`  Records returned: ${Array.isArray(data) ? data.length : 1}`);
      }
      anySuccess = true;
    } else {
      console.warn(`! REST DB Ping returned HTTP ${res.status}: ${res.statusText} (${duration}ms)`);
    }
  } catch (err) {
    console.error(`✗ REST DB Ping failed: ${err.message}`);
  }

  // Endpoint 2: Auth health check (also exercises Supabase services)
  const authUrl = `${SUPABASE_URL}/auth/v1/health`;
  try {
    const authStart = Date.now();
    const resAuth = await fetch(authUrl, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
      },
      signal: AbortSignal.timeout(15000),
    });
    const authDuration = Date.now() - authStart;
    if (resAuth.ok) {
      console.log(`✓ Auth Service Ping SUCCESS: HTTP ${resAuth.status} (${authDuration}ms)`);
      anySuccess = true;
    } else {
      console.warn(`! Auth Service Ping returned HTTP ${resAuth.status} (${authDuration}ms)`);
    }
  } catch (err) {
    console.error(`✗ Auth Service Ping failed: ${err.message}`);
  }

  console.log('='.repeat(60));
  if (anySuccess) {
    console.log('✓ SUCCESS: Supabase project has been pinged. Inactivity timer reset!');
    return true;
  } else {
    console.warn('⚠️ WARNING: Ping could not reach Supabase.');
    console.warn('   Note: If your Supabase project is already paused in the Supabase Dashboard,');
    console.warn('   please log in to https://supabase.com/dashboard and click "Restore project" once.');
    console.warn('   After restoring, this auto-ping will keep it awake continuously!');
    return false;
  }
}

pingDatabase()
  .then((ok) => {
    // We exit with 0 so scheduled workflow doesn't fail if Supabase is temporarily paused
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during ping:', err);
    process.exit(0);
  });
