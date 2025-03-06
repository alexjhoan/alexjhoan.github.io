import { Box, Container, Stack, styled, useMediaQuery, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useInvoiceActions } from '../store/dashboard'
import { useUserSelected } from '../store/user'
import Header from './public/Header'
import Sidebar from './dashboard/Sidebar'

const ContainerLayout = styled(Box)(({ theme }) => ({
  marginTop: 80,
  '.innerContent': {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 80px)',
    minHeight: 'calc(100vh - 80px)',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0
    }
  }
}))

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
  const navigate = useNavigate()
  const user = useUserSelected()
  const { updateInvoice } = useInvoiceActions()

  useEffect(() => {
    let moutn = true
    if (moutn) {
      if (user.email === '') {
        enqueueSnackbar(`Por favor iniciar sesión`, { variant: 'error' })
        navigate('/')
      } else {
        const storedInvoices = localStorage.getItem('invoices')
        if (storedInvoices) {
          updateInvoice(JSON.parse(storedInvoices))
        }
      }
    }
    return () => {
      moutn = false
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
