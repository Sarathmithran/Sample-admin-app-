import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProductList from '../components/ProductList/ProductList'

const Products = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, pt: 12,paddingLeft:3,paddingRight:3 }}>
        <ProductList/>
      </Box>
    </Box>
  )
}

export default Products