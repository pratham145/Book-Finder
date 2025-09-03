"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/use-favorites"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { list } = useFavorites()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="flex items-center gap-3"
          >
            <div className="h-7 w-7 rounded-md bg-blue-600" aria-hidden />
            <Link href="#" className="font-semibold tracking-tight">
              BookFinder
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#search" className="text-muted-foreground hover:text-foreground transition-colors">
              Search
            </Link>
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#get-started" className="text-muted-foreground hover:text-foreground transition-colors">
              Get Started
            </Link>
            <Link href="/favorites" className="relative rounded-md px-2 py-1 hover:bg-accent transition-colors">
              Favorites
              <span
                aria-label="favorites count"
                className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-medium text-white"
              >
                {list.length}
              </span>
            </Link>
          </nav>

          <button
            className={cn(
              "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border",
              "hover:bg-accent transition-colors",
            )}
            aria-label="Toggle Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open menu</span>
            <div className="h-4 w-4 grid grid-cols-2 gap-0.5">
              <i className="block h-1.5 w-1.5 rounded-sm bg-foreground" />
              <i className="block h-1.5 w-1.5 rounded-sm bg-foreground" />
              <i className="block h-1.5 w-1.5 rounded-sm bg-foreground" />
              <i className="block h-1.5 w-1.5 rounded-sm bg-foreground" />
            </div>
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 pb-4 pt-2 text-sm">
              <Link href="#search" className="px-1.5 py-2 rounded-md hover:bg-accent" onClick={() => setOpen(false)}>
                Search
              </Link>
              <Link href="#features" className="px-1.5 py-2 rounded-md hover:bg-accent" onClick={() => setOpen(false)}>
                Features
              </Link>
              <Link
                href="#get-started"
                className="px-1.5 py-2 rounded-md hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
              <Link href="/favorites" className="px-1.5 py-2 rounded-md hover:bg-accent" onClick={() => setOpen(false)}>
                Favorites ({list.length})
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
