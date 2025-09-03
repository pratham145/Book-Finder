"use client"

import { useCallback, useEffect, useState } from "react"

const KEY = "book_finder_favorites_v1"

// Module-scoped singleton state & pub/sub so all components stay in sync without a Provider
const state = {
  list: [],
}

const subscribers = new Set()

function notify() {
  for (const cb of subscribers) {
    try {
      cb(state.list)
    } catch {
      // no-op
    }
  }
}

function load() {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(KEY)
      if (raw) state.list = JSON.parse(raw)
    }
  } catch {
    // ignore
  }
}

function persist() {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(state.list))
    }
  } catch {
    // ignore
  }
}

function setList(updater) {
  const next = typeof updater === "function" ? updater(state.list) : updater
  state.list = next
  persist()
  notify()
}

// Initialize once on module load (client only)
if (typeof window !== "undefined") {
  load()
  // Optional: keep in sync across tabs
  try {
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) {
        load()
        notify()
      }
    })
  } catch {
    // ignore
  }
}

export function useFavorites() {
  const [list, setLocal] = useState(state.list)

  useEffect(() => {
    const cb = (nextList) => setLocal(nextList)
    subscribers.add(cb)
    // sync immediately in case another component updated before mount
    cb(state.list)
    return () => subscribers.delete(cb)
  }, [])

  const isFavorite = useCallback((id) => state.list.some((i) => i.id === id), [])

  const toggle = useCallback((id, item) => {
    setList((prev) => {
      if (prev.some((i) => i.id === id)) {
        return prev.filter((i) => i.id !== id)
      }
      return [{ ...item, id }, ...prev].slice(0, 200)
    })
  }, [])

  const remove = useCallback((id) => {
    setList((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setList([]), [])

  return { list, toggle, remove, isFavorite, clear }
}
