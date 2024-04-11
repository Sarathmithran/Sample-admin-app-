import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Box } from '@mui/material'
import CustomerList from '../components/CustomerList/CustomerList'

const Customers = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, pt: 12,paddingLeft:3,paddingRight:3 }}>
        <CustomerList/>
      </Box>
    </Box>
  )
}

export default Customers
