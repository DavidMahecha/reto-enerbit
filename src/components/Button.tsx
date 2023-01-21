import {
  FC,
  PropsWithChildren,
  ButtonHTMLAttributes,
  DetailedHTMLProps
} from 'react'

const STYLES_BUTTON = {
  default: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
  error: 'bg-red-600'
} as const

type Props = {
  theme?: 'default' | 'error';
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<PropsWithChildren<Props>> = ({
  theme = 'default',
  ...props
}) => {
  return (
    <button
      type='submit'
      {...props}
      className={`py-2 px-5 text-white rounded-md ${STYLES_BUTTON[theme]} ${props.className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
