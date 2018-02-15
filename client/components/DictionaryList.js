import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchDictionaries} from '../store/dictionary'
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


export class DictionaryList extends Component {
    componentWillMount()  {
      this.props.loadInitialDictionary();
      // console.log(this.props);
    }

    render ()   {
        return (
            <div>
              <List>
                <Subheader inset={true}>Select a dictionary: </Subheader>
                {
                  this.props.dictionary.map(list => {
                    return (<ListItem
                    key= {list.title}
                    leftAvatar= {<img style={{maxWidth: 50, maxHeight: 50}} src={`${list.image}`} />}
                    primaryText={list.title}
                  />)
                  })
                }
            </List>
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
