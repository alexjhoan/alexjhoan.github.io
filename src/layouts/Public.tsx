import { Box, useMediaQuery, useTheme, styled, Container, Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useStoreActions } from '../store/products'
import { useCartActions, useUserActions, useUsersActions } from '../store/user'
import { mockData } from '../utils/mockData'
import Header from './public/Header'
import Sidebar from './public/Sidebar'
import { useLocation } from 'react-router'

/**
 * Description placeholder
 *
 * @type {*}
 */
const ContainerLayout = styled(Box)(({ theme }) => ({
  marginTop: 80,
  '.innerContent': {
    display: 'flex',
    flexDirection: 'column',
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
 * Description placeholder
 *
 * @param {{ children: ReactNode; maxWidth?: any }} param0
 * @param {ReactNode} param0.children
 * @param {*} [param0.maxWidth='xl']
 * @param {{}} param0....rest
 * @returns {*}
 */
const PublicLayout = ({ children, maxWidth = 'xl', ...rest }: { children: ReactNode; maxWidth?: any }) => {
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.down('xl'))
  const location = useLocation()

  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const { updateUsers } = useUsersActions()
  const { updateUser } = useUserActions()

  useEffect(() => {
    let mount = true
    if (mount) {
      const storedData = localStorage.getItem('products')
      const storedCart = localStorage.getItem('cart')
      const storedUser = localStorage.getItem('user')
      const storedUsers = localStorage.getItem('users')
      if (storedData) {
        updateData(JSON.parse(storedData))
      } else {
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
    <ContainerLayout>
      <Header />
      <Stack direction={'row'}>
        {location.pathname === '/' && <Sidebar />}
        <Box className={'innerContent'} sx={{ width: location.pathname === '/' ? 'calc(100% - 300px)' : '100%' }}>
          <Container
            maxWidth={maxWidth}
            sx={{
              ml: location.pathname !== '/' ? 'auto' : isLg ? 'auto' : maxWidth ? 0 : 'auto'
            }}
            {...rest}
          >
            <Box mb={10} pt={3}>
              {children}
            </Box>
          </Container>
        </Box>
      </Stack>
    </ContainerLayout>
  )
}

export default PublicLayout
