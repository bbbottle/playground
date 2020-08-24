import React from 'react';

import { getImage } from '@zhoujiahao/utils';

import { PagingManager, Img } from "../../util_comp";
import { PhotosProvider } from "../../data-provider";
import {
  tmpBlurryThumbnailUrlSuffix, tmpWebpUrlSuffix
} from "../../../config";

import './index.scss';


const toWebpUrl = (src) => `${src}${tmpWebpUrlSuffix}`;
const toBlurryImgUrl = (src) => `${src.replace(tmpWebpUrlSuffix, '')}${tmpBlurryThumbnailUrlSuffix}`;
const cacheImg = (src) => {
  getImage(src)
    .then(() => {
      console.info('image cached');
    });
}

const createClickHandler = ({
  onLeftClick = (n) => null,
  onRightClick = (n) => null
}) => (e) => {
  const middle = window.innerWidth / 2;
  const handler = e.clientX > middle
    ? onRightClick
    : onLeftClick;
  handler(e);
}
const renderBlurryThumbnail = (originUrl) => {
  return (
    <img
      src={toBlurryImgUrl(originUrl)}
      style={{
        filter: 'opacity(0.2)',
      }}
    />
  );
}

export const Photos = (props) => {
  const { setCursorText } = React.useContext(props.context.CursorContext);
  return (
    <PhotosProvider>
      {({ photos }) => {
        return (
          <PagingManager
            data={photos}
            pageSize={1}
            infiniteLoopMode
          >
            {({
                currentPageData,
                next,
                prev,
                totalPages,
                nextPageData,
                currentPageIndex,
            }) => {
              const progress = `${currentPageIndex} / ${totalPages}`;
              if (nextPageData.length) {
                cacheImg(toWebpUrl(nextPageData[0]));
              }
              return (
                <div className="photo-gallery">
                  <Img
                    src={toWebpUrl(currentPageData[0])}
                    onClick={createClickHandler({ onRightClick: next, onLeftClick: prev })}
                    tooltip={progress}
                    setCursorText={setCursorText}
                    loadingViewRenderer={renderBlurryThumbnail}
                  />
                </div>
              )
            }}
          </PagingManager>
        )
      }}
    </PhotosProvider>
  )  
}
