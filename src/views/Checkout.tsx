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
import { useEffect, useState } from 'react'
import { redirect } from 'react-router'
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

  /**
   * Efecto secundario que establece la información de envío del usuario actual.
   * Se ejecuta cada vez que cambie el usuario.
   */
  useEffect(() => {
    let mount = true // Variable para controlar si el componente está montado

    /**
     * Función asíncrona para configurar la información de envío
     * según el usuario actual.
     */
    const fetchCountries = async () => {
      console.log(user) // Muestra la información del usuario en la consola para depuración

      if (mount && user) {
        setShippingInfo(user) // Establece la información de envío basada en el usuario
      }
    }

    fetchCountries() // Llama a la función para obtener la información

    return () => {
      mount = false // Limpia la variable al desmontar el componente
    }
  }, [user])

  useEffect(() => {
    let mount = true // Variable para controlar el montaje del componente

    if (mount) {
      // Verifica si algún valor del formulario está vacío
      const btnDisabled = Object.values(shippingInfo).some((item: any) => item === '')
      setDisabled(btnDisabled) // Deshabilita o habilita el botón en consecuencia
    }

    return () => {
      // Limpia la variable cuando se desmonta el componente
      mount = false
    }
  }, [shippingInfo]) // Dependencias: ejecuta este efecto cuando 'form' cambie

  /**
   * Maneja los cambios en los campos del formulario.
   * @param event - Evento que contiene el nuevo valor del campo del formulario.
   */
  const handleChange = (event: any) => {
    let { name, value } = event.target // Extrae el nombre y el valor del campo que cambió
    setShippingInfo({
      ...shippingInfo, // Mantiene los valores actuales del formulario
      [name]: value // Actualiza el campo específico con su nuevo valor
    })
  }

  /**
   * Maneja el proceso de finalizar la compra.
   * Genera una nueva factura, actualiza el estado del carrito y muestra un cuadro de diálogo con la factura generada.
   */
  const handleCheckout = () => {
    setLoading(true) // Activa el estado de carga mientras se procesa la factura

    // Crea una nueva factura con los detalles del carrito y la información de envío
    const newInvoice = {
      id: Date.now(), // Genera un identificador único basado en la hora actual
      date: new Date().toLocaleDateString(), // Establece la fecha actual en formato local
      items: cart, // Productos en el carrito
      subtotal: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0), // Calcula el subtotal
      tax: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * item.tax, 0), // Calcula los impuestos
      total: cart.reduce((acc, item) => acc + item.price * (item.quantity || 0) * (1 + item.tax), 0), // Calcula el total con impuestos
      shippingInfo // Información de envío del usuario
    }

    updateInvoice([...invoices, newInvoice]) // Añade la nueva factura a la lista de facturas
    updateCart([]) // Vacía el carrito de compras

    // Simula un retraso antes de desactivar la carga y mostrar el cuadro de diálogo
    setTimeout(() => {
      setLoading(false) // Desactiva el estado de carga
      setDialogItem({ open: true, data: newInvoice }) // Muestra el cuadro de diálogo con la nueva factura
    }, 1000)

    console.log('Factura generada:', newInvoice) // Muestra la factura generada en la consola para depuración
  }

  /**
   * Abre el formulario de registro de usuario.
   * Actualiza el estado para mostrar el formulario de tipo "registro" y ancla el formulario al elemento del DOM.
   */
  const openRegister = () => {
    const anchor = document.getElementById('user_login') // Obtiene el elemento HTML con el ID "user_login"
    updateLoginAnchor(anchor) // Establece el ancla para la posición del formulario de inicio de sesión/registro
    updateTypeForm(1) // Cambia el tipo de formulario a "registro"
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
              <Button variant="outlined" color="primary" onClick={() => redirect('/')} startIcon={<Reply />}>
                Seguir Comprando
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => redirect('/cart')}
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
          redirect('/dashboard')
        }}
      >
        <InvoicingDetail data={dialogItem.data} />
      </CustomDialog>
    </PublicLayout>
  )
}

export default Checkout
