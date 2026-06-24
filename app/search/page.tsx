'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { books, categories } from '@/lib/data/books'
import BookCard from '@/components/books/BookCard'

const difficulties = ['Beginner', 'Intermediate', 'Advanced']
const sortOptions = ['Rating', 'Title', 'Read Time']

export default function SearchPage() {
  const params = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(params.get('category') ?? '')
  const [difficulty, setDifficulty] = useState('')
  const [sort, setSort] = useState('Rating')
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const c = params.get('category')
    if (c) setCategory(c)
  }, [params])

  // Close suggestions on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search on / keydown (keyboard shortcut)
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 1) return []
    const q = query.toLowerCase()
    return books
      .filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      .slice(0, 5)
  }, [query])

  const filtered = useMemo(() => {
    let result = [...books]

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.tags.some(t => t.includes(q))
      )
    }

    if (category) result = result.filter(b => b.category === category)
    if (difficulty) result = result.filter(b => b.difficulty === difficulty)

    result.sort((a, b) => {
      if (sort === 'Rating') return b.rating - a.rating
      if (sort === 'Title') return a.title.localeCompare(b.title)
      if (sort === 'Read Time') return parseInt(a.readTime) - parseInt(b.readTime)
      return 0
    })

    return result
  }, [query, category, difficulty, sort])

  function clearFilters() {
    setQuery('')
    setCategory('')
    setDifficulty('')
    setSort('Rating')
  }

  const hasFilters = query || category || difficulty || sort !== 'Rating'

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Explore Books
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            {books.length} book summaries — find your next insight
          </p>
        </div>

        {/* Search bar with autocomplete */}
        <div ref={searchContainerRef} className="relative mb-6">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[8px] border"
            style={{ backgroundColor: 'var(--color-canvas)', borderColor: showSuggestions && suggestions.length ? 'var(--color-coral)' : 'var(--color-hairline)' }}
          >
            <Search size={18} style={{ color: 'var(--color-muted-soft)' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search books, authors, topics... (press / to focus)"
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowSuggestions(false) }} style={{ color: 'var(--color-muted-soft)' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 z-50 rounded-[8px] border shadow-lg mt-1 overflow-hidden"
                style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
              >
                {suggestions.map(book => (
                  <button
                    key={book.id}
                    onClick={() => { setQuery(book.title); setShowSuggestions(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-opacity-50"
                    style={{ borderBottom: '1px solid var(--color-hairline)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface-card)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span className="text-base">{book.coverGradient.includes('amber') || book.coverGradient.includes('orange') ? '📙' : book.coverGradient.includes('blue') ? '📘' : book.coverGradient.includes('green') ? '📗' : book.coverGradient.includes('violet') || book.coverGradient.includes('purple') ? '📓' : '📕'}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>{book.title}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--color-muted-soft)' }}>{book.author} · {book.category}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategory('')}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: !category ? 'var(--color-coral)' : 'var(--color-surface-card)',
              color: !category ? '#fff' : 'var(--color-body)',
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name === category ? '' : cat.name)}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: category === cat.name ? 'var(--color-coral)' : 'var(--color-surface-card)',
                color: category === cat.name ? '#fff' : 'var(--color-body)',
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border"
              style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs" style={{ color: 'var(--color-coral)' }}>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-8"
            >
              <div
                className="flex flex-wrap gap-6 p-5 rounded-[12px] border"
                style={{ backgroundColor: 'var(--color-surface-soft)', borderColor: 'var(--color-hairline)' }}
              >
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>Difficulty</p>
                  <div className="flex gap-2">
                    {difficulties.map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d === difficulty ? '' : d)}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: difficulty === d ? 'var(--color-coral)' : 'var(--color-canvas)',
                          color: difficulty === d ? '#fff' : 'var(--color-body)',
                          border: `1px solid ${difficulty === d ? 'transparent' : 'var(--color-hairline)'}`,
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>Sort by</p>
                  <div className="flex gap-2">
                    {sortOptions.map(s => (
                      <button
                        key={s}
                        onClick={() => setSort(s)}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: sort === s ? 'var(--color-coral)' : 'var(--color-canvas)',
                          color: sort === s ? '#fff' : 'var(--color-body)',
                          border: `1px solid ${sort === s ? 'transparent' : 'var(--color-hairline)'}`,
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted-soft)' }}>
          {filtered.length} book{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((book, i) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p
                className="text-5xl mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-muted-soft)' }}
              >
                No books found
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-muted-soft)' }}>
                Try a different search or filter
              </p>
              <button onClick={clearFilters} style={{ color: 'var(--color-coral)' }} className="text-sm font-medium">
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
