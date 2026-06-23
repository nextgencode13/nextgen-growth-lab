import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturedBooks from '@/components/home/FeaturedBooks'
import CategoriesSection from '@/components/home/CategoriesSection'
import QuoteCarousel from '@/components/home/QuoteCarousel'
import DailyWisdom from '@/components/home/DailyWisdom'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedBooks />
      <CategoriesSection />
      <QuoteCarousel />
      <DailyWisdom />
    </>
  )
}
