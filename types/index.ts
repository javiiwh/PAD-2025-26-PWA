export interface Book {
    id: string
    title: string
    author?: string
    description?: string
    image?: string
    publishedDate?: string
    pageCount?: number
    // optional link to the book details on Google Books or publisher
    infoLink?: string
}

// StoredBook is the same shape as Book but kept as a separate name for clarity
export type StoredBook = Book

