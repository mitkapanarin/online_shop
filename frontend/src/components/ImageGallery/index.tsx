import { useState } from "react";
import { IProduct } from "../../_Types";
import { cn } from "../../utils";

export const ImageGallery = ({ gallery }: Pick<IProduct, "gallery">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMainImageClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div className="flex gap-5">
      <div className="flex flex-col w-[260px] gap-2">
        {gallery.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={cn(
              "w-24 h-24 object-cover cursor-pointer transition-opacity duration-300",
              {
                "opacity-100": index === currentIndex,
                "opacity-60 hover:opacity-100": index !== currentIndex,
              },
            )}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      <div className="relative flex-grow">
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          👈
        </button>
        <img
          src={gallery[currentIndex]}
          alt={`Main ${currentIndex + 1}`}
          className={cn("w-full h-auto transition-transform duration-300", {
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.4] z-50 cursor-zoom-out":
              isEnlarged,
            "cursor-zoom-in": !isEnlarged,
          })}
          onClick={handleMainImageClick}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          👉
        </button>
      </div>
    </div>
  );
};
