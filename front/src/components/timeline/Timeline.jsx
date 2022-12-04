import PropTypes from 'prop-types';
import CardList from '../card/CardList';
import Logo from '../logo/Logo';
import Composer from '../composer/Composer';
import Filter from '../filter/Filter';
import styles from './Timeline.module.css';
import useFilter from '../../hooks/useFilter/useFilter';

export default function Timeline({ kudos }) {
  const { searchTerm } = useFilter();
  const timelineKudos = kudos?.filter(
    (kudo) =>
      !searchTerm ||
      (kudo.sender.label + ' ' + kudo.recipient.label + ' ' + kudo.message)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeline}>
        <Logo size="md" />
        <Composer />
        <Filter />
        <CardList kudos={timelineKudos} />
      </div>
    </div>
  );
}

Timeline.propTypes = {
  kudos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      sender: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      recipient: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      message: PropTypes.string,
    }).isRequired
  ),
};
