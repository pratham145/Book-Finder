"use client"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} BookFinder. Built with Skiper UI patterns, Tailwind, and GSAP.</p>
          <nav className="flex items-center gap-4">
            <a
              href="https://openlibrary.org/developers/api"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Open Library API
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#search" className="hover:text-foreground transition-colors">
              Search
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
