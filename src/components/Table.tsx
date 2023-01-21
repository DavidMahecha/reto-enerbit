import { FC } from 'react'

type Props = {
  headers: string[]
  rows: string[][]
}

const Table: FC<Props> = ({ headers, rows }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs uppercase bg-gray-700 text-white font-bold'>
          <tr>
            {headers.map(header => (
              <th key={header} className='px-6 py-3'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-slate-200'>
          {rows.map((row, indexRow) => (
            <tr key={indexRow} className='bg-gray-800 hover:bg-gray-600'>
              {row.map((cell, indexCell) => (
                <td
                  key={`${indexRow}-${indexCell}`}
                  className='px-6 py-4 font-medium whitespace-nowrap'
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
