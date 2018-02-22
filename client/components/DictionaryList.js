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
                    return (<NavLink to={`/dictionary/${list.id}`} key={list.id}><ListItem
                    key= {list.title}
                    style={{fontSize: 30}}
                    leftAvatar= {<img style={{maxWidth: 55, maxHeight: 100}} src={`${list.image}`} />}
                    primaryText={list.title}
                  /></NavLink>)
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
