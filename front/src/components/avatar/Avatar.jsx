import PropTypes from 'prop-types';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

function createAvatarFromSeed(seed, size, radius) {
  return createAvatar(style, {
    seed,
    size: size,
    radius: radius,
  });
}

export default function Avatar({ name, size = 40, radius = 20 }) {
  return (
    <span
      style={{ width: 'min-content' }}
      dangerouslySetInnerHTML={{ __html: createAvatarFromSeed(name, size, radius) }}
    ></span>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  radius: PropTypes.number,
};
