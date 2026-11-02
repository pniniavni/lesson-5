import Carousel from "./Carousel/Carousel";

const images = [
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='800' height='450' fill='%234f46e5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='white'>1</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='800' height='450' fill='%230284c7'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='white'>2</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='800' height='450' fill='%2310b981'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='white'>3</text></svg>",
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='800' height='450' fill='%23f59e0b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='white'>4</text></svg>",
];

function App() {
  return (
    <div>
      <Carousel images={images} intervalSeconds={3} />
    </div>
  );
}

export default App;