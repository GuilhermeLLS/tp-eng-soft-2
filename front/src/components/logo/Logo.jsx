import PropTypes from 'prop-types';
import styles from './Logo.module.css';

export default function Logo({ size }) {
  switch (size) {
    case 'sm':
      return <span className={styles.logo}>Kudo4Us</span>;
    case 'md':
      return <h3 className={styles.logo}>Kudo4Us</h3>;
    case 'lg':
      return <h1 className={styles.logo}>Kudo4Us</h1>;
    default:
      return null;
  }
}

Logo.propTypes = {
  size: PropTypes.string,
};
