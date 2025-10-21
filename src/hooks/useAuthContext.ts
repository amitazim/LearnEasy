import { AuthContext } from '@/providers/AuthProviders';
import { useContext } from 'react'

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default useAuthContext
