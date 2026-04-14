"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface Tag {
  id: string;
  name: string;
}

export function SearchAndFilter({ tags }: { tags: Tag[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("search") || "";
  const currentTag = searchParams.get("tag") || "all";

  const [query, setQuery] = useState(currentQuery);

  const updateUrl = useCallback((newQuery: string, newTag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set("search", newQuery);
    } else {
      params.delete("search");
    }
    if (newTag && newTag !== "all") {
      params.set("tag", newTag);
    } else {
      params.delete("tag");
    }
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="flex flex-col gap-2 p-4 pt-1 bg-zinc-100/50 dark:bg-[#0a0a0d]">
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
           <circle cx="11" cy="11" r="8"></circle>
           <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // In a real app we might debounce this, but simply calling is fine for now
            updateUrl(e.target.value, currentTag);
          }}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#121216] border border-zinc-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 transition-colors placeholder:text-zinc-400"
        />
      </div>
      <div className="relative">
         <select
          value={currentTag}
          onChange={(e) => updateUrl(query, e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-[#121216] border border-zinc-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
         >
          <option value="all">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
         </select>
         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
         </div>
      </div>
    </div>
  );
}
