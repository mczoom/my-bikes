import { useContext } from 'react';
import { SnackbarContext } from 'contexts/SnackbarContext';

function useSnackbar() {
  return useContext(SnackbarContext);
}

export default useSnackbar;
