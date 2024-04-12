import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const Category = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, pt: 12,paddingLeft:3,paddingRight:3 }}>
        Category
      </Box>
    </Box>
  )
}

export default Category