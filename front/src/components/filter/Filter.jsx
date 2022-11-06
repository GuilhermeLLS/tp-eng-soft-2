import { FiSearch, FiX } from 'react-icons/fi';
import styles from './Filter.module.css';
import useFilter from '../../hooks/useFilter/useFilter';

export default function Filter() {
  const { isSearching, setFilteringState } = useFilter();
  const onChangeFilterState = () => {
    setFilteringState((prevState) => {
      return {
        isSearching: !prevState.isSearching,
        searchTerm: '',
      };
    });
  };
  const onChangeSearchedTerm = (value) => {
    setFilteringState((prevState) => {
      return { ...prevState, searchTerm: value };
    });
  };

  return isSearching ? (
    <div className={styles.filterBlock}>
      <button id="closeSearch" className={styles.closeFilter} onClick={onChangeFilterState}>
        <FiX size={20} />
      </button>
      <input
        className={styles.filterInput}
        type="text"
        name="term"
        placeholder="Pesquisar..."
        onChange={(e) => onChangeSearchedTerm(e.target.value)}
      />
    </div>
  ) : (
    <div className={styles.filterBlock}>
      <button id="openSearch" className={styles.searchFilter} onClick={onChangeFilterState}>
        <FiSearch size={20} />
      </button>
    </div>
  );
}
