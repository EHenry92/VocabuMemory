import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import {fetchDictionary} from '../store/dictionary';
import {postMatch, fetchCards} from '../store/game';
import {connect} from 'react-redux';
import Results from './Results.js'

export class GameBoard extends Component {
    constructor(props)  {
      super(props);
      this.pick = this.pick.bind(this);
      this.hint = this.hint.bind(this);
      this.state = {
        clicks: 0,
        click1: -1,
        hint: '',
        showHint: false,
        clickCount: 0
      };

    }
    pick(evt) {
      evt.preventDefault();
      const place = evt.target.value;
      if (this.state.clicks < 2) {
        let aHint = this.props.list[place].hint;
        this.setState({clicks: this.state.clicks + 1, hint: aHint, clickCount: this.state.clickCount + 1, showHint: false});

          let card = document.getElementsByClassName('gamePiece')[place];
            card.classList.add('cardFace');
            card.classList.remove('cardBack');

          let inGame = document.getElementsByClassName('cardBack');
          if (!inGame){
            displayResults(this.state.clickCount);
          }

          if (this.state.click1 == -1) {
            this.setState({click1: evt.target.name})
          }
          else {
            const pairs = document.getElementsByClassName('cardFace');
            if (this.state.click1 == evt.target.name) {
                pairs[0].disabled = true;
                pairs[1].disabled = true;
                pairs[0].classList.add('outGame');
                pairs[0].classList.remove('cardFace');
                pairs[0].classList.add('outGame');
                pairs[0].classList.remove('cardFace');
                this.props.postMatch(evt.target.name);
                setTimeout(() => {
                  this.setState({click1: -1, clicks: 0})
                }, 500)
              }
            else {
                setTimeout(() => {
                  pairs[0].classList.add('cardBack');
                  pairs[0].classList.remove('cardFace');
                  pairs[0].classList.add('cardBack');
                  pairs[0].classList.remove('cardFace');
                  this.setState({click1: -1, clicks: 0})
                }, 2000);
            }
          }
      }
    }
    hint(evt) {
      evt.preventDefault();
      this.setState({showHint: true})
    }
    render ()   {
      let list = [];
      if (Array.isArray(this.props.list))  {
        list = this.props.list
      }
        return (
            <div>
              <div id="hintBox">
              <button
                onClick={this.hint}>
                Hint
                </button>
              {
                this.state.showHint &&
               <div><a>{this.state.hint}</a></div>

              }
              </div>
              <div className="gameBoard">
              {
                list.map((item, idx) => {
                  return (
                  <div key={item.data}>
                    <button
                        key={item.data}
                        value = {idx}
                        onClick={this.pick}
                        name = {item.id}
                        className="gamePiece cardBack">
                        {item.data}
                    </button>
                  </div>)
                })
              }
                </div>
            </div>
        )
    }
    displayResults(clicks)  {
      console.log ("here")
      return (
        <Results clickCount={clicks} />
      )
    }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    list: state.game.cards,
    dictionary: state.dictionary,
    matched: state.game.matches

  }
}
const mapDispatchToProps = {fetchDictionary, postMatch, fetchCards};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
