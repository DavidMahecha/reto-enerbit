export interface Product {
  serial: string;
  connection_type: string;
  storage_system: string;
  condition: string;
  owner: string;
  location: string;
  manufacturer: string;
  purchase: string;
  i_max: number;
  i_b: number;
  i_n: number;
  seals: number;
  id: number;
  created_at: Date;
  updated_at?: Date;
}

type ProductForm = Omit<Product, "id" | "created_at" | "updated_at"> & {
  id?: Product["id"];
};

export interface ProductData {
  items: Product[];
  page: number;
  size: number;
  total: number;
  pages: number;
  next_page?: number;
  previous_page?: number;
}
