"use client"

import { useMemo } from "react"
import { useFavorites } from "@/hooks/use-favorites"

export default function BookCard({ book }) {
  const { toggle, isFavorite } = useFavorites()
  const coverUrl = useMemo(() => {
    if (book?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    }
    return "/book-cover-placeholder.png"
  }, [book])

  const title = book?.title || "Untitled"
  const author = (book?.author_name && book.author_name[0]) || "Unknown Author"
  const year = book?.first_publish_year ? String(book.first_publish_year) : "—"
  const editions = book?.edition_count || 0
  const workKey = book?.key // e.g. "/works/OL12345W"
  const openUrl = workKey ? `https://openlibrary.org${workKey}` : "https://openlibrary.org/"

  const favId = book?.key || (book?.edition_key && book.edition_key[0]) || `${title}-${author}-${year}`

  return (
    <article className="book-card group rounded-md border p-3 transition-colors hover:bg-accent/40">
      <div className="aspect-[3/4] overflow-hidden rounded-md">
        <img
          src={coverUrl || "/placeholder.svg?height=400&width=300&query=book cover placeholder"}
          alt={`Cover of ${title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          crossOrigin="anonymous"
        />
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-2 text-pretty text-base font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{author}</p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Year: {year}</span>
          <span className="text-muted-foreground">Editions: {editions}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border px-2 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View
          </a>
          <button
            aria-pressed={isFavorite(favId)}
            onClick={() =>
              toggle(favId, {
                id: favId,
                title,
                author,
                year,
                coverUrl,
                url: openUrl,
              })
            }
            className={`rounded-md border px-2 py-1 text-sm transition-colors ${
              isFavorite(favId)
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {isFavorite(favId) ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
      </div>
    </article>
  )
}
