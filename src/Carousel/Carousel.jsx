import { useState, useEffect } from "react";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({ images = [], intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);

  // פונקציות להעברת תמונה
  const handleNext = () => {
    setSelected((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

  // טיימר להחלפה אוטומטית של התמונות
  useEffect(() => {
    // אם אין שניות מוגדרות או שאין תמונות - אין צורך בטיימר
    if (!intervalSeconds || images.length === 0) return;

    // הפעלת שעון שקופץ כל X שניות לתמונה הבאה
    const timer = setInterval(() => {
      handleNext();
    }, intervalSeconds * 1000);

    // ניקוי השעון בעת עדכון או פירוק הרכיב כדי למנוע כפילויות
    return () => clearInterval(timer);
  }, [selected, intervalSeconds, images.length]);

  return (
    <div className="carousel">
      {/* הצגת התמונה הנבחרת */}
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