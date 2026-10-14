// Vercel Serverless Function: /api/ping
// Automatically ping Supabase database to keep it active and prevent auto-pause

export default async function handler(req: any, res: any) {
  const supabaseUrl = (
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    'https://ntodbclgjrphbezmdvan.supabase.co'
  ).replace(/\/$/, '');

  const supabaseKey = (
    process.env.SUPABASE_KEY ||
    process.env.VITE_SUPABASE_KEY ||
    'sb_publishable_BEDFnyXJIGV66dz7wh0ihg_Acuzca1z'
  );

  const startTime = Date.now();
  const now = new Date();

  try {
    const pingEndpoint = `${supabaseUrl}/rest/v1/lessons?select=id&limit=1`;
    const response = await fetch(pingEndpoint, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    const duration = Date.now() - startTime;
    const isOk = response.ok;

    return res.status(200).json({
      status: isOk ? 'success' : 'warning',
      message: isOk
        ? 'Supabase PostgreSQL DB pinged successfully'
        : `Supabase returned status ${response.status}`,
      statusCode: response.status,
      timestamp: now.toISOString(),
      durationMs: duration,
      endpoint: pingEndpoint,
    });
  } catch (error: any) {
    const duration = Date.now() - startTime;
    return res.status(200).json({
      status: 'error',
      message: 'Failed to reach Supabase. Check if the project is currently paused.',
      error: error?.message || String(error),
      timestamp: now.toISOString(),
      durationMs: duration,
    });
  }
}
