import { ChangeEvent, FormEvent, useId, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '@/services/auth.service'
import { setAuthState } from '@/store/slices/authSlice'

import Button from '@/components/Button'
import FormControl from '@/components/FormControl'
import Modal from '@/components/Modal'

export default function Home () {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [faildedLogin, setFaildedLogin] = useState(false)
  const id = useId()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isLoginSuccess = login(form)

    if (isLoginSuccess) {
      dispatch(setAuthState(true))
      navigate('/dashboard')
      return
    }

    handleToggleModal()
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const handleToggleModal = () => {
    setFaildedLogin(!faildedLogin)
  }

  return (
    <>
      <Modal
        isOpen={faildedLogin}
        handleToggle={handleToggleModal}
        title='Error'
      >
        Incorrect credentials.
      </Modal>

      <section className='flex justify-center items-center min-h-screen'>
        <div className='bg-slate-900 shadow-md p-7 rounded-md max-w-full'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-2xl mb-5 text-center font-bold'>Login</h1>

            <FormControl
              label='Username'
              name='username'
              type='text'
              className='mb-4'
              id={`username-${id}`}
              value={form.username}
              onChange={handleChange}
            />

            <FormControl
              label='Password'
              name='password'
              type='password'
              className='mb-4'
              id={`password-${id}`}
              value={form.password}
              onChange={handleChange}
            />

            <Button className='block w-full mt-8'>Login</Button>
          </form>
        </div>
      </section>
    </>
  )
}
