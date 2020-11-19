export const isMatchMinSize = (boxProps, min = 200) => {
  const {
    width: w,
    height: h,
  } = boxProps

  return w > min && h > min;
}

export const isMatchMaxSize = (boxProps, max = 900) => {
  const {
    width: w,
    height: h,
  } = boxProps

  return w < max && h < max;
}

export const showPhotoBox = (boxProps) => {
  return isMatchMinSize(boxProps)
    && isMatchMaxSize(boxProps, 500);
};

export const showDesignBox = (boxProps) => {
  return isMatchMinSize(boxProps, 500);
}

export const falsyMatcher = () => false;