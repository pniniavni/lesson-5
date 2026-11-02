import "./Carousel.css";
import CarouselItem from "./CarouselItem";

export default function Carousel({ images = [], intervalSeconds = 3 }) {
  return (
    <div className="carousel">
      {images.map((src, index) => (
        <CarouselItem 
          key={index} 
          src={src} 
          alt={`תמונה ${index + 1}`} 
        />
      ))}
    </div>
  );
}