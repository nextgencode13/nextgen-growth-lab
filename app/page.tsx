import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturedBooks from '@/components/home/FeaturedBooks'
import CategoriesSection from '@/components/home/CategoriesSection'
import QuoteCarousel from '@/components/home/QuoteCarousel'
import DailyWisdom from '@/components/home/DailyWisdom'
import TrendingBooks from '@/components/home/TrendingBooks'
import BookOfTheDay from '@/components/home/BookOfTheDay'
import BookShelf from '@/components/home/BookShelf'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedBooks />
      <BookOfTheDay />
      <TrendingBooks />
      <CategoriesSection />
      <QuoteCarousel />
      <DailyWisdom />
      <BookShelf />
    </>
  )
}
