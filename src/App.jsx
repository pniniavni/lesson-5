import Carousel from "./Carousel/Carousel";
import RecipesCarousel from "./RecipesCarousel/RecipesCarousel";

const images = [
  "https://placehold.co/800x450/4f46e5/ffffff?text=1",
  "https://placehold.co/800x450/0ea5e9/ffffff?text=2",
  "https://placehold.co/800x450/10b981/ffffff?text=3",
  "https://placehold.co/800x450/f59e0b/ffffff?text=4",
];

function App() {
  return (
    <div style={{ paddingBottom: "40px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginTop: "20px" }}>
        קרוסלת תמונות
      </h2>
      <Carousel images={images} intervalSeconds={3} />

      <h2 style={{ textAlign: "center", color: "#333", marginTop: "40px" }}>
        קרוסלת מתכונים מהשרת (RecipesCarousel)
      </h2>
      <RecipesCarousel />
    </div>
  );
}

export default App;