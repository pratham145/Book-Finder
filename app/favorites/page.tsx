"use client"

import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"

export default function FavoritesPage() {
  const { list, remove, clear } = useFavorites()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">My Favorites</h1>
        {list.length > 0 && (
          <button
            onClick={clear}
            className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Clear All
          </button>
        )}
      </header>

      {list.length === 0 ? (
        <div className="rounded-md border p-4 text-muted-foreground">
          No favorites yet. Go back to{" "}
          <Link href="/" className="underline hover:no-underline">
            search
          </Link>{" "}
          and add some!
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((b) => (
            <li key={b.id} className="rounded-md border p-3">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={b.coverUrl || "/placeholder.svg?height=400&width=300&query=book cover placeholder"}
                  alt={`Cover of ${b.title}`}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="mt-3">
                <h3 className="line-clamp-2 text-pretty text-base font-medium">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Year: {b.year || "—"}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border px-2 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View
                  </a>
                  <button
                    onClick={() => remove(b.id)}
                    className="rounded-md border px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
