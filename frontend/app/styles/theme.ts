'use client'
import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#C4622D',
        },
        secondary: {
            main: '#F2EDE6',
        },
        error: {
            main: red.A400,
        },
    },
})

export default theme