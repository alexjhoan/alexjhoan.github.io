import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormControl, IconButton, InputAdornment, StandardTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface validationTypes {
  validate: () => boolean
  msg: string
}

interface FancyInputTypes extends StandardTextFieldProps {
  validation?: validationTypes[]
  onlyNumber?: boolean
  maxLength?: number
  validateSubmit?: boolean
  mb?: number
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

const CustomInput = ({
  label,
  name,
  value,
  variant,
  required,
  validation,
  type,
  multiline,
  helperText,
  onChange,
  maxLength,
  validateSubmit,
  mb,
  ...rest
}: FancyInputTypes) => {
  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isNumber = () => type === 'number'

  const stringIsOnlyDigits = (str: string) => {
    return /^[0-9]+([.])?([0-9]+)?$/.test(str)
  }

  const isEmptyString = (str: string) => {
    return str === ''
  }

  const onChangeCustom = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    if (isNumber() && !isEmptyString(e.target.value) && !stringIsOnlyDigits(e.target.value)) return
    if (onChange) onChange(e)
  }

  const getMessageError = () => {
    if (validation) {
      for (const v of validation) {
        if (!v.validate()) return v.msg
      }
      return ''
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const requiredCondition = (touched || validateSubmit) && !value && required
  const showCustomError = (touched || validateSubmit) && validation && !!getMessageError()
  const hasError = requiredCondition || showCustomError

  return (
    <>
      {type !== 'password' ? (
        <FormControl fullWidth error={hasError}>
          <TextField
            label={label}
            style={mb !== undefined ? { marginBottom: mb } : { marginBottom: 16 }}
            size="small"
            error={hasError}
            helperText={requiredCondition ? '* Requerido' : showCustomError ? getMessageError() : helperText ?? ''}
            variant={variant ? variant : 'outlined'}
            name={name}
            multiline={multiline}
            value={value}
            onChange={onChangeCustom}
            InputProps={{
              className: required ? 'textField-required' : ''
            }}
            inputProps={{
              maxLength: maxLength,
              style: multiline
                ? {
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    margin: '-8.5px -14px',
                    padding: '8.5px 14px'
                  }
                : { backgroundColor: '#fff', borderRadius: 4 },
              autoComplete: 'off',
              form: {
                autoComplete: 'off'
              }
            }}
            {...rest}
          />
        </FormControl>
      ) : (
        <FormControl fullWidth error={hasError}>
          <TextField
            size="small"
            label={label}
            style={mb !== undefined ? { marginBottom: mb } : { marginBottom: 16 }}
            error={hasError}
            helperText={requiredCondition ? 'Campo Requerido' : showCustomError ? getMessageError() : ''}
            variant={variant ? variant : 'outlined'}
            name={name}
            value={value}
            type={showPassword ? 'text' : 'password'}
            onChange={onChangeCustom}
            InputProps={{
              sx: { paddingRight: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} sx={{ backgroundColor: 'transparent' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...rest}
          />
        </FormControl>
      )}
    </>
  )
}

export default CustomInput
