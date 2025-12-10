import axios from "axios"

const GOOGLE_BOOKS_API_BASE = "https://www.googleapis.com/books/v1/volumes"

export interface GoogleBook {
    id: string
    volumeInfo: {
        title: string
        authors?: string[]
        description?: string
        imageLinks?: {
            thumbnail: string
            small?: string
            medium?: string
            large?: string
        }
        publishedDate?: string
        pageCount?: number
    }
}

export interface BookSearchResponse {
    items?: GoogleBook[]
    totalItems: number
}

export async function searchBooks(query: string): Promise<BookSearchResponse> {
    try {
        const response = await axios.get<BookSearchResponse>(GOOGLE_BOOKS_API_BASE, {
            params: {
                q: query,
                maxResults: 10,
                orderBy: "relevance",
            },
        })
        return response.data
    } catch (error) {
        console.error("Error searching books:", error)
        throw new Error("Failed to search books. Please try again.")
    }
}

export function transformGoogleBook(book: GoogleBook) {
    const { volumeInfo } = book
    return {
        id: book.id,
        title: volumeInfo.title,
        author: volumeInfo.authors?.join(", "),
        description: volumeInfo.description,
        image: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.small,
        publishedDate: volumeInfo.publishedDate,
        pageCount: volumeInfo.pageCount,
    }
}
