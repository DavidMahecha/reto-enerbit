import type { Product, ProductData, ProductForm } from "@/types";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { deleteProduct, getProducts } from "@/services/product.service";
import { formatDate } from "@/utils";

import Button from "@/components/Button";
import FormControl from "@/components/FormControl";
import AdminLayout from "@/components/AdminLayout";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import FormProduct from "@/components/FormProduct";
import Modal from "@/components/Modal";

const HEADERS = [
  "Actions",
  "Serial",
  "Connection Type",
  "Storage System",
  "Condition",
  "Owner",
  "Location",
  "Manufacturer",
  "Purchase",
  "I_max",
  "I_b",
  "I_n",
  "Seals",
  "Created At",
];

export default function Dashboard() {
  const id = useId();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState({} as ProductData);
  const [pageActive, setPageActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductForm | null>(
    null
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPageActive(0);
    getProducts(0, event.target.value).then(setProducts);
  };

  const handlePage = (page: number) => {
    setPageActive(page - 1);
  };

  const handleSuccess = () => {
    setPageActive(0);
    getProducts().then(setProducts);

    if (isOpen) {
      setIsOpen(false);
      alert("Se ha creado el producto exitosamente");
      return;
    }

    setIsOpenEdit(false);
    alert("Se ha editado el producto exitosamente");
  };

  const handleEdit = (product: Product) => {
    var purchase = new Date(product.purchase);
    purchase.setMinutes(purchase.getMinutes() - purchase.getTimezoneOffset()); 

    setCurrentProduct({
      ...product,
      purchase: purchase.toISOString().slice(0,16)
    });
    setIsOpenEdit(true);
  };

  const confirmDelete = (product: Product) => {
    setCurrentProduct(product);
    setIsOpenDelete(true);
  };

  const handleDelete = async () => {
    if (currentProduct?.id) {
      await deleteProduct(currentProduct.id);
      setPageActive(0);
      getProducts().then(setProducts);
      setIsOpenDelete(false);
      alert("Se ha eliminado el producto exitosamente");
    }
  };

  useEffect(() => {
    getProducts(pageActive, search).then(setProducts);
  }, [pageActive]);

  const productsFormatted =
    products?.items?.length > 0
      ? products.items.map((product) => [
          <div className="space-x-2">
            <Button onClick={() => handleEdit(product)}>🖉</Button>
            <Button onClick={() => confirmDelete(product)} theme="error">
              🗑
            </Button>
          </div>,
          product.serial,
          product.connection_type,
          product.storage_system,
          product.condition,
          product.owner,
          product.location,
          product.manufacturer,
          formatDate(product.purchase),
          product.i_max,
          product.i_b,
          product.i_n,
          product.seals,
          formatDate(product.created_at)
        ])
      : [];

  const pages = Array(products?.pages || 0)
    .fill(null)
    .map((_, index) => index + 1);

  return (
    <AdminLayout>
      <Modal
        title="Add Product"
        isOpen={isOpen}
        handleToggle={() => {
          setIsOpen(!isOpen);
        }}
      >
        <FormProduct handleSuccess={handleSuccess} />
      </Modal>

      {currentProduct && (
        <>
          <Modal
            title="Edit Product"
            isOpen={isOpenEdit}
            handleToggle={() => {
              setIsOpenEdit(!isOpenEdit);
            }}
          >
            <FormProduct
              isCreate={false}
              initialValues={currentProduct}
              handleSuccess={handleSuccess}
            />
          </Modal>

          <Modal
            title="Are you sure to delete it?"
            isOpen={isOpenDelete}
            handleToggle={() => {
              setIsOpenDelete(!isOpenDelete);
            }}
          >
            <Button onClick={handleDelete} className="mr-2">
              Yes
            </Button>
            <Button onClick={() => setIsOpenDelete(false)} theme="error">
              No
            </Button>
          </Modal>
        </>
      )}

      <section className="px-1 md:px-3 lg:px-8 pt-14">
        <div className="flex flex-wrap justify-end gap-2 mb-8">
          <FormControl
            placeholder="Search"
            name="search"
            type="text"
            className="placeholder-slate-900"
            id={`search-${id}`}
            value={search}
            onChange={handleSearch}
          />
          <Button type="button" onClick={() => setIsOpen(true)}>
            Add Product
          </Button>
        </div>

        <Table headers={HEADERS} rows={productsFormatted} />

        <div className="mt-6 flex justify-center">
          <Pagination
            pages={pages}
            pageActive={pageActive + 1}
            setPageActive={handlePage}
          />
        </div>
      </section>
    </AdminLayout>
  );
}
