import React from 'react';
import {PopOverlay} from './common'


export default function Results (props) {
      let rate = (props.matches.length * 200 / props.clickCounter);

        return (
          <PopOverlay
            onClose = {props.closePopup}
            closeText = {'X'}
            headerText={'Vocabumemory'}
          >
          {
            rate >= 65 &&
            <div>
              <h1>You did great!</h1>
              <p>Try moving one level up.</p>
              </div>
          }
          {
            rate < 20 ?
            <div>
                <h1>You found all the matches!.</h1>
                <p>Head over to our dictionary to continue learning more words.</p>
                </div>
            :
            <div>
              <h1>You're doing well.</h1>
                <p>Start another round to continue increasing your vocabulary.</p>
              </div>
          }
          <div id="wordBank">
            <div>Your Words: </div>
              <ul>
              {
                props.matches &&
                props.matches.map(word =>
                  <li key={word.id}>* {word.word}: {word.definition}</li>
                )
              }
              </ul>
              </div>
        </PopOverlay>

        )
}
