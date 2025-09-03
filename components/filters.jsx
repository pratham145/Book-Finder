"use client"

import { useState } from "react"

export default function Filters({ value, onChange }) {
  const [open, setOpen] = useState(true)

  const setField = (k, v) => {
    onChange?.({ ...value, [k]: v })
  }

  return (
    <div className="rounded-md border">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-3 py-2"
        aria-expanded={open}
      >
        <span className="font-medium">Filters</span>
        <span className="text-sm text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <div className="grid gap-3 border-t p-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g., The Hobbit"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="author">
              Author
            </label>
            <input
              id="author"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.author}
              onChange={(e) => setField("author", e.target.value)}
              placeholder="e.g., Ursula K. Le Guin"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.subject}
              onChange={(e) => setField("subject", e.target.value)}
              placeholder="e.g., Science Fiction"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="isbn">
              ISBN
            </label>
            <input
              id="isbn"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.isbn}
              onChange={(e) => setField("isbn", e.target.value)}
              placeholder="e.g., 9780140449198"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="yearFrom">
              Year From
            </label>
            <input
              id="yearFrom"
              type="number"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.yearFrom}
              onChange={(e) => setField("yearFrom", e.target.value)}
              placeholder="e.g., 1950"
              min="0"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground" htmlFor="yearTo">
              Year To
            </label>
            <input
              id="yearTo"
              type="number"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.yearTo}
              onChange={(e) => setField("yearTo", e.target.value)}
              placeholder="e.g., 2024"
              min="0"
            />
          </div>
          <div className="grid gap-1 md:col-span-2">
            <label className="text-sm text-muted-foreground" htmlFor="sortBy">
              Sort By
            </label>
            <select
              id="sortBy"
              className="rounded-md border bg-background px-2 py-1 outline-none"
              value={value.sortBy}
              onChange={(e) => setField("sortBy", e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="year-desc">Year (newest)</option>
              <option value="year-asc">Year (oldest)</option>
              <option value="editions-desc">Edition count</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
