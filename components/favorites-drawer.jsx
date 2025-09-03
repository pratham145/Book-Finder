"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { useState } from "react"

export default function FavoritesDrawer() {
  const { list, remove } = useFavorites()
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-md border p-3 md:sticky md:top-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Favorites</h3>
        <button
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          onClick={() => setOpen((p) => !p)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open && (
        <ul className="mt-3 grid max-h-72 gap-2 overflow-auto pr-1">
          {list.length === 0 && <li className="text-sm text-muted-foreground">No favorites yet.</li>}
          {list.map((f) => (
            <li key={f.id} className="flex items-center gap-2 rounded-md border p-2">
              <img
                src={f.coverUrl || "/placeholder.svg?height=120&width=90&query=book cover placeholder"}
                alt=""
                className="h-12 w-9 shrink-0 rounded object-cover"
                crossOrigin="anonymous"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{f.title}</p>
                <p className="truncate text-xs text-muted-foreground">{f.author}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary underline underline-offset-4"
                >
                  Open
                </a>
                <button
                  className="text-xs text-destructive underline underline-offset-4"
                  onClick={() => remove(f.id)}
                  aria-label={`Remove ${f.title} from favorites`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
