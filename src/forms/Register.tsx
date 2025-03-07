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
    let mount = true
    if (mount) {
      const btnDisabled = Object.values(form).some((item: any) => item === '')
      setDisabled(btnDisabled)
    }
    return () => {
      mount = false
    }
  }, [form])

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleRegister = (event: any) => {
    event.preventDefault()
    const oldUser = users.find((item) => item.email === form.email)
    if (oldUser) {
      enqueueSnackbar(`Este correo ya se encuentra registrado`, { variant: 'warning' })
    } else {
      enqueueSnackbar(`Registrado exitosamente`, { variant: 'success' })
      updateUsers([...users, form])
      updateUser(form)
      setTypeForm(0)
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
