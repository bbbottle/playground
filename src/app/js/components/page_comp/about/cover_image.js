import React from 'react';
import cn from 'classnames';
import {isMobile} from "@zhoujiahao/utils";
import {Img, TVNoiseLayer} from "../../util_comp";
import { coverImgSrc } from "../../../config";


export const CoverImage = (props) => {
  const [loaded, setLoadingState] = React.useState(false);
  const ready =  loaded && !isMobile();
  return (
    <div className={cn('cover-image', {
      showTape: ready,
    })}>
      {
        ready && (
          <TVNoiseLayer
            height={362}
            width={320}
            opacity={0.3}
          />
        )
      }
      <Img
        setCursorText={props.setCursorText}
        src={coverImgSrc}
        onLoad={() => {
          setLoadingState(true);
        }}
        tooltip="Welcome"
      />
    </div>
  )
}