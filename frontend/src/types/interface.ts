export interface IProductOnCartStats {
  isSelected: boolean;
  addToCartFn: () => void;
  removeFromCartFn: () => void;
}

// remove/ update this to new type from scandiweb schema docs
export interface IProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: boolean;
  currency: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
}

export interface ICategory {
  name: string;
  __typename: string;
}

export interface IAttribute {
  id: string;
  items: IAttributeItem[];
  name: string;
  type: string;
  __typename: string;
}

export interface IAttributeItem {
  id: string;
  displayValue: string;
  value: string;
  __typename: string;
}

export interface IPrice {
  amount: number;
  currency: {
    label: string;
    symbol: string;
    __typename: string;
  };
  __typename: string;
}

export interface IProduct {
  id: string;
  name: string;
  instock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: IAttribute[];
  prices: IPrice[];
  brand: string;
  __typename: string;
}

export interface IDataFetch {
  data: {
    categories: ICategory[];
    products: IProduct[];
  };
}
