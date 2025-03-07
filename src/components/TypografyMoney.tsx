import { Typography, TypographyProps } from '@mui/material'

/**
 *
 *
 * @interface TypographyMoney
 * @typedef {TypographyMoney}
 * @extends {TypographyProps}
 */
interface TypographyMoney extends TypographyProps {
  /**
   *
   *
   * @type {number}
   */
  value: number
  /**
   *
   *
   * @type {?string}
   */
  prefix?: string
  /**
   *
   *
   * @type {?string}
   */
  suffix?: string
}

/**
 *
 *
 * @param {TypographyMoney} param0
 * @param {string} [param0.prefix='\$']
 * @param {number} param0.value
 * @param {string} [param0.suffix='']
 * @param {{}} param0....rest
 * @returns {*}
 */
const TypographyMoney = ({ prefix = '$', value, suffix = '', ...rest }: TypographyMoney) => {
  return (
    <Typography {...rest}>
      {`${prefix}${Number(value).toLocaleString('es-CO', { minimumFractionDigits: 2 })}${suffix}`}
    </Typography>
  )
}

export default TypographyMoney
