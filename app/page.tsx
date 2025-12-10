"use client"

import { useEffect, useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { BookGrid, type Book } from "@/components/book-grid"
import { getRecentBooks, addRecentBook, StoredBook } from "@/lib/storage"
import { searchBooks, transformGoogleBook } from "@/lib/google-books-api"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
    const [books, setBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isOffline, setIsOffline] = useState(false)
    const [recentBooks, setRecentBooks] = useState<StoredBook[]>([])
    const [currentQuery, setCurrentQuery] = useState("")

    useEffect(() => {
        setRecentBooks(getRecentBooks())

        // Monitor online/offline status
        const handleOnline = () => setIsOffline(false)
        const handleOffline = () => setIsOffline(true)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)
        setIsOffline(!navigator.onLine)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    const handleSearch = async (query: string) => {
        setCurrentQuery(query)
        setIsLoading(true)
        setError(null)

        try {
            if (!navigator.onLine) {
                setIsOffline(true)
                setError("Estás sin conexión. Solo están disponibles las búsquedas recientes.")
                setBooks([])
                return
            }

            const response = await searchBooks(query)

            if (!response.items || response.items.length === 0) {
                setBooks([])
                setError("No se encontraron libros. Intenta con otra búsqueda.")
                return
            }

            const transformedBooks = response.items.map(transformGoogleBook)
            setBooks(transformedBooks)

            try {
                const top = transformedBooks.slice(0, 5)
                // iteramos de atrás hacia adelante para que top[0] quede primero en storage
                for (let i = top.length - 1; i >= 0; i--) {
                    const b = top[i]
                    addRecentBook({
                        id: b.id,
                        title: b.title,
                        author: b.author,
                        description: b.description,
                        image: b.image,
                        publishedDate: b.publishedDate,
                        pageCount: b.pageCount,
                    })
                }
                // actualizar estado desde storage
                setRecentBooks(getRecentBooks())
            } catch {
                // ignore storage errors
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo buscar libros. Por favor, inténtalo de nuevo.")
            setBooks([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenBook = (book: StoredBook) => {
        const updated = addRecentBook(book)
        setRecentBooks(updated)
    }

    const handleRetry = () => {
        if (currentQuery) {
            handleSearch(currentQuery)
        }
    }

    return (
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8 md:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 text-balance">Descubre libros</h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance">
                        Busca millones de libros. Funciona sin conexión con búsquedas en caché.
                    </p>
                </div>

                <div className="mb-6 sm:mb-8">
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>

                {isOffline && (
                    <Alert className="mb-4 sm:mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                        <AlertTitle className="text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">Modo sin conexión</AlertTitle>
                        <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-xs sm:text-sm">
                            Solo las búsquedas recientes están disponibles. Verifica tu conexión a Internet para buscar nuevos libros.
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive" className="mb-4 sm:mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="text-sm sm:text-base">Error de búsqueda</AlertTitle>
                        <AlertDescription className="text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
                            <span>{error}</span>
                            {!isOffline && (
                                <Button variant="ghost" size="sm" onClick={handleRetry} className="gap-2 flex-shrink-0">
                                    <RefreshCw className="w-4 h-4" />
                                    Reintentar
                                </Button>
                            )}
                        </AlertDescription>
                    </Alert>
                )}

                <div>
                    {books.length > 0 && (
                        <div className="mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-balance">
                                Resultados de &#34;{currentQuery}&#34; ({books.length} libros)
                            </h2>
                        </div>
                    )}
                    <BookGrid books={books} isLoading={isLoading} onOpen={handleOpenBook} />
                </div>

                {recentBooks.length > 0 && books.length === 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">Últimos libros consultados</h3>
                        <BookGrid books={recentBooks} onOpen={handleOpenBook} />
                    </div>
                )}

                <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground">
                    <Alert className="inline-flex gap-3 max-w-md">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <AlertDescription>
                            Instala esta aplicación en tu dispositivo para acceso sin conexión. Usa el menú del navegador para instalarla.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </main>
    )
}
