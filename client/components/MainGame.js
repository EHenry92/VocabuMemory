import React, {Component} from 'react';
import {fetchDictionaries} from '../store/dictionary';
import {fetchCards, destroyCards} from '../store/game';
import {connect} from 'react-redux';
import {GameBoard, Results} from './index';


export class MainGame extends Component {
    constructor(props)  {
      super(props);
      this.state = {
        level: true,
        value: -1,
        option: 'level',
        size: 16,
        began: false
      }
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.playGame = this.playGame.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleSizeChange = this.handleSizeChange.bind(this);
    }
    componentWillMount()  {
      this.props.fetchDictionaries();
    }
    handleOptionChange(evt) {
      this.setState({level: !this.state.level, option: evt.target.value, value: -1})
    }
    handleSizeChange(evt) {
      this.setState({size: evt.target.value})
    }
    handleSelectChange(evt) {
      this.setState({value: evt.target.value})
    }
    playGame(evt) {
      evt.preventDefault();
      if ((!this.state.began) && (this.state.value > -1 && this.state.option)) {
              this.props.fetchCards(this.state.option, this.state.value, this.state.size)
              this.setState({began: true})
      }
      else {
        this.props.destroyCards();
        this.setState({began: false});
      }

    }
    render () {
      let showMessage = false;
      if (this.state.began && (this.props.matched.length == this.state.size / 2)) {
          showMessage = true;
      }
        return (
          <div>
            <div id="controlBox">
              <form
                onSubmit = {this.playGame}
                className="controlPanel">
              <div>

                  <input
                    type="radio"
                    name="gameGroup"
                    value="dictionary"
                    onChange = {this.handleOptionChange}
                    checked={!this.state.level} />Select a dictionary

                </div>
                <div>

                  <input
                    type="radio"
                    name="gameGroup"
                    value="level"
                    onChange = {this.handleOptionChange}
                    checked = {this.state.level} />Select a level

              </div>
              {
                this.state.option === 'level' ?
                <select onChange={this.handleSelectChange}>
                <option name="choice">Levels</option>
                  <option name="choice" value= "1">1</option>
                  <option name="choice" value= "2">2</option>
                  <option name="choice" value= "3">3</option>
                  <option name="choice" value= "4">4</option>
                  <option name="choice" value= "5">5</option>
                </select>
                :
                <select name="choice" onChange={this.handleSelectChange}>
                <option name="choice">Dictionaries</option>
                {
                  this.props.dictionary.map(list => {
                    return <option name="choice" value ={list.id} key={list.id}>{list.title}</option>
                  })
                }
              </select>
              }
              <div>
                <label onChange={this.handleSizeChange}>Size:
                <input type="radio" name="sizeChoice" value={12} /> 4x3
                <input type="radio" name="sizeChoice" value={16} /> 4x4
                </label>
              </div>
              { !this.state.began ?
                  <button type="submit" value="play">Play</button>
                  :
                  <button value="reset">Reset</button>
              }
              </form>
              </div>
              <div>
              <GameBoard />
              <div id="wordBank">
              <ul>
              {
                this.props.matched &&
                this.props.matched.map(word => {
                  return (<li key={word.id}>{word.word}
                  <p>{word.definition}</p>
                  </li>)
                })
              }
              </ul>
              </div>
              </div>
                {
                  showMessage &&
                  <Results />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    matched: state.game.matches
  }
}
const mapDispatchToProps = {fetchDictionaries, fetchCards, destroyCards}
export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
