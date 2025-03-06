import { Box, Button, Container, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CountrySelect from '../../components/CountrySelect'
import CustomInput from '../../components/CustomInput'
import { CustomSelect } from '../../components/CustomSelect'
import { useUserActions, useUsersActions, useUserSelected, useUsersSelected } from '../../store/user'
import { UserDataTypes } from '../../types/types'
import { containerWidth, userFormInit } from '../../utils/const'

const Users = () => {
  const users = useUsersSelected()
  const user = useUserSelected()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()
  const [disabled, setDisabled] = useState(true)
  const [form, setForm] = useState<UserDataTypes>(userFormInit)
  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    let mount = true
    if (mount) {
      setForm(user)
    }
    return () => {
      mount = false
    }
  }, [user])

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
    const updatedUsers = users.map((user) => (user.email === form.email ? form : user))
    console.log(updatedUsers)
    enqueueSnackbar(`Usuario editado exitosamente`, { variant: 'success' })
    updateUsers(updatedUsers)
    setEdit(false)
    updateUser(form)
  }

  return (
    <Container maxWidth={containerWidth}>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Nombre:{' '}
        </Typography>
        {edit ? (
          <CustomInput onChange={handleChange} name="first_name" value={form.first_name} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.first_name}
          </Typography>
        )}
      </Box>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Apellido:{' '}
        </Typography>
        {edit ? (
          <CustomInput onChange={handleChange} name="last_name" value={form.last_name} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.last_name}
          </Typography>
        )}
      </Box>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Correo:{' '}
        </Typography>
        {edit ? (
          <CustomInput onChange={handleChange} name="email" value={form.email} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.email}
          </Typography>
        )}
      </Box>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Teléfono:{' '}
        </Typography>
        {edit ? (
          <CustomInput onChange={handleChange} name="phone" value={form.phone} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.phone}
          </Typography>
        )}
      </Box>
      {edit && (
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Contraseña:{' '}
          </Typography>
          <CustomInput type="password" onChange={handleChange} name="password" value={form.password} />
          <Typography variant="body1" color="initial" component={'span'}>
            Confirme la Contraseña:{' '}
          </Typography>
          <CustomInput
            required
            type="password"
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
        </Box>
      )}
      <Box mb={edit ? -2 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          País:{' '}
        </Typography>
        {edit ? (
          <CountrySelect
            label=""
            name="country"
            value={form.country}
            onChange={(_event: any, newValue: any) => setForm({ ...form, country: newValue })}
          />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.country}
          </Typography>
        )}
      </Box>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Dirección:{' '}
        </Typography>
        {edit ? (
          <CustomInput onChange={handleChange} name="address" value={form.address} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.address}
          </Typography>
        )}
      </Box>
      <Box mb={edit ? 0 : 1}>
        <Typography variant="body1" color="initial" component={'span'}>
          Role:{' '}
        </Typography>
        {edit ? (
          <CustomSelect listItems={['Usuario', 'Administrador']} name={'role'} value={form.role} onChange={handleChange} />
        ) : (
          <Typography variant="body1" color="initial" component={'span'}>
            {form?.role}
          </Typography>
        )}
      </Box>
      <Box display={'flex'} gap={3}>
        {edit && (
          <Button variant="contained" color="primary" onClick={handleRegister} disabled={disabled}>
            Guardar
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={() => setEdit(!edit)}>
          {edit ? 'Cancelar' : 'Editar'}
        </Button>
      </Box>
    </Container>
  )
}

export default Users
