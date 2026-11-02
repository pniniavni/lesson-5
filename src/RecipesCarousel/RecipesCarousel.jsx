import { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";

export default function RecipesCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. יצירת בקר ביטול למקרה שהקומפוננטה תוסר מהמסך
    const controller = new AbortController();

    async function loadImages() {
      try {
        const url = "https://dummyjson.com/recipes?limit=6&select=name,image";
        const response = await fetch(url, { signal: controller.signal });

        // בדיקה שהתשובה מהשרת תקינה
        if (!response.ok) {
          throw new Error(`שגיאת שרת: ${response.status}`);
        }

        const data = await response.json();

        // חילוץ כתובות התמונות מתוך מערך המתכונים
        const imageUrls = data.recipes.map((recipe) => recipe.image);

        setImages(imageUrls);
        setLoading(false);
      } catch (err) {
        // אם מדובר בביטול יזום - לא רושמים שגיאה ולא מעדכנים
        if (err.name === "AbortError") return;

        setError(err.message);
        setLoading(false);
      }
    }

    loadImages();

    // 2. פונקציית ניקוי שמבטלת את הבקשה
    return () => controller.abort();
  }, []);

  // הצגת הודעת טעינה
  if (loading) {
    return <div className="carousel-message">טוען...</div>;
  }

  // הצגת הודעת שגיאה
  if (error) {
    return (
      <div className="carousel-message error">
        אירעה שגיאה בטעינת הנתונים: {error}
      </div>
    );
  }

  // הצגת הקרוסלה עם התמונות שהגיעו מהשרת
  return <Carousel images={images} intervalSeconds={4} />;
}