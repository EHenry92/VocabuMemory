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
        clicks: 0
      };

    }
    componentWillMount()  {
      this.props.fetchCards(1);
    }
    pick(evt) {
      evt.preventDefault();
      this.setState({clicks: this.state.clicks + 1});
      if (this.state.clicks <= 1) {
        let card = document.getElementsByClassName('gamePiece')[evt.target.value];
        card.classList.add('teal');
        card.classList.remove('black');
      }
      //get the element

      //add a className to the element
      //add the element number to the
      // if (!this.state.card1) {this.setState({card1: evt.target.value})}
      // else {
      //   this.props.addPair(evt.target.value)
      // }
      // console.log(this.state.card1)
    }
    render ()   {
      let list = [];
      if (Array.isArray(this.props.list))  {
        list = this.props.list
      }
      // let list = this.props.list;
        return (
            <div>
              <div className="row">
              {
                list.map((item, idx) => {
                  // return <div key={item.id}>{item.word}</div>
                  return (
                  <div key={item.data} className="col s3">
                    <button
                        key={item.data}
                        value = {idx}
                        onClick={this.pick}
                        className="card-panel black gamePiece">
                        {item.data}
                    </button>
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadInitialDictionary () {
//       dispatch(fetchDictionary(1))
//     },
//     addPair (idx) {
//       dispatch(postMatch(idx))
//     },
//     chooseCards (words) {
//       dispatch(setCards(words))
//     }
//   }
// }
const mapDispatchToProps = {fetchDictionary, postMatch, fetchCards};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
