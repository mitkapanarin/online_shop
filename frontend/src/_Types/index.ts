export interface ICartItem {
  id: string;
  quantity: number;
  attributes?: {
    [key: string]: string;
  };
}
