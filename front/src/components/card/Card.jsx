import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth/useAuth';
import Avatar from '../avatar/Avatar';
import Reaction from '../reaction/Reaction';
import styles from './Card.module.css';
import { toast } from 'react-toastify';
import useKudos from '../../hooks/useKudos/useKudos';

export default function Card({ kudo }) {
  const { id, recipient, sender, message, reactions } = kudo;
  const { deleteKudo, editKudo } = useKudos();
  const { getLoggedUser } = useAuth();

  const onRemoveKudo = () => {
    try {
      deleteKudo(id);
      toast.info('Kudo removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover Kudo. ' + error);
    }
  };

  const postReaction = (reactions) => {
    try {
      const editedKudo = {
        ...kudo,
        reactions,
      };
      editKudo(editedKudo);
      toast.info('Kudo reagido com sucesso!');
    } catch (error) {
      toast.error('Erro ao reagir Kudo. ' + error);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.headerContentWrapper}>
        <Avatar name={sender.label} />
        <div className={styles.cWrapper}>
          <div className={styles.header}>
            <div className={styles.cardTitle}>
              <span>{sender.label}</span>
              <span>Para: {recipient.label}</span>
            </div>
          </div>
          <span className={styles.content}>{message}</span>
          <Reaction reactions={reactions} postReaction={postReaction} />
        </div>
      </div>
      {sender.value == getLoggedUser() ? (
        <span className={styles.remove} aria-label="deletar kudo" onClick={onRemoveKudo}>
          <FiTrash />
        </span>
      ) : null}
    </article>
  );
}

Card.propTypes = {
  kudo: PropTypes.shape({
    id: PropTypes.string,
    recipient: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    sender: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    message: PropTypes.string,
    reactions: PropTypes.shape({
      [PropTypes.string]: PropTypes.string,
    }),
    date: PropTypes.string,
  }),
};
