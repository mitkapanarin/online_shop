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
    const [isOutOfStock, setIsOutOfStock] = useState(false);

    useEffect(() => {
      if (data?.data?.products) {
        setIsLoading(false);
        const foundProduct = data.data.products.find((p) => p.id === id);
        setIsOutOfStock(foundProduct?.instock === false);
      }
    }, [data, id]);

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
      if (product && !isOutOfStock) {
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
      }
    };

    return (
      <div className={cn(containerSettings)}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            {isLoading ? (
              <div>Loading image gallery...</div>
            ) : product ? (
              <ImageGallery gallery={product.gallery || []} />
            ) : (
              <div>Image gallery not available</div>
            )}
          </div>
          <div>
            {isLoading ? (
              <div>Loading product details...</div>
            ) : product ? (
              <>
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
              </>
            ) : (
              <div>Product not found</div>
            )}
            <button
              className={`text-white px-6 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                isOutOfStock
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-emerald-400 hover:bg-emerald-500"
              }`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              data-testid="add-to-cart"
            >
              {isOutOfStock
                ? "Out of Stock"
                : isInCart
                  ? "Add Another to Cart"
                  : "Add to Cart"}
            </button>
            {isInCart && !isOutOfStock && !isLoading && (
              <p className="text-emerald-600 mt-3">
                This product is already in your cart. You can add another one if
                you'd like.
              </p>
            )}
            {isOutOfStock && !isLoading && (
              <p className="text-red-600 mt-3">
                This product is currently out of stock.
              </p>
            )}
            {product?.description && !isLoading && (
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
