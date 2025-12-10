"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import type { Book } from "@/types"

interface BookCardProps extends Partial<Book> {
    id: string
    title: string
    author?: string
    description?: string
    image?: string
    publishedDate?: string
    pageCount?: number
    infoLink?: string
    onOpen?: (book: Book) => void
}

export function BookCard({ id, title, author, description, image, publishedDate, pageCount, infoLink, onOpen }: BookCardProps) {
    const handleOpen = () => {
        if (onOpen) {
            onOpen({ id, title, author, description, image, publishedDate, pageCount, infoLink })
        }
    }

    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <button onClick={handleOpen} className="text-left flex-1 flex flex-col hover:cursor-pointer">
                <div className="relative h-40 sm:h-48 bg-muted overflow-hidden flex-shrink-0">
                    {image ? (
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            width={256}
                            height={256}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.src = "/abstract-book-cover.png"
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                            <span className="text-muted-foreground text-xs sm:text-sm">Sin portada</span>
                        </div>
                    )}
                </div>

                <CardHeader className="flex-1 pb-3">
                    <CardTitle className="text-sm sm:text-base md:text-base line-clamp-2 text-balance">{title}</CardTitle>
                    {author && <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-1.5">{author}</p>}
                </CardHeader>

                <CardContent className="space-y-2 pt-0">
                    {description && <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>}

                    <div className="flex flex-col gap-1 text-xs text-muted-foreground border-t pt-2">
                        {publishedDate && (
                            <p className="line-clamp-1">
                                <span className="font-semibold">Publicado:</span> {publishedDate}
                            </p>
                        )}
                        {pageCount && (
                            <p>
                                <span className="font-semibold">Páginas:</span> {pageCount}
                            </p>
                        )}
                    </div>
                </CardContent>
            </button>
        </Card>
    )
}
