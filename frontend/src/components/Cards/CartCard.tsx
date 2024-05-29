import { Component } from "react";
import { IProductCardProps } from "../../types/interface";
import { textLimiter } from "../Text/textFn";

export class CartCard extends Component<
  IProductCardProps & {
    quantity: number;
  }
> {
  constructor(props: IProductCardProps & { quantity: number }) {
    super(props);
  }

  render() {
    const { id, image, name, price, quantity } = this.props;
    return (
      <div className="flex justify-between items-center">
        <div className="">
          <h3 className="details text-sm text-slate-600">
            {textLimiter(name, 18)}
          </h3>
          <p className="font-semibold">$ {price}</p>
          <div className="flex flex-col gap-1">
            <span>☑️☑️☑️☑️</span>
            <span>☑️☑️☑️☑️</span>
          </div>
          <div className="flex gap-6">
            <button onClick={() => console.log("incr", id)}>+</button>
            <span>{quantity}</span>
            <button onClick={() => console.log("decr", id)}>-</button>
          </div>
        </div>
        <img
          src={image}
          alt={`Image of ${name}`}
          className="object-cover h-[110px] w-[110px]"
        />
      </div>
    );
  }
}

export default CartCard;
