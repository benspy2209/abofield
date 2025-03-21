
export interface ImageItem {
  id: string;
  name: string;
  path: string;
  usedIn: string[];
  description: string;
  type: 'local' | 'external' | 'supabase';
  bucketName?: string;
  filePath?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImageUploadResponse {
  path: string;
  id: string;
  fullPath: string;
}
