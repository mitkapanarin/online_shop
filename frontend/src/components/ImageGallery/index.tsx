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
    <>
      {isEnlarged && (
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-75 z-40"
          onClick={handleMainImageClick}
        ></div>
      )}
      <div className="flex gap-5 relative" data-testid="product-gallery">
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
          <img
            src={gallery[currentIndex]}
            alt={`Main ${currentIndex + 1}`}
            className={cn("w-full h-auto transition-transform duration-300", {
              "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen w-auto z-50 cursor-zoom-out":
                isEnlarged,
              "cursor-zoom-in": !isEnlarged,
            })}
            onClick={handleMainImageClick}
          />
          <button
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full",
              {
                "left-2": !isEnlarged,
                "fixed left-4 z-50": isEnlarged,
              },
            )}
            onClick={handlePrev}
          >
            👈
          </button>
          <button
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full",
              {
                "right-2": !isEnlarged,
                "fixed right-4 z-50": isEnlarged,
              },
            )}
            onClick={handleNext}
          >
            👉
          </button>
        </div>
      </div>
    </>
  );
};
