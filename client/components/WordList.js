import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchDictionary} from '../store/dictionary';
import {connect} from 'react-redux';
import fetchWords from '../store';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export class WordList extends Component {
    constructor(props)  {
      super(props);
      this.state = {
        dictionary: true
      }
    }
    componentWillMount()  {
      let location = this.props.location.pathname;
      if (location.startsWith('/dictionary')) {
            let number = location.slice(location.lastIndexOf('/') + 1)
              this.props.fetchDictionary(number);
      }
      else {
        this.setState({dictionary: false})
          this.props.fetchWords();
      }
    }

    render ()   {
        let words;
        if (this.state.dictionary) {
          words = this.props.dictionary.words;
        }
        else {words = this.props.words}
        return (
            <div>
              { words &&
                words.map(list => {
                  return <Card key={list.id}>
                  <CardHeader
                    title={list.word}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}> {list.definition}
                  </CardText>
                </Card>
                })
              //  <ul>
              //   {
              //     words.map(list => {
              //       return <li key={list.id}>
              //       <div>{list.word}:
              //           <p>{list.definition}</p>
              //         </div>
              //       </li>
              //     })
              //   }
              // </ul>
              }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    words: state.words
  }
}
const mapDispatchToProps = {fetchDictionary, fetchWords}
export default connect(mapStateToProps, mapDispatchToProps)(WordList);
