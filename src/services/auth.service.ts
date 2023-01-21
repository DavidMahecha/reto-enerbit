const CREDENTIAL = 'admin'

type LoginProps = {
    username: string,
    password: string
}

export const login = ({ username, password }: LoginProps) => {
  if (username === CREDENTIAL && password === CREDENTIAL) {
    return true
  }

  return false
}
