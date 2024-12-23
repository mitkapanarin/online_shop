import { useEffect, useState } from "react";
import { containerSettings } from "../_Constants";
import { ImageGallery } from "../components/ImageGallery";
import { OptionsRadio } from "../components/Radio";
import { cn } from "../utils";
import { withDataAndState } from "./_Template";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export const ProductDetails = withDataAndState(
  ({ data, addToCartFn, state }) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const product = data?.data?.products?.find((p) => p.id === id);
    const currency = product?.prices?.find(
      (item) => item.currency.label === "USD",
    );

    const currencySymbol = currency?.currency.symbol;
    const productPrice = currency?.amount;

    const [selectedAttributes, setSelectedAttributes] = useState<
      Record<string, string>
    >({});

    const isInCart = state.cart.cart.some((item) => item.id === id);

    const handleAttributeChange = (
      attributeId: string,
      attributeItemId: string,
    ) => {
      setSelectedAttributes((prev) => ({
        ...prev,
        [attributeId]: attributeItemId,
      }));
    };

    const handleAddToCart = () => {
      addToCartFn({
        id: id!,
        quantity: 1,
        attributes: Object.entries(selectedAttributes).map(
          ([attributeId, attributeItemId]) => ({
            attributeId,
            attributeItemId,
          }),
        ),
      });
      // Reset selected attributes
      setSelectedAttributes({});
    };

    useEffect(() => {
      if (product) {
        setIsLoading(false);
      }
    }, [product]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

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
                onChange={(attributeItemId) =>
                  handleAttributeChange(item.id, attributeItemId)
                }
                selectedItemId={selectedAttributes[item.id]}
              />
            ))}
            <div className="text-lg font-bold my-4">
              <h6>Price:</h6>
              <h6>
                {currencySymbol} {productPrice}
              </h6>
            </div>
            <button
              className={`bg-emerald-400 text-white px-6 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                product?.instock !== false
                  ? "hover:bg-emerald-500"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
              disabled={product?.instock === false}
              data-testid="add-to-cart"
            >
              {product?.instock !== false
                ? isInCart
                  ? "Add Another to Cart"
                  : "Add to Cart"
                : "Out of Stock"}
            </button>
            {isInCart && product?.instock !== false && (
              <p className="text-emerald-600 mt-3">
                This product is already in your cart. You can add another one if
                you'd like.
              </p>
            )}
            {product?.instock === false && (
              <p className="text-red-600 mt-3">
                This product is currently out of stock.
              </p>
            )}
            {product?.description && (
              <div className="" data-testid="product-description">
                <div className="text-xl my-2 font-semibold">Description</div>
                {parse(product?.description || "")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
