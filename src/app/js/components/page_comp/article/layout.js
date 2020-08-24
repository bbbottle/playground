import React from 'react';

import './layout.scss';

export const Layout = (props) => {
  const {
    setCursorText,
    left: title,
    progress,
    next,
    prev
  } = props;

  const [cursorText, setText] = React.useState(`${title} - ${progress}`)
  React.useEffect(() => {
    const newText = `${title} - ${progress}`;
    setText(newText);
    setCursorText(newText)
  }, [title, progress])

  const handleMouseEvt = () => { setCursorText(cursorText) }
  return (
    <div
      className="article-layout"
      onMouseLeave={() => {
        setCursorText('');
      }}
    >
      <div
        className="left"
        onClick={() => {
          handleMouseEvt();
          prev();
        }}
        onMouseEnter={handleMouseEvt}
      />
      <div
        className="right"
        onClick={() => {
          handleMouseEvt();
          next();
        }}
        onMouseEnter={handleMouseEvt}
      >
        <div className="right-top">
          {props.rightTop}
        </div>
        <div className="right-bottom">
          {props.rightBottom}
        </div>
      </div>
    </div>
  )
}