import { useState } from "react";
import { IAttribute } from "../../_Types";
import { cn } from "../../utils";
import { RootState, updateCartItemAttribute } from "../../store";
import { useDispatch, useSelector } from "react-redux";

export const OptionsRadio = ({
  items,
  name,
  type,
  variant = "small",
  productId,
  id: attributeId,
}: IAttribute & {
  variant: "small" | "large";
  productId: string;
}) => {
  const dispatch = useDispatch();
  const selectedItemFromCart = useSelector(
    (state: RootState) => state.cart.cart,
  )
    .find((item) => item.id === productId)
    ?.attributes?.find(
      (attr) => attr.attributeId === attributeId,
    )?.attributeItemId;
  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedItemFromCart || null,
  );

  const isVariantSmall = variant === "small";

  const textSizeClass = isVariantSmall ? "text-xs" : "text-lg";
  const swatchSizeClass = isVariantSmall ? "w-7 h-7" : "w-18 h-18";
  const cardGapClass = isVariantSmall ? "gap-1.5" : "gap-2.5";

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
              onClick={() => {
                setSelectedItem(item?.id);
                dispatch(
                  updateCartItemAttribute({
                    id: productId,
                    attribute: { attributeId, attributeItemId: item?.id },
                  }),
                );
              }}
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
                className={cn(swatchSizeClass, "border-4", {
                  "border-green-500 rounded-sm": selectedItem === item?.id,
                  "border-transparent": selectedItem !== item?.id,
                })}
                style={{ backgroundColor: item?.value }}
                onClick={() => {
                  setSelectedItem(item?.id);
                  dispatch(
                    updateCartItemAttribute({
                      id: productId,
                      attribute: { attributeId, attributeItemId: item?.id },
                    }),
                  );
                }}
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
