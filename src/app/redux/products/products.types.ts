export interface product {
  _id: string;
  name: string;
  thumbnail: Array<string>;
  pictures: string;
  slag: string;
  price: number;
  quantity: number;
}

export interface productsArray extends Array<product> {
  _id: string;
  name: string;
  thumbnail: Array<string>;
  pictures: string;
  slag: string;
  price: number;
  quantity: number;
}

export interface response {
  isLoading: boolean;
  error: boolean;
  data: Array<productsArray> | any;
}
