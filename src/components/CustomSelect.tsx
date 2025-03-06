import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { useState } from 'react'

interface CustomSelectTypes extends Omit<SelectProps, 'value' | 'onChange'> {
  label?: string
  name: string
  listItems: any[]
  value: string[] | string | undefined
  onChange: any
  helperText?: string
  validateSubmit?: boolean
  itemName?: string
  itemValue?: string
}

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
