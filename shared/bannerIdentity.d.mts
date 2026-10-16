export const ARTWORK_VERSION: string;
export const BANNER_FILES: string[];
export function artworkUrl(file: string): string;
export function brandedImage(value: unknown, version?: string): string;
export function brandedText<T>(value: T): T;
export function normalizeBanner(b: any): any | null;
export function normalizeArtworkSettings(settings: any): any;
export function brandedRecordImage(record: any, key: string): string;
export function markArtwork(record: any, key: string, value: string): any;
