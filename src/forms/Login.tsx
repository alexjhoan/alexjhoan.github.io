import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import CustomInput, { isValidEmail } from '../components/CustomInput'
import { useUserActions, useUsersSelected } from '../store/user'
import { useViewsActions } from '../store/dashboard'

/**
 *
 *
 * @type {{ email: string; password: string; }}
 */
const loginFormInit = {
  email: '',
  password: ''
}

/**
 *
 *
 * @param {{
 *   setTypeForm: (type: number) => void
 *   setAnchorEl: (type: null | HTMLElement) => void
 * }} param0
 * @param {(type: number) => void} param0.setTypeForm
 * @param {(type: HTMLElement) => void} param0.setAnchorEl
 * @returns {void; setAnchorEl: (type: HTMLElement) => void; }) => any}
 */
const Login = ({
  setTypeForm,
  setAnchorEl
}: {
  setTypeForm: (type: number) => void
  setAnchorEl: (type: null | HTMLElement) => void
}) => {
  const [form, setForm] = useState(loginFormInit)
  const theme = useTheme()
  const users = useUsersSelected()
  const { updateUser } = useUserActions()
  const navigate = useNavigate()
  const { updateView } = useViewsActions()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = (event: any) => {
    event.preventDefault()
    console.log(users)
    const getUser = users.find((item) => item.email === form.email)
    if (getUser?.email === form.email) {
      if (getUser?.password === form.password) {
        enqueueSnackbar(`Bienvenido ${getUser.first_name} ${getUser.last_name}`, { variant: 'success' })
        if (getUser.role === 'Administrador') {
          updateView('')
          navigate('/dashboard')
        }
        setAnchorEl(null)
        updateUser(getUser)
      } else {
        enqueueSnackbar(`Contraseña invalida`, { variant: 'error' })
      }
    } else {
      enqueueSnackbar(`Correo no registrado`, { variant: 'error' })
    }
  }

  return (
    <Box component={'form'} onSubmit={handleLogin}>
      <Typography marginBottom={'20px'} fontStyle={'normal'} textAlign={'center'} variant="h5" color="primary">
        Iniciar sesión
      </Typography>
      <CustomInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        validation={[
          {
            validate: () => isValidEmail(form.email),
            msg: 'Correo invalido'
          }
        ]}
      />
      <CustomInput type="password" label="Password" name="password" value={form.password} onChange={handleChange} />
      <Stack spacing={4} mt={1}>
        <Button type="submit" variant="contained" disabled={!form.email || !form.password}>
          Iniciar sesión
        </Button>
        <Button variant="text" sx={{ alignSelf: 'flex-start' }} onClick={() => setTypeForm(2)}>
          <Typography
            variant="body1"
            fontWeight={700}
            color={theme.palette.text.secondary}
            sx={{ textDecoration: 'none' }}
            align="left"
          >
            Registrarse
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}

export default Login
