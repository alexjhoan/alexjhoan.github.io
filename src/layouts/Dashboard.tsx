import { Box, Container, Stack, styled, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useInvoiceActions } from '../store/dashboard'
import { useStoreActions } from '../store/products'
import { useCartActions, useUserActions, useUsersActions } from '../store/user'
import { mockData } from '../utils/mockData'
import Sidebar from './dashboard/Sidebar'
import Header from './public/Header'

const ContainerLayout = styled(Box)(({ theme }) => ({
  marginTop: 80,
  '.innerContent': {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 300px)',
    minHeight: 'calc(100vh - 80px)',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0
    }
  }
}))

/**
 *
 *
 * @param {{
 *   title?: string
 *   children: ReactNode
 *   maxWidth?: any
 * }} param0
 * @param {string} param0.title
 * @param {ReactNode} param0.children
 * @param {*} [param0.maxWidth='xl']
 * @param {{}} param0....rest
 * @returns {*}
 */
const DashboardLayout = ({
  title,
  children,
  maxWidth = 'xl',
  ...rest
}: {
  title?: string
  children: ReactNode
  maxWidth?: any
}) => {
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.down('xl'))
  const { updateInvoice } = useInvoiceActions()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()

  // useEffect(() => {
  //   let moutn = true
  //   if (moutn) {
  //     if (user.email === '') {
  //       enqueueSnackbar(`Por favor iniciar sesión`, { variant: 'error' })
  //       redirect('/')
  //     } else {
  //       const storedInvoices = localStorage.getItem('invoices')
  //       if (storedInvoices) {
  //         updateInvoice(JSON.parse(storedInvoices))
  //       }
  //     }
  //   }
  //   return () => {
  //     moutn = false
  //   }
  // }, [])

  useEffect(() => {
    let mount = true
    if (mount) {
      // Verificar si hay datos en el localStorage
      const storedData = localStorage.getItem('products')
      const storedCart = localStorage.getItem('cart')
      const storedUser = localStorage.getItem('user')
      const storedUsers = localStorage.getItem('users')
      const storedInvoices = localStorage.getItem('invoices')
      if (storedData) {
        // Si hay datos en el localStorage, cargarlos en el estado de React
        updateData(JSON.parse(storedData))
      } else {
        // Si no hay datos, cargar la data de prueba y guardarla en el localStorage
        localStorage.setItem('products', JSON.stringify(mockData))
        updateData(mockData)
      }
      if (storedCart) {
        updateCart(JSON.parse(storedCart))
      }
      if (storedUser) {
        updateUser(JSON.parse(storedUser))
      }
      if (storedUsers) {
        updateUsers(JSON.parse(storedUsers))
      }
      if (storedInvoices) {
        updateInvoice(JSON.parse(storedInvoices))
      }
    }
    return () => {
      mount = false
    }
  }, [])

  return (
    <ContainerLayout>
      <Header />
      <Stack direction={'row'}>
        <Sidebar />
        <Box className={'innerContent'}>
          <Container maxWidth={maxWidth} sx={{ ml: isLg ? 'auto' : maxWidth ? 0 : 'auto' }} {...rest}>
            <Box mb={10} pt={3}>
              {children}
            </Box>
          </Container>
        </Box>
      </Stack>
    </ContainerLayout>
  )
}

export default DashboardLayout
