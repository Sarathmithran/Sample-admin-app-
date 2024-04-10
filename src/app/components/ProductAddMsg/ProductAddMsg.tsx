import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const ProductAddMsg = (props:any) => {

    const {productAddMsg} = props;

  return (
    <>
        <Snackbar
              open={productAddMsg}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: '250px' }}
              >
                Product added successfully
              </Alert>
        </Snackbar>
    </>
  )
}

export default ProductAddMsg