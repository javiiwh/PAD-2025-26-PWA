"use client"

import { X } from "lucide-react"

interface RecentSearchesProps {
    searches: string[]
    onSearchClick: (query: string) => void
    onClearSearch: (query: string) => void
}

export function RecentSearches({ searches, onSearchClick, onClearSearch }: RecentSearchesProps) {
    if (searches.length === 0) {
        return null
    }

    return (
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Búsquedas recientes</h3>
            <div className="flex flex-wrap gap-2">
                {searches.map((search) => (
                    <div
                        key={search}
                        className="flex items-center gap-1 sm:gap-2 bg-muted px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm group hover:bg-accent transition-colors"
                    >
                        <button
                            onClick={() => onSearchClick(search)}
                            className="flex-1 text-left cursor-pointer hover:underline"
                            type="button"
                        >
                            {search}
                        </button>
                        <button
                            onClick={() => onClearSearch(search)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            aria-label={`Eliminar ${search} de las búsquedas recientes`}
                            type="button"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
