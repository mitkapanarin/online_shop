export interface IProductOnCartStats {
  isSelected: boolean;
  addToCartFn: () => void;
  removeFromCartFn: () => void;
}

export interface IProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
}
