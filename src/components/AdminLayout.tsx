import { FC, PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const authState = useSelector(selectAuthState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authState) {
      navigate('/')
    }
  }, [authState])

  return (
    <>
      <header>
        <nav className='border-b border-b-slate-900 shadow-xl min-h-[50px]'>
          <a className='block relative w-1/2 sm:w-1/6 lg:w-1/12 rounded-3xl' href='https://enerbit.co/' target='_blank' rel='noreferrer'>
            <Logo className='w-full' />
          </a>
        </nav>
      </header>

      {children}
    </>
  )
}

export default AdminLayout
