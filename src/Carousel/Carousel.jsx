import { useState, useEffect, Children } from "react";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({
  images = [],
  children,
  intervalSeconds = 3,
}) {
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // המרת הילדים (אם קיימים) למערך תקני בריאקט
  const childrenArray = Children.toArray(children);
  const hasChildren = childrenArray.length > 0;

  // חישוב כמות השקופיות הכוללת (לפי ילדים או לפי מערך תמונות)
  const totalSlides = hasChildren ? childrenArray.length : images.length;

  // פונקציות ניווט מעגליות לפי מספר השקופיות הכולל
  const handleNext = () => {
    if (totalSlides === 0) return;
    setSelected((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setSelected((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // טיימר להחלפה אוטומטית
  useEffect(() => {
    if (!intervalSeconds || totalSlides === 0 || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [selected, intervalSeconds, totalSlides, isPaused]);

  // אם אין תמונות ואין ילדים - מציגים הודעת ריקנות מתאימה לפי ה-CSS
  if (totalSlides === 0) {
    return (
      <div className="carousel-message">
        אין פריטים להצגה בקרוסלה
      </div>
    );
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* הצגת השקופית הנבחרת: ילדים או תמונות */}
      {hasChildren
        ? childrenArray.map((child, index) =>
            index === selected ? (
              <div key={index} className="carousel-item">
                {child}
              </div>
            ) : null
          )
        : images.map((src, index) =>
            index === selected ? (
              <CarouselItem
                key={index}
                src={src}
                alt={`תמונה ${index + 1}`}
              />
            ) : null
          )}

      {/* כפתור אחורה */}
      <button
        type="button"
        className="carousel-arrow prev"
        onClick={handlePrev}
        aria-label="שקופית קודמת"
      >
        &#8592;
      </button>

      {/* כפתור קדימה */}
      <button
        type="button"
        className="carousel-arrow next"
        onClick={handleNext}
        aria-label="שקופית הבאה"
      >
        &#8594;
      </button>

      {/* שורת פסי הניווט בתחתית */}
      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === selected ? "active" : ""}`}
            onClick={() => setSelected(index)}
            aria-label={`עבור לשקופית ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}