export type Product = {
  id: number;
  name: string;
  price: number;
  refurbished?: boolean;
};

export type ProductCatalog = {
  products: Product[];
};

export declare function getProductCatalog(): ProductCatalog;
