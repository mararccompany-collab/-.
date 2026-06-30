// Lightweight adapter for external analytics providers.
// Reads endpoints/keys from localStorage key `ext_analytics` (JSON).

interface ExtConfig { xgApi?: string; eloApi?: string; optaApi?: string }

function getConfig(): ExtConfig {
  try { return JSON.parse(localStorage.getItem('ext_analytics') || '{}'); } catch { return {}; }
}

export async function fetchXG(matchId: string): Promise<any | null> {
  const c = getConfig();
  if (!c.xgApi) return null;
  try {
    const url = c.xgApi.replace('{matchId}', encodeURIComponent(matchId));
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export async function fetchElo(teamName: string): Promise<any | null> {
  const c = getConfig();
  if (!c.eloApi) return null;
  try {
    const url = c.eloApi.replace('{team}', encodeURIComponent(teamName));
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export async function fetchOpta(matchId: string): Promise<any | null> {
  const c = getConfig();
  if (!c.optaApi) return null;
  try {
    const url = c.optaApi.replace('{matchId}', encodeURIComponent(matchId));
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

export function saveConfig(cfg: ExtConfig) { try { localStorage.setItem('ext_analytics', JSON.stringify(cfg)); } catch {} }

export default { fetchXG, fetchElo, fetchOpta, saveConfig };
