import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  styled,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router'
import TypographyMoney from '../components/TypografyMoney'
import PublicLayout from '../layouts/Public'
import { useStoreActions, useStoreSelected } from '../store/products'
import { useCartActions, useCartSelected } from '../store/user'
import { containerWidth } from '../utils/const'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { StoreDataTypes } from '../types/types'
import { useSearcher } from '../hooks/useSearcher'

const imgProduct: any = {
  'Frutas Frescas': '/images/frutas.jpg',
  Cítricos: '/images/citricos.jpeg',
  Tropicales: '/images/tropicales.jpeg'
}

const BoxItems = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(4, 0, 10)
}))

const Home = () => {
  const data = useStoreSelected()
  const cart = useCartSelected()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const navigate = useNavigate()
  const { inputSearch, getAllDataSearch, searchedData, InputSearcher } = useSearcher()

  useEffect(() => {
    let mount = true
    if (mount) {
      getAllDataSearch(data)
    }
    return () => {
      mount = false
    }
  }, [data])

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

    enqueueSnackbar(`Agregado al carrito`, { variant: 'success' })
  }

  return (
    <PublicLayout>
      <Container maxWidth={containerWidth}>
        <Stack direction={'row'} justifyContent={'center'}>
          {InputSearcher}
        </Stack>
        <BoxItems>
          {(searchedData && inputSearch !== '' ? searchedData : data).map((item: StoreDataTypes, i: number) => (
            <Card key={i} sx={{ maxWidth: 350 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={imgProduct[item.category]} alt={item.category} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Categoria
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.category}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Precio
                    </Typography>
                    <TypographyMoney value={item.price} variant="body2" sx={{ color: 'text.secondary' }} />
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Existencia
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.stock}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {item.stock > 0 ? (
                  <Button variant="outlined" color="primary" onClick={() => handleAddToCart(item.id)}>
                    Agregar al carrito
                  </Button>
                ) : (
                  <Typography variant="body1">Sin existencia</Typography>
                )}
              </CardActions>
            </Card>
          ))}
        </BoxItems>
      </Container>
    </PublicLayout>
  )
}

export default Home
