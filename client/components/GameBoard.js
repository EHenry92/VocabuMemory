import React, {Component} from 'react';
import {fetchDictionary} from '../store/dictionary';
import {postMatch, fetchCards} from '../store/game';
import {connect} from 'react-redux';
import {Results} from './index';

export class GameBoard extends Component {
    constructor(props)  {
      super(props);
      this.pick = this.pick.bind(this);
      this.hint = this.hint.bind(this);
      this.showresults = this.showresults.bind(this);
      this.state = {
        clicks: 0,
        click1: -1,
        hint: '',
        showHint: false,
        clickCount: 0,
        complete: false
      };

    }
    pick(evt) {
      evt.preventDefault();
      const place = evt.target.value;
      if (this.state.clicks < 2) {
        let aHint = this.props.list[place].hint;
        let iHint = this.props.list[place].hintImage;
        this.setState({clicks: this.state.clicks + 1, hint: aHint, clickCount: this.state.clickCount + 1,hintImage: iHint, showHint: false});

          let card = document.getElementsByClassName('gamePiece')[place];
            card.classList.add('cardFace');
            card.classList.remove('cardBack');
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
                if (this.props.matched.length === this.props.pairs - 1) {
                  setTimeout(() => {
                    this.setState({click1: -1, clicks: 0, complete: true})
                  }, 500)
                }
                else {
                  setTimeout(() => {
                    this.setState({click1: -1, clicks: 0})
                  }, 500)
                }

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
   showresults(evt) {
     evt.preventDefault();
    this.setState({complete: false})
   }

    render ()   {
      let list = [];
      if (Array.isArray(this.props.list))  {
        list = this.props.list
      }
        return (
            <div>
              {
              list.length > 0 ?
                <div>
                    <h4>Directions: Match each word to its definition.</h4>

                </div>
                :
                <div>
                  <h4> Directions: </h4>
                  <ol>
                      <li>Choose a level or dictionary you want to practice.</li>
                      <li>Choose a board size.</li>
                      <li>Click 'play' to start.</li>
                  </ol>

                  </div>
              }
              <div style={{display: 'flex'}}>
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
                <div id="hintBox" >
                    <button
                      onClick={this.hint}>
                      Hint
                      </button>
                    {
                      this.state.showHint &&
                        this.state.hintImage ?
                        <div><img style={{maxWidth: '10vw'}} src={this.state.hintImage} /></div>
                        :
                        <div><a>{this.state.hint}</a></div>
                    }

                    </div>
                </div>
                {
                  this.state.complete &&
                  <Results
                            clickCount = {this.state.clickCount}
                            closePopup={this.showresults}
                            matches={this.props.matched} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    list: state.game.cards,
    dictionary: state.dictionary,
    matched: state.game.matches,
    pairs: state.game.cards.length / 2

  }
}
const mapDispatchToProps = {fetchDictionary, postMatch, fetchCards};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
