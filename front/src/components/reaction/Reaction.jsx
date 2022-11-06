import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import styles from './Reaction.module.css';
import { FiPlus } from 'react-icons/fi';
import Picker from 'emoji-picker-react';

export default function Reaction({ postReaction, reactions = {} }) {
  const emojiSelectorRef = useRef(null);
  const [isChoosingEmoji, setIsChoosingEmoji] = useState(null);
  const { getLoggedUser } = useAuth();
  const user = getLoggedUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isChoosingEmoji &&
        emojiSelectorRef.current &&
        !emojiSelectorRef.current.contains(event.target)
      ) {
        setIsChoosingEmoji(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setIsChoosingEmoji]);

  const onEmojiClick = (emoji) => {
    const emojiReactions = (reactions && reactions[emoji]) || [];
    const userIndex = emojiReactions.indexOf(user);
    if (userIndex > -1) {
      emojiReactions.splice(userIndex, 1);
    } else {
      emojiReactions.push(user);
    }
    const editedReactions = {
      ...reactions,
      [emoji]: emojiReactions,
    };
    if (!emojiReactions.length) {
      delete editedReactions[emoji];
    }
    postReaction(editedReactions);
    setIsChoosingEmoji(false);
  };

  const onAddReaction = () => {
    setIsChoosingEmoji((previousValue) => !previousValue);
  };

  const getEmojiLabel = (emoji, reactedUsers) => {
    const emojiSuffix = reactedUsers.length > 1 ? ` + ${reactedUsers.length - 1}` : '';
    return emoji + emojiSuffix;
  };

  const getEmojiContainerClass = (reactedUsers) => {
    return reactedUsers.includes(user) ? styles.reactedEmoji : styles.unreactedEmoji;
  };

  return (
    <>
      <div className={styles.row} aria-label="reagir a kudo">
        {Object.entries(reactions).map(([emoji, reactedUsers]) => (
          <div
            className={getEmojiContainerClass(reactedUsers)}
            key={emoji}
            onClick={() => onEmojiClick(emoji)}
          >
            <span role="img">{getEmojiLabel(emoji, reactedUsers)}</span>
          </div>
        ))}
        <span onClick={onAddReaction}>
          <FiPlus />
        </span>
      </div>
      <div ref={emojiSelectorRef}>
        {isChoosingEmoji && (
          <Picker onEmojiClick={(_event, emojiObject) => onEmojiClick(emojiObject.emoji)} />
        )}
      </div>
    </>
  );
}
