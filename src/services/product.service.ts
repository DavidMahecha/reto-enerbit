import type { ProductData, ProductForm } from "@/types";

const PER_PAGE = 5;
const API_URL = "https://ops.enerbit.dev/learning/api/v1";

export const getProducts = (
  page: number = 0,
  search: string = ""
): Promise<ProductData> => {
  return fetch(
    `${API_URL}/meters?page=${page}&size=${PER_PAGE}${
      search ? "&serial=" + search : ""
    }`
  ).then((res) => res.json());
};

export const addProduct = (values: ProductForm) => {
  return fetch(`${API_URL}/meters`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editProduct = (id: number, values: ProductForm) => {
  return fetch(`${API_URL}/meters/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteProduct = (id: number) => {
  return fetch(`${API_URL}/meters/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
