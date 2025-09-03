"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CTA() {
  return (
    <section id="get-started" className="py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border bg-card p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight">
                Ready to find your next read?
              </h2>
              <p className="text-pretty mt-2 text-muted-foreground">
                Start searching now and build your favorites list along the way.
              </p>
            </div>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#search"
              className={cn(
                "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                "bg-blue-600 text-white hover:bg-blue-700 transition-colors",
              )}
            >
              Try it now
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
