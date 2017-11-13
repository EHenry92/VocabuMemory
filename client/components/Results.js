import React from 'react';

export default function Results (props) {
      let rate = (props.matches.length * 200 / props.clickCounter);

        return (
          <div className="popup">
        <div className="popup_inner">
        <button onClick={props.closePopup}>close me</button>
          <h1>Good Job!</h1>
          {
            rate >= 65 &&
            <div>You did greate!. Try moving one level up.</div>
          }
          {
            rate < 20 ?
            <div>You found all the matches!. Head over to our dictionary to continue learning more words.</div>
            :
            <div>
              You're doing well. Start another round to continue increasing your vocabulary.
              </div>
          }
          <div id="wordBank">
            <div>Your Words: </div>
              <ul>
              {
                props.matches &&
                props.matches.map(word => {
                  return (<li key={word.id}>* {word.word}: {word.definition}
                  </li>)
                })
              }
              </ul>
              </div>
        </div>
      </div>
        )
}
