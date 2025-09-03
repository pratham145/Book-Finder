import BookFinder from "@/components/book-finder"
import Navbar from "@/components/home/navbar"
import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import CTA from "@/components/home/cta"
import Footer from "@/components/home/footer"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      {/* Search section anchor for CTA jump */}
      <section id="search" className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight mb-6">Find your next book</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Search by title, author, subject, or ISBN. Filter by year, sort, and save favorites.
          </p>
          <div className="rounded-xl border bg-card">
            <BookFinder />
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  )
}
