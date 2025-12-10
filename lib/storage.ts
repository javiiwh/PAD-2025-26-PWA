import type { StoredBook } from "@/types"

const RECENT_SEARCHES_KEY = "book_search_recent"
const MAX_RECENT_SEARCHES = 5

const RECENT_BOOKS_KEY = "book_recent_books"
const MAX_RECENT_BOOKS = 5

export function getRecentSearches(): string[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

export function addRecentSearch(query: string): string[] {
    if (typeof window === "undefined") return []

    try {
        let searches = getRecentSearches()
        searches = searches.filter((s) => s !== query)
        searches.unshift(query)
        searches = searches.slice(0, MAX_RECENT_SEARCHES)
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
        return searches
    } catch {
        return []
    }
}

export function removeRecentSearch(query: string): string[] {
    if (typeof window === "undefined") return []

    try {
        let searches = getRecentSearches()
        searches = searches.filter((s) => s !== query)
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
        return searches
    } catch {
        return []
    }
}

export function clearRecentSearches(): void {
    if (typeof window === "undefined") return

    try {
        localStorage.removeItem(RECENT_SEARCHES_KEY)
    } catch {
        // ignore
    }
}

export function getRecentBooks(): StoredBook[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(RECENT_BOOKS_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

export function addRecentBook(book: StoredBook): StoredBook[] {
    if (typeof window === "undefined") return []

    try {
        let books = getRecentBooks()
        books = books.filter((b) => b.id !== book.id)
        books.unshift(book)
        books = books.slice(0, MAX_RECENT_BOOKS)
        localStorage.setItem(RECENT_BOOKS_KEY, JSON.stringify(books))
        return books
    } catch {
        return []
    }
}

export function removeRecentBook(id: string): StoredBook[] {
    if (typeof window === "undefined") return []

    try {
        let books = getRecentBooks()
        books = books.filter((b) => b.id !== id)
        localStorage.setItem(RECENT_BOOKS_KEY, JSON.stringify(books))
        return books
    } catch {
        return []
    }
}

export function clearRecentBooks(): void {
    if (typeof window === "undefined") return

    try {
        localStorage.removeItem(RECENT_BOOKS_KEY)
    } catch {
        // ignore
    }
}
