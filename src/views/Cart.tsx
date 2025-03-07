import { Delete, Remove, Reply, ShoppingCartCheckout } from '@mui/icons-material'
import Add from '@mui/icons-material/Add'
import {
  Box,
  boxClasses,
  Button,
  Container,
  Divider,
  dividerClasses,
  Grid2,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { redirect } from 'react-router'
import TypographyMoney from '../components/TypografyMoney'
import PublicLayout from '../layouts/Public'
import { useStoreActions, useStoreSelected } from '../store/products'
import { useCartActions, useCartSelected } from '../store/user'
import { StoreDataTypes } from '../types/types'
import { containerWidth } from '../utils/const'

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

const BoxItemContainer = styled(Box)(() => ({
  border: 'solid 1px #0006',
  minHeight: 400,
  maxHeight: 'calc(100vh - 290px)',
  overflow: 'auto',
  [`>.${boxClasses.root}`]: {
    minWidth: 700
  }
}))

const BoxItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 2),
  borderBottom: 'solid 1px #0006'
}))

const Cart = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const data = useStoreSelected()
  const cart = useCartSelected()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()

  /**
   * Limpia completamente el carrito de compras y actualiza el stock de los productos.
   */
  const clearCart = () => {
    // Crea una copia del carrito actual
    const updatedCart = [...cart]

    /**
     * Mapea los datos de los productos y actualiza el stock según las cantidades en el carrito.
     * Si el producto está en el carrito, incrementa su stock con la cantidad correspondiente.
     * De lo contrario, retorna el producto sin cambios.
     */
    const updatedProducts = data.map((product) => {
      const cartItem = updatedCart.find((item) => item.id === product.id)
      return cartItem ? { ...product, stock: product.stock + (cartItem.quantity ? cartItem.quantity : 0) } : product
    })

    // Actualiza los datos de los productos con los nuevos valores de stock
    updateData(updatedProducts)

    // Vacía el carrito de compras
    updateCart([])
  }

  /**
   * Elimina un producto del carrito de compras y actualiza el stock del producto eliminado.
   * @param idx - El identificador único del producto que se desea eliminar.
   */
  const removeItemCart = (idx: number) => {
    console.log(idx) // Muestra en la consola el identificador del producto a eliminar

    // Crea una copia del carrito actual
    const updatedCart = [...cart]

    // Busca el producto en el carrito que corresponde al identificador proporcionado
    const productCart = cart.find((item) => item.id === idx)

    /**
     * Actualiza los datos de los productos:
     * Si el producto se encuentra en el carrito, incrementa el stock con la cantidad eliminada.
     */
    const updatedProducts = data.map(
      (p) =>
        p.id === idx && productCart?.quantity
          ? { ...p, stock: p.stock + productCart.quantity } // Incrementa el stock
          : p // Retorna el producto sin cambios si no se encuentra en el carrito
    )

    updateData(updatedProducts) // Actualiza los datos de los productos

    // Filtra el carrito para eliminar el producto seleccionado
    const newListCart = updatedCart.filter((item) => item.id !== idx)
    updateCart(newListCart) // Actualiza el estado del carrito con la nueva lista
  }

  /**
   * Agrega un producto al carrito de compras.
   * @param idx - El identificador único del producto que se desea agregar.
   */
  const handleAddToCart = (idx: number) => {
    // Crea una copia del carrito actual
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item) => item.id === idx)

    // Verifica si el producto ya está en el carrito
    if (updatedCart[productIndex]?.quantity !== undefined && productIndex !== -1) {
      // Incrementa la cantidad si ya existe
      updatedCart[productIndex].quantity += 1
    } else {
      // Busca el producto en los datos generales
      const product = data.find((item) => item.id === idx)
      if (product) {
        product.quantity = 1 // Asigna cantidad inicial de 1
        updatedCart.push(product) // Agrega el producto al carrito
      }
    }

    updateCart(updatedCart) // Actualiza el estado del carrito

    // Reduce el stock del producto en los datos generales
    const updatedProducts = data.map((p) => (p.id === idx ? { ...p, stock: p.stock - 1 } : p))
    updateData(updatedProducts) // Actualiza los datos de los productos
  }

  /**
   * Reduce la cantidad de un producto en el carrito o lo elimina si la cantidad es 0.
   * @param idx - El identificador único del producto que se desea actualizar.
   */
  const handleRemoveFromCart = (idx: number) => {
    // Crea una copia del carrito actual
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item) => item.id === idx)

    if (updatedCart[productIndex]?.quantity !== undefined && productIndex !== -1) {
      // Si la cantidad es mayor a 1, la reduce
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
        updatedCart.splice(productIndex, 1)
      }
    }

    updateCart(updatedCart) // Actualiza el estado del carrito

    // Incrementa el stock del producto en los datos generales
    const updatedProducts = data.map((p) => (p.id === idx ? { ...p, stock: p.stock + 1 } : p))
    console.log(updatedProducts) // Muestra en consola los productos actualizados
    updateData(updatedProducts) // Actualiza los datos de los productos
  }

  return (
    <PublicLayout>
      <Container maxWidth={containerWidth}>
        <Grid2 container spacing={2} pt={4}>
          <Grid2 size={{ xs: 12 }}>
            <Stack direction={isXs ? 'column' : 'row'} justifyContent={'space-between'} alignItems={'flex-end'} gap={2}>
              <Typography align={'left'} variant="h4" width={isXs ? '100%' : 'auto'}>
                Resumen del Pedido
              </Typography>
              <Button variant="outlined" color="primary" onClick={clearCart} endIcon={<Delete />}>
                Vaciar Carrito
              </Button>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <BoxItemContainer>
              {cart.map((item: StoreDataTypes, i: number) => (
                <BoxItem key={i}>
                  <Stack>
                    <Typography variant="h6" component="div" gutterBottom minWidth={145} mb={0} fontWeight={700}>
                      {item.name}
                    </Typography>
                    <TypographyMoney value={item.price} variant="body1" color="text.secondary" />
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1), marginRight: theme.spacing(-1) }}>
                    <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                      <Remove />
                    </IconButton>
                    <Typography variant="body1" color="text.secondary">
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleAddToCart(item.id)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <TypographyMoney
                      minWidth={50}
                      align="right"
                      value={item.price * (item.quantity || 0)}
                      variant="body1"
                      color="text.secondary"
                    />
                  </Stack>
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="body2" color="text.secondary">
                      Impuesto {item.tax * 100}%
                    </Typography>
                    <TypographyMoney
                      minWidth={50}
                      align="right"
                      value={item.price * (item.quantity || 0) * item.tax}
                      variant="body1"
                      color="text.secondary"
                    />
                  </Stack>
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="body1" color="text.secondary" fontWeight={700}>
                      Total
                    </Typography>
                    <TypographyMoney
                      minWidth={50}
                      align="right"
                      value={item.price * (item.quantity || 0) * (1 + item.tax)}
                      variant="body1"
                      color="text.secondary"
                    />
                  </Stack>
                  <IconButton onClick={() => removeItemCart(item.id)}>
                    <Delete />
                  </IconButton>
                </BoxItem>
              ))}
            </BoxItemContainer>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
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
                color="primary"
                onClick={() => redirect('/checkout')}
                endIcon={<ShoppingCartCheckout />}
              >
                Finalizar compra
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
        <Stack direction={'row'} mt={4}>
          <Button variant="outlined" color="primary" onClick={() => redirect('/')} startIcon={<Reply />}>
            Seguir Comprando
          </Button>
        </Stack>
      </Container>
    </PublicLayout>
  )
}

export default Cart
