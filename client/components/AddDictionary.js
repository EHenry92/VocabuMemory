import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDictionaries, fetchWords, submitData, chooseDictionary, pickWord, newWord, newDict, delWord, clearEdit} from '../store';

export class AddDictionary extends Component {
  constructor (props) {
    super(props);
    this.state = {newD: false, newW: false, changeD: false, changeW: false}
    this.toggleHandler = this.toggleHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.newWordHandler = this.newWordHandler.bind(this);
    this.newDictHandler = this.newDictHandler.bind(this);
    this.filterIt  = this.filterIt.bind(this);
    this.del = this.del.bind(this);
  }
  componentWillMount()  {
    this.props.clearEdit();
    this.props.fetchDictionaries(this.props.userId);
    this.props.fetchWords();
  }
  toggleHandler (evt) {
    evt.preventDefault();
    let action, object;
    [action, object] = evt.target.name.split(' ');
    object === 'dict' && action === 'select' && this.setState({newD: false, changeD: true});
    object === 'dict' && action === 'create' && this.setState({newD: true, changeD: false});
    object === 'word' && action === 'select' && this.setState({newW: false, changeW: true});
    object === 'word' && action === 'create' && this.setState({newW: true, changeW: false});
  }
  submitHandler (evt) {
    evt.preventDefault();
    let dictionary = this.props.dictionaryEdit,
        words = this.props.wordEdit,
        deleted = this.props.deletedWords
    dictionary.title && words.length > 0 &&
    this.props.submitData({dictionary, words, deleted});
  }
  newWordHandler(evt) {
    evt.preventDefault();
    let word = evt.target.word.value;
    let definition =  evt.target.definition.value;
    let sentence = evt.target.hint.value;
    let level = evt.target.level.value;
    let tempId =  this.props.tempIdCount + 1;
    word && definition && this.props.newWord({word, definition, sentence, level, tempId});
    evt.target.reset();
  }
  newDictHandler(evt) {
    evt.preventDefault();
    this.props.newDict({title: evt.target.title.value, userId: this.props.userId})
  }
  del (evt) {
    evt.preventDefault();
    evt.target.value ? this.props.delWord(evt.target.name, evt.target.value)
    :
    this.props.delWord(evt.target.name)
  }
  selectHandler(evt) {
      evt.preventDefault();
      let id = evt.target.value,
          word = evt.target.attributes.name.value,
          tempId = this.props.tempIdCount + 1;
      this.props.pickWord({id, word, tempId})
  }
  filterIt(evt) {
    evt.preventDefault();
    const {words, wordEdit} = this.props;
    let input = evt.target.value.toLowerCase();
    let wordList = words.filter(wItem => {
        let notSelectedYet = wordEdit.find(itm => {return itm.word == wItem.word})? false : true;
        return (notSelectedYet && wItem.word.indexOf(input) > -1)
    })
    this.setState({wordList})
  }

  render () {
    return (
    <div>
      <div id="edit-form">
        <div id="edit-control">
          <div>
            <button name="create dict" onClick={this.toggleHandler}> Create Dictionary </button>
            <button name="select dict" onClick={this.toggleHandler}> Select Dictionary </button>
            {
              this.state.newD &&
                  <form onSubmit={this.newDictHandler}>
                    <label htmlFor="title"> Dictionary Title: </label>
                    <input name="title" type="text" />
                    <button> Add </button>
                  </form>
            }
            {
              this.state.changeD &&
                  <select onChange={(evt) => {evt.preventDefault(); this.props.chooseDictionary(evt.target.value);
                  }}>
                  {
                  this.props.dictionaries.map(group =>
                    group.userId == this.props.userId &&
                    <option value={group.id} key={group.title}>{group.title}</option>)
                  }
                  </select>
            }
          </div>
          <br />
          <br />
          <div>
            <button name="create word" onClick={this.toggleHandler}> Create Word </button>
            <button name="select word" onClick={this.toggleHandler}> Select Word </button>
            {
              this.state.newW &&
                  <form onSubmit={this.newWordHandler}>
                      <label htmlFor="word"> Word: </label>
                      <input name="word" type="text" />
                      <label htmlFor="definition"> Definition: </label>
                      <textarea name="definition" />
                      <label htmlFor="hint"> Sentence: </label>
                      <textarea name="hint" />
                      <label htmlFor="level"> Level </label>
                      <input name="level" type="number" size={1} min={1} max={5}/>
                      <br />
                      <button> Add Word </button>
                  </form>
            }
            {
              this.state.changeW &&
              <div>
                <input type="text" id="myInput" onClick={this.filterIt} onChange={this.filterIt} placeholder="Search for word." />
                <ul id="filteredList" onClick={this.selectHandler} >
                {
                this.state.wordList && this.state.wordList.map(item =>
                  <li value={item.id} name={item.word} key={item.word}>{item.word}</li>)
                }
                </ul>
              </div>
            }
          </div>
        </div>
        <div id="edit-data">
          <table>
            <thead>
            <tr><td>
            <h2>{this.props.dictionaryEdit.title} Words: </h2>
            </td></tr>
            </thead>
            <tbody>
            <tr>
            <td>
              <ul>
              {
                this.props.wordEdit.map(word =>
                  (<li key={word.tempId}>
                    <button style={{float: 'right', backgroundColor: 'black', color: 'white'}} name={word.tempId} value={word.id} onClick={this.del}>x</button>
                    <div style={{textAlign: 'center'}}>{word.word}</div>
                  </li>))
              }
              </ul>
            </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
        <button onClick={this.submitHandler}> Save Changes </button>
        <button onClick={() => {this.props.clearEdit();}}> Clear </button>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dictionaries: state.dictionaryList,
    words: state.word,
    dictionaryEdit: state.newDictionary.dictionary,
    wordEdit: state.newDictionary.words,
    tempIdCount: state.newDictionary.tempIdCount,
    deletedWords: state.newDictionary.deletedWords,
    userId: state.user.id
  }
}
const mapDispatchToProps = {fetchDictionaries, fetchWords, submitData, chooseDictionary, pickWord, newWord, newDict, delWord, clearEdit};
export default connect(mapStateToProps, mapDispatchToProps)(AddDictionary);
