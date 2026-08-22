'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
  FileText,
  Bookmark,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Check,
  Download,
  Search,
  Tag,
  Scale,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  Share2,
  FolderPlus,
  Shield,
  ArrowRight
} from 'lucide-react';
import {
  ResearchNote,
  CollectedCitation,
  getResearchNotes,
  saveResearchNote,
  deleteResearchNote,
  getCollectedCitations,
  removeCitationFromCollection,
  clearCollectedCitations,
  formatCitationsExport,
  formatResearchNotesMarkdown
} from '@/lib/research';
import { LAWS_DATABASE } from '@/lib/legal-data';

function getInitialNotes(): ResearchNote[] {
  if (typeof window === 'undefined') return [];
  const loaded = getResearchNotes();
  if (loaded.length > 0) return loaded;
  const sample = saveResearchNote({
    title: 'Analysis: Culpable Homicide vs Murder Distinction',
    content: `Under Section 299 and Section 300 of the Penal Code 1860, establishing Mens Rea is pivotal.
Key considerations for trial briefs:
1. Was there sudden and grave provocation (Exception 1 to Sec 300)?
2. Exceeding right of private defense in good faith without premeditation (Exception 2)?
3. Sudden fight in the heat of passion (Exception 4)?

Next step: cross-reference Supreme Court BLD precedents on Section 304 Part I vs Part II sentencing.`,
    lawId: 'law-bd-002',
    lawTitle: 'The Penal Code, 1860',
    sectionNumber: 'Section 300',
    tags: ['Criminal Law', 'Trial Strategy', 'Precedent']
  });
  return [sample];
}

function getInitialCitations(): CollectedCitation[] {
  if (typeof window === 'undefined') return [];
  const loaded = getCollectedCitations();
  if (loaded.length > 0) return loaded;
  const sampleLaw = LAWS_DATABASE[0];
  if (sampleLaw) {
    return [
      {
        id: 'sample-cite-1',
        lawId: sampleLaw.id,
        lawTitle: sampleLaw.title,
        lawTitleBn: sampleLaw.titleBn,
        jurisdiction: sampleLaw.jurisdiction,
        enactmentYear: sampleLaw.enactmentYear,
        citations: {
          standard: sampleLaw.citations?.standard || `${sampleLaw.title}, Act No. ${sampleLaw.actNumber || 'XLV'} of ${sampleLaw.enactmentYear}`,
          bluebook: sampleLaw.citations?.bluebook || `${sampleLaw.title} (${sampleLaw.jurisdiction} ${sampleLaw.enactmentYear})`,
          apa: sampleLaw.citations?.apa || `${sampleLaw.title} (${sampleLaw.enactmentYear}). Bangladesh Code.`,
          mla: sampleLaw.citations?.mla || `"${sampleLaw.title}." Legislative and Parliamentary Affairs Division, ${sampleLaw.enactmentYear}.`,
          chicago: sampleLaw.citations?.chicago || `${sampleLaw.title} (${sampleLaw.enactmentYear}).`,
        },
        addedAt: new Date().toISOString()
      }
    ];
  }
  return [];
}

function ResearchContent() {
  const [activeTab, setActiveTab] = useState<'notes' | 'citations'>('notes');
  const [notes, setNotes] = useState<ResearchNote[]>(getInitialNotes);
  const [citations, setCitations] = useState<CollectedCitation[]>(getInitialCitations);

  // Note editor modal / inline state
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteLawId, setNoteLawId] = useState('');
  const [noteSection, setNoteSection] = useState('');
  const [noteTagsInput, setNoteTagsInput] = useState('Criminal Law, Case Prep');

  // Filter & Search
  const [notesSearch, setNotesSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Citation Style
  const [citationStyle, setCitationStyle] = useState<'standard' | 'bluebook' | 'apa' | 'mla' | 'chicago'>('bluebook');
  const [copiedBibliography, setCopiedBibliography] = useState(false);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  // Subscribe to storage update events
  useEffect(() => {
    const handleUpdate = () => {
      setNotes(getResearchNotes());
      setCitations(getCollectedCitations());
    };

    window.addEventListener('nyayota-research-updated', handleUpdate);
    return () => window.removeEventListener('nyayota-research-updated', handleUpdate);
  }, []);

  const handleOpenNewNote = () => {
    setEditingNoteId(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteLawId(LAWS_DATABASE[0]?.id || '');
    setNoteSection('');
    setNoteTagsInput('Statutory Research');
    setIsEditingNote(true);
  };

  const handleEditNote = (note: ResearchNote) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteLawId(note.lawId || '');
    setNoteSection(note.sectionNumber || '');
    setNoteTagsInput(note.tags?.join(', ') || '');
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) return;

    const selectedLaw = LAWS_DATABASE.find((l) => l.id === noteLawId);
    const parsedTags = noteTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    saveResearchNote({
      id: editingNoteId || undefined,
      title: noteTitle.trim() || 'Untitled Legal Note',
      content: noteContent.trim(),
      lawId: noteLawId || undefined,
      lawTitle: selectedLaw?.title || undefined,
      sectionNumber: noteSection.trim() || undefined,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
    });

    setIsEditingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    deleteResearchNote(id);
  };

  const handleCopyNote = (note: ResearchNote) => {
    const text = `${note.title}\n${note.lawTitle ? `Law: ${note.lawTitle} ${note.sectionNumber || ''}\n` : ''}\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopiedNoteId(note.id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  const handleCopyAllBibliography = () => {
    const text = formatCitationsExport(citations, citationStyle);
    navigator.clipboard.writeText(text);
    setCopiedBibliography(true);
    setTimeout(() => setCopiedBibliography(false), 2000);
  };

  const handleDownloadDossier = () => {
    const md = formatResearchNotesMarkdown(notes);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyayota-research-dossier-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Collect all unique tags
  const allTags = ['All', ...Array.from(new Set(notes.flatMap((n) => n.tags || [])))];

  const filteredNotes = notes.filter((n) => {
    const matchTag = selectedTag === 'All' || n.tags?.includes(selectedTag);
    const matchSearch =
      !notesSearch.trim() ||
      n.title.toLowerCase().includes(notesSearch.toLowerCase()) ||
      n.content.toLowerCase().includes(notesSearch.toLowerCase()) ||
      (n.lawTitle && n.lawTitle.toLowerCase().includes(notesSearch.toLowerCase()));
    return matchTag && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Client-Side Research Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Legal Research & Citation Dossier
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Record case briefs, organize statutory citations, format academic bibliographies, and build your legal research dossier privately on your device.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            id="download-dossier-btn"
            onClick={handleDownloadDossier}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors inline-flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dossier (Markdown)</span>
          </button>
          <button
            type="button"
            id="create-new-note-btn"
            onClick={handleOpenNewNote}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Research Note</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Notes vs Citations) */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            id="research-tab-notes"
            onClick={() => setActiveTab('notes')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'notes'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Research Notes & Case Briefs ({notes.length})</span>
          </button>

          <button
            type="button"
            id="research-tab-citations"
            onClick={() => setActiveTab('citations')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'citations'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Collected Citations & Bibliography ({citations.length})</span>
          </button>
        </div>

        <span className="text-[11px] text-zinc-400 hidden sm:inline-block">
          Offline Storage • Zero tracking
        </span>
      </div>

      {/* TAB 1: RESEARCH NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Note Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-notes-input"
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                placeholder="Search notes or referenced statutes..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
              />
            </div>

            {/* Tag Pills */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mr-1 shrink-0">Tags:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  id={`note-card-${note.id}`}
                  className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
                >
                  <div className="space-y-2.5">
                    {/* Tags & Time */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex flex-wrap gap-1">
                        {note.tags?.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400">
                        {new Date(note.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                      {note.title}
                    </h3>

                    {/* Law reference badge */}
                    {note.lawTitle && (
                      <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <Scale className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1">{note.lawTitle} {note.sectionNumber ? `(${note.sectionNumber})` : ''}</span>
                      </div>
                    )}

                    {/* Content Snippet */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-pre-line line-clamp-4 leading-relaxed font-sans">
                      {note.content}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-zinc-400">
                      <button
                        type="button"
                        onClick={() => handleCopyNote(note)}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-500 transition-colors"
                        title="Copy note text"
                      >
                        {copiedNoteId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditNote(note)}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title="Edit note"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-rose-500 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {note.lawId && (
                      <Link
                        href={`/law/${note.lawId}${note.sectionNumber ? `?section=${encodeURIComponent(note.sectionNumber)}` : ''}`}
                        className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Open Law</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <FileText className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">No Research Notes Found</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Create your first case brief or legal research note to organize statutory interpretations.
              </p>
              <button
                type="button"
                onClick={handleOpenNewNote}
                className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Research Note</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CITATION WORKSPACE & BIBLIOGRAPHY */}
      {activeTab === 'citations' && (
        <div className="space-y-6">
          {/* Citation Format Switcher & Batch Copy Toolbar */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Citation Style Format:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'bluebook', name: 'Bluebook' },
                  { id: 'standard', name: 'Nyayota Standard' },
                  { id: 'apa', name: 'APA 7th' },
                  { id: 'mla', name: 'MLA 9th' },
                  { id: 'chicago', name: 'Chicago 17th' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCitationStyle(s.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      citationStyle === s.id
                        ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                id="copy-all-citations-btn"
                onClick={handleCopyAllBibliography}
                disabled={citations.length === 0}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-colors"
              >
                {copiedBibliography ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBibliography ? 'Copied All Citations' : 'Copy Bibliography'}</span>
              </button>

              <button
                type="button"
                id="clear-all-citations-btn"
                onClick={clearCollectedCitations}
                disabled={citations.length === 0}
                className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-500/10 hover:text-rose-500 text-zinc-500 text-xs font-bold transition-colors disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Citations List */}
          {citations.length > 0 ? (
            <div className="space-y-3">
              {citations.map((cite, idx) => {
                const formattedCitation =
                  cite.citations?.[citationStyle] ||
                  cite.citations?.standard ||
                  `${cite.lawTitle}, ${cite.enactmentYear}`;

                return (
                  <div
                    key={cite.id}
                    id={`citation-item-${cite.id}`}
                    className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-start space-x-3.5 max-w-3xl">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {cite.lawTitle}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            {cite.jurisdiction}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-amber-700 dark:text-amber-300 bg-amber-500/5 p-2 rounded-xl border border-amber-500/20">
                          {formattedCitation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(formattedCitation);
                          setCopiedBibliography(true);
                          setTimeout(() => setCopiedBibliography(false), 2000);
                        }}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 text-xs flex items-center space-x-1"
                        title="Copy this citation"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">Copy</span>
                      </button>

                      <Link
                        href={`/law/${cite.lawId}`}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 text-xs"
                        title="View law"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeCitationFromCollection(cite.id)}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-500/10 hover:text-rose-500 text-zinc-400 text-xs"
                        title="Remove citation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <Bookmark className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Citation Workspace is Empty</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                While exploring statutes on Law Detail pages, click <strong>&quot;Cite Statute&quot;</strong> or <strong>&quot;Add to Workspace&quot;</strong> to collect and format citations.
              </p>
              <Link
                href="/search"
                className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Laws to Cite</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* NOTE CREATION / EDITING MODAL */}
      {isEditingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                {editingNoteId ? 'Edit Research Note' : 'Create Legal Research Note'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingNote(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Note Title / Case Subject</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g., Mens Rea standards in Section 300 exception cases..."
                  className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 font-bold"
                />
              </div>

              {/* Linked Law & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Link Reference Statute</label>
                  <select
                    value={noteLawId}
                    onChange={(e) => setNoteLawId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">None / General Note</option>
                    {LAWS_DATABASE.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.shortTitle} ({l.jurisdiction})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Specific Section (Optional)</label>
                  <input
                    type="text"
                    value={noteSection}
                    onChange={(e) => setNoteSection(e.target.value)}
                    placeholder="e.g. Section 300, Article 102(2)(a)"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={noteTagsInput}
                  onChange={(e) => setNoteTagsInput(e.target.value)}
                  placeholder="e.g. Criminal Law, Precedent, Thesis, High Court"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* Note Content */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Research Findings & Statutory Analysis</label>
                <textarea
                  rows={6}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your research notes, case brief breakdown, or trial strategy here..."
                  className="w-full p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 resize-none font-mono text-xs"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setIsEditingNote(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                id="save-research-note-btn"
                onClick={handleSaveNote}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Save Research Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Research Workspace...
        </div>
      }
    >
      <ResearchContent />
    </Suspense>
  );
}
