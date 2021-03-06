import React, {Component} from 'react';
import {fetchDictionary, fetchWords} from '../store';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export class WordList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dictionary: true
      }
    }
    componentWillMount() {
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


    render () {
        let words;
        if (this.state.dictionary) {
          words = this.props.dictionary.words;
        }
        else {words = this.props.words}
        return (
          <div>
            {
                this.props.dictionary.id &&
                <div>{this.props.dictionary.title}
                </div>
              }
            <div id="wordList">
              { words &&
                words.map(list =>
                  (<Card
                  key={list.id}
                  style={{width: '20vw', margin: 5}}>
                  <CardHeader
                    title={list.word}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true} > {list.definition}
                  </CardText>
                </Card>)
                )
              }
            </div>
          </div>

        )
    }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    words: state.word
  }
}
const mapDispatchToProps = {fetchDictionary, fetchWords}
export default connect(mapStateToProps, mapDispatchToProps)(WordList);
