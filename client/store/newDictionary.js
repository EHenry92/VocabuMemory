import axios from 'axios';
import history from '../history';
const defaultState = {
  words: [],
  dictionary: {},
  tempIdCount: 0,
  deletedWords: []
}

//if word contains an id, it is an existing word else it is a new word
//if dictionary contians an id, it is an existing dictionary, else a new dictionary
const SELECT_DICTIONARY = 'SELECT_DICTIONARY';
const SELECT_WORD = 'SELECT_WORD';
const ADD_WORD = 'ADD_WORD';
const ADD_DICTIONARY = 'ADD_DICTIONARY';
const REMOVE_WORD = 'REMOVE_WORD';
const SUBMIT_CHANGES = 'SUBMIT_CHANGES';
const CLEAR = 'CLEAR';

export const pickDict = (data, words) => ({type: SELECT_DICTIONARY, data, words});
export const pickWord = (data) => ({type: SELECT_WORD, data});
export const newWord = (data) => ({type: ADD_WORD, data});
export const newDict = (data) => ({type: ADD_DICTIONARY, data});
export const delWord = (tempId, id) => ({type: REMOVE_WORD, tempId, id});
export const submitChanges = (dictionaryData) => ({type: SUBMIT_CHANGES, dictionaryData});
export const clearEdit = () => ({type: CLEAR});


const addDcitionary = (data) => {
  return axios.post('/api/dictionaries', data )
      .then(res => res.data)
      .then(dInfo => dInfo.id)
      .catch(err => err)
}

const addWord = (data) => {
  return axios.post('/api/words', data )
      .then(res => res.data)
      .then(wInfo => wInfo.id)
      .catch(err => err)
}
const makeupdates = (dictId, stateData) => {
  stateData.words.map(word => {
    new Promise((resolve, reject) => {
      let newWordId = word.id || addWord(word);
      newWordId ? resolve(newWordId) : reject(newWordId)
    })
    .then(newId => axios.post(`/api/groups/${dictId}/${newId}`))
    .then(res => res.data)
    .catch(err => err)
  })
}

export const submitData = (stateData) => dispatch => {
  new Promise((resolve, reject) => {
      let theid = stateData.dictionary.id || addDcitionary(stateData.dictionary)
      theid ? resolve(theid) : reject(theid)
  })
  .then(finalId => {
    axios.delete(`/api/groups/all/${finalId}`);
    return finalId;
  })
  .then(id =>
    new Promise((resolve, reject) => {
      let temp = makeupdates(id, stateData);
      id ? resolve(id) : reject(temp)
    })
  )
  .then( did => {
    history.push(`/dictionary/${did}`)
  })
}

export const chooseDictionary = id => dispatch => {
  axios.get(`/api/dictionaries/${id}`)
  .then(res => res.data)
  .then(dictionary => {
    let words = dictionary.words.map((el, idx) => {
      el.tempId = idx;
      return el;
    })
    dispatch(pickDict({id: dictionary.id, title: dictionary.title}, words))
  })
  .catch(err => err)
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_DICTIONARY :
      return {...state,
        dictionary: action.data,
        words: action.words,
        tempIdCount: action.words.length};
    case ADD_DICTIONARY:
      return Object.assign({}, state, {dictionary: action.data})
    case SELECT_WORD:
    case ADD_WORD:
      return Object.assign({}, state, {
        words: [...state.words, action.data],
        tempIdCount: state.tempIdCount + 1
      })
    case REMOVE_WORD:
      return Object.assign({}, state, {
        words: state.words.filter(item => item.tempId != action.tempId),
        deletedWords: [...state.deletedWords, action.id]
      });
    case CLEAR:
      return defaultState;
    default:
      return state;
  }
}
