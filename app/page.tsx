import { getNotes } from "./actions/note";
import { NoteForm } from "@/components/NoteForm";
import { DeleteButton } from "@/components/DeleteButton";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const metadata = {
  title: "DevNotes — Dashboard",
  description: "Create and manage your developer notes in one place.",
};

export default async function Home() {
  const notesList = await getNotes();

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Top nav bar */}
      <header className="w-full sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-8 sm:px-16 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <span className="font-semibold text-sm tracking-tight">DevNotes</span>
          </div>
          <div className="flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mr-2">
                {notesList.length} {notesList.length === 1 ? "note" : "notes"}
              </span>
              <UserButton />
            </Show>
          </div>
        </div>
      </header>

      <main className="w-full max-w-3xl flex-1 flex flex-col px-8 sm:px-16 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Capture and manage your developer notes.</p>
        </div>

        {/* Create note form */}
        <NoteForm />

        {/* Notes section */}
        <section className="w-full">
          <h2 className="text-lg font-semibold mb-4 text-zinc-700 dark:text-zinc-300">Your Notes</h2>

          {notesList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">No notes yet</p>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">Create your first note using the form above.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
              {notesList.map((note) => (
                <li
                  key={note.id}
                  className="group flex flex-col p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base leading-snug line-clamp-1">{note.title}</h3>
                    <DeleteButton id={note.id} />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed flex-1 line-clamp-4 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5 text-xs text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Unknown date"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

