import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { containerSettings } from "../_Constants";
import { ImageGallery } from "../components/ImageGallery";
import { OptionsRadio } from "../components/Radio";
import { cn } from "../utils";
import { withDataAndState } from "./_Template";

export const ProductDetails = withDataAndState(
  ({ data, addToCartFn, state }) => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAttributes, setSelectedAttributes] = useState<
      Record<string, string>
    >({});

    const product = useMemo(
      () => data?.data?.products?.find((p) => p.id === id),
      [data, id],
    );
    const currency = useMemo(
      () => product?.prices?.find((item) => item.currency.label === "USD"),
      [product],
    );

    const currencySymbol = currency?.currency.symbol;
    const productPrice = currency?.amount;
    const isInCart = state.cart.cart.some((item) => item.id === id);
    const isOutOfStock = product?.instock === false;

    useEffect(() => {
      if (product) {
        setIsLoading(false);
      }
    }, [product]);

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
      setSelectedAttributes({});
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!product) {
      return <div>Product not found</div>;
    }

    const isButtonDisabled = isLoading || isOutOfStock;

    return (
      <div className={cn(containerSettings)}>
        <div className="grid grid-cols-2 gap-10">
          <ImageGallery gallery={product.gallery || []} />
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            {product.attributes?.map((item, index) => (
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
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-emerald-500"
              }`}
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              data-testid="add-to-cart"
              data-loading={isLoading}
              data-outofstock={isOutOfStock}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isInCart
                  ? "Add Another to Cart"
                  : "Add to Cart"}
            </button>
            {isInCart && !isOutOfStock && (
              <p className="text-emerald-600 mt-3">
                This product is already in your cart. You can add another one if
                you'd like.
              </p>
            )}
            {isOutOfStock && (
              <p className="text-red-600 mt-3">
                This product is currently out of stock.
              </p>
            )}
            {product.description && (
              <div data-testid="product-description">
                <div className="text-xl my-2 font-semibold">Description</div>
                {parse(product.description)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
