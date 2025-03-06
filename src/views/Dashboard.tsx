import DashboardLayout from '../layouts/Dashboard'
import { useViewSelected } from '../store/dashboard'
import Invoicing from './dashboard/Invoicing'
import Perfil from './dashboard/Perfil'
import Products from './dashboard/Products'
import Users from './dashboard/Users'

const Dashboard = () => {
  const view = useViewSelected()

  const components: any = {
    Inventario: <Products />,
    Usuarios: <Users />,
    Facturacion: <Invoicing />,
    Perfil: <Perfil />
  }

  return (
    <DashboardLayout>
      <>{components[view]}</>
    </DashboardLayout>
  )
}

export default Dashboard
