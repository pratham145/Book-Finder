"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const items = [
  {
    title: "Search your way",
    desc: "Title, author, subject, or ISBN. Mix and match to narrow results fast.",
  },
  {
    title: "Powerful filters",
    desc: "Year range, sort order, and pagination for efficient browsing.",
  },
  {
    title: "Visual covers",
    desc: "See book covers instantly from Open Library for quick recognition.",
  },
  {
    title: "Save favorites",
    desc: "Keep a local list of books to revisit anytime.",
  },
]

export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const cards = ref.current.querySelectorAll("[data-feature-card]")
    cards.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.06,
        },
      )
    })
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section id="features" ref={ref} className="border-b">
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight">Built for discovery</h2>
          <p className="text-pretty mt-2 text-muted-foreground">
            A responsive interface with smooth motion, designed to help you find the right book with minimal effort.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} data-feature-card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
