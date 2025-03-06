import { Box, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useStoreActions } from '../store/products'
import { useCartActions, useUserActions, useUsersActions } from '../store/user'
import { mockData } from '../utils/mockData'
import PublicFooter from './public/Footer'
import PublicHeader from './public/Header'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))

  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()

  useEffect(() => {
    let mount = true
    if (mount) {
      // Verificar si hay datos en el localStorage
      const storedData = localStorage.getItem('products')
      const storedCart = localStorage.getItem('cart')
      const storedUser = localStorage.getItem('user')
      const storedUsers = localStorage.getItem('users')
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
    }
    return () => {
      mount = false
    }
  }, [])

  return (
    <>
      <PublicHeader />
      <Box minHeight={'calc(100vh - 80px)'} my={10}>
        {children}
      </Box>
      {/* <PublicFooter /> */}
    </>
  )
}

export default PublicLayout
