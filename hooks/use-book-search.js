"use client"

import useSWR from "swr"

const fetcher = async (url) => {
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

function buildUrl(params) {
  const base = "https://openlibrary.org/search.json"
  const usp = new URLSearchParams()

  // Prefer specific fields if present; otherwise fallback to generic q
  if (params?.title) usp.set("title", params.title)
  if (params?.author) usp.set("author", params.author)
  if (params?.subject) usp.set("subject", params.subject)
  if (params?.isbn) usp.set("isbn", params.isbn)

  const haveSpecific = Boolean(params?.title || params?.author || params?.subject || params?.isbn)

  if (!haveSpecific && params?.query) {
    usp.set("q", params.query)
  }

  // Year hint (non-strict): keep client-side filter for accuracy
  if (params?.yearFrom && params?.yearTo) {
    usp.set("published_in", `${params.yearFrom}-${params.yearTo}`)
  }

  // Pagination
  const page = params?.page || 1
  usp.set("page", String(page))

  return `${base}?${usp.toString()}`
}

export default function useBookSearch(params) {
  const url = buildUrl(params)
  const { data, error, isLoading } = useSWR(url, fetcher, { revalidateOnFocus: false })
  return {
    data,
    isLoading,
    isError: Boolean(error),
  }
}
