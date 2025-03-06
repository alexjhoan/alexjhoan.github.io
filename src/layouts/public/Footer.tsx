import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { containerWidth } from '../../utils/const'

const Footer = () => {
  return (
    <Container maxWidth={containerWidth}>
      <Typography variant="h3" color="initial">
        Footer
      </Typography>
    </Container>
  )
}

export default Footer
