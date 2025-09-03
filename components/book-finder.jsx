"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SearchBar from "./search-bar"
import BookGrid from "./book-grid" // Import BookGrid component

gsap.registerPlugin(ScrollTrigger)

export default function BookFinder() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    subject: "",
    isbn: "",
    yearFrom: "",
    yearTo: "",
    sortBy: "relevance", // relevance | year-desc | year-asc | editions-desc
  })
  const [page, setPage] = useState(1)
  const heroRef = useRef(null)
  // const pinRef = useRef(null) // removed pin ref since Filters section is gone

  // Reset page when filters or query change
  useEffect(() => {
    setPage(1)
  }, [query, filters])

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(".hero-title", { y: 24, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(".hero-sub", { y: 18, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleQuickSearch = (text, type) => {
    setQuery(text)
    setFilters((f) => {
      const base = {
        ...f,
        title: "",
        author: "",
        subject: "",
        isbn: "",
      }
      if (type === "title") base.title = text
      else if (type === "author") base.author = text
      else if (type === "subject") base.subject = text
      else if (type === "isbn") base.isbn = text
      return base
    })
  }

  const handleManualSearch = (text) => {
    setQuery(text)
    setFilters((f) => ({
      ...f,
      title: "",
      author: "",
      subject: "",
      isbn: "",
    }))
  }

  const onFiltersChange = (next) => {
    setFilters(next)
  }

  const queryParams = useMemo(
    () => ({
      page,
      query,
      ...filters,
    }),
    [page, query, filters],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <section ref={heroRef} className="mb-8 md:mb-12">
        <div className="mb-4 md:mb-6">
          <h1 className="hero-title text-pretty text-3xl font-semibold tracking-tight md:text-5xl">
            Find your next favorite book
          </h1>
          <p className="hero-sub mt-2 max-w-prose leading-relaxed text-muted-foreground">
            Search by title, author, subject, or ISBN. Save favorites to revisit later.
          </p>
        </div>

        <div className="hero-cta">
          <SearchBar value={query} onSearch={handleManualSearch} />
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Try:</span>
            {[
              { label: "Dune", type: "title" },
              { label: "Agatha Christie", type: "author" },
              { label: "Artificial Intelligence", type: "subject" },
              { label: "9780140449198", type: "isbn" },
            ].map((s) => (
              <button
                key={`${s.type}-${s.label}`}
                className="rounded-full border px-3 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleQuickSearch(s.label, s.type)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <BookGrid params={queryParams} onPageChange={setPage} />
    </div>
  )
}
