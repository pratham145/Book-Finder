"use client"

import { useEffect, useRef, useState } from "react"

export default function SearchBar({ onSearch, value: controlledValue }) {
  const [value, setValue] = useState("")
  const tRef = useRef(null)

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  useEffect(() => {
    if (tRef.current) clearTimeout(tRef.current)
    tRef.current = setTimeout(() => {
      onSearch?.(value.trim())
    }, 400)
    return () => clearTimeout(tRef.current)
  }, [value, onSearch])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (tRef.current) clearTimeout(tRef.current)
      onSearch?.(value.trim())
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
      <input
        aria-label="Search books"
        placeholder="Search books by title, author, subject, or ISBN..."
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <span className="text-sm text-muted-foreground">↵ to search</span>
    </div>
  )
}
