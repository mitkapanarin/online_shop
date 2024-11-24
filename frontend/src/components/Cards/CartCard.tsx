import { ProductCardProps } from "../../_Types";
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
}: ICartCardProps & ProductCardProps) => {
  const UsdPricing = prices.find((price) => price.currency.label === "USD");

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h3 className="details text-sm text-slate-600">
          {textLimiter({
            text: name,
            limit: 18,
          })}
        </h3>
        <p className="font-semibold">
          {UsdPricing?.currency?.symbol} {UsdPricing?.amount}
        </p>
        {/* <Variants
          attributes={this.props.attributes}
          className="scale-[0.8] transform"
        /> */}
        <div className="flex gap-6">
          <button data-testid="cart-item-amount-increase" onClick={incrementFn}>
            +
          </button>
          <span>{quantity}</span>
          <button data-testid="cart-item-amount-decrease" onClick={decrementFn}>
            -
          </button>
        </div>
      </div>
      <img
        src={gallery[0] ?? "/no-image.png"}
        alt={`Image of ${name}`}
        className="object-cover h-[110px] w-[110px]"
      />
    </div>
  );
};
