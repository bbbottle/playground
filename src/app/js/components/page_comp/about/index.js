import React from 'react';
import { BoxCanvas } from '@bbbottle/box-canvas'

import './index.scss';
import {
  CoveredText, IconText, TagIcon, MailIcon,
  GitHubIcon
} from '@zhoujiahao/bblego';
import { isMobile } from "@zhoujiahao/utils";
import { CoverImage } from "./cover_image";
import { Version } from "./version";
import { BaseLink } from "../../util_comp";
import { GitHubProfileUrl } from "../../../config";


export const About = ({ context }) => {
  const { setCursorText } = React.useContext(context.CursorContext)
  return (
    <div className="about pc-view">
      <BoxCanvas
        buildBoxContent={() => {
          const customStyle = {
            background: '#fff',
            border: 'solid 1px #000',
            position: 'absolute',
            width: '100%',
            height: '100%',
          };
          return <div style={customStyle} />
        }}
      />
      {/*<div className="contact">*/}
      {/*  <IconText*/}
      {/*    icon={(<MailIcon />)}*/}
      {/*  >*/}
      {/*    <CoveredText text="邮箱：嗨@当前域名" />*/}
      {/*  </IconText>*/}
      {/*  <IconText*/}
      {/*    icon={(<GitHubIcon />)}*/}
      {/*  >*/}
      {/*    <BaseLink*/}
      {/*      href={GitHubProfileUrl}*/}
      {/*    >*/}
      {/*      <CoveredText text="砖厂地址" />*/}
      {/*    </BaseLink>*/}
      {/*  </IconText>*/}
      {/*  <IconText*/}
      {/*    icon={(<TagIcon />)}*/}
      {/*  >*/}
      {/*    <CoveredText><Version /></CoveredText>*/}
      {/*  </IconText>*/}
      {/*</div>*/}
      {/*{ !isMobile() && <CoverImage setCursorText={setCursorText} /> }*/}
    </div>
  );
};
