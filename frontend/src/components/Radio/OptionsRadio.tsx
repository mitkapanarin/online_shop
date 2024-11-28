import { useState } from "react";
import { IAttribute } from "../../_Types";

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

  if (type === "text") {
    return (
      <div className={textSizeClass}>
        <h3 className={`font-semibold my-2 text-slate-600 ${textSizeClass}`}>
          {name} :
        </h3>
        <div className="flex flex-wrap gap-2">
          {items?.map((item) => (
            <button
              key={item?.id}
              className={`px-3 py-1 border rounded-md ${textSizeClass} ${
                selectedItem === item?.id
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300 hover:border-gray-400"
              }`}
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
        <h3 className={`font-semibold my-2 text-slate-600 ${textSizeClass}`}>
          {name} :
        </h3>
        <div className="flex flex-wrap gap-2">
          {items?.map((item) => (
            <button
              key={item?.id}
              className={`${swatchSizeClass} border-2 ${
                selectedItem === item?.id
                  ? "border-green-500"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: item?.value }}
              onClick={() => setSelectedItem(item?.id)}
              title={item?.displayValue}
            >
              {selectedItem === item?.id && (
                <span
                  className={`text-white ${variant === "small" ? "text-xs" : "text-base"}`}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
