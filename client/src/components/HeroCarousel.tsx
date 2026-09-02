import { useState } from 'react'
import styles from './HeroCarousel.module.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export type HeroSlide = {
  id: number
  title: string
  description: string
  image: string
  alt: string
}

type Props = {
  slides: HeroSlide[]
}

function HeroCarousel({ slides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (slides.length === 0) {
    return null
  }

  const safeSlideIndex = currentSlide % slides.length
  const slide = slides[safeSlideIndex]

  const showPreviousSlide = () => {
    setCurrentSlide(current => (current === 0 ? slides.length - 1 : current - 1))
  }

  const showNextSlide = () => {
    setCurrentSlide(current => (current + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className={styles.hero} aria-label="Featured information">
      <img src={slide.image} alt={slide.alt} className={styles.heroImage} />

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
            onClick={showPreviousSlide}
            aria-label="Previous slide"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className={`${styles.heroArrow} ${styles.heroArrowRight}`}
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <FiChevronRight />
          </button>

          <div className={styles.heroDots} aria-label="Choose featured slide">
            {slides.map((heroSlide, index) => (
              <button
                key={heroSlide.id}
                type="button"
                className={`${styles.heroDot} ${
                  safeSlideIndex === index ? styles.heroDotActive : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={safeSlideIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroCarousel
