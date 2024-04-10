"use client"

import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

const AppThemeProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const theme = createTheme(
        {   
            palette: {
                primary: {
                    main: '#00CED1', // Aqua color
                },
                secondary: {
                    main: '#9e9e9e', // Grey color
                },
                error: {
                    main: '#f44336', // Red color
                },
                background: {
                    default: '#212121', // Dark background color
                    paper: '#424242', // Dark grey surface color
                },
                text: {
                    primary: '#ffffff', // Light text color
                    secondary: '#B0BEC5', // Light grey text color
                },
            },
            
            typography : {
                fontFamily: 'Roboto, sans-serif',
            },
            
        }
    )



  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider