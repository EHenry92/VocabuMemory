import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import {fetchDictionaries} from '../store/dictionary'
import {connect} from 'react-redux';


export class DictionaryList extends Component {
    componentWillMount()  {
      this.props.loadInitialDictionary();
      // console.log(this.props);
    }

    render ()   {
        return (
            <div> Select One
              <ul>
                {
                  this.props.dictionary.map(list => {
                    return <li key={list.id}>{list.title}</li>
                  })
                }
              </ul>
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
    loadInitialDictionary () {
      dispatch(fetchDictionaries())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryList);
