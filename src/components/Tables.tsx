import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Box,
  Paper,
  Stack,
  StackProps,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow
} from '@mui/material'

const TableHeadStyled = styled(TableHead)(() => ({
  '& th': {
    fontWeight: 700,
    fontSize: 16
  }
}))

const TableBodyStyled = styled(TableBody)(() => ({
  '& tr:hover': {
    backgroundColor: '#e7e7e7'
  }
}))

interface TablesTypes extends TableProps {
  rowHead: any
  actions?: boolean
  children: any
  minWidth?: number
}

export const Tables = ({ rowHead, children, actions, minWidth, ...rest }: TablesTypes) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 270px)' }}>
        <Table stickyHeader sx={{ minWidth: minWidth ?? 700 }} aria-label="sticky table" {...rest}>
          <TableHeadStyled>
            <TableRow>
              {rowHead}
              {actions && (
                <TableCell align="right" sx={{ pr: 4 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHeadStyled>
          <TableBodyStyled>{children}</TableBodyStyled>
        </Table>
      </TableContainer>
    </Paper>
  )
}

interface TableHeadItemTypes extends StackProps {
  name: any
  arrowsHidden: any
  modeSort: any
  onClick?: any
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

export const TableHeadItem = ({ name, arrowsHidden, modeSort, onClick, ...rest }: TableHeadItemTypes) => {
  return (
    <TableCell>
      <Stack direction={'row'} width={'fit-content'} onClick={onClick} {...rest}>
        {name}
        <Box component={'span'} hidden={arrowsHidden} sx={{ lineHeight: 0 }}>
          {modeSort ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </Box>
      </Stack>
    </TableCell>
  )
}

export default Tables
