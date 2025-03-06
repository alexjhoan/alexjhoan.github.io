import { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import CustomInput from '../components/CustomInput'

export const useSearcher = () => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [searchedData, setSearchedData] = useState<any>(undefined)
  const [allData, setallData] = useState([])

  const getAllDataSearch = (getDataComponente: any) => {
    setInputSearch('')
    setallData(getDataComponente)
  }

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInputSearch(value)
    let result = allData.filter((find: any) => {
      return Object.values(find).some((innerValue: any) =>
        typeof innerValue === 'string' ? innerValue.toLowerCase().includes(value) : innerValue === value
      )
    })
    setSearchedData(result)
  }
  return {
    getAllDataSearch,
    searchedData,
    inputSearch,
    InputSearcher: (
      <Stack alignItems={'flex-end'}>
        <CustomInput fullWidth={false} value={inputSearch} label={'Buscar...'} onChange={search} mb={0} />
      </Stack>
    )
  }
}
