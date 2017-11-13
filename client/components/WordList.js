import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchDictionary} from '../store/dictionary'
import {connect} from 'react-redux';


export class WordList extends Component {
    componentWillMount()  {
      this.props.loadInitialDictionary(1);
      console.log(this.props);
    }

    render ()   {
        return (
            <div>

               {/* <ul>
                {
                  this.props.dictionary.words.map(list => {
                    return <li key={list.id}>{list.word}:
                        <p>{list.definition}</p>
                    </li>
                  })
                }
              </ul> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialDictionary (number) {
      dispatch(fetchDictionary(number))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WordList);
