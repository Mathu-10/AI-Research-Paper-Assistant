export interface UploadResponse {
  document_id: string;
  filename: string;
  pages: number;
  preview: string;
  message: string;
}

export interface SummaryResponse {
  title: string;
  overview: string;
  methodology: string;
  key_findings: string;
  conclusion: string;
}

export interface AskResponse {
  answer: string;
}

export type LoadingStep = 'uploading' | 'uploaded_success' | 'extracting' | 'summarizing';

export interface AskResponse {
  answer: string;
}

export interface AppState {
  status: 'idle' | 'loading' | 'done' | 'error';
  loadingStep?: LoadingStep;
  upload?: UploadResponse;
  summary?: SummaryResponse;
  error?: string;
}
