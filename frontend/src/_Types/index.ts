export interface ICartItem {
  id: string;
  quantity: number;
  attributes?: {
    [key: string]: string;
  };
}

export interface IProductOnCartStats {
  isSelected: boolean;
  addToCartFn: () => void;
  removeFromCartFn: () => void;
}

export interface ICartItem {
  id: string;
  quantity: number;
  attributes?: {
    [key: string]: string;
  };
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
  __typename: string;
  currency: {
    label: string;
    symbol: string;
    __typename: string;
  };
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

export interface ProductCardProps extends IProduct {
  addToCartFn: (item: ICartItem) => void;
  removeFromCartFn: (item: ICartItem) => void;
}
