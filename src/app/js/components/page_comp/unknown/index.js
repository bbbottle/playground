import React from 'react'
import { WebPlayer } from "@zhoujiahao/yayaplayer";
import { AudioProvider } from "../../data-provider";

export const Unknown = () => {
  return (
    <AudioProvider>
      {({ audio: list }) => {
        return <WebPlayer playList={list} />
      }}
    </AudioProvider>
  );
}
