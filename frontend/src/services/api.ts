import type { UploadResponse, SummaryResponse, AskResponse } from '../types';

const BASE_URL = 'http://127.0.0.1:8000';

async function parseError(res: Response, fallback: string): Promise<never> {
  if (res.status === 503) {
    throw new Error('🤖 AI service is currently experiencing high demand. Please try again in a few moments.');
  }
  const body = await res.json().catch(() => ({}));
  throw new Error(body?.detail ?? `${fallback} (${res.status})`);
}

export async function uploadPaper(file: File): Promise<UploadResponse> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${BASE_URL}/upload/`, { method: 'POST', body: form });
  if (!res.ok) await parseError(res, 'Upload failed');
  return res.json();
}

export async function fetchSummary(documentId: string): Promise<SummaryResponse> {
  const res = await fetch(`${BASE_URL}/summary/${documentId}`, { method: 'POST' });
  if (!res.ok) await parseError(res, 'Summary failed');
  return res.json();
}

export async function askQuestion(documentId: string, question: string): Promise<AskResponse> {
  const res = await fetch(`${BASE_URL}/ask/${documentId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) await parseError(res, 'Request failed');
  return res.json();
}
