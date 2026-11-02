import { useState } from "react";
import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({ images = [], intervalSeconds = 3 }) {
  // משתנה סטייט לשמירת האינדקס של התמונה המוצגת (מתחיל מ-0)
  const [selected, setSelected] = useState(0);

  return (
    <div className="carousel">
      {images.map((src, index) =>
        index === selected ? (
          <CarouselItem
            key={index}
            src={src}
            alt={`תמונה ${index + 1}`}
          />
        ) : null
      )}
    </div>
  );
}