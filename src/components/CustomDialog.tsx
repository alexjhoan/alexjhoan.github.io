import { Close } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogProps, DialogTitle, IconButton, styled } from '@mui/material'
import { ReactNode } from 'react'

/**
 *
 *
 * @interface customDialogTypes
 * @typedef {customDialogTypes}
 * @extends {DialogProps}
 */
interface customDialogTypes extends DialogProps {
  /**
   *
   *
   * @type {boolean}
   */
  open: boolean
  /**
   *
   *
   * @type {?string}
   */
  title?: string
  /**
   *
   *
   * @type {?boolean}
   */
  fullMobile?: boolean
  /**
   *
   *
   * @type {ReactNode}
   */
  children: ReactNode
  /**
   *
   *
   * @type {?() => void}
   */
  onClose?: () => void
}

const BoxClose = styled(Box)(() => ({
  position: 'absolute',
  top: 2,
  right: 2
}))

const BoxDialog = styled(Dialog)(({ theme }) => ({
  '&.full-mobile': {
    '.MuiDialog-paper': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
        maxHeight: '100%'
      }
    },
    '.MuiDialogContent-root': {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2)
      }
    }
  }
}))

/**
 *
 *
 * @param {customDialogTypes} param0
 * @param {boolean} param0.open
 * @param {string} param0.title
 * @param {*} [param0.maxWidth='sm']
 * @param {boolean} [param0.fullMobile=false]
 * @param {ReactNode} param0.children
 * @param {() => void} param0.onClose
 * @returns {*}
 */
const CustomDialog = ({ open, title, maxWidth = 'sm', fullMobile = false, children, onClose }: customDialogTypes) => {
  return (
    <BoxDialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth className={fullMobile ? 'full-mobile' : ''}>
      <DialogTitle align="center" sx={{ position: 'relative' }}>
        {title}
        {onClose && (
          <BoxClose>
            <IconButton onClick={onClose}>
              <Close fontSize="large" />
            </IconButton>
          </BoxClose>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </BoxDialog>
  )
}

export default CustomDialog
