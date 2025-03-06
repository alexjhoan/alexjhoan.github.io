import { Typography, TypographyProps } from '@mui/material'

interface TypographyMoney extends TypographyProps {
  value: number
  prefix?: string
  suffix?: string
}

const TypographyMoney = ({ prefix = '$', value, suffix = '', ...rest }: TypographyMoney) => {
  return (
    <Typography {...rest}>
      {`${prefix}${Number(value).toLocaleString('es-CO', { minimumFractionDigits: 2 })}${suffix}`}
    </Typography>
  )
}

export default TypographyMoney
