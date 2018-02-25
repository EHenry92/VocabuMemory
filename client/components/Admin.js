import React, {Component} from 'react';
import {fetchDictionaries, destroyDictionary, fetchWords, destroyWord} from '../store';
import {connect} from 'react-redux';

export class GameBoard extends Component {
    constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount () {
      this.props.fetchWords()
      this.props.fetchDictionaries()
    }
    handleDelete(evt){
      evt.preventDefault();
      let id = evt.target.value;
      let name = evt.target.name;
      name == 'dictionary' ?
      this.props.destroyDictionary(id)
      :
      this.props.destroyWord(id)
    }
    render () {
        return (
            <div>
              <table className="table">
                <thead>
                    <tr>
                    <th className="">Id</th>
                    <th className="">Title</th>
                    <th className="">WordCount</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        this.props.groups.map(dictionary => (
                        <tr key={'dictionary' + dictionary.id}>
                            <td key="id" className="idField">{dictionary.id}</td>
                            <td key="name" className="nameField"> {dictionary.title}
                            </td>
                            <td key="wordCount">{dictionary.words.length}</td>
                            <td key="delete" className="deleteField">
                                <button
                                value={dictionary.id}
                                onClick={this.handleDelete}
                                name="dictionary"
                                className="delete-button">X</button>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                  </table>
                  <table className="table">
                <thead>
                    <tr>
                    <th className="">Id</th>
                    <th className="">Word</th>
                    <th className="">Definition</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        this.props.words.map(word => (
                        <tr key={'word' + word.id}>
                            <td key="id" className="idField">{word.id}</td>
                            <td key="name" className="nameField"> {word.word}
                            </td>
                            <td key="define">{word.definition}</td>
                            <td key="delete" className="deleteField">
                                <button
                                value={word.id}
                                onClick={this.handleDelete}
                                name="word"
                                className="delete-button">X</button>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                  </table>

              </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    groups: state.dictionary,
    words: state.word
  }
}
const mapDispatchToProps = {fetchDictionaries, fetchWords, destroyDictionary, destroyWord};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
