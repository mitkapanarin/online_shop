import { useState } from "react";
import { IAttribute } from "../../_Types";

export const TextRadio = ({ items, name, type }: IAttribute) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (type === "text") {
    return (
      <div className="text-xs">
        <h3 className="font-semibold my-2 text-slate-600">{name} :</h3>
        <div className="flex flex-wrap gap-2">
          {items?.map((item) => (
            <button
              key={item?.id}
              className={`px-3 py-1 border rounded-md ${
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
  }

  return <div>color swatch</div>;
};
