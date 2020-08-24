import React from 'react';

export default (props) => {
  const {
    reverse,
    top,
    down,
    ratio = 0.618,
  } = props;

  const containerStyle = {
    display: 'flex',
    position: 'relative',
    flexDirection: reverse ? 'column-reverse' : 'column',
    height: '100%',
    width: '100%',
  };

  const downHt = `${ratio * 100}%`;
  const topHt = `${(1 - ratio) * 100}%`;

  return (
    <div
      style={containerStyle}
    >
      <div style={{height: topHt}}>{top}</div>
      <div style={{height: downHt}}>{down}</div>
    </div>
  )
}