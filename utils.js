export const toKey = ([top, left]) => top + '_' + left;
export const moveRight = ([t, l]) => [t, l + 1];
export const moveLeft = ([t, l]) => [t, l - 1];
export const moveUp = ([t, l]) => [t - 1, l];
export const moveDown = ([t, l]) => [t + 1, l];

export const isOpposite = (dir1, dir2) => {
  if (dir1 === moveLeft && dir2 === moveRight) {
    return true;
  }
  if (dir2 === moveLeft && dir1 === moveRight) {
    return true;
  }
  if (dir1 === moveUp && dir2 === moveDown) {
    return true;
  }
  if (dir2 === moveUp && dir1 === moveDown) {
    return true;
  }

  return false;
};
