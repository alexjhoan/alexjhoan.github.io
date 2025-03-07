import { Autocomplete, TextField, styled } from '@mui/material'

const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  '.MuiAutocomplete-clearIndicator': {
    display: 'none'
  }
}))

/**
 *
 *
 * @param {*} param0
 * @param {*} param0.label
 * @param {*} param0.options
 * @param {*} param0.value
 * @param {*} param0.onChange
 * @param {*} param0....rest
 * @returns {*}
 */
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
