import { ProductionQuantityLimits, Reply, ShoppingCartCheckout } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  dividerClasses,
  Grid2,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CountrySelect from '../components/CountrySelect'
import CustomDialog from '../components/CustomDialog'
import CustomInput from '../components/CustomInput'
import InvoicingDetail from '../components/InvoicingDetail'
import TypographyMoney from '../components/TypografyMoney'
import PublicLayout from '../layouts/Public'
import {
  useActionsOpenLogin,
  useActionsTypeForm,
  useInvoiceActions,
  useInvoiceSelected,
  useViewsActions
} from '../store/dashboard'
import { useCartActions, useCartSelected, useUserSelected } from '../store/user'
import { dialogItemTypes, UserDataTypes } from '../types/types'
import { containerWidth, userFormInit } from '../utils/const'

const BoxPricesContainer = styled(Box)(({ theme }) => ({
  border: 'solid 1px #0006',
  maxHeight: 700,
  overflowY: 'auto',
  padding: theme.spacing(2, 2),
  [`.${dividerClasses.fullWidth}`]: {
    borderColor: '#0006',
    margin: theme.spacing(2, -2)
  }
}))

const Checkout = () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const cart = useCartSelected()
  const user = useUserSelected()
  const invoices = useInvoiceSelected()
  const { updateCart } = useCartActions()
  const { updateInvoice } = useInvoiceActions()
  const [shippingInfo, setShippingInfo] = useState<UserDataTypes>(userFormInit)
  const [dialogItem, setDialogItem] = useState<dialogItemTypes>({ open: false, data: undefined })
  const { updateView } = useViewsActions()
  const { updateLoginAnchor } = useActionsOpenLogin()
  const { updateTypeForm } = useActionsTypeForm()

  useEffect(() => {
    let mount = true
    const fetchCountries = async () => {
      console.log(user)
      if (mount && user) {
        setShippingInfo(user)
      }
    }

    fetchCountries()
    return () => {
      mount = false
    }
  }, [user])

  useEffect(() => {
    let mount = true
    if (mount) {
      const btnDisabled = Object.values(shippingInfo).some((item: any) => item === '')
      setDisabled(btnDisabled)
    }
    return () => {
      mount = false
    }
  }, [shippingInfo])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo({ ...shippingInfo, [name]: value })
  }

  const handleCheckout = () => {
    setLoading(true)
    const newInvoice = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      subtotal: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0),
      tax: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * item.tax, 0),
      total: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * (1 + item.tax), 0),
      shippingInfo
    }
    updateInvoice([...invoices, newInvoice])
    updateCart([])
    setTimeout(() => {
      setLoading(false)
      setDialogItem({ open: true, data: newInvoice })
    }, 1000)

    console.log('Factura generada:', newInvoice)
  }

  const openRegister = () => {
    const anchor = document.getElementById('user_login')
    updateLoginAnchor(anchor)
    updateTypeForm(1)
  }

  return (
    <PublicLayout>
      <Container maxWidth={containerWidth}>
        {loading ? (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '20vh 0 0' }}>
            <CircularProgress size={120} />
          </Box>
        ) : user.email ? (
          <>
            <Grid2 container spacing={2} pt={4}>
              <Grid2 size={{ xs: 12 }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant="h4">Datos del cliente</Typography>
                </Stack>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
                <Box>
                  <CustomInput
                    label="Nombre"
                    name="first_name"
                    value={shippingInfo.first_name}
                    onChange={handleChange}
                    fullWidth
                  />
                  <CustomInput
                    label="Apellido"
                    name="last_name"
                    value={shippingInfo.last_name}
                    onChange={handleChange}
                    fullWidth
                  />
                  <CustomInput label="Teléfono" name="phone" value={shippingInfo.phone} onChange={handleChange} fullWidth />
                  <CustomInput label="Correo" name="email" value={shippingInfo.email} onChange={handleChange} fullWidth />
                  <CountrySelect
                    label="País"
                    name="country"
                    value={shippingInfo.country}
                    onChange={(_event: any, newValue: any) => setShippingInfo({ ...shippingInfo, country: newValue })}
                  />
                  <CustomInput
                    sx={{ mt: -2 }}
                    label="Direccion exacta"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
                <BoxPricesContainer>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontWeight={700} align="right" display={'flex'} justifyContent={'flex-end'}>
                      Articulos
                    </Typography>
                    <Typography variant="h6" align="right" display={'flex'} justifyContent={'flex-end'}>
                      {cart.reduce((acc, item) => acc + (item.quantity || 0), 0)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontWeight={700} align="right" display={'flex'} justifyContent={'flex-end'}>
                      SubTotal
                    </Typography>
                    <TypographyMoney
                      variant="h6"
                      component={'span'}
                      value={cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0)}
                    />
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontWeight={700} align="right" display={'flex'} justifyContent={'flex-end'}>
                      Impuesto
                    </Typography>
                    <TypographyMoney
                      variant="h6"
                      component={'span'}
                      value={cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * item.tax, 0)}
                    />
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h5" fontWeight={700} align="right" display={'flex'} justifyContent={'flex-end'}>
                      Total:{' '}
                    </Typography>
                    <TypographyMoney
                      variant="h5"
                      component={'span'}
                      value={cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * (1 + item.tax), 0)}
                    />
                  </Stack>
                </BoxPricesContainer>
                <Stack alignItems={'center'} mt={4}>
                  <Button
                    variant="contained"
                    disabled={disabled}
                    color="primary"
                    onClick={handleCheckout}
                    endIcon={<ShoppingCartCheckout />}
                  >
                    Finalizar compra
                  </Button>
                </Stack>
              </Grid2>
            </Grid2>
            <Stack direction={isXs ? 'column-reverse' : 'row'} mt={4} gap={3}>
              <Button variant="outlined" color="primary" onClick={() => navigate('/')} startIcon={<Reply />}>
                Seguir Comprando
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/cart')}
                startIcon={<ProductionQuantityLimits />}
              >
                Volver al carrito
              </Button>
            </Stack>
          </>
        ) : (
          <Box>
            <Typography variant="body1" color="initial">
              Para poder comprar debe registrarse o iniciar sesión
            </Typography>
            <Button variant="contained" color="primary" onClick={openRegister}>
              Registro / Iniciar sesión
            </Button>
          </Box>
        )}
      </Container>
      <CustomDialog
        fullMobile
        open={dialogItem.open}
        onClose={() => {
          setDialogItem({ open: false, data: undefined })
          updateView('Facturacion')
          navigate('/dashboard')
        }}
      >
        <InvoicingDetail data={dialogItem.data} />
      </CustomDialog>
    </PublicLayout>
  )
}

export default Checkout
