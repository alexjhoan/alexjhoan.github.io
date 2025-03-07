import { Add, AdminPanelSettings, Close, Description, Home, Logout, Person, Remove, ShoppingCart } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  dividerClasses,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Badge, { badgeClasses } from '@mui/material/Badge'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { Link } from 'react-router'
import TypographyMoney from '../../components/TypografyMoney'
import Login from '../../forms/Login'
import Register from '../../forms/Register'
import { redirect } from 'react-router'
import {
  useActionsOpenLogin,
  useActionsTypeForm,
  useOpenAnchor,
  useOpenLogin,
  useTypeForm,
  useViewsActions
} from '../../store/dashboard'
import { useStoreActions, useStoreSelected } from '../../store/products'
import { useCartActions, useCartSelected, useUserActions, useUserSelected } from '../../store/user'
import { containerWidth } from '../../utils/const'

const CustomDivider = styled(Divider)(({ theme }) => ({
  [`&.${dividerClasses.fullWidth}`]: {
    borderColor: '#0008',
    margin: theme.spacing(1, 0)
  }
}))

const CartBadge = styled(Badge)(() => ({
  [`.${badgeClasses.badge}`]: {
    top: '-12px',
    right: '-6px',
    backgroundColor: '#035624'
  }
}))

const AppBarContainer = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  padding: '8px',
  backgroundColor: theme.palette.primary.main,
  '.iconUser': {
    color: theme.palette.common.white
  }
}))

const BoxCarContainer = styled(Box)(() => ({
  minHeight: 400,
  maxHeight: 'calc(100vh - 222px)',
  overflowY: 'auto'
}))

const Header = () => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  const cart = useCartSelected()
  const data = useStoreSelected()
  const user = useUserSelected()
  const openLogin = useOpenLogin()
  const openAnchor = useOpenAnchor()
  const typeForm = useTypeForm()
  const { updateLoginAnchor } = useActionsOpenLogin()
  const { updateTypeForm } = useActionsTypeForm()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()

  const { removeUser } = useUserActions()
  const { updateView } = useViewsActions()
  const [openCart, setOpenCart] = useState(false)
  const [openMenuMobile, setOpenMenuMobile] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user.email) {
      enqueueSnackbar(`Bienvenido ${user.first_name} ${user.last_name}`, { variant: 'success' })
    } else {
      updateLoginAnchor(event.currentTarget)
    }
  }

  const handleClose = () => {
    updateLoginAnchor(null)
    setTimeout(() => {
      updateTypeForm(0)
    }, 300)
  }

  const clearCart = () => {
    // Crear una copia del carrito actual
    const updatedCart = [...cart]

    // Actualizar los productos sumando las cantidades de los items del carrito
    const updatedProducts = data.map((product) => {
      const cartItem = updatedCart.find((item) => item.id === product.id)
      return cartItem ? { ...product, stock: product.stock + (cartItem.quantity ? cartItem.quantity : 0) } : product
    })

    // Actualizar el estado de productos
    updateData(updatedProducts)

    // Vaciar el carrito
    updateCart([])
  }

  const logout = () => {
    enqueueSnackbar(`Sesión Finalizada`, { variant: 'success' })
    removeUser()
    clearCart()
    redirect('/')
  }

  /**
   * Elimina un producto del carrito de compras.
   * @param idx - El identificador único del producto que se desea eliminar.
   */
  const removeItemCart = (idx: number) => {
    console.log(idx) // Muestra en la consola el ID del producto a eliminar

    // Crea una copia del carrito actual
    const updatedCart = [...cart]

    // Encuentra el producto que corresponde al ID proporcionado
    const productCart = cart.find((item) => item.id === idx)

    // Actualiza el stock del producto eliminado
    const updatedProducts = data.map((p) =>
      p.id === idx && productCart?.quantity ? { ...p, stock: p.stock + productCart.quantity } : p
    )
    updateData(updatedProducts) // Actualiza los datos de los productos

    // Filtra los productos para eliminar el seleccionado
    const newListCart = updatedCart.filter((item) => item.id !== idx)
    updateCart(newListCart) // Actualiza el estado del carrito
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
    <AppBarContainer position="fixed" sx={{ width: '100vw', right: 'auto' }}>
      <Container maxWidth={containerWidth}>
        <Toolbar sx={{ padding: '0!important', display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Link
              to={'/'}
              style={{ display: 'flex', lineHeight: 0, alignItems: 'center', width: 'fit-content', textDecoration: 'none' }}
            >
              <img src="/vite.svg" className="logo" alt="Vite logo" />
              <Typography variant="body1" color="white" ml={2} fontWeight={700}>
                Vite Store
              </Typography>
            </Link>
          </Box>
          {user.email && (
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }} gap={isSm ? 1 : 3}>
              <Button
                variant="text"
                sx={{ color: theme.palette.common.white, fontWeight: 700 }}
                onClick={() => {
                  updateView('')
                  redirect('/dashboard')
                }}
              >
                Dashboard
              </Button>
              <Button variant="text" sx={{ color: theme.palette.common.white, fontWeight: 700 }} onClick={() => redirect('/')}>
                Inicio
              </Button>
              <Button
                variant="text"
                sx={{ color: theme.palette.common.white, fontWeight: 700 }}
                onClick={() => redirect('/cart')}
              >
                Mi pedido
              </Button>
            </Box>
          )}
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {user.first_name && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body1" color="white" fontWeight={700} mr={4}>
                  {`Hola, ${user.first_name}`}
                </Typography>
              </Box>
            )}
            {user.email ? (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Tooltip title="Cerrar sesión">
                  <IconButton
                    className="iconUser"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={logout}
                  >
                    <Logout />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title="Iniciar sesión / Registro">
                <IconButton
                  id="user_login"
                  sx={{ mr: 1 }}
                  className="iconUser"
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Person />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Carrito">
              <IconButton className="iconUser" onClick={() => setOpenCart(true)}>
                <ShoppingCart />
                <CartBadge badgeContent={cart.length} color="primary" overlap="circular" />
              </IconButton>
            </Tooltip>
            {user.email && (
              <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                <IconButton className="iconUser" size="large" onClick={() => setOpenMenuMobile(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={openAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openLogin}
        onClose={handleClose}
      >
        <Box sx={{ padding: theme.spacing(isSm ? 1 : 2, 2.5), maxWidth: '400px' }}>
          {typeForm === 0 ? (
            <Login setTypeForm={updateTypeForm} setAnchorEl={updateLoginAnchor} />
          ) : (
            <Register setTypeForm={updateTypeForm} />
          )}
        </Box>
      </Menu>
      <Drawer open={openMenuMobile} anchor={'right'} onClose={() => setOpenMenuMobile(false)}>
        <Box minWidth={300}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} px={3} pt={1} pb={0}>
            <Typography variant="body1" component="div">
              {user?.first_name ? `Hola, ${user.first_name}` : 'Menu'}
            </Typography>
            <IconButton onClick={() => setOpenMenuMobile(false)}>
              <Close />
            </IconButton>
          </Stack>
          <CustomDivider />
          <MenuList sx={{ pt: 1, px: 1 }}>
            {user.role === 'Administrador' && (
              <MenuItem
                onClick={() => {
                  updateView('Inventario')
                  redirect('/dashboard')
                  setOpenMenuMobile(false)
                }}
              >
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={() => redirect('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Inicio</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => redirect('/cart')}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText>Mi pedido</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                updateView('Facturacion')
                redirect('/dashboard')
                setOpenMenuMobile(false)
              }}
            >
              <ListItemIcon>
                <Description fontSize="small" />
              </ListItemIcon>
              <ListItemText>Historal de facturas</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                updateView('Perfil')
                redirect('/dashboard')
                setOpenMenuMobile(false)
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Perfil</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
        <Box mt={'auto'} py={2}>
          <CustomDivider />
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              setOpenMenuMobile(false)
              logout
            }}
            endIcon={<Logout />}
            fullWidth
            sx={{ fontSize: 16 }}
          >
            Cerar sesión
          </Button>
        </Box>
      </Drawer>
      <Drawer open={openCart} anchor={'right'} onClose={() => setOpenCart(false)}>
        <Box minWidth={300} px={1}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} padding={2}>
            <Typography variant="h5" component="div">
              Carrito
            </Typography>
            <IconButton onClick={() => setOpenCart(false)}>
              <Close />
            </IconButton>
          </Stack>
          <BoxCarContainer>
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <Card key={i} sx={{ margin: '8px' }}>
                  <CardContent sx={{ height: '100%' }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.name}
                      </Typography>
                      <IconButton onClick={() => removeItemCart(item.id)}>
                        <Close fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography variant="body2" color="text.secondary">
                        Precio unitario
                      </Typography>
                      <TypographyMoney value={item.price} variant="body1" color="text.secondary" />
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography variant="body2" color="text.secondary">
                        Cantidad
                      </Typography>
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
                    </Stack>
                    {item.quantity && item.quantity > 1 && (
                      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="body2" color="text.secondary">
                          Precio Total
                        </Typography>
                        <TypographyMoney value={item.price * item.quantity} variant="body1" color="text.secondary" />
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No hay productos en el carrito
              </Typography>
            )}
          </BoxCarContainer>
        </Box>
        <Box sx={{ padding: theme.spacing(4), marginTop: 'auto' }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} pb={2}>
            <Typography variant="h6" component="div">
              Total
            </Typography>
            <TypographyMoney value={cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0)} variant="h5" />
          </Stack>
          <Button variant="contained" color="primary" fullWidth onClick={() => redirect('/cart')}>
            Finalizar compra
          </Button>
        </Box>
      </Drawer>
    </AppBarContainer>
  )
}

export default Header
