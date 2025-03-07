# Shop

Shop es una aplicación diseñada para ofrecer una experiencia intuitiva y funcional tanto para los clientes como para los administradores. Cada rol cuenta con capacidades específicas para satisfacer sus necesidades.

### La funcionalidad para los clientes incluye:

- Exploración del catálogo: Visualiza una lista completa de productos disponibles con detalles relevantes como precios, descripciones y categorías.

- Gestión del carrito de compras: Añade, elimina o actualiza la cantidad de productos en el carrito.

- Finalización de la compra: Genera una factura detallada con la información de los productos seleccionados, precios, impuestos aplicables y totales. La factura se almacena localmente para futuras referencias.

- Actualización dinámica del stock: Tras cada compra, el stock de productos se ajusta automáticamente.

### La funcionalidad para los administradores incluye:

Panel de control: Accede a un resumen general de las facturas generadas con información como fechas, totales y detalles del cliente.

Gestión de transacciones: Revisa el detalle de cada compra, incluyendo los productos adquiridos, cantidades, impuestos y el cliente asociado.

Supervisión del stock: Asegúrate de que el inventario refleje las transacciones realizadas para una administración eficiente.

## Technologies Used

### Frontend:

- **ViteJs**
- **TypeScript**
- **Material UI**
- **Zustand**

## Prerequisites

Make sure you have the following installed:

- Node.js (recommended version: 14.x or higher)


## Installation and Setup

Follow these steps to install and set up the project:

1. Clone the repository en la carpeta de tu preferencia

   - `git clone https://github.com/alexjhoan/alexjhoan.github.io.git`

2. Ingresa a la carpeta del proyecto

   - `cd alexjhoan.github.io`

3. Instala las dependencias

    - `npm install`

4. Corre el proyect

    - `npm run dev`

## Zustand

Se uso Zustand para el uso de los estados globales en la aplicacion.

SE manejaron varios estados globales estos se van a poder visualizar dentro de la carpeta `src/store` usando 3 archivos.

 - dashboard.ts: para el manejo de los estados que pertenecen al area administrativa
 - products.ts: para el manejo de los estados que pertenecen a la tienda incluyendo productos y categorias
 - user.ts: para el manejo de los estados que pertenecen a los usuarios y al usuario logeado en el momento

Cada uno de estos esta manejado los typos correctamente con el uso de typescript, lo cual minimiza los errores durante el desarrollo

### Zustand Example: Global State Management for Categories

```typescript
interface Store {
  data: StoreDataTypes[]
  categories: string[]
  category: string
  actions: {
    updateData: (newData: StoreDataTypes[]) => void
    updateCategories: (newData: string[]) => void
    updateCategory: (newData: string) => void
  }
}

const useStore = create<Store>((set) => ({
  data: [],
  categories: [],
  category: 'Todo',
  actions: {
    updateData: (newData) =>
      set(() => {
        localStorage.setItem('products', JSON.stringify(newData))
        return { data: newData }
      }),
    updateCategories: (newData) => set({ categories: newData }),
    updateCategory: (newData) => set({ category: newData })
  }
}))


export const useStoreSelected = () => useStore((state) => state.data)
export const useCategoriesSelected = () => useStore((state) => state.categories)
export const useCategorySelected = () => useStore((state) => state.category)
export const useStoreActions = () => useStore((state) => state.actions)
```

## Gestión del Estado, Patrones de Diseño y Estructura del Proyecto.

El desarrollo de este proyecto se fundamentó en la adopción de principios sólidos de arquitectura y diseño, con el objetivo de garantizar escalabilidad, mantenibilidad y una experiencia de usuario fluida. A continuación, se detallan las principales decisiones y justificaciones relacionadas con la gestión del estado, los patrones de diseño y la estructura del proyecto:

### Gestión del Estado

Para la gestión del estado global de la aplicación, se optó por Zustand, una biblioteca ligera pero poderosa que permite administrar estados de manera eficiente y con un código más limpio en comparación con alternativas más complejas. Las razones detrás de esta elección incluyen:

  - Simplicidad y rendimiento: Zustand elimina la necesidad de configuraciones excesivas y proporciona una API intuitiva, adecuada para aplicaciones de tamaño mediano a grande.

  - Reactividad optimizada: La capacidad de seleccionar partes específicas del estado y evitar renders innecesarios mejora la experiencia del usuario y el rendimiento de la aplicación.

  - Escalabilidad: Zustand se integra perfectamente con la estructura modular del proyecto, permitiendo un crecimiento sin complicaciones a medida que se amplían las funcionalidades.

### Patrones de Diseño

El diseño del proyecto sigue principios de modularidad y separación de responsabilidades, alineándose con los patrones más recomendados en el desarrollo de aplicaciones modernas:

  - Composición de Componentes: Se diseñaron componentes reutilizables y aislados, asegurando que cada uno tenga una única responsabilidad. Esto facilita el mantenimiento y la reutilización en distintas vistas o funcionalidades.

  - Uso de Hooks Personalizados: Los hooks personalizados se implementaron para encapsular la lógica repetitiva, como la gestión del estado, la manipulación de formularios o la integración con APIs. Esto reduce la duplicación de código y mejora la claridad.

  - Capas de Abstracción: La lógica de negocio y las operaciones de estado permanecen separadas de los componentes visuales, siguiendo el principio de "separación de preocupaciones" (SoC). Esto asegura que el código sea más comprensible y fácil de probar.

## Estructura del Proyecto

La estructura del proyecto fue diseñada para ser lógica y fácil de navegar, con una carpeta base src que organiza el código según las siguientes convenciones:

  - routes/: Contiene las rutas principales de la aplicación, definiendo los puntos de entrada para las distintas vistas. Esto permite una navegación clara y bien organizada.

  - layouts/: Incluye las estructuras base que encapsulan vistas o grupos de vistas, como barras de navegación y pies de página, asegurando consistencia en toda la aplicación.

  - hooks/: Alberga hooks personalizados que encapsulan lógica recurrente, promoviendo reutilización y claridad.

  - components/: Contiene componentes reutilizables de la interfaz de usuario, como botones, tablas o formularios. Se utilizó MUI (Material-UI) como framework de diseño para garantizar una apariencia moderna y responsiva, permitiendo personalización a través de temas.

  - types/: Define los tipos y modelos que permiten una integración tipada con TypeScript, mejorando la detección de errores y la experiencia de desarrollo.

  - views/: Agrupa las vistas principales de la aplicación, las cuales representan páginas completas o secciones importantes.

  - theme/: Configura los temas personalizados utilizados por MUI, asegurando consistencia en colores, tipografías y estilos a través de la aplicación.

El uso de Zustand en combinación con MUI y una estructura modular permite mantener un equilibrio entre simplicidad y funcionalidad avanzada. Esto facilita la incorporación de nuevas características, al tiempo que asegura que el código sea fácil de leer, mantener y probar. Además, la adopción de TypeScript fortalece la robustez de la aplicación al proporcionar tipado estático, reduciendo la posibilidad de errores en tiempo de ejecución.

## GitHub Pages como CI/CD

Debido a problemas relacionados con el sistema de pago en AWS que imposibilitaron su uso tuve que optar por GitHub Pages como Servicio de CI/CD. Esto tomando en cuanta la necesidad de mantener la agilidad y garantizar un flujo eficiente de desarrollo y despliegue.

GitHub Pages es una solución nativa para proyectos alojados en repositorios de GitHub, lo que permite simplificar y agilizar el proceso de despliegue. Cada cambio realizado en el repositorio puede desencadenar automáticamente un flujo de CI/CD para actualizar el entorno de producción, asegurando consistencia y rapidez.

### Facilidad de Configuración:

La configuración de GitHub Pages requiere un esfuerzo mínimo y es ideal para proyectos que utilizan tecnologías como React y frameworks modernos como Vite.

Gracias a la integración directa con GitHub Actions, es posible implementar scripts personalizados para tareas como pruebas automáticas, construcción de la aplicación y despliegue.

### Costo y Accesibilidad:

GitHub Pages es gratuito, lo que lo convierte en una excelente alternativa para proyectos con restricciones presupuestarias. Evitar los costos adicionales de AWS fue una decisión estratégica considerando las limitaciones en el sistema de pago.

### Soporte para Aplicaciones Estáticas:

Dado que GitHub Pages está optimizado para servir aplicaciones estáticas (como aquellas construidas con React), es una solución eficiente y altamente compatible con los requerimientos del proyecto.

### Procesos Automatizados con CI/CD:

GitHub Pages se complementa fácilmente con GitHub Actions, que permite implementar un flujo completo de CI/CD. Por ejemplo:

Ejecutar pruebas: Validar el código antes de desplegarlo mediante herramientas como Vitest.

Construcción del proyecto: Automatizar la compilación de la aplicación React.

Despliegue continuo: Publicar automáticamente los cambios en el entorno de producción tras la integración en la rama principal.

Ventajas en el Contexto del Proyecto
La integración de GitHub Pages asegura una rápida disponibilidad del proyecto para pruebas y uso por parte de los usuarios finales.

Se logra un flujo de desarrollo continuo, reduciendo el tiempo y el esfuerzo manual requerido para manejar despliegues.

La facilidad de configuración y el uso gratuito lo convierten en una elección eficaz, permitiendo que el equipo se enfoque en el desarrollo del producto.

## Author

- **Alex Ramirez**
