import React from 'react'
import { YayaPlayer as Audio } from "@zhoujiahao/yayaplayer";
import { AudioProvider } from "../../data-provider";

export const Unknown = () => {
  return (
    <AudioProvider>
      {({ audio }) => {
        return (
          <Audio
            src={audio[0].url}
            name={audio[0].name}
          />
        );
      }}
    </AudioProvider>
  );
}

// export const Unknown = () => {
//   return <Line />
// }