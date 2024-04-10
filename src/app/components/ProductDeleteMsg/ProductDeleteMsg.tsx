import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const ProductDeleteMsg = (props:any) => {

    const {prodDeleteMsg} = props;

  return (
    <>
        <Snackbar
              open={prodDeleteMsg}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: '250px' }}
              >
                Product deleted successfully
              </Alert>
        </Snackbar>
    </>
  )
}

export default ProductDeleteMsg