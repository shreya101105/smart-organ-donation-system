import { useContext } from 'react';
import { BackgroundContext } from '../context/BackgroundContext';

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
export default useBackground;
