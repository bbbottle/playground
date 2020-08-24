import React from 'react';

export default (props) => {
  const { cols } = props;
  const containerStyle = {
    display: 'flex',
    height: '100%',
    width: '100%',
  };
  return (
    <div style={containerStyle}>
      {
        cols.map(col => {
          return (
            <div style={{flex: '1'}}>{col}</div>
          )
        })
      }
    </div>
  )
}
