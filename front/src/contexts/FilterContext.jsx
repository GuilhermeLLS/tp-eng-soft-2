import { createContext, useState } from 'react';

export const FilterContext = createContext({
  isSearching: false,
  searchTerm: '',
  setFilteringState: () => {},
});

FilterContext.displayName = 'FilterContext';

export function FilterProvider({ children }) {
  const [{ isSearching, searchTerm }, setFilteringState] = useState({
    isSearching: false,
    searchTerm: '',
  });
  return (
    <FilterContext.Provider value={{ isSearching, searchTerm, setFilteringState }}>
      {children}
    </FilterContext.Provider>
  );
}
