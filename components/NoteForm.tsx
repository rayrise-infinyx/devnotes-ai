"use client";

import { useActionState, useEffect, useRef } from "react";
import { addNote, ActionState } from "@/app/actions/note";

export function NoteForm() {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(addNote, null);
    const formRef = useRef<HTMLFormElement>(null);

    // Reset form on success
    useEffect(() => {
        if (state && !state.error) {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <form 
            ref={formRef} 
            action={formAction} 
            className="flex flex-col gap-4 w-full p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm mb-12 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />
            
            <h2 className="text-xl font-semibold mb-2">Create a New Note</h2>
            
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="title">Title</label>
                <input 
                    id="title"
                    name="title" 
                    type="text" 
                    placeholder="E.g., Meeting notes"
                    className="px-4 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="content">Content</label>
                <textarea 
                    id="content"
                    name="content" 
                    placeholder="What's on your mind?"
                    rows={4}
                    className="px-4 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    required
                    disabled={isPending}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="text-sm">
                    {state && (
                        <p className={state.error ? "text-red-500" : "text-green-500"}>
                            {state.message}
                        </p>
                    )}
                </div>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className={`
                        px-6 py-2.5 rounded-lg font-medium text-white transition-all
                        flex items-center justify-center min-w-[120px]
                        ${isPending 
                            ? "bg-blue-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                        }
                    `}
                >
                    {isPending ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                        </div>
                    ) : (
                        "Save Note"
                    )}
                </button>
            </div>
        </form>
    );
}