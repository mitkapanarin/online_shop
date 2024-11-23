import { useGetAllProductsQuery } from "../store";

export const Home = () => {
  const { data } = useGetAllProductsQuery();
  console.log(data);
  return <div>Home Page</div>;
};
