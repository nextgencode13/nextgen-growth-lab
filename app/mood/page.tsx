import type { Metadata } from 'next'
import MoodFinder from '@/components/MoodFinder'

export const metadata: Metadata = {
  title: 'Book Mood Finder',
  description: 'Answer one question and get book recommendations that match exactly how you feel right now.',
}

export default function MoodPage() {
  return <MoodFinder />
}
