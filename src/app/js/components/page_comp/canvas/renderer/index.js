import { showPhotoBox } from './matcher';
import { PhotoBox } from './renderer';

const BOX_PATTERN_RENDER_MAP = new Map();
BOX_PATTERN_RENDER_MAP.set(showPhotoBox, PhotoBox)

const getBoxRenderer = (map, props) => {
  const defaultBoxRenderer = () => null;
  const defaultMatcherRendererPair = [
    () => false,
    defaultBoxRenderer,
  ];

  const [
    matcher, renderer
  ] = [...map.entries()].find(([m]) => m(props))
  || defaultMatcherRendererPair

  return renderer;
}

export const boxRenderer = (props) => {
  const renderer = getBoxRenderer(BOX_PATTERN_RENDER_MAP, props)
  return renderer(props);
}

