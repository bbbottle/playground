import React from 'react';

const containerStyle = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
};

const contentItemStyle = {
  padding: 30,
};

export default ({top, down}) => {
  return (
    <div className="container td" style={containerStyle}>
      <div className="top" style={{
        ...contentItemStyle,
        flex: '0 0 auto',
      }}>{top}</div>
      <div className="down" style={{
        ...contentItemStyle,
        height: '100%',
        flex: '1 1 auto',
        overflow: 'auto',
      }}>{down}</div>
    </div>
  );
}