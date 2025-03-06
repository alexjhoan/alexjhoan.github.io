import { Box, Button, Container, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CountrySelect from '../../components/CountrySelect'
import CustomDialog from '../../components/CustomDialog'
import CustomInput from '../../components/CustomInput'
import { CustomSelect } from '../../components/CustomSelect'
import Tables, { TableHeadItem } from '../../components/Tables'
import { useSearcher } from '../../hooks/useSearcher'
import { useUsersActions, useUsersSelected } from '../../store/user'
import { UserDataTypes } from '../../types/types'
import { containerWidth, userFormInit } from '../../utils/const'

const tableHead = [
  {
    key: 'first_name',
    name: 'Nombre'
  },
  {
    key: 'email',
    name: 'Correo'
  },
  {
    key: 'phone',
    name: 'Telefóno'
  },
  {
    key: 'country',
    name: 'País'
  },
  {
    key: 'role',
    name: 'Role'
  }
]

const Users = () => {
  const users = useUsersSelected()
  const [tableData, setTableData] = useState<any>([])
  const { updateUsers } = useUsersActions()
  const [disabled, setDisabled] = useState(true)
  const [btnSort, setBtnSort] = useState<string>('')
  const [form, setForm] = useState<UserDataTypes>(userFormInit)
  const [edit, setEdit] = useState<boolean>(false)
  const [sortAsc, setSortAsc] = useState(true)
  const [dialogUser, setDialogUser] = useState<any>({ open: false, newUser: false, data: {} })
  const { inputSearch, getAllDataSearch, searchedData, InputSearcher } = useSearcher()

  useEffect(() => {
    let mount = true
    if (mount) {
      setTableData(users)
      getAllDataSearch(users)
    }
    return () => {
      mount = false
    }
  }, [users])

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

  const sortTable = async (allData: any, keyCol: string, order: boolean) => {
    setTableData([])
    setBtnSort(keyCol)
    const sortedData = await allData.sort((a: any, b: any) => {
      if (b[keyCol] < a[keyCol]) {
        return order ? 1 : -1
      }
      if (b[keyCol] > a[keyCol]) {
        return order ? -1 : 1
      }
      return 0
    })
    setSortAsc(order)
    setTableData(sortedData)
  }

  const showItem = (item: UserDataTypes) => {
    console.log(item)
    setDialogUser({ open: true, newUser: false, data: item })
    setForm(item)
  }

  const handleRegister = (event: any) => {
    event.preventDefault()
    if (dialogUser.newUser) {
      const oldUser = users.find((item) => item.email === form.email)
      if (oldUser) {
        enqueueSnackbar(`Este correo ya se encuentra registrado`, { variant: 'warning' })
      } else {
        enqueueSnackbar(`Usuario agreado exitosamente`, { variant: 'success' })
        updateUsers([...users, form])
        setTableData([...users, form])
      }
    } else {
      const updatedUsers = users.map((user) => (user.email === form.email ? form : user))
      console.log(updatedUsers)
      enqueueSnackbar(`Usuario editado exitosamente`, { variant: 'success' })
      updateUsers(updatedUsers)
      setTableData(updatedUsers)
    }
    setEdit(false)
    setDialogUser({ open: false, newUser: false, data: userFormInit })
    setForm(userFormInit)
  }

  const removeUser = () => {
    const updatedUsers = users.filter((item) => item.email !== dialogUser.data.email)
    updateUsers(updatedUsers)
    setTableData(updatedUsers)
    setDialogUser({ open: false, newUser: false, data: userFormInit })
  }

  return (
    <Container maxWidth={containerWidth}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDialogUser({ open: true, newUser: true, data: userFormInit })
            setEdit(true)
          }}
        >
          Agregar nuevo usuario
        </Button>
        {InputSearcher}
      </Stack>
      <Tables
        rowHead={tableHead.map((item, i) => (
          <TableHeadItem
            key={i}
            sx={{
              ml: i === 0 ? 0 : 'auto',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            name={item.name}
            arrowsHidden={item.key !== btnSort}
            modeSort={sortAsc}
            onClick={() => sortTable(users, item.key, btnSort === item.key ? !sortAsc : sortAsc)}
          />
        ))}
      >
        {(searchedData && inputSearch !== '' ? searchedData : tableData).map((row: UserDataTypes, i: number) => (
          <TableRow
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            onClick={() => showItem(row)}
          >
            <TableCell component="th" scope="row">
              {`${row.first_name} ${row.last_name}`}
            </TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right">{row.country}</TableCell>
            <TableCell align="right">{row.role}</TableCell>
          </TableRow>
        ))}
      </Tables>
      <CustomDialog
        fullMobile
        open={dialogUser.open}
        onClose={() => {
          setDialogUser({ open: false, newUser: false, data: userFormInit })
          setForm(userFormInit)
          setEdit(false)
        }}
      >
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Nombre:{' '}
          </Typography>
          {edit ? (
            <CustomInput onChange={handleChange} name="first_name" value={form.first_name} />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogUser.data?.first_name}
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
              {dialogUser.data?.last_name}
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
              {dialogUser.data?.email}
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
              {dialogUser.data?.phone}
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
              {dialogUser.data?.country}
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
              {dialogUser.data?.role}
            </Typography>
          )}
        </Box>
        <Box display={'flex'} gap={3}>
          {edit && (
            <Button variant="contained" color="primary" onClick={handleRegister} disabled={disabled}>
              Guardar
            </Button>
          )}
          {!dialogUser.newUser && (
            <>
              <Button variant="outlined" color="primary" onClick={() => setEdit(!edit)}>
                {edit ? 'Cancelar' : 'Editar Usuario'}
              </Button>
              <Button variant="outlined" color="primary" onClick={removeUser}>
                Eliminar Usuario
              </Button>
            </>
          )}
        </Box>
      </CustomDialog>
    </Container>
  )
}

export default Users
