import type { FC } from "react";
import type { ProductForm } from "@/types";
import { addProduct, editProduct } from "@/services/product.service";
import * as yup from "yup";
import { Formik } from "formik";
import FormControl from "./FormControl";
import FormControlSelect from "./FormControlSelect";
import Button from "./Button";

const INITIAL_VALUES = {
  serial: "",
  connection_type: "",
  storage_system: "",
  condition: "",
  owner: "",
  location: "",
  manufacturer: "",
  purchase: "",
  i_max: 0,
  i_b: 0,
  i_n: 0,
  seals: 0,
};

const validationSchema = yup.object().shape({
  serial: yup.string().required("Required"),
  connection_type: yup.string().required("Required"),
  storage_system: yup.string().required("Required"),
  condition: yup.string().required("Required"),
  owner: yup.string().required("Required"),
  location: yup.string().required("Required"),
  manufacturer: yup.string().required("Required"),
  purchase: yup.date().required("Required"),
  i_max: yup.number().required("Required"),
  i_b: yup.number().required("Required"),
  i_n: yup.number().required("Required"),
  seals: yup.number().required("Required"),
});

type Props = {
  initialValues?: ProductForm;
  isCreate?: boolean;
  handleSuccess: () => void;
};

const ModalAddProduct: FC<Props> = ({
  initialValues = INITIAL_VALUES,
  isCreate = true,
  handleSuccess,
}) => {
  const handleSubmit = async (form: ProductForm) => {
    const formFormatted = {
      ...form,
      purchase: new Date(form.purchase).toISOString(),
    };

    if (isCreate) {
      await addProduct(formFormatted);
    }

    if (!isCreate && formFormatted.id) {
      await editProduct(formFormatted.id, formFormatted);
    }

    handleSuccess();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <FormControl
                label="Serial"
                name="serial"
                id="serial"
                value={values.serial}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.serial && touched.serial
                    ? "border-2 border-red-500"
                    : ""
                }
              />
              {errors.serial && touched.serial && (
                <div className="mt-1 text-red-600">{errors.serial}</div>
              )}
            </div>

            <div>
              <FormControlSelect
                label="Connection Type"
                name="connection_type"
                id="connection_type"
                value={values.connection_type}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.connection_type && touched.connection_type
                    ? "border-2 border-red-500"
                    : ""
                }
                options={[
                  { value: "directa" },
                  { value: "indirecta" },
                  { value: "semi-directa" },
                ]}
              />
              {errors.connection_type && touched.connection_type && (
                <div className="mt-1 text-red-600">
                  {errors.connection_type}
                </div>
              )}
            </div>

            <div>
              <FormControlSelect
                label="Storage System"
                name="storage_system"
                id="storage_system"
                value={values.storage_system}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.storage_system && touched.storage_system
                    ? "border-2 border-red-500"
                    : ""
                }
                options={[{ value: "interno" }, { value: "externo" }]}
              />
              {errors.storage_system && touched.storage_system && (
                <div className="mt-1 text-red-600">{errors.storage_system}</div>
              )}
            </div>

            <div>
              <FormControlSelect
                label="Condition"
                name="condition"
                id="condition"
                value={values.condition}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.condition && touched.condition
                    ? "border-2 border-red-500"
                    : ""
                }
                options={[{ value: "nuevo" }, { value: "usado" }]}
              />
              {errors.condition && touched.condition && (
                <div className="mt-1 text-red-600">{errors.condition}</div>
              )}
            </div>

            <div>
              <FormControlSelect
                label="Owner"
                name="owner"
                id="owner"
                value={values.owner}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.owner && touched.owner ? "border-2 border-red-500" : ""
                }
                options={[{ value: "RF" }, { value: "OR" }]}
              />
              {errors.owner && touched.owner && (
                <div className="mt-1 text-red-600">{errors.owner}</div>
              )}
            </div>

            <div>
              <FormControl
                label="Location"
                name="location"
                id="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.location && touched.location
                    ? "border-2 border-red-500"
                    : ""
                }
              />
              {errors.location && touched.location && (
                <div className="mt-2 text-red-600">{errors.location}</div>
              )}
            </div>

            <div>
              <FormControlSelect
                label="Manufacturer"
                name="manufacturer"
                id="manufacturer"
                value={values.manufacturer}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.manufacturer && touched.manufacturer
                    ? "border-2 border-red-500"
                    : ""
                }
                options={[
                  { value: "yes", name: "Si" },
                  { value: "no", name: "No" },
                ]}
              />
              {errors.manufacturer && touched.manufacturer && (
                <div className="mt-1 text-red-600">{errors.manufacturer}</div>
              )}
            </div>

            <div>
              <FormControl
                label="Purchase date"
                type="datetime-local"
                name="purchase"
                id="purchase"
                value={values.purchase}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.purchase && touched.purchase
                    ? "border-2 border-red-500"
                    : ""
                }
              />
              {errors.purchase && touched.purchase && (
                <div className="mt-2 text-red-600">{errors.purchase}</div>
              )}
            </div>

            <div>
              <FormControl
                label="I Max"
                name="i_max"
                id="i_max"
                value={values.i_max}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.i_max && touched.i_max ? "border-2 border-red-500" : ""
                }
              />
              {errors.i_max && touched.i_max && (
                <div className="mt-2 text-red-600">{errors.i_max}</div>
              )}
            </div>

            <div>
              <FormControl
                label="I B"
                name="i_b"
                id="i_b"
                value={values.i_b}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.i_b && touched.i_b ? "border-2 border-red-500" : ""
                }
              />
              {errors.i_b && touched.i_b && (
                <div className="mt-2 text-red-600">{errors.i_b}</div>
              )}
            </div>

            <div>
              <FormControl
                label="I N"
                name="i_n"
                id="i_n"
                value={values.i_n}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.i_n && touched.i_n ? "border-2 border-red-500" : ""
                }
              />
              {errors.i_n && touched.i_n && (
                <div className="mt-2 text-red-600">{errors.i_n}</div>
              )}
            </div>

            <div>
              <FormControl
                label="Seals"
                name="seals"
                id="seals"
                value={values.seals}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.seals && touched.seals ? "border-2 border-red-500" : ""
                }
              />
              {errors.seals && touched.seals && (
                <div className="mt-2 text-red-600">{errors.seals}</div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              {isCreate ? "Create" : "Edit"} Product
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default ModalAddProduct;
