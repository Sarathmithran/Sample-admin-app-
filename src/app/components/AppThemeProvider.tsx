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
                    main: '#3F51B5', // Indigo color
                },
                secondary: {
                    main: '#8BC34A', // Light green color
                },
                error: {
                    main: '#FF5722', // Deep orange color
                },
                background: {
                    default: '#F5F5F5', // Light grey background color
                    paper: '#FFFFFF', // White surface color
                },
                text: {
                    primary: '#212121', // Dark text color
                    secondary: '#757575', // Grey text color
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