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

/**
 *
 *
 * @type {{ key: string; name: string; }[]}
 */
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

  /**
   * Efecto secundario que establece los datos de la tabla
   * según el rol del usuario (Administrador o no).
   */
  useEffect(() => {
    let mount = true // Controla si el componente está montado

    if (mount) {
      // Si el usuario es Administrador, muestra todos los datos
      if (user.role === 'Administrador') {
        setTableData(data)
      } else {
        // Filtra los datos para mostrar solo aquellos relacionados al usuario actual
        const filterData = data.filter((item) => item.shippingInfo.email === user.email)
        setTableData(filterData)
      }
    }

    return () => {
      // Limpieza al desmontar el componente
      mount = false
    }
  }, [data]) // Dependencia: ejecuta el efecto cuando 'data' cambie

  /**
   * Ordena los datos de la tabla según una columna específica y en un orden determinado.
   * @param allData - Todos los datos que se desean ordenar.
   * @param keyCol - La clave de la columna por la cual ordenar los datos.
   * @param order - Indica si el orden es ascendente (true) o descendente (false).
   */
  const sortTable = async (allData: any, keyCol: string, order: boolean) => {
    setTableData([]) // Limpia temporalmente los datos de la tabla
    setBtnSort(keyCol) // Establece la columna actual de ordenamiento

    // Ordena los datos de forma ascendente o descendente según el valor de 'order'
    const sortedData = await allData.sort((a: any, b: any) => {
      if (b[keyCol] < a[keyCol]) {
        return order ? 1 : -1
      }
      if (b[keyCol] > a[keyCol]) {
        return order ? -1 : 1
      }
      return 0 // Si los valores son iguales, no cambia el orden
    })

    setSortAsc(order) // Actualiza el estado indicando el orden (ascendente/descendente)
    setTableData(sortedData) // Establece los datos ordenados en la tabla
  }

  /**
   * Muestra los detalles de un elemento de la tabla en un cuadro de diálogo.
   * @param item - Los datos del elemento seleccionado.
   */
  const showItem = (item: invoicesTypes) => {
    // Abre el cuadro de diálogo con los datos del elemento
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
