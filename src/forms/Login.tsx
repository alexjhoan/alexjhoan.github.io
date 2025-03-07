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

  /**
   * Maneja los cambios en los campos del formulario.
   * @param event - Evento que contiene el nuevo valor del campo del formulario.
   */
  const handleChange = (event: any) => {
    let { name, value } = event.target // Extrae el nombre y el valor del campo que cambió
    setForm({
      ...form, // Mantiene los valores actuales del formulario
      [name]: value // Actualiza el campo específico con su nuevo valor
    })
  }

  /**
   * Maneja el evento de inicio de sesión del usuario.
   * @param event - El evento que se activa al enviar el formulario.
   */

  const handleLogin = (event: any) => {
    // Previene el comportamiento predeterminado del formulario (ejemplo: recargar la página)
    event.preventDefault()

    // Muestra el estado actual de "users" en la consola para depuración
    console.log(users)

    // Busca un usuario cuyo correo coincida con el del formulario
    const getUser = users.find((item) => item.email === form.email)

    // Verifica si se encontró un usuario con ese correo
    if (getUser?.email === form.email) {
      // Comprueba si la contraseña ingresada coincide con la del usuario
      if (getUser?.password === form.password) {
        // Muestra un mensaje de bienvenida con el nombre del usuario
        enqueueSnackbar(`Bienvenido ${getUser.first_name} ${getUser.last_name}`, { variant: 'success' })

        // Si el usuario es administrador, lo redirige al panel de administración
        if (getUser.role === 'Administrador') {
          updateView('') // Actualiza la vista (función personalizada)
          navigate('/dashboard') // Navega a la ruta del panel de control
        }

        // Cierra un menú (si está abierto) y actualiza el estado del usuario actual
        setAnchorEl(null)
        updateUser(getUser)
      } else {
        // Muestra un mensaje de error si la contraseña es incorrecta
        enqueueSnackbar(`Contraseña invalida`, { variant: 'error' })
      }
    } else {
      // Muestra un mensaje de error si el correo no está registrado
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
