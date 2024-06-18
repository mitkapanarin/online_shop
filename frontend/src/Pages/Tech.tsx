import { RootState } from "../store";
import { PageTemplate } from "./Template/PageTemplate";
import { templateReduxConnector } from "./Template/PageTemplate";

// only fetch the tech and not the clothes
const techQuery =
  "{ categories { id name __typename } products { id name instock gallery prices { amount __typename currency { label symbol __typename } } description brand __typename } }";

const Tech = (props: {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
}) => <PageTemplate {...props} query={techQuery} title="Tech Section" />;

export default templateReduxConnector(Tech);
