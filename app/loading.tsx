export default function Loading() {
    return (
        <div className="flex flex-col flex-1 items-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="flex flex-1 w-full max-w-3xl flex-col py-16 px-8 sm:px-16">
                {/* Header skeleton */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse mb-2" />
                        <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse opacity-60" />
                    </div>
                    <div className="h-10 w-32 bg-blue-200 dark:bg-blue-900/40 rounded-lg animate-pulse" />
                </div>

                {/* Form skeleton */}
                <div className="w-full p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm mb-10 space-y-4">
                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    <div className="flex justify-end">
                        <div className="h-10 w-28 bg-blue-200 dark:bg-blue-900/40 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Notes grid skeleton */}
                <div className="h-6 w-28 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-3 animate-pulse">
                            <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                            <div className="space-y-1.5">
                                <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                                <div className="h-3.5 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
                                <div className="h-3.5 w-4/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
                            </div>
                            <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
