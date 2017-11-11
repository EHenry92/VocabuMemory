import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import {fetchDictionaries} from '../store/dictionary';
import {fetchCards, destroyCards} from '../store/game';
import {connect} from 'react-redux';
import {GameBoard} from './index';


export class MainGame extends Component {
    constructor(props)  {
      super(props);
      this.state = {
        level: true,
        value: -1,
        option: 'level',
        size: 20,
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
        return (
            <div> Select One
              <form
                onSubmit = {this.playGame}
                className="controlPanel">
              <div>
                dictionary
                  <input
                    type="radio"
                    name="gameGroup"
                    value="dictionary"
                    onChange = {this.handleOptionChange}
                    checked={!this.state.level} />

                </div>
                <div>
                  Level
                  <input
                    type="radio"
                    name="gameGroup"
                    value="level"
                    onChange = {this.handleOptionChange}
                    checked = {this.state.level} />

              </div>
              {
                this.state.option === 'level' ?
                <select onChange={this.handleSelectChange}>
                <option name="choice">Choose</option>
                  <option name="choice" value= "1">1</option>
                  <option name="choice" value= "2">2</option>
                  <option name="choice" value= "3">3</option>
                  <option name="choice" value= "4">4</option>
                  <option name="choice" value= "5">5</option>
                  <option name="choice" value= "6">6</option>
                  <option name="choice" value= "7">7</option>
                  <option name="choice" value= "8">8</option>
                  <option name="choice" value= "9">9</option>
                  <option name="choice" value= "10">10</option>
                </select>
                :
                <select name="choice" onChange={this.handleSelectChange}>
                <option name="choice">Choose</option>
                {
                  this.props.dictionary.map(list => {
                    return <option name="choice" value ={list.id} key={list.id}>{list.title}</option>
                  })
                }
              </select>
              }
              <div>
                <label onChange={this.handleSizeChange}>Size:
                4x3<input type="radio" name="sizeChoice" value={12} />
                4x5<input type="radio" name="sizeChoice" value={20} />
                {/* 5x5<input type="radio" name="sizeChoice" value={25} /> */}
                </label>
              </div>
              { !this.state.began ?
                  <button type="submit" value="play">Play</button>
                  :
                  <button value="reset">Reset</button>
              }
              </form>
              <GameBoard />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary
  }
}
const mapDispatchToProps = {fetchDictionaries, fetchCards, destroyCards}
export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
