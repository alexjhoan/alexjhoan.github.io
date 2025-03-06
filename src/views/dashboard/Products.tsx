import { Box, Button, Container, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CustomDialog from '../../components/CustomDialog'
import CustomInput from '../../components/CustomInput'
import Tables, { TableHeadItem } from '../../components/Tables'
import TypographyMoney from '../../components/TypografyMoney'
import { useSearcher } from '../../hooks/useSearcher'
import { useStoreActions, useStoreSelected } from '../../store/products'
import { StoreDataTypes } from '../../types/types'
import { containerWidth, productFormInit, userFormInit } from '../../utils/const'
import { CustomSelect } from '../../components/CustomSelect'

const tableHead = [
  {
    key: 'id',
    name: 'Id'
  },
  {
    key: 'name',
    name: 'Producto'
  },
  {
    key: 'category',
    name: 'Categoria'
  },
  {
    key: 'price',
    name: 'Precio'
  },
  {
    key: 'stock',
    name: 'Existencia'
  },
  {
    key: 'tax',
    name: 'Impuesto'
  }
]

const Products = () => {
  const data = useStoreSelected()
  const { updateData } = useStoreActions()
  const [tableData, setTableData] = useState<any>([])
  const [btnSort, setBtnSort] = useState<string>('')
  const [sortAsc, setSortAsc] = useState(true)
  const [dialogItem, setDialogItem] = useState<any>({ open: false, isNew: false, data: {} })
  const [disabled, setDisabled] = useState(true)
  const [form, setForm] = useState<StoreDataTypes>(productFormInit)
  const [edit, setEdit] = useState<boolean>(false)
  const { inputSearch, getAllDataSearch, searchedData, InputSearcher } = useSearcher()

  useEffect(() => {
    let mount = true
    if (mount) {
      setTableData(data)
      getAllDataSearch(data)
    }
    return () => {
      mount = false
    }
  }, [data])

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

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const showItem = (item: StoreDataTypes) => {
    console.log(item)
    setDialogItem({ open: true, isNew: false, data: item })
    setForm(item)
  }

  const handleRegister = (event: any) => {
    event.preventDefault()
    if (dialogItem.isNew) {
      enqueueSnackbar(`Producto agreado exitosamente`, { variant: 'success' })
      updateData([...data, { ...form, id: data.length + 1 }])
      setTableData([...data, { ...form, id: data.length + 1 }])
    } else {
      const updatedProducts = data.map((prod) => (prod.id === form.id ? form : prod))
      console.log(updatedProducts)
      enqueueSnackbar(`Producto editado exitosamente`, { variant: 'success' })
      updateData(updatedProducts)
      setTableData(updatedProducts)
    }
    setEdit(false)
    setDialogItem({ open: false, newUser: false, data: productFormInit })
    setForm(productFormInit)
  }

  const removeItem = () => {
    const updatedUsers = data.filter((item) => item.id !== dialogItem.data.id)
    updateData(updatedUsers)
    setTableData(updatedUsers)
    setDialogItem({ open: false, newUser: false, data: productFormInit })
  }

  return (
    <Container maxWidth={containerWidth}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDialogItem({ open: true, isNew: true, data: productFormInit })
            setEdit(true)
          }}
        >
          Agregar producto nuevo
        </Button>
        {InputSearcher}
      </Stack>
      {tableData.length > 0 ? (
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
              onClick={() => sortTable(data, item.key, btnSort === item.key ? !sortAsc : sortAsc)}
            />
          ))}
        >
          {(searchedData && inputSearch !== '' ? searchedData : tableData).map((row: StoreDataTypes, i: number) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => showItem(row)}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <TypographyMoney variant="body2" value={row.price} />{' '}
              </TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.tax * 100}%</TableCell>
            </TableRow>
          ))}
        </Tables>
      ) : (
        <Typography variant="h5" color="initial">
          No hay datos
        </Typography>
      )}
      <CustomDialog
        fullMobile
        open={dialogItem.open}
        onClose={() => {
          setDialogItem({ open: false, newUser: false, data: userFormInit })
          setForm(productFormInit)
          setEdit(false)
        }}
      >
        {!dialogItem.isNew && (
          <Box mb={edit ? 0 : 1}>
            <Typography variant="body1" color="initial" component={'span'}>
              ID:{' '}
            </Typography>
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.id}
            </Typography>
          </Box>
        )}
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Nombre:{' '}
          </Typography>
          {edit ? (
            <CustomInput onChange={handleChange} name="name" value={form.name} />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.name}
            </Typography>
          )}
        </Box>
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Categoria:{' '}
          </Typography>
          {edit ? (
            <CustomSelect
              name={'category'}
              listItems={['Frutas Frescas', 'Cítricos', 'Tropicales']}
              value={form.category}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.category}
            </Typography>
          )}
        </Box>
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Precio:{' '}
          </Typography>
          {edit ? (
            <CustomInput type="number" onChange={handleChange} name="price" value={form.price} />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.price}
            </Typography>
          )}
        </Box>
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Existencia:{' '}
          </Typography>
          {edit ? (
            <CustomInput type="number" onChange={handleChange} name="stock" value={form.stock} />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.stock}
            </Typography>
          )}
        </Box>
        <Box mb={edit ? 0 : 1}>
          <Typography variant="body1" color="initial" component={'span'}>
            Impuesto:{' '}
          </Typography>
          {edit ? (
            <CustomInput type="number" onChange={handleChange} name="tax" value={form.tax} />
          ) : (
            <Typography variant="body1" color="initial" component={'span'}>
              {dialogItem.data?.tax}
            </Typography>
          )}
        </Box>
        <Box display={'flex'} gap={3}>
          {edit && (
            <Button variant="contained" color="primary" onClick={handleRegister} disabled={disabled}>
              Guardar
            </Button>
          )}
          {!dialogItem.newUser && (
            <>
              <Button variant="outlined" color="primary" onClick={() => setEdit(!edit)}>
                {edit ? 'Cancelar' : 'Editar Producto'}
              </Button>
              <Button variant="outlined" color="primary" onClick={removeItem}>
                Eliminar Producto
              </Button>
            </>
          )}
        </Box>
      </CustomDialog>
    </Container>
  )
}

export default Products
