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
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import AutocompleteCustom from '../components/AutocompleteCustom'
import TypographyMoney from '../components/TypografyMoney'
import { useSearcher } from '../hooks/useSearcher'
import PublicLayout from '../layouts/Public'
import { useCategoriesSelected, useCategorySelected, useStoreActions, useStoreSelected } from '../store/products'
import { useCartActions, useCartSelected } from '../store/user'
import { StoreDataTypes } from '../types/types'
import { containerWidth } from '../utils/const'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'

const imgProduct: any = {
  'Frutas Frescas': '/images/frutas.jpg',
  Cítricos: '/images/citricos.jpeg',
  Tropicales: '/images/tropicales.jpeg'
}

const BoxBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxHeight: '350px',
  height: '50%',
  marginBottom: '32px',
  width: '100%',
  borderRadius: 15,
  overflow: 'hidden',
  '.swiper-slide': {
    display: 'flex'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  '[class^="swiper-button"]': {
    color: theme.palette.common.white
  }
}))

const BoxItems = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
  justifyItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4, 0, 10)
}))

const Home = () => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  const isMd = useMediaQuery(theme.breakpoints.down('lg'))
  const data = useStoreSelected()
  const [dataTable, setDataTable] = useState<StoreDataTypes[]>([])
  const cart = useCartSelected()
  const { updateData } = useStoreActions()
  const { updateCart } = useCartActions()
  const category = useCategorySelected()
  const categories = useCategoriesSelected()
  const { updateCategory } = useStoreActions()
  const { inputSearch, getAllDataSearch, searchedData, InputSearcher } = useSearcher()

  useEffect(() => {
    let mount = true
    if (mount) {
      if (category === 'Todo') {
        getAllDataSearch(data)
        setDataTable(data)
      } else {
        const newData = data.filter((item) => item.category === category)
        getAllDataSearch(newData)
        setDataTable(newData)
      }
    }
    return () => {
      mount = false
    }
  }, [data, category])

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
        <BoxBanner>
          <Swiper
            navigation={true}
            loop={true}
            slidesPerView={1}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
          >
            <SwiperSlide>
              <img src="/banner/1.jpg" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/banner/2.jpg" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/banner/3.jpg" alt="banner" />
            </SwiperSlide>
          </Swiper>
        </BoxBanner>
        <Stack
          direction={isSm ? 'column' : 'row'}
          justifyContent={isMd ? 'space-between' : 'center'}
          alignItems={'center'}
          gap={2}
        >
          <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
            <AutocompleteCustom
              label={'Categorias'}
              options={['Todo', ...categories]}
              value={category}
              onChange={(_event: any, newValue: string) => updateCategory(newValue)}
              // getOptionLabel={(option: any) => option.name?.common}
              style={{ maxWidth: '100%', minWidth: 300, width: isMd ? 300 : 600, marginBottom: '-16px' }}
            />
          </Box>
          <Box maxWidth={'100%'} width={isMd ? 300 : 600} minWidth={300}>
            {InputSearcher}
          </Box>
        </Stack>
        <BoxItems>
          {(searchedData && inputSearch !== '' ? searchedData : dataTable).map((item: StoreDataTypes, i: number) => (
            <Card key={i} sx={{ minWidth: 230, width: '100%' }}>
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
