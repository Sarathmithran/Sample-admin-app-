import { Box, Skeleton } from '@mui/material'
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <>
        <Box sx={{ width: '100%' }}>
            <Skeleton animation="wave" sx={{ width: '100%', height: '25vh' }} />
            <Skeleton animation="wave" sx={{ width: '100%', height: '15vh' }} />
            <Skeleton animation="wave" sx={{ width: '100%', height: '15vh' }} />
            <Skeleton animation="wave" sx={{ width: '100%', height: '15vh' }} />
        </Box>
    </>
  )
}

export default LoadingSkeleton