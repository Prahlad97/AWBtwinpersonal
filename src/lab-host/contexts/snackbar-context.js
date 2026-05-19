import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [queue, setQueue] = useState([]);

  const openSnackBar = useCallback((item) => {
    setQueue((q) => [...q, item]);
    window.setTimeout(() => {
      setQueue((q) => q.filter((x) => x.id !== item.id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ state: { queue }, actions: { openSnackBar } }), [queue, openSnackBar]);

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
}

export { SnackbarContext };

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar requires SnackbarProvider');
  return ctx;
}
