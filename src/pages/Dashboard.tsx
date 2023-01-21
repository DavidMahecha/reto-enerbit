import { ChangeEvent, useEffect, useId, useState } from 'react'
import Button from '@/components/Button'
import FormControl from '@/components/FormControl'
import AdminLayout from '@/components/AdminLayout'
import { getProducts } from '@/services/product.service'
import { ProductData } from '@/types'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import ModalAddProduct from '@/components/ModalAddProduct'
import "@/assets/styles.css";

const HEADERS = [
  'Serial',
  'Connection Type',
  'Storage System',
  'Condition',
  'Owner',
  'Location',
  'Manufacturer',
  'Purchase',
  'I_max',
  'I_b',
  'I_n',
  'Seals',
  'Created At'
]

export default function Dashboard () {
  const id = useId()
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState({} as ProductData)
  const [pageActive, setPageActive] = useState(0)
  let   [isOpen, setIsOpen] = useState(false) 

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handlePage = (page: number) => {
    setPageActive(page - 1)
  }


  function handleToggle() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getProducts(pageActive).then((data) => {
      setProducts(data)
    })
  }, [pageActive])

  const productsFormatted =
    products?.items?.length > 0 &&
    products.items.map((product) => [
      product.serial,
      product.connection_type,
      product.storage_system,
      product.condition,
      product.owner,
      product.location,
      product.manufacturer,
      product.purchase,
      product.i_max,
      product.i_b,
      product.i_n,
      product.seals,
      product.created_at
    ])

  const pages = Array(products?.pages || 0)
    .fill(null)
    .map((_, index) => index + 1) 

  return (
    <AdminLayout>
      <ModalAddProduct
        isOpen={isOpen}
        handleToggle={handleToggle}
        title='Error'
        description='openModal  credentials.'
        type='error'
      />

      {products?.items?.length > 0 && products.items.length > 0 && (
        <section className='px-28 pt-14'>
          <div className='flex justify-end gap-2 mb-8'>
            <FormControl
              placeholder='Search'
              name='search'
              type='text'
              className='placeholder-slate-900'
              id={`search-${id}`}
              value={search}
              onChange={handleSearch}
            />
            <Button
              type="button"
              onClick={handleToggle}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Agregar Producto
            </Button> 
          </div>

          {productsFormatted && (
            <Table headers={HEADERS} rows={productsFormatted} />
          )}

          <Pagination
            pages={pages}
            pageActive={pageActive + 1}
            setPageActive={handlePage}
          />
        </section>
      )}
    </AdminLayout>
  )
}
