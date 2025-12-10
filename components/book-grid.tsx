"use client"

import { BookCard } from "./book-card"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { BookOpen } from "lucide-react"
import type { Book } from "@/types"

interface BookGridProps {
    books: Book[]
    isLoading?: boolean
    onOpen?: (book: Book) => void
    isInitial?: boolean
}

export function BookGrid({ books, isLoading, onOpen, isInitial }: BookGridProps) {
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
                    <EmptyTitle>{isInitial ? "Busca tu primer libro" : "No se encontraron libros"}</EmptyTitle>
                    <EmptyDescription>
                        {isInitial
                            ? "Introduce un título, autor o palabra clave para buscar libros. Tus búsquedas recientes se guardan sin conexión."
                            : "Intenta buscar otro título, autor o palabra clave. Tus búsquedas recientes se guardan sin conexión."}
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
                    infoLink={book.infoLink}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}
