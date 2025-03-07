import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { CustomSelect } from '../components/CustomSelect'
import { useUserActions, useUsersActions, useUsersSelected } from '../store/user'
import { UserDataTypes } from '../types/types'
import CountrySelect from '../components/CountrySelect'
import { userFormInit } from '../utils/const'
import { useActionsOpenLogin } from '../store/dashboard'

/**
 *
 *
 * @param {{ setTypeForm: (type: number) => void }} param0
 * @param {(type: number) => void} param0.setTypeForm
 * @returns {void; }) => any}
 */
const Register = ({ setTypeForm }: { setTypeForm: (type: number) => void }) => {
  const [form, setForm] = useState<UserDataTypes>(userFormInit)
  const [disabled, setDisabled] = useState(true)
  const theme = useTheme()
  const users = useUsersSelected()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()
  const { updateLoginAnchor } = useActionsOpenLogin()

  useEffect(() => {
    let mount = true // Variable para controlar el montaje del componente

    if (mount) {
      // Verifica si algún valor del formulario está vacío
      const btnDisabled = Object.values(form).some((item: any) => item === '')
      setDisabled(btnDisabled) // Deshabilita o habilita el botón en consecuencia
    }

    return () => {
      // Limpia la variable cuando se desmonta el componente
      mount = false
    }
  }, [form]) // Dependencias: ejecuta este efecto cuando 'form' cambie

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
   * Maneja el registro de un nuevo usuario.
   * @param event - El evento que se activa al enviar el formulario de registro.
   */
  const handleRegister = (event: any) => {
    event.preventDefault() // Previene el comportamiento predeterminado del formulario

    // Verifica si ya existe un usuario con el correo ingresado
    const oldUser = users.find((item) => item.email === form.email)

    if (oldUser) {
      // Muestra una advertencia si el correo ya está registrado
      enqueueSnackbar(`Este correo ya se encuentra registrado`, { variant: 'warning' })
    } else {
      // Muestra un mensaje de éxito si el registro es exitoso
      enqueueSnackbar(`Registrado exitosamente`, { variant: 'success' })

      // Actualiza la lista de usuarios con el nuevo usuario
      updateUsers([...users, form])

      // Establece el nuevo usuario como el usuario actual
      updateUser(form)

      // Resetea el formulario o cambia el tipo de formulario
      setTypeForm(0)

      // Cierra el menú de inicio de sesión (si está abierto)
      updateLoginAnchor(null)
    }
  }

  return (
    <Box component={'form'} onSubmit={handleRegister}>
      <Typography marginBottom={'20px'} fontStyle={'normal'} textAlign={'center'} variant="h5" color="primary">
        Registro
      </Typography>
      <CustomInput required type="text" label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
      <CustomInput required type="text" label="Apellido" name="last_name" value={form.last_name} onChange={handleChange} />
      <CustomInput required type="email" label="Email" name="email" value={form.email} onChange={handleChange} />
      <CustomInput required type="text" label="Teléfono" name="phone" value={form.phone} onChange={handleChange} />
      <CustomInput required type="password" label="Contraseña" name="password" value={form.password} onChange={handleChange} />
      <CustomInput
        required
        type="password"
        label="Confirme la contraseña"
        name="confirm_password"
        value={form.confirm_password}
        onChange={handleChange}
        validation={[
          {
            validate: () => form.password === form.confirm_password,
            msg: 'Las contraseñas no concuerdan'
          }
        ]}
      />
      <CountrySelect
        label="País"
        name="country"
        value={form.country}
        onChange={(_event: any, newValue: any) => setForm({ ...form, country: newValue })}
      />
      <CustomInput
        sx={{ mt: -2 }}
        label="Direccion exacta"
        name="address"
        value={form.address}
        onChange={handleChange}
        fullWidth
      />
      <CustomSelect
        label={'Tipo de registro'}
        listItems={['Usuario', 'Administrador']}
        name={'role'}
        value={form.role}
        onChange={handleChange}
      />
      <Stack spacing={4} mt={1}>
        <Button type="submit" variant="contained" disabled={disabled}>
          Registrarse
        </Button>
      </Stack>
      <Button variant="text" sx={{ alignSelf: 'flex-start', mt: 4 }} onClick={() => setTypeForm(0)}>
        <Typography
          variant="body1"
          fontWeight={700}
          color={theme.palette.text.secondary}
          sx={{ textDecoration: 'none' }}
          align="left"
        >
          Iniciar sesión
        </Typography>
      </Button>
    </Box>
  )
}

export default Register
