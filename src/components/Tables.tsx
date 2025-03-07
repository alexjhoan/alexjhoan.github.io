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

/**
 *
 *
 * @interface TablesTypes
 * @typedef {TablesTypes}
 * @extends {TableProps}
 */
interface TablesTypes extends TableProps {
  /**
   *
   *
   * @type {*}
   */
  rowHead: any
  /**
   *
   *
   * @type {?boolean}
   */
  actions?: boolean
  /**
   *
   *
   * @type {*}
   */
  children: any
  /**
   *
   *
   * @type {?number}
   */
  minWidth?: number
}

/**
 *
 *
 * @param {TablesTypes} param0
 * @param {*} param0.rowHead
 * @param {*} param0.children
 * @param {boolean} param0.actions
 * @param {number} param0.minWidth
 * @param {{}} param0....rest
 * @returns {*}
 */
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

/**
 *
 *
 * @interface TableHeadItemTypes
 * @typedef {TableHeadItemTypes}
 * @extends {StackProps}
 */
interface TableHeadItemTypes extends StackProps {
  /**
   *
   *
   * @type {*}
   */
  name: any
  /**
   *
   *
   * @type {*}
   */
  arrowsHidden: any
  /**
   *
   *
   * @type {*}
   */
  modeSort: any
  /**
   *
   *
   * @type {?*}
   */
  onClick?: any
  /**
   *
   *
   * @type {?('inherit' | 'left' | 'center' | 'right' | 'justify')}
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

/**
 *
 *
 * @param {TableHeadItemTypes} param0
 * @param {*} param0.name
 * @param {*} param0.arrowsHidden
 * @param {*} param0.modeSort
 * @param {*} param0.onClick
 * @param {({ align?: "inherit" | "left" | "center" | "right" | "justify"; })} param0....rest
 * @returns {*}
 */
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
