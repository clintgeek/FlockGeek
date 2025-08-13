const API_BASE = '/api/flockgeek/v1';
const OWNER_ID = localStorage.getItem('ownerId') || 'demo-owner';

async function http(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Owner-Id': OWNER_ID,
    ...(options.headers || {})
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  listBirds: async () => (await http('/birds')).data.items,
  createBird: async (payload) => (await http('/birds', { method: 'POST', body: JSON.stringify(payload) })).data.bird,

  listGroups: async () => (await http('/groups')).data.items,
  createGroup: async (payload) => (await http('/groups', { method: 'POST', body: JSON.stringify(payload) })).data.group,

  createEggEntry: async (payload) => (await http('/egg-production', { method: 'POST', body: JSON.stringify(payload) })).data.entry,
};
