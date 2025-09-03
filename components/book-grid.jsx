"use client"

import { useEffect, useMemo, useRef } from "react"
import useBookSearch from "@/hooks/use-book-search"
import BookCard from "./book-card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function BookGrid({ params, onPageChange }) {
  const { data, isLoading, isError } = useBookSearch(params)
  const items = data?.docs || []
  const numFound = data?.numFound || 0
  const page = params?.page || 1

  const filtered = useMemo(() => {
    const yFrom = params?.yearFrom ? Number(params.yearFrom) : undefined
    const yTo = params?.yearTo ? Number(params.yearTo) : undefined
    if (!yFrom && !yTo) return items
    return items.filter((b) => {
      const y = b?.first_publish_year
      if (!y) return false
      if (yFrom && y < yFrom) return false
      if (yTo && y > yTo) return false
      return true
    })
  }, [items, params?.yearFrom, params?.yearTo])

  // Client-side sort
  const sorted = useMemo(() => {
    const arr = [...filtered]
    switch (params?.sortBy) {
      case "year-desc":
        return arr.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
      case "year-asc":
        return arr.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0))
      case "editions-desc":
        return arr.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0))
      default:
        return arr
    }
  }, [filtered, params?.sortBy])

  const listRef = useRef(null)

  // Animate cards on data change / scroll into view
  useEffect(() => {
    if (!listRef.current) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".book-card")
      gsap.from(cards, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top bottom-=120",
        },
      })
    }, listRef)
    return () => ctx.revert()
  }, [sorted])

  return (
    <section aria-label="Search results" className="grid gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Searching..." : `Found ${numFound.toLocaleString()} results`}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1 || isLoading}
            aria-label="Previous page"
          >
            Prev
          </button>
          <span className="text-sm">Page {page}</span>
          <button
            className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={isLoading || (sorted.length === 0 && page > 1)}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>

      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Something went wrong fetching results. Please try again.
        </div>
      )}

      {!isLoading && !isError && sorted.length === 0 && (
        <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
          No results on this page with current filters.
        </div>
      )}

      <div ref={listRef} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((book) => (
              <BookCard key={`${book.key}-${book.cover_i || book.edition_key?.[0] || Math.random()}`} book={book} />
            ))}
      </div>
    </section>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-md border p-3">
      <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-muted" />
      <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
    </div>
  )
}
