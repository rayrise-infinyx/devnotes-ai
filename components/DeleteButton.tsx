"use client";

import { useTransition } from "react";
import { deleteNote } from "@/app/actions/note";

export function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            await deleteNote(id);
        });
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isPending}
            className={`
                p-2 rounded-md transition-all
                text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30
                focus:outline-none focus:ring-2 focus:ring-red-500/50
                ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            aria-label="Delete note"
            title="Delete note"
        >
            {isPending ? (
                <div className="w-5 h-5 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            )}
        </button>
    );
}
