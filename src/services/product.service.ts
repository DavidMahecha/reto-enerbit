import { ProductData } from '@/types'

const PER_PAGE = 5
const API_URL = "https://ops.enerbit.dev/learning/api/v1"

export const getProducts = (page: number = 0): Promise<ProductData> => {
  return fetch(`${API_URL}/meters?page=${page}&size=${PER_PAGE}`)
    .then(res => res.json())
}

export const addProducts = (values: any) => {
  return fetch(`${API_URL}/meters`, {method: 'POST', body: JSON.stringify(values),  headers: {
    'Content-Type': 'application/json' 
  }}).then(res => res.json())
}
