import React from 'react';

const PopOverlay = ({closeText, onClose, headerText, children}) => {
  const {overlayStyle, contentBoxStyle, closeButton, headerStyle, contentStyle} = styles;
  return (
    <div style={overlayStyle}>
      <div style={contentBoxStyle}>
        <div onClick={onClose} style={closeButton}>{closeText}</div>
        <div style={headerStyle}>
          {headerText}
        </div>
        <div style={contentStyle}>
        {children}
        </div>
      </div>
    </div>
  )

};

const styles = {
  overlayStyle: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  contentBoxStyle: {
    textAlign: 'center',
    position: 'absolute',
    left: '15%',
    right: '15%',
    top: '15%',
    bottom: '15%',
    backgroundColor: 'white',
  },
  contentStyle: {
    padding: 20
  },
  closeButton: {
    float: 'right',
    color: 'grey',
    cursor: 'default',
    marginTop: 20,
    marginRight: 20
  },
  headerStyle: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    boxShadow: '0px 4px 3px -2px #999999',
    marginBottom: 10,
    paddingTop: 20
  }
}

export {PopOverlay}
