interface IAppState {
  catalog: IProductItem[];
  preview: string;
  basket: string[];
  order: IOrder;
  loading: boolean;
}

interface IProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}

interface IProductsList {
  products: IProductItem[];
}

interface IOrder {
  items: string[];
  payment: string;
  email: string;
  phone: string;
  address: string;
}