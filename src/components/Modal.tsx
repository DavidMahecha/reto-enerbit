import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

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

const Modal: FC<Props> = ({ type = 'default', ...props }) => {
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
                  <p className='text-gray-500'>{props.description}</p>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${STYLES_BUTTON[type]}`}
                    onClick={props.handleToggle}
                  >
                    Ok
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

export default Modal
