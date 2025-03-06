import { Autocomplete, TextField, styled } from '@mui/material'
import React from 'react'

const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  '.MuiAutocomplete-clearIndicator': {
    display: 'none'
  }
}))

const AutocompleteCustom = ({ label, options, value, onChange, ...rest }: any) => {
  return (
    <AutocompleteStyled
      options={options}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} size="small" style={{ marginBottom: 16 }} />}
      {...rest}
    />
  )
}

export default AutocompleteCustom
