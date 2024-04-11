import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const MsgAlert = (props:any) => {

    const {DeleteMsg, msg} = props;

  return (
    <>
        <Snackbar
              open={DeleteMsg}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: '255px' }}
              >
                {msg}
              </Alert>
        </Snackbar>
    </>
  )
}

export default MsgAlert;