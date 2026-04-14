import { getFilteredNotes, getAllTags } from "./actions/note";
import { NoteForm } from "@/components/NoteForm";
import { DeleteButton } from "@/components/DeleteButton";
import { Sidebar } from "@/components/Sidebar";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";

export const metadata = {
  title: "DevNotes — Dashboard",
  description: "Create and manage your developer notes in one place.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  
  const query = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;

  const notesList = await getFilteredNotes(query, tag);
  const tagsList = await getAllTags();
  
  const noteId = typeof searchParams.noteId === 'string' ? searchParams.noteId : undefined;
  
  const activeNote = noteId && noteId !== 'new' 
    ? notesList.find(n => n.id === noteId) 
    : null;

  // Determine which views to show on mobile based on whether a note is selected
  // On Desktop (md+), all columns show according to their intrinsic widths.
  const showListOnMobile = !noteId;
  const showEditorOnMobile = !!noteId;

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-[#030305] font-sans overflow-hidden text-zinc-900 dark:text-zinc-50 relative">
      {/* Background ambient glow setup */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* 1. Sidebar (Hidden on mobile by default) */}
      <Sidebar />

      {/* 2. Notes List */}
      <div 
        className={`w-full md:w-[320px] lg:w-[380px] h-full border-r border-zinc-200 dark:border-white/10 flex flex-col bg-zinc-100/50 dark:bg-[#0a0a0d] flex-shrink-0 relative z-10 ${showListOnMobile ? 'block' : 'hidden md:flex'}`}
      >
        <div className="p-4 h-16 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between flex-shrink-0 bg-white/50 dark:bg-[#0d0d12]/80 backdrop-blur-md">
          <h2 className="font-bold text-sm tracking-wide uppercase text-zinc-600 dark:text-zinc-400">All Notes</h2>
          <Link 
            href="/?noteId=new"
            className="p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Link>
        </div>

        <Suspense fallback={<div className="p-4 text-sm text-zinc-500">Loading filters...</div>}>
          <SearchAndFilter tags={tagsList} />
        </Suspense>

        <div className="flex-1 overflow-y-auto w-full p-4 space-y-3 custom-scrollbar">
          {notesList.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm mt-10 flex flex-col items-center">
              <div className="w-14 h-14 bg-white dark:bg-white/5 shadow-inner border border-zinc-200 dark:border-white/5 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <p className="font-medium text-zinc-700 dark:text-zinc-300">No notes yet.</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Click the + button to create one.</p>
            </div>
          ) : (
            notesList.map((note) => (
              <Link 
                href={`/?noteId=${note.id}`} 
                key={note.id}
                className={`flex flex-col group p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                  noteId === note.id 
                    ? 'bg-white border-blue-500 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)] dark:bg-[#15151c] dark:border-blue-500/50' 
                    : 'bg-white/60 border-zinc-200 hover:bg-white hover:border-zinc-300 dark:bg-[#121216] dark:border-white/5 dark:hover:bg-[#18181e] dark:hover:border-white/10 shadow-sm'
                }`}
              >
                {noteId === note.id && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                )}
                <div className="flex items-start justify-between mb-2 gap-3">
                  <h3 className={`font-semibold text-[15px] leading-tight line-clamp-1 ${noteId === note.id ? 'text-blue-700 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {note.title}
                  </h3>
                </div>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {note.content}
                </p>
                <div className="mt-auto flex items-center text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* 3. Editor Area */}
      <main 
        className={`flex-1 h-full bg-white dark:bg-[#0A0A0D] flex flex-col relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] ${showEditorOnMobile ? 'block' : 'hidden md:flex'}`}
      >
        <div className="h-16 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 md:px-8 flex-shrink-0 gap-3 bg-white/80 dark:bg-[#0A0A0D]/80 backdrop-blur-md">
           {/* Mobile Back Button */}
           <Link 
            href="/"
            className="md:hidden p-2 -ml-2 rounded-md hover:bg-zinc-100 text-zinc-600 dark:text-zinc-400 dark:hover:bg-white/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Link>

          <div className="flex-1" />
          <AnimatedThemeToggle/>
          
          {activeNote && (
            <div className="flex items-center">
              <DeleteButton id={activeNote.id} />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto relative">
          {!noteId ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 dark:opacity-10 rounded-full" />
                <div className="w-20 h-20 bg-white border border-zinc-200 dark:bg-[#121216] dark:border-white/10 shadow-xl rounded-2xl flex items-center justify-center mb-6 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#blue-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Your Workspace</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-sm">Select a note from the sidebar or jump right in by creating a new one.</p>
              <Link
                href="/?noteId=new"
                className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 active:scale-95"
               >
                 Create New Note
              </Link>
            </div>
          ) : noteId === 'new' ? (
            <div className="max-w-4xl mx-auto w-full p-6 md:p-12 h-full">
              <NoteForm />
            </div>
          ) : activeNote ? (
            <div className="max-w-4xl mx-auto w-full p-6 md:p-12">
               <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8 leading-tight">
                 {activeNote.title}
               </h1>
               <div className="text-lg text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                 {activeNote.content}
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Note not found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
