import { FC } from 'react'

type Props = {
  pages: number[];
  pageActive: number;
  setPageActive: (id: number) => void;
};

const Pagination: FC<Props> = ({ pages, pageActive, setPageActive }) => {
  const lastPage = pages.at(-1)

  return (
    <nav>
      <ul className='inline-flex items-center -space-x-px'>
        <li>
          <a
            onClick={() => setPageActive(pageActive - 1)}
            href='#'
            className={`block px-3 py-2 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${pageActive === 1 ? 'pointer-events-none' : ''}`}
          >
            <span className='sr-only'>Previous</span>
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </a>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <a
              onClick={() => setPageActive(page)}
              href='#'
              className={`px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${
                page === pageActive ? '!bg-gray-700 !text-white' : ''
              }`}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={() => setPageActive(pageActive + 1)}
            href='#'
            className={`block px-3 py-2 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${pageActive === lastPage ? 'pointer-events-none' : ''}`}
          >
            <span className='sr-only'>Next</span>
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clip-rule='evenodd'
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
