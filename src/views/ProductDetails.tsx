import { Button, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useStoreSelected } from '../store/products'
import { StoreDataTypes } from '../types/types'
import PublicLayout from '../layouts/Public'
import TypographyMoney from '../components/TypografyMoney'

const ProductDetails = () => {
  const data = useStoreSelected()
  const { id } = useParams()
  const [product, setProduct] = useState<StoreDataTypes>()

  useEffect(() => {
    let mount = true
    console.log(id)
    console.log(data)
    console.log(data.length)
    const fetchProduct = async () => {
      if (mount && data.length > 0) {
        const getData = data.find((item: any) => item.id == Number(id))
        setProduct(getData)
      }
    }
    fetchProduct()
    return () => {
      mount = false
    }
  }, [data, id])

  const handleAddToCart = () => {
    // Lógica para añadir el producto al carrito de compras.
    console.log(`Producto ${id} añadido al carrito.`)
  }

  if (!product) return <Typography>Cargando...</Typography>

  return (
    <PublicLayout>
      <Container>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1">{product.category}</Typography>
        <TypographyMoney value={product.price} variant="h5" />
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Añadir al carrito
        </Button>
      </Container>
    </PublicLayout>
  )
}

export default ProductDetails
