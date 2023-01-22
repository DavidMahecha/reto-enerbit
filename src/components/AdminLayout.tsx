import { FC, PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, setAuthState } from '@/store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import logo from '@/assets/logo.svg'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const authState = useSelector(selectAuthState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCloseSession = () => {
    dispatch(setAuthState(false));
    navigate("/")
  }

  useEffect(() => {
    if (!authState) {
      navigate('/')
    }
  }, [authState])

  return (
    <>
      <header>
        <nav className='flex items-center justify-between border-b border-b-slate-900 shadow-xl min-h-[50px]'>
          <a className='max-w-[150px]' href='https://enerbit.co/' target='_blank' rel='noreferrer'>
            <img src={logo} alt="logo" />
          </a>

          <Button
              type="button"
              onClick={handleCloseSession}
              className="mr-1 md:mr-5"
            >
              Close session
            </Button>
        </nav>
      </header>

      {children}
    </>
  )
}

export default AdminLayout
