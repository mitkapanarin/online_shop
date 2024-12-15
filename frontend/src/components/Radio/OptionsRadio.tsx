import React from "react";
import { cn } from "../../utils";
import { IAttribute } from "../../_Types";

interface OptionsRadioProps extends IAttribute {
  variant: "small" | "large";
  productId: string;
  onChange?: (attributeItemId: string) => void;
  selectedItemId?: string;
}

export const OptionsRadio: React.FC<OptionsRadioProps> = ({
  items,
  name,
  type,
  variant = "small",
  onChange,
  selectedItemId,
}) => {
  const isSmall = variant === "small";
  const sizeClass = isSmall ? "text-xs" : "text-lg";
  const gapClass = isSmall ? "gap-1.5" : "gap-2.5";

  const handleItemClick = (itemId: string) => {
    if (onChange) {
      onChange(itemId);
    }
  };

  const renderItems = () => {
    if (type === "text") {
      return items?.map((item) => (
        <button
          key={item?.id}
          className={cn("px-3 py-1 border rounded-md", sizeClass, {
            "border-green-500 bg-green-100": selectedItemId === item?.id,
            "border-gray-300 hover:border-gray-400":
              selectedItemId !== item?.id,
          })}
          onClick={() => item?.id && handleItemClick(item.id)}
        >
          {item?.displayValue}
        </button>
      ));
    }

    if (type === "swatch") {
      return items?.map((item) => (
        <button
          key={item?.id}
          className={cn(isSmall ? "w-7 h-7" : "w-18 h-18", "border-4", {
            "border-green-500 rounded-sm": selectedItemId === item?.id,
            "border-transparent": selectedItemId !== item?.id,
          })}
          style={{ backgroundColor: item?.value }}
          onClick={() => item?.id && handleItemClick(item.id)}
          title={item?.displayValue}
        >
          {selectedItemId === item?.id && (
            <span
              className={cn("text-white", isSmall ? "text-xs" : "text-base")}
            >
              ✓
            </span>
          )}
        </button>
      ));
    }

    return null;
  };

  return (
    <div className={sizeClass}>
      <h3 className={cn(`font-semibold my-2 text-slate-600`, sizeClass)}>
        {name} :
      </h3>
      <div className={cn("flex flex-wrap", gapClass)}>{renderItems()}</div>
    </div>
  );
};
