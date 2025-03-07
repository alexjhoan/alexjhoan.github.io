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
import { useNavigate } from 'react-router'
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
  const navigate = useNavigate()
  const data = useStoreSelected()
  const cart = useCartSelected()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()

  const clearCart = () => {
    const updatedCart = [...cart]

    const updatedProducts = data.map((product) => {
      const cartItem = updatedCart.find((item) => item.id === product.id)
      return cartItem ? { ...product, stock: product.stock + (cartItem.quantity ? cartItem.quantity : 0) } : product
    })

    updateData(updatedProducts)

    updateCart([])
  }

  const removeItemCart = (idx: number) => {
    console.log(idx)
    const updatedCart = [...cart]
    const productCart = cart.find((item) => item.id === idx)

    const updatedProducts = data.map((p) =>
      p.id === idx && productCart?.quantity ? { ...p, stock: p.stock + productCart.quantity } : p
    )

    updateData(updatedProducts)

    const newListCart = updatedCart.filter((item) => item.id !== idx)
    updateCart(newListCart)
  }

  const handleAddToCart = (idx: number) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item) => item.id === idx)

    if (updatedCart[productIndex]?.quantity !== undefined && productIndex !== -1) {
      updatedCart[productIndex].quantity += 1
    } else {
      const product = data.find((item) => item.id === idx)
      if (product) {
        product.quantity = 1
        updatedCart.push(product)
      }
    }

    updateCart(updatedCart)

    const updatedProducts = data.map((p) => (p.id === idx ? { ...p, stock: p.stock - 1 } : p))
    updateData(updatedProducts)
  }

  const handleRemoveFromCart = (idx: number) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item) => item.id === idx)

    if (updatedCart[productIndex]?.quantity !== undefined && productIndex !== -1) {
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1
      } else {
        updatedCart.splice(productIndex, 1)
      }
    }

    updateCart(updatedCart)
    const updatedProducts = data.map((p) => (p.id === idx ? { ...p, stock: p.stock + 1 } : p))
    console.log(updatedProducts)
    updateData(updatedProducts)
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
                onClick={() => navigate('/checkout')}
                endIcon={<ShoppingCartCheckout />}
              >
                Finalizar compra
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
        <Stack direction={'row'} mt={4}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/')} startIcon={<Reply />}>
            Seguir Comprando
          </Button>
        </Stack>
      </Container>
    </PublicLayout>
  )
}

export default Cart
