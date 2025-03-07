import { Description, Group, Inventory2, Person } from '@mui/icons-material'
import { Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, styled } from '@mui/material'
import { useViewsActions, useViewSelected } from '../../store/dashboard'
import { useUserSelected } from '../../store/user'

const ContainerSidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: 300,
  minHeight: 'calc(100vh - 80px)',
  boxShadow: '3px 0px 10px #0008',
  '.item-active span': {
    fontWeight: 700
  }
}))

const Sidebar = () => {
  const view = useViewSelected()
  const user = useUserSelected()
  const { updateView } = useViewsActions()

  return (
    <ContainerSidebar>
      {user.role === 'Administrador' && (
        <MenuList sx={{ py: 0 }}>
          <MenuItem className={view === 'Inventario' ? 'item-active' : ''} onClick={() => updateView('Inventario')}>
            <ListItemIcon>
              <Inventory2 fontSize="small" />
            </ListItemIcon>
            <ListItemText>Inventario</ListItemText>
          </MenuItem>
          <MenuItem className={view === 'Usuarios' ? 'item-active' : ''} onClick={() => updateView('Usuarios')}>
            <ListItemIcon>
              <Group fontSize="small" />
            </ListItemIcon>
            <ListItemText>Usuarios</ListItemText>
          </MenuItem>
        </MenuList>
      )}
      <MenuList sx={{ pt: 0 }}>
        <MenuItem className={view === 'Facturacion' ? 'item-active' : ''} onClick={() => updateView('Facturacion')}>
          <ListItemIcon>
            <Description fontSize="small" />
          </ListItemIcon>
          <ListItemText>Historial de facturas</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem className={view === 'Perfil' ? 'item-active' : ''} onClick={() => updateView('Perfil')}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
      </MenuList>
    </ContainerSidebar>
  )
}
export default Sidebar
