import { useState, useEffect } from "react";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({ images = [], intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);
  // משתנה סטייט חדש שבודק האם העכבר נמצא כרגע מעל הקרוסלה
  const [isPaused, setIsPaused] = useState(false);

  // פונקציות להעברת תמונה באופן מעגלי
  const handleNext = () => {
    setSelected((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

  // טיימר להחלפה אוטומטית של התמונות
  useEffect(() => {
    // אם אין שניות, אין תמונות, או שהמשתמש משהה עם העכבר - לא מפעילים טיימר
    if (!intervalSeconds || images.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [selected, intervalSeconds, images.length, isPaused]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* הצגת התמונה הנבחרת בלבד */}
      {images.map((src, index) =>
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
        aria-label="תמונה קודמת"
      >
        &#8592;
      </button>

      {/* כפתור קדימה */}
      <button
        type="button"
        className="carousel-arrow next"
        onClick={handleNext}
        aria-label="תמונה הבאה"
      >
        &#8594;
      </button>

      {/* שורת נקודות הניווט */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === selected ? "active" : ""}`}
            onClick={() => setSelected(index)}
            aria-label={`עבור לתמונה ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}