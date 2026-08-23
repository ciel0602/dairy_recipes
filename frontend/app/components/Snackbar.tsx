"use client"
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material'
import { useSnackbarState } from '../hooks/useSnackbarState'

const SuccessSnackbar = () => {
  const [snackbar, setSnackbar] = useSnackbarState();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ message: null, severity:null })
  };
  return (
    <>
      {snackbar.severity != null && (
        <Snackbar open={snackbar.severity !== null} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default SuccessSnackbar