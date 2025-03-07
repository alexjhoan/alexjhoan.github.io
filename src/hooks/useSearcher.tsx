import { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import CustomInput from '../components/CustomInput'
/**
 * Hook personalizado para buscar datos en una lista.
 * Proporciona funcionalidades para manejar una entrada de búsqueda,
 * buscar datos y retornar los resultados correspondientes.
 */
export const useSearcher = () => {
  // Estado para almacenar el valor actual del input de búsqueda
  const [inputSearch, setInputSearch] = useState<string>('')

  // Estado para almacenar los resultados filtrados de la búsqueda
  const [searchedData, setSearchedData] = useState<any>(undefined)

  // Estado para almacenar todos los datos disponibles para buscar
  const [allData, setallData] = useState([])

  /**
   * Función para inicializar los datos sobre los que se realizará la búsqueda.
   * @param getDataComponente - Datos que serán buscados posteriormente.
   */
  const getAllDataSearch = (getDataComponente: any) => {
    setInputSearch('') // Resetea el valor del input de búsqueda
    setallData(getDataComponente) // Almacena los datos proporcionados
  }

  /**
   * Función que maneja el evento de búsqueda y filtra los datos según el input.
   * @param e - Evento de cambio proveniente del input de búsqueda.
   */
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase() // Convierte el valor ingresado a minúsculas
    setInputSearch(value) // Actualiza el estado del input de búsqueda

    // Filtra los datos disponibles buscando coincidencias con el valor ingresado
    let result = allData.filter((find: any) => {
      return Object.values(find).some((innerValue: any) =>
        // Comprueba si el valor es una cadena y si incluye el texto ingresado
        typeof innerValue === 'string' ? innerValue.toLowerCase().includes(value) : innerValue === value
      )
    })
    setSearchedData(result) // Actualiza los resultados de búsqueda
  }

  // Retorna las funciones y estados clave junto con un componente Input personalizado
  return {
    getAllDataSearch, // Función para inicializar los datos de búsqueda
    searchedData, // Resultados filtrados de la búsqueda
    inputSearch, // Valor actual del input de búsqueda
    InputSearcher: (
      /**
       * Componente Input preconfigurado para búsqueda,
       * diseñado para integrarse fácilmente con el hook.
       */
      <Stack alignItems={'flex-end'}>
        <CustomInput
          fullWidth={true} // El input ocupa el ancho completo disponible
          value={inputSearch} // Valor del input de búsqueda
          label={'Buscar...'} // Etiqueta para el campo de búsqueda
          onChange={search} // Función que maneja el evento de búsqueda
          mb={0} // Sin margen inferior
        />
      </Stack>
    )
  }
}
