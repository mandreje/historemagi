export interface Story {
  id: number;
  title: string;
  cover: string;
  progress: number;
  series?: string;
  available: boolean;
  audioAvailable: boolean;
  printAvailable: boolean;
}

export interface Series {
  id: number;
  name: string;
  description: string;
  storiesCount: number;
  cover: string;
}

export interface PrintOptions {
  format: 'hardcover' | 'paperback';
  size: 'A4' | 'A5';
  quality: 'standard' | 'premium';
  shipping: 'standard' | 'express';
}