import { useState } from "react";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({ images = [], intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

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

      {/* כפתור אחורה (שמאלה) */}
      <button
        type="button"
        className="carousel-arrow prev"
        onClick={handlePrev}
        aria-label="תמונה קודמת"
        style={{ zIndex: 10, cursor: "pointer" }}
      >
        ❮
      </button>

      {/* כפתור קדימה (ימינה) */}
      <button
        type="button"
        className="carousel-arrow next"
        onClick={handleNext}
        aria-label="תמונה הבאה"
        style={{ zIndex: 10, cursor: "pointer" }}
      >
        ❯
      </button>

      {/* שורת נקודות הניווט */}
      <div className="carousel-dots" style={{ zIndex: 10 }}>
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