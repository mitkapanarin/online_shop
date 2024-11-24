import { useDataHOC } from "../../Pages/_Template";

export const CartModal = useDataHOC(({ isError, isLoading }) => {
  if (isLoading) {
    return <h3>Cart Data Loading...</h3>;
  }

  if (isError) {
    return <h3>Error fetching cart data</h3>;
  }

  return <div>CartModal</div>;
});
