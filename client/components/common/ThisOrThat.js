import React from 'react';

const ThisOrThat = ({type, text, leftButton, rightButton, onClick}) => {
    return (
      <div style={styles.containerStyle}>
        <input
          name = {leftButton.name}
          value = {leftButton.value}
          onClick = {onClick}
          type = {type}
        />
          {leftButton.text}
        <span>{text}</span>
        <input
          type = {type}
          name = {rightButton.name}
          value = {rightButton.value}
          onClick = {onClick}
          />
          {rightButton.text}
      </div>
    )
}
const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
};

export {ThisOrThat};
