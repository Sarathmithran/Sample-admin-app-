import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const ProductEditedMsg = (props:any) => {

    const {prodEditedMsg} = props;

  return (
    <>
        <Snackbar
              open={prodEditedMsg}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: '250px' }}
              >
                Product updated successfully
              </Alert>
        </Snackbar>
    </>
  )
}

export default ProductEditedMsg