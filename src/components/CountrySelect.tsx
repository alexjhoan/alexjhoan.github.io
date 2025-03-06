import { useEffect, useState } from 'react'
import AutocompleteCustom from './AutocompleteCustom'

interface CountrySelectTypes {
  value: string | null
  name: string
  label: string
  onChange: (_event: any, newValue: any) => void
}

const CountrySelect = ({ value, label, name, onChange }: CountrySelectTypes) => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    let mount = true
    const fetchCountries = async () => {
      if (mount) {
        const response = await fetch('https://restcountries.com/v3.1/region/america')
        const data = await response.json()
        // setCountries(data)
        setCountries(data.map((country: any) => country.name.common))
      }
    }

    fetchCountries()
    return () => {
      mount = false
    }
  }, [])
  return (
    <AutocompleteCustom
      label={label}
      name={name}
      options={countries}
      value={value}
      onChange={onChange}
      // getOptionLabel={(option: any) => option.name?.common}
      style={{ marginBottom: 16, minWidth: 300 }}
    />
  )
}

export default CountrySelect
