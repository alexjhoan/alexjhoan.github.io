import { Close } from '@mui/icons-material'
import { CssBaseline, IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { closeSnackbar, SnackbarProvider } from 'notistack'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import RoutesComponent from './Routes'
import myTheme from './theme/theme'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={myTheme}>
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      action={(snackbarId) => (
        <IconButton aria-label="" onClick={() => closeSnackbar(snackbarId)}>
          <Close sx={{ color: '#fff' }} />
        </IconButton>
      )}
    >
      <CssBaseline />
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>
)
