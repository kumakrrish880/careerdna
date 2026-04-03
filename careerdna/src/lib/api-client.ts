const API_BASE = '/api';

export async function submitAssessment(answers: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/assessment/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });
  if (!res.ok) throw new Error('Assessment submission failed');
  return res.json();
}

export async function getRecommendations(userId: string) {
  const res = await fetch(`${API_BASE}/recommendations?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return res.json();
}

export async function getMarketData(career: string) {
  const res = await fetch(`${API_BASE}/market?career=${encodeURIComponent(career)}`);
  if (!res.ok) throw new Error('Failed to fetch market data');
  return res.json();
}
