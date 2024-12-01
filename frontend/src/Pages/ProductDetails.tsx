import { containerSettings } from "../_Constants";
import { ImageGallery } from "../components/ImageGallery";
import { OptionsRadio } from "../components/Radio";
import { cn } from "../utils";
import { withDataAndState } from "./_Template";
import { useParams } from "react-router-dom";

export const ProductDetails = withDataAndState(({ mockData }) => {
  const { id } = useParams();

  const product = mockData?.find((p) => p.id === id);
  const currency = product?.prices?.find(
    (item) => item.currency.label === "USD",
  );

  const currencySymbol = currency?.currency.symbol;
  const productPrice = currency?.amount;

  return (
    <div className={cn(containerSettings)}>
      <div className="grid grid-cols-2 gap-10">
        <ImageGallery gallery={product?.gallery || []} />
        <div className="">
          <h2 className="text-xl font-bold">{product?.name}</h2>
          {product?.attributes?.map((item, index) => (
            <OptionsRadio
              key={index}
              {...item}
              productId={id!}
              variant="large"
            />
          ))}
          <div className="text-lg font-bold my-4">
            <h6>Price:</h6>
            <h6>
              {currencySymbol} {productPrice}
            </h6>
          </div>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
});
