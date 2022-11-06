import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';

export default function CardList({ kudos }) {
  return (
    <Fragment>
      {kudos?.map((kudo) => (
        <Card key={kudo.id} kudo={kudo} />
      ))}
    </Fragment>
  );
}

CardList.propTypes = {
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
      reactions: PropTypes.shape({
        [PropTypes.string]: PropTypes.string,
      }),
      date: PropTypes.string,
    }).isRequired
  ),
};
