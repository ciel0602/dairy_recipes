import useSWR from 'swr';

export const useSnackbarState = () => {
  type snackbarStateType = {
    message: null | string
    severity: null | 'success' | 'error'
  }

  const fallbackData: snackbarStateType = {
    message: null,
    severity: null,
  }
  const {data: state, mutate: setState } = useSWR('snackbar', null, {
    fallbackData: fallbackData
  })
  return [state, setState] as [snackbarStateType, (value:snackbarStateType) => void,]
}
