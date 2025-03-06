import { Container, TableCell, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomDialog from '../../components/CustomDialog'
import InvoicingDetail from '../../components/InvoicingDetail'
import Tables, { TableHeadItem } from '../../components/Tables'
import TypographyMoney from '../../components/TypografyMoney'
import { useInvoiceSelected } from '../../store/dashboard'
import { useUserSelected } from '../../store/user'
import { dialogItemTypes, invoicesTypes } from '../../types/types'
import { containerWidth } from '../../utils/const'

const tableHead = [
  {
    key: 'id',
    name: 'Id'
  },
  {
    key: 'date',
    name: 'Fecha'
  },
  {
    key: 'shippingInfo.name',
    name: 'Cliente'
  },
  {
    key: 'total',
    name: 'Total'
  }
]

const Invoicing = () => {
  const data = useInvoiceSelected()
  const user = useUserSelected()
  const [btnSort, setBtnSort] = useState<string>('')
  const [sortAsc, setSortAsc] = useState(true)
  const [dialogItem, setDialogItem] = useState<dialogItemTypes>({ open: false, data: undefined })
  const [tableData, setTableData] = useState<invoicesTypes[]>([])

  useEffect(() => {
    let mount = true
    if (mount) {
      if (user.role === 'Administrador') {
        setTableData(data)
      } else {
        const filterData = data.filter((item) => item.shippingInfo.email === user.email)
        setTableData(filterData)
      }
    }
    return () => {
      mount = false
    }
  }, [data])

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

  const showItem = (item: invoicesTypes) => {
    console.log(item)
    setDialogItem({ open: true, data: item })
  }
  return (
    <Container maxWidth={containerWidth}>
      <Typography variant="h6" color="initial">
        Historial de facturas
      </Typography>
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
          {tableData.map((row: invoicesTypes, i: number) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => showItem(row)}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{`${row.shippingInfo.first_name} ${row.shippingInfo.last_name}`}</TableCell>
              <TableCell align="right">
                <TypographyMoney variant="body2" value={row.total} />
              </TableCell>
            </TableRow>
          ))}
        </Tables>
      ) : (
        <Typography variant="h6" color="initial">
          No hay Registros
        </Typography>
      )}
      <CustomDialog
        fullMobile
        open={dialogItem.open}
        onClose={() => {
          setDialogItem({ open: false, data: undefined })
        }}
      >
        <InvoicingDetail data={dialogItem.data} />
      </CustomDialog>
    </Container>
  )
}

export default Invoicing
