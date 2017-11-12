import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import {fetchDictionary} from '../store/dictionary';
import {postMatch, fetchCards} from '../store/game';
import {connect} from 'react-redux';


export class GameBoard extends Component {
    constructor(props)  {
      super(props);
      this.pick = this.pick.bind(this);
      this.state = {
        clicks: 0,
        click1: -1,
        allDisabled: false
      };

    }
    pick(evt) {
      evt.preventDefault();
      const place = evt.target.value;
      if (this.state.clicks < 2) {
        this.setState({clicks: this.state.clicks + 1});
          let card = document.getElementsByClassName('gamePiece')[place];
          let hint = document.getElementsByClassName('hintButton')[place];
            hint.disabled = false;
            card.classList.add('cardFace');
            card.classList.remove('cardBack');
          if (this.state.click1 == -1) {
            this.setState({click1: evt.target.name})
          }
          else {
            const pairs = document.getElementsByClassName('cardFace');
            hint.disabled = true;
            if (this.state.click1 == evt.target.name) {
                pairs[0].disabled = true;
                pairs[1].disabled = true;
                pairs[0].classList.add('outGame');
                pairs[0].classList.remove('cardFace');
                pairs[0].classList.add('outGame');
                pairs[0].classList.remove('cardFace');
                setTimeout(() => {
                  this.setState({click1: -1, clicks: 0})
                }, 500)
              }
            else {
                hint.disabled = true;
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
    render ()   {
      let list = [];
      if (Array.isArray(this.props.list))  {
        list = this.props.list
      }
        return (
            <div>
              <div className="row gameBoard">
              {
                list.map((item, idx) => {
                  return (
                  <div key={item.data} className="">
                    <button
                        key={item.data}
                        value = {idx}
                        onClick={this.pick}
                        name = {item.id}
                        className="gamePiece cardBack">
                        {item.data}
                    </button>
                    <div>
                    <button
                      className = "hintButton"
                      key={item.hint}
                      value = {item.hint}
                      onClick={this.hint}
                      name = {'hint'}
                      disabled = "true"
                      >Hint
                      </button>
                    </div>
                  </div>)
                })
              }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    list: state.game.cards,
    dictionary: state.dictionary

  }
}
const mapDispatchToProps = {fetchDictionary, postMatch, fetchCards};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
