import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { useState } from 'react'

/**
 *
 *
 * @interface CustomSelectTypes
 * @typedef {CustomSelectTypes}
 * @extends {Omit<SelectProps, 'value' | 'onChange'>}
 */
interface CustomSelectTypes extends Omit<SelectProps, 'value' | 'onChange'> {
  /**
   *
   *
   * @type {?string}
   */
  label?: string
  /**
   *
   *
   * @type {string}
   */
  name: string
  /**
   *
   *
   * @type {any[]}
   */
  listItems: any[]
  /**
   *
   *
   * @type {(string[] | string | undefined)}
   */
  value: string[] | string | undefined
  /**
   *
   *
   * @type {*}
   */
  onChange: any
  /**
   *
   *
   * @type {?string}
   */
  helperText?: string
  /**
   *
   *
   * @type {?boolean}
   */
  validateSubmit?: boolean
  /**
   *
   *
   * @type {?string}
   */
  itemName?: string
  /**
   *
   *
   * @type {?string}
   */
  itemValue?: string
}

/**
 *
 *
 * @param {CustomSelectTypes} param0
 * @param {string} param0.label
 * @param {any[]} param0.listItems
 * @param {(string | string[])} param0.value
 * @param {*} param0.onChange
 * @param {string} param0.name
 * @param {string} param0.helperText
 * @param {SelectProps} param0.required
 * @param {boolean} param0.validateSubmit
 * @param {{ [x: string]: SelectProps; [x: number]: SelectProps; [x: symbol]: SelectProps; itemName?: string; itemValue?: string; }} param0....rest
 * @returns {*}
 */
export const CustomSelect = ({
  label,
  listItems,
  value,
  onChange,
  name,
  helperText,
  required,
  validateSubmit,
  ...rest
}: CustomSelectTypes) => {
  const [touched, setTouched] = useState(false)
  const onChangeCustom = (e: any) => {
    setTouched(true)
    onChange(e)
  }
  const requiredCondition = (touched || validateSubmit) && !value && required
  return (
    <FormControl size="small" sx={{ width: '100%', marginBottom: '16px' }} error={requiredCondition}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        id="multiple-checkbox"
        displayEmpty
        value={value}
        onChange={onChangeCustom}
        name={name}
        label={label}
        labelId="select-label"
        {...rest}
      >
        <MenuItem value="" disabled>
          {label ? '' : 'Choose one option'}
        </MenuItem>
        {listItems.map((type: any, i: number) => (
          <MenuItem key={i} value={type} sx={{ textTransform: 'capitalize' }}>
            {type}
          </MenuItem>
        ))}
      </Select>
      {(helperText || requiredCondition) && <FormHelperText>{requiredCondition ? '* Required' : helperText}</FormHelperText>}
    </FormControl>
  )
}
