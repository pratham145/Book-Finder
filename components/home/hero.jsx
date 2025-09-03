"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-headline",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.06 },
      )
      gsap.fromTo(
        ".hero-cards > div",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2,
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b">
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="hero-headline text-balance text-3xl md:text-5xl font-semibold tracking-tight">
              Discover, filter, and save the books you love
            </h1>
            <p className="hero-headline text-pretty mt-4 text-muted-foreground max-w-prose">
              Search across millions of books by title, author, subject, or ISBN. Smooth browsing with live filters and
              a clean, fast interface.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#search"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                  "bg-blue-600 text-white hover:bg-blue-700 transition-colors",
                )}
              >
                Start Searching
              </a>
              <a
                href="#features"
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                  "border hover:bg-accent transition-colors",
                )}
              >
                See Features
              </a>
            </div>
          </div>

          <div className="hero-cards grid grid-cols-2 gap-3 md:gap-4">
            <div className="rounded-xl border p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick Search</p>
              <div className="rounded-lg bg-secondary p-4">
                <div className="h-2 w-2/3 rounded bg-blue-600" />
                <div className="h-2 w-1/2 rounded bg-blue-600/60 mt-2" />
                <div className="h-2 w-1/3 rounded bg-blue-600/40 mt-2" />
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Filters</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border p-3">
                  <div className="h-2 w-1/2 rounded bg-foreground/70" />
                  <div className="h-2 w-1/3 rounded bg-foreground/40 mt-2" />
                </div>
                <div className="rounded-lg border p-3">
                  <div className="h-2 w-3/4 rounded bg-foreground/70" />
                  <div className="h-2 w-2/5 rounded bg-foreground/40 mt-2" />
                </div>
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Favorites</p>
              <div className="rounded-lg border p-4">
                <div className="h-2 w-1/2 rounded bg-amber-500" />
                <div className="h-2 w-1/3 rounded bg-amber-500/60 mt-2" />
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Details</p>
              <div className="rounded-lg bg-secondary p-4">
                <div className="h-2 w-3/4 rounded bg-foreground/70" />
                <div className="h-2 w-1/2 rounded bg-foreground/40 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
