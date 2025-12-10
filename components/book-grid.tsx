"use client"

import { BookCard } from "./book-card"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { BookOpen } from "lucide-react"

export interface Book {
    id: string
    title: string
    author?: string
    description?: string
    image?: string
    publishedDate?: string
    pageCount?: number
}

interface BookGridProps {
    books: Book[]
    isLoading?: boolean
    onOpen?: (book: Book) => void
}

export function BookGrid({ books, isLoading, onOpen }: BookGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
            </div>
        )
    }

    if (books.length === 0) {
        return (
            <Empty className="border border-dashed">
                <EmptyMedia variant="icon">
                    <BookOpen className="w-8 h-8" />
                </EmptyMedia>
                <EmptyHeader>
                    <EmptyTitle>No se encontraron libros</EmptyTitle>
                    <EmptyDescription>
                        Intenta buscar otro título, autor o palabra clave. Tus búsquedas recientes se guardan sin conexión.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    image={book.image}
                    publishedDate={book.publishedDate}
                    pageCount={book.pageCount}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}
