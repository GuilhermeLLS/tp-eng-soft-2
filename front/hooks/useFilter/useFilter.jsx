import { useContext } from 'react';
import { FilterContext } from '../../contexts/FilterContext';

export default function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be within its context');
  }
  return context;
}
