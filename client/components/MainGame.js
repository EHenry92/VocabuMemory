import React, {Component} from 'react';
import {fetchCards, destroyCards, fetchDictionaries} from '../store';
import {connect} from 'react-redux';
import {GameBoard} from './index';


export class MainGame extends Component {
    constructor(props)  {
      super(props);
      this.state = {
        level: true,
        choice: -1,
        option: 'level',
        size: 16,
        began: false,
      }
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.playGame = this.playGame.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);

    }
    componentWillMount()  {
      this.props.destroyCards();
      this.props.fetchDictionaries();
    }
    handleOptionChange(evt) {
      this.setState({level: !this.state.level, option: evt.target.value, choice: -1})
    }

    handleSelectChange(evt) {
      this.setState({choice: evt.target.value})
    }
    playGame(evt) {
      evt.preventDefault();
      const act = evt.target.playReset.value;
      if (act == 'play' && this.state.choice > -1) {
              this.props.fetchCards(this.state.option, this.state.choice, this.state.size)
              this.setState({began: true})
      }
      else if (act == 'reset'){
        this.props.destroyCards();
        this.setState({began: false});
      }
    }
    render () {
        return (
          <div id="gameBox">
            <div id="controlBox">
            <form onSubmit = {this.playGame} className="controlPanel">
              <div>
                <div>
                    <input
                      type="checkbox"
                      name="gameGroup"
                      value="dictionary"
                      onChange = {this.handleOptionChange}
                      checked={!this.state.level} />
                      Select a dictionary
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="gameGroup"
                      value="level"
                      onChange = {this.handleOptionChange}
                      checked = {this.state.level} />Select a level

                </div>

              {
                this.state.option === 'level' ?
                <select onChange={this.handleSelectChange}>
                  <option name="choice">Levels</option>
                  {/* <option name="choice" value= "1">1</option> */}
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
              </div>
              <div>
                <div>
                  <label onChange={(evt) => {this.setState({size: evt.target.value})
  }}>Size:
                  <input type="checkbox" name="sizeChoice" value={12} /> 4x3
                  <input type="checkbox" name="sizeChoice" value={16} /> 4x4
                  </label>
                </div>
              </div>
              <div>
              { !this.state.began ?
                  <button type="submit" name="playReset" value="play">Play</button>
                  :
                  <button type="submit" name="playReset" value="reset">Reset</button>
              }
              </div>
          </form>
          </div>
          <div>
          <GameBoard />
          </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionaryList,
  }
}
const mapDispatchToProps = {fetchDictionaries, fetchCards, destroyCards}
export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
