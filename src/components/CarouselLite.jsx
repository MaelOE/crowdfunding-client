import { useEffect, useState } from "react";

export default function CarouselLite({
  images = [],
  autoPlay = true,
  interval = 5000,
  className = "",
  heightClass = "h-56 md:h-96", // default if not provided
}) {
  const [index, setIndex] = useState(0);
  const len = images.length;

  // Reset index when images change (prevents out-of-range index)
  useEffect(() => {
    if (index >= len) setIndex(0);
  }, [len]); // eslint-disable-line react-hooks/exhaustive-deps

  // Autoplay
  useEffect(() => {
    if (!len || !autoPlay) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % len), interval);
    return () => clearInterval(id);
  }, [len, autoPlay, interval]);

  if (!len) {
    return (
      <div
        className={`flex ${heightClass} items-center justify-center text-gray-400 font-semibold rounded-2xl border border-gray-200 bg-gray-50`}
      >
        No images
      </div>
    );
  }

  const goTo = (n) => setIndex(n);
  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Wrapper */}
      <div
        className={`relative ${heightClass} overflow-hidden rounded-2xl border border-gray-200 bg-gray-50`}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`${
              i === index ? "block" : "hidden"
            } duration-700 ease-in-out`}
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-3 left-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 text-white">
          ‹<span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 text-white">
          ›<span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
