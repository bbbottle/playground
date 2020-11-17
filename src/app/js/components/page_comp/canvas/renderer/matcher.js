export const isMatchMinSize = (boxProps) => {
  const {
    width: w,
    height: h,
    boxIndex: i,
  } = boxProps

  return w > 200 && h > 200;
}

export const showPhotoBox = (boxProps) => {
  const { boxIndex } = boxProps;
  return isMatchMinSize(boxProps) && boxIndex % 2 === 0;
};
