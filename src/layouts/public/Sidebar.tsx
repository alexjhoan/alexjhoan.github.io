import { Box, Divider, ListItemText, MenuItem, MenuList, styled, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useCategoriesSelected, useCategorySelected, useStoreActions, useStoreSelected } from '../../store/products'

const ContainerSidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: 300,
  minHeight: 'calc(100vh - 80px)',
  boxShadow: '3px 0px 10px #0008',
  '.item-active span': {
    fontWeight: 700
  },
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}))

const Sidebar = () => {
  const category = useCategorySelected()
  const categories = useCategoriesSelected()
  const data = useStoreSelected()
  const { updateCategory, updateCategories } = useStoreActions()

  useEffect(() => {
    let mount = true
    if (mount) {
      const getCategories = new Set(data.map((item) => item.category))
      updateCategories(Array.from(getCategories))
    }
    return () => {
      mount = false
    }
  }, [data])

  return (
    <ContainerSidebar>
      <Typography variant="h6">Categorías</Typography>
      <Divider sx={{ mt: 1 }} />
      <MenuList sx={{ pb: 0 }}>
        <MenuItem className={category === 'Todo' ? 'item-active' : ''} onClick={() => updateCategory('Todo')}>
          <ListItemText>Todo</ListItemText>
        </MenuItem>
        {categories.map((item: string, i: number) => (
          <MenuItem className={category === item ? 'item-active' : ''} key={i} onClick={() => updateCategory(item)}>
            <ListItemText>{item}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </ContainerSidebar>
  )
}
export default Sidebar
