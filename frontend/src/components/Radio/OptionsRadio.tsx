import { useState } from "react";
import { IAttribute } from "../../_Types";
import { cn } from "../../utils";

export const OptionsRadio = ({
  items,
  name,
  type,
  variant = "small",
}: IAttribute & {
  variant: "small" | "large";
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const textSizeClass = variant === "small" ? "text-xs" : "text-lg";
  const swatchSizeClass = variant === "small" ? "w-7 h-7" : "w-18 h-18";
  const cardGapClass = variant === "small" ? "gap-1.5" : "gap-2.5";

  const isVariantSmall = variant === "small";

  if (type === "text") {
    return (
      <div className={textSizeClass}>
        <h3 className={cn(`font-semibold my-2 text-slate-600`, textSizeClass)}>
          {name} :
        </h3>
        <div className={cn("flex flex-wrap", cardGapClass)}>
          {items?.map((item) => (
            <button
              key={item?.id}
              className={cn("px-3 py-1 border rounded-md", textSizeClass, {
                "border-green-500 bg-green-100": selectedItem === item?.id,
                "border-gray-300 hover:border-gray-400":
                  selectedItem !== item?.id,
              })}
              onClick={() => setSelectedItem(item?.id)}
            >
              {item?.displayValue}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (type === "swatch") {
    return (
      <div className={textSizeClass}>
        <h3 className={cn(`font-semibold my-2 text-slate-600`, textSizeClass)}>
          {name} :
        </h3>
        <div className={cn("flex flex-wrap", cardGapClass)}>
          {items?.map((item) => (
            <>
              <button
                key={item?.id}
                className={cn(swatchSizeClass, "border-2", {
                  "border-green-500": selectedItem === item?.id,
                  "border-transparent": selectedItem !== item?.id,
                })}
                style={{ backgroundColor: item?.value }}
                onClick={() => setSelectedItem(item?.id)}
                title={item?.displayValue}
              >
                {selectedItem === item?.id && (
                  <span
                    className={cn("text-white", {
                      "text-xs": isVariantSmall,
                      "text-base": !isVariantSmall,
                    })}
                  >
                    ✓
                  </span>
                )}
              </button>
            </>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
