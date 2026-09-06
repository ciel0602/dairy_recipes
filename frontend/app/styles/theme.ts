'use client'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
        main: '#E85D04',
        contrastText: '#FFFFFF',
        },

        secondary: {
        main: '#C85F32',
        },

        background: {
        default: '#FAF9F7',
        paper: '#FFFFFF'
        },

        text: {
        primary: '#1A1715',
        secondary: '#9A9188',
        },
        common:{
            white:'#FFFFFF',
        },

        divider: '#E5DED7',
    },
});

export default theme