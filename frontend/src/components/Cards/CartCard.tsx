import { IProduct } from "../../_Types";
import { TextRadio } from "../Radio";
import { textLimiter } from "../Text";

interface ICartCardProps {
  quantity: number;
  incrementFn: () => void;
  decrementFn: () => void;
}

export const CartCard = ({
  name,
  quantity,
  incrementFn,
  decrementFn,
  gallery,
  prices,
  attributes,
}: ICartCardProps & IProduct) => {
  const UsdPricing = prices.find((price) => price.currency.label === "USD");

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {textLimiter({
              text: name,
              limit: 18,
            })}
          </h3>
          <p className="font-semibold">
            {UsdPricing?.currency?.symbol} {UsdPricing?.amount}
          </p>
          {attributes?.map((item, index) => (
            <TextRadio key={index} {...item} />
          ))}
        </div>
        <div>
          <img
            src={gallery[0] ?? "/no-image.png"}
            alt={`Image of ${name}`}
            className="object-cover h-[110px] w-[110px]"
          />
          <div className="flex justify-center items-end gap-3 my-2">
            <button
              data-testid="cart-item-amount-increase"
              className="border-2 border-slate-800 px-1"
              onClick={incrementFn}
            >
              +
            </button>
            <span>{quantity}</span>
            <button
              className="border-2 border-slate-800 px-1.5"
              data-testid="cart-item-amount-decrease"
              onClick={decrementFn}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
