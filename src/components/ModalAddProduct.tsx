import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik';
import * as yup from "yup";
import { addProducts } from '@/services/product.service';

const STYLES_BUTTON = {
  default:
    'bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500',
  error: 'bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500'
} as const

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  handleToggle: () => void;
  type?: 'default' | 'error';
};

const initialValues = { 
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
  seals : 0,
}

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
  seals : yup.number().required("Required"),
})

const ModalAddProduct: FC<Props> = ({ type = 'default', ...props }) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={props.handleToggle}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full text-md max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-3xl font-medium leading-6 text-gray-900'
                >
                  {props.title}
                </Dialog.Title>
                <div className='mt-2'>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={async values => {
                      console.log("enrooo")
                      await addProducts(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {props => {
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
                        <form onSubmit={handleSubmit}> 
                          <div>
                            <label>Serial</label>
                            <input
                              type="text"
                              id="serial"
                              name="serial"
                              value={values.serial}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.serial && touched.serial
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.serial && touched.serial && (
                              <div className="input-feedback">{errors.serial}</div>
                            )}
                          </div>
                          <div>
                            <label>Tipo conexión</label>
                            <select 
                              id="connection_type"
                              name="connection_type"
                              value={values.connection_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.connection_type && touched.connection_type
                                  ? "text-input error"
                                  : "text-input"
                              }>
                              <option value="">Seleccione</option>
                              <option value="directa">directa</option>
                              <option value="indirecta">indirecta</option>
                              <option value="semi-directa">semi-directa</option>
                            </select> 
                            {errors.connection_type && touched.connection_type && (
                              <div className="input-feedback">{errors.connection_type}</div>
                            )}
                          </div>
                          <div>
                            <label>Sistema de almacenamiento</label>
                            <select
                              id="storage_system"
                              name="storage_system"
                              value={values.storage_system}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.storage_system && touched.storage_system
                                  ? "text-input error"
                                  : "text-input"
                              }
                            >
                              <option value="">Seleccione</option>
                              <option value="interno">interno</option>
                              <option value="externo">externo</option>
                            </select>
                            {errors.storage_system && touched.storage_system && (
                              <div className="input-feedback">{errors.storage_system}</div>
                            )}
                          </div>
                          <div>
                            <label>Condición</label>
                            <select 
                              id="condition"
                              name="condition"
                              value={values.condition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.condition && touched.condition
                                  ? "text-input error"
                                  : "text-input"
                              }
                            >
                              <option value="">Seleccione</option>
                              <option>nuevo</option>
                              <option>usado</option>
                            </select>
                            {errors.condition && touched.condition && (
                              <div className="input-feedback">{errors.condition}</div>
                            )}
                          </div>
                          <div>
                            <label>Propietario</label>
                            <select 
                              id="owner"
                              name="owner"
                              value={values.owner}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.owner && touched.owner
                                  ? "text-input error"
                                  : "text-input"
                              }
                            >
                              <option value="RF">RF</option>
                              <option value="OR">OR</option>
                            </select>
                            {errors.owner && touched.owner && (
                              <div className="input-feedback">{errors.owner}</div>
                            )}
                          </div>
                          <div>
                            <label>Ubicación</label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.location && touched.location
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.location && touched.location && (
                              <div className="input-feedback">{errors.location}</div>
                            )}
                          </div>
                          <div>
                            <label>Manufactura</label>
                            <select 
                              id="manufacturer"
                              name="manufacturer"
                              value={values.manufacturer}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.manufacturer && touched.manufacturer
                                  ? "text-input error"
                                  : "text-input"
                              }
                            >
                              <option value="">Seleccione</option>
                              <option value="yes">Si</option>
                              <option value="no">No</option>
                            </select>
                            {errors.manufacturer && touched.manufacturer && (
                              <div className="input-feedback">{errors.manufacturer}</div>
                            )}
                          </div>
                          <div>
                            <label>Fecha compra</label>
                            <input
                              type="date"
                              id="purchase"
                              name="purchase"
                              value={values.purchase}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.purchase && touched.purchase
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.purchase && touched.purchase && (
                              <div className="input-feedback">{errors.purchase}</div>
                            )}
                          </div>
                          <div>
                            <label>i_max</label>
                            <input
                              type="text"
                              id="i_max"
                              name="i_max"
                              value={values.i_max}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.i_max && touched.i_max
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.i_max && touched.i_max && (
                              <div className="input-feedback">{errors.i_max}</div>
                            )}
                          </div>
                          <div>
                            <label>i_b</label>
                            <input
                              type="text"
                              id="i_b"
                              name="i_b"
                              value={values.i_b}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.i_b && touched.i_b
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.i_b && touched.i_b && (
                              <div className="input-feedback">{errors.i_b}</div>
                            )}
                          </div>
                          <div>
                            <label>i_n</label>
                            <input
                              type="text"
                              id="i_n"
                              name="i_n"
                              value={values.i_n}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.i_n && touched.i_n
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.i_n && touched.i_n && (
                              <div className="input-feedback">{errors.i_n}</div>
                            )}
                          </div>
                          <div>
                            <label>seals</label>
                            <input
                              type="text"
                              id="seals"
                              name="seals"
                              value={values.seals}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.seals && touched.seals
                                  ? "text-input error"
                                  : "text-input"
                              }
                            />
                            {errors.seals && touched.seals && (
                              <div className="input-feedback">{errors.seals}</div>
                            )}
                          </div>  
                          <button type="submit" disabled={isSubmitting}>
                            CREAR PRODUCTO
                          </button> 
                        </form>
                      );
                    }}
                  </Formik>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${STYLES_BUTTON[type]}`}
                    onClick={props.handleToggle}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalAddProduct
