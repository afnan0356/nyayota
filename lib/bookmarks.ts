'use client';

export interface LocalBookmark {
  id: string;
  lawId: string;
  lawTitle: string;
  lawTitleBn?: string;
  jurisdiction: 'Bangladesh' | 'International' | 'Regional' | 'Supranational' | string;
  category: string;
  sectionNumber?: string;
  sectionTitle?: string;
  savedAt: string;
}

const STORAGE_KEY = 'nyayota_saved_bookmarks_v1';
const BOOKMARK_CHANGE_EVENT = 'nyayota_bookmark_change';

export function getLocalBookmarks(): LocalBookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isLawBookmarked(lawId: string, sectionNumber?: string): boolean {
  const bookmarks = getLocalBookmarks();
  if (sectionNumber) {
    return bookmarks.some((b) => b.lawId === lawId && b.sectionNumber === sectionNumber);
  }
  return bookmarks.some((b) => b.lawId === lawId && !b.sectionNumber);
}

export function toggleLocalBookmark(item: {
  lawId: string;
  lawTitle: string;
  lawTitleBn?: string;
  jurisdiction: 'Bangladesh' | 'International' | 'Regional' | 'Supranational' | string;
  category: string;
  sectionNumber?: string;
  sectionTitle?: string;
}): boolean {
  if (typeof window === 'undefined') return false;

  const current = getLocalBookmarks();
  const existingIndex = current.findIndex((b) => {
    if (item.sectionNumber) {
      return b.lawId === item.lawId && b.sectionNumber === item.sectionNumber;
    }
    return b.lawId === item.lawId && !b.sectionNumber;
  });

  let newState = false;
  let updated: LocalBookmark[];

  if (existingIndex >= 0) {
    // Remove
    updated = current.filter((_, idx) => idx !== existingIndex);
    newState = false;
  } else {
    // Add
    const newBookmark: LocalBookmark = {
      id: `${item.lawId}${item.sectionNumber ? `-${item.sectionNumber}` : ''}-${Date.now()}`,
      lawId: item.lawId,
      lawTitle: item.lawTitle,
      lawTitleBn: item.lawTitleBn,
      jurisdiction: item.jurisdiction,
      category: item.category,
      sectionNumber: item.sectionNumber,
      sectionTitle: item.sectionTitle,
      savedAt: new Date().toISOString()
    };
    updated = [newBookmark, ...current];
    newState = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKMARK_CHANGE_EVENT, { detail: updated }));
  } catch (e) {
    console.error('Failed to save bookmark locally', e);
  }

  return newState;
}

export function removeLocalBookmark(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getLocalBookmarks();
  const updated = current.filter((b) => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKMARK_CHANGE_EVENT, { detail: updated }));
  } catch (e) {
    console.error('Failed to remove bookmark', e);
  }
}

export function clearAllLocalBookmarks(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(BOOKMARK_CHANGE_EVENT, { detail: [] }));
  } catch (e) {
    console.error('Failed to clear bookmarks', e);
  }
}

export { BOOKMARK_CHANGE_EVENT };
