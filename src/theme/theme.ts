import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  primary: {
    main: '#10823d',
    light: '#394e9a80'
  },
  secondary: {
    main: '#384d99'
  },
  text: {
    primary: '#08371b',
    secondary: '#000000',
    tertiary: '#fff'
  }
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary.main,
        light: colors.primary.light
        // dark: '#b23a3c'
      },
      secondary: {
        // light: '#fa6169',
        main: colors.secondary.main
        // dark: will be calculated from palette.secondary.main,
        // contrastText: '#f9f9f8'
      },
      text: {
        primary: colors.text.primary
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            ':disabled': {
              background: 'rgba(0, 0, 0, 0.12)'
            }
          },
          containedPrimary: {
            color: '#fff',
            fontWeight: '500',
            borderRadius: 4,
            transition: 'all 0.2s ease-in-out',
            border: 'none',
            '&:hover': {
              border: 'none',
              color: '#fff',
              boxShadow: '0 5px 10px 0px #00000060'
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 16
          }
        }
      }
    }
  })
)

export default theme
