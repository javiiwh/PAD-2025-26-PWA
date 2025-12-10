"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onSearch: (query: string) => void
    isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query)
        }
    }

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    type="text"
                    placeholder="Buscar por título, autor..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base"
                    aria-label="Buscar libros"
                />
                <Button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="h-11 sm:h-12 px-4 sm:px-6 gap-2 w-full sm:w-auto"
                    aria-busy={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="hidden sm:inline">Buscando...</span>
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Buscar</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
