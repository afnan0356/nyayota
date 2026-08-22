export const SEARCH_HISTORY_KEY = 'nyayota_search_history';
export const MAX_HISTORY_ITEMS = 5;

export interface SearchHistoryEntry {
  query: string;
  timestamp: number;
}

export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Support either string[] or object[] format
      return parsed
        .map((item) => (typeof item === 'string' ? item : item?.query))
        .filter((q): q is string => typeof q === 'string' && q.trim().length > 0)
        .slice(0, MAX_HISTORY_ITEMS);
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveSearchQuery(query: string): string[] {
  if (typeof window === 'undefined') return [];
  const trimmed = query.trim();
  if (!trimmed) return getSearchHistory();

  try {
    const current = getSearchHistory();
    const updated = [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
      0,
      MAX_HISTORY_ITEMS
    );
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nyayota-search-history-updated', { detail: updated }));
    return updated;
  } catch {
    return [];
  }
}

export function removeSearchHistoryItem(queryToRemove: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSearchHistory();
    const updated = current.filter((item) => item.toLowerCase() !== queryToRemove.toLowerCase());
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nyayota-search-history-updated', { detail: updated }));
    return updated;
  } catch {
    return [];
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    window.dispatchEvent(new CustomEvent('nyayota-search-history-updated', { detail: [] }));
  } catch {
    // ignore
  }
}
