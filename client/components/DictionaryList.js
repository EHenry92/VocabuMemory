import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchDictionaries} from '../store'
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import history from '../history'


export class DictionaryList extends Component {
    componentWillMount() {
      this.props.loadInitialDictionary(this.props.user.id);
    }

    render ()   {
        return (
            <div style={{display: 'flex'}}>
              <List>
                <Subheader inset={true}><h3>{this.props.user.name} dictionary: </h3> </Subheader>
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

            <div>
              <button onClick={() => {history.push('/edit')}} disabled={this.props.user.id || false}>
                    Add/Edit
                    <br />
                    Dictionary
              </button>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionaryList,
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialDictionary (id) {
      dispatch(fetchDictionaries(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryList);
