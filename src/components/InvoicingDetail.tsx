import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { invoicesTypes, StoreDataTypes } from '../types/types'
import TypographyMoney from './TypografyMoney'

const InvoicingDetail = ({ data }: { data: invoicesTypes | undefined }) => {
  return (
    <>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          Factura N°:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {data?.id}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          Nombre:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {`${data?.shippingInfo.first_name} ${data?.shippingInfo.last_name}`}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          Teléfono:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {data?.shippingInfo.phone}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          País:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {data?.shippingInfo.country}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          Direccion:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {data?.shippingInfo.address}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="initial" component={'span'}>
          Fecha:{' '}
        </Typography>
        <Typography variant="body1" color="initial" component={'span'}>
          {data?.date}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h6" color="initial">
          Detalle de la factura
        </Typography>
        {data?.items.map((item: StoreDataTypes, i: number) => (
          <Card key={i} sx={{ margin: '8px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.name}
                </Typography>
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
                <Typography variant="body1" color="text.secondary">
                  {item.quantity}
                </Typography>
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
        ))}
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'} mt={4}>
        <Typography variant="h6" color="initial" component={'span'}>
          Subtotal:{' '}
        </Typography>
        <TypographyMoney
          minWidth={120}
          align="right"
          ml={1}
          variant="h6"
          color="initial"
          component={'span'}
          value={data?.subtotal ? data?.subtotal : 0}
        />
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Typography variant="h6" color="initial" component={'span'}>
          Impuestos:{' '}
        </Typography>
        <TypographyMoney
          minWidth={120}
          align="right"
          ml={1}
          variant="h6"
          color="initial"
          component={'span'}
          value={data?.tax ? data?.tax : 0}
        />
      </Box>
      <Box mb={1} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant="h6" color="initial" component={'span'}>
          Total:{' '}
        </Typography>
        <TypographyMoney
          minWidth={120}
          align="right"
          ml={1}
          variant="h6"
          color="initial"
          component={'span'}
          value={data?.total ? data?.total : 0}
        />
      </Box>
    </>
  )
}

export default InvoicingDetail
