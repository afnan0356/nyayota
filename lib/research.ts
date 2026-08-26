/**
 * Nyayota Legal Research & Citation Workspace Utilities
 * Offline-first, client-side localStorage persistence for legal researchers,
 * students, and citizens. No account or login required.
 */

export interface ResearchNote {
  id: string;
  title: string;
  content: string;
  lawId?: string;
  lawTitle?: string;
  sectionNumber?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectedCitation {
  id: string;
  lawId: string;
  lawTitle: string;
  lawTitleBn?: string;
  jurisdiction: string;
  enactmentYear: number;
  sectionNumber?: string;
  citations?: {
    standard?: string;
    academic?: string;
    bluebook?: string;
    apa?: string;
    mla?: string;
    chicago?: string;
  };
  addedAt: string;
}

const RESEARCH_NOTES_KEY = 'nyayota_research_notes_v1';
const CITATIONS_COLLECTION_KEY = 'nyayota_collected_citations_v1';

// Helper to notify other tabs/components
function notifyResearchUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('nyayota-research-updated'));
  }
}

// ---------------- NOTES MANAGEMENT ----------------

export function getResearchNotes(): ResearchNote[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RESEARCH_NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse research notes from localStorage', e);
    return [];
  }
}

export function getNotesForSection(lawId: string, sectionNumber?: string): ResearchNote[] {
  const allNotes = getResearchNotes();
  return allNotes.filter((n) => {
    if (n.lawId !== lawId) return false;
    if (sectionNumber) {
      return n.sectionNumber === sectionNumber;
    }
    return true;
  });
}

export function getSectionNotesCountMap(lawId: string): Record<string, number> {
  const allNotes = getResearchNotes();
  const map: Record<string, number> = {};
  for (const n of allNotes) {
    if (n.lawId === lawId && n.sectionNumber) {
      map[n.sectionNumber] = (map[n.sectionNumber] || 0) + 1;
    }
  }
  return map;
}

export function saveResearchNote(note: Omit<ResearchNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): ResearchNote {
  const notes = getResearchNotes();
  const now = new Date().toISOString();

  if (note.id) {
    // Update existing
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      const updated: ResearchNote = {
        ...notes[index],
        title: note.title,
        content: note.content,
        lawId: note.lawId,
        lawTitle: note.lawTitle,
        sectionNumber: note.sectionNumber,
        tags: note.tags,
        updatedAt: now,
      };
      notes[index] = updated;
      localStorage.setItem(RESEARCH_NOTES_KEY, JSON.stringify(notes));
      notifyResearchUpdate();
      return updated;
    }
  }

  // Create new
  const newNote: ResearchNote = {
    id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: note.title || 'Untitled Legal Note',
    content: note.content,
    lawId: note.lawId,
    lawTitle: note.lawTitle,
    sectionNumber: note.sectionNumber,
    tags: note.tags || ['General'],
    createdAt: now,
    updatedAt: now,
  };

  notes.unshift(newNote);
  localStorage.setItem(RESEARCH_NOTES_KEY, JSON.stringify(notes));
  notifyResearchUpdate();
  return newNote;
}

export function deleteResearchNote(id: string): void {
  const notes = getResearchNotes().filter((n) => n.id !== id);
  localStorage.setItem(RESEARCH_NOTES_KEY, JSON.stringify(notes));
  notifyResearchUpdate();
}

// ---------------- CITATION WORKSPACE ----------------

export function getCollectedCitations(): CollectedCitation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CITATIONS_COLLECTION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse citations collection', e);
    return [];
  }
}

export function isCitationCollected(lawId: string, sectionNumber?: string): boolean {
  const citations = getCollectedCitations();
  return citations.some(
    (c) => c.lawId === lawId && (!sectionNumber || c.sectionNumber === sectionNumber)
  );
}

export function addCitationToCollection(citation: Omit<CollectedCitation, 'id' | 'addedAt'>): boolean {
  const list = getCollectedCitations();
  const exists = list.some(
    (c) => c.lawId === citation.lawId && c.sectionNumber === citation.sectionNumber
  );

  if (exists) {
    // Remove if already exists (toggle)
    const filtered = list.filter(
      (c) => !(c.lawId === citation.lawId && c.sectionNumber === citation.sectionNumber)
    );
    localStorage.setItem(CITATIONS_COLLECTION_KEY, JSON.stringify(filtered));
    notifyResearchUpdate();
    return false;
  }

  const newItem: CollectedCitation = {
    ...citation,
    id: `cite-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    addedAt: new Date().toISOString(),
  };

  list.unshift(newItem);
  localStorage.setItem(CITATIONS_COLLECTION_KEY, JSON.stringify(list));
  notifyResearchUpdate();
  return true;
}

export function removeCitationFromCollection(id: string): void {
  const list = getCollectedCitations().filter((c) => c.id !== id);
  localStorage.setItem(CITATIONS_COLLECTION_KEY, JSON.stringify(list));
  notifyResearchUpdate();
}

export function clearCollectedCitations(): void {
  localStorage.setItem(CITATIONS_COLLECTION_KEY, JSON.stringify([]));
  notifyResearchUpdate();
}

// ---------------- EXPORT FORMATTERS ----------------

export function formatCitationsExport(
  citations: CollectedCitation[],
  style: 'standard' | 'bluebook' | 'apa' | 'mla' | 'chicago'
): string {
  if (citations.length === 0) return '';
  return citations
    .map((c, idx) => {
      const citeText =
        c.citations?.[style] ||
        c.citations?.standard ||
        `${c.lawTitle} (${c.enactmentYear})${c.sectionNumber ? `, Sec. ${c.sectionNumber}` : ''}`;
      return `${idx + 1}. ${citeText}`;
    })
    .join('\n\n');
}

export function formatResearchNotesMarkdown(notes: ResearchNote[]): string {
  if (notes.length === 0) return '# Nyayota Legal Research Notes\n\nNo notes recorded yet.';
  
  let md = `# Nyayota Legal Research Dossier\nExported on: ${new Date().toLocaleDateString()}\n\n---\n\n`;
  notes.forEach((n) => {
    md += `## ${n.title}\n`;
    if (n.lawTitle) {
      md += `**Reference:** ${n.lawTitle}${n.sectionNumber ? ` (${n.sectionNumber})` : ''}\n`;
    }
    if (n.tags && n.tags.length > 0) {
      md += `**Tags:** ${n.tags.join(', ')}\n`;
    }
    md += `**Updated:** ${new Date(n.updatedAt).toLocaleString()}\n\n`;
    md += `${n.content}\n\n---\n\n`;
  });

  return md;
}
