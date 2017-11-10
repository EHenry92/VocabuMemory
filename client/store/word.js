import axios from 'axios';

const GET_WORDS = 'GET_WORDS';
const GET_WORD = 'GET_WORD';
const GET_LEVEL = 'GET_LEVEL';
const EDIT_WORD = 'EDIT_WORD';
const DELETE_WORD = 'DELETE_WORD';
const ADD_WORD = 'ADD_WORD';

const getWords = (words) => ({type: GET_WORDS, words});
const getWord = (word) => ({type: GET_WORD, word});
const getLevel = (words) => ({type: GET_LEVEL, words});
const editWord = (word) => ({type: EDIT_WORD, word});
const deleteWord = (id) => ({type: DELETE_WORD, id});
const addWord = (word) => ({type: ADD_WORD, word});

export const fetchWords = () => (dispatch) => {
  return axios.get('/api/words')
  .then(res => res.data)
  .then(words => dispatch(getWords(words)))
  .catch(err => err)
}

export const fetchWord = (id) => (dispatch) => {
  return axios.get(`/api/words/${id}`)
  .then(res => res.data)
  .then(word => dispatch(getWord(word)))
  .catch(err => err)
}

export const fetchLevel = (level) => (dispatch) => {
  return axios.get(`/api/words/level/${level}`)
  .then(res => res.data)
  .then(words => dispatch(getLevel(words)))
  .catch(err => err)
}

export const putWord = (id, data) => (dispatch) => {
  return axios.put(`/api/words/${id}`, data)
  .then(res => res.data)
  .then(word => dispatch(editWord(word)))
  .catch(err => err)
}

export const destroyWord = (id) => (dispatch) => {
  return axios.delete(`/api/words/${id}`)
  .then(res => res.data)
  .then(() => dispatch(deleteWord(id)))
  .catch(err => err)
}

export const postWord = (data) => (dispatch) => {
  return axios.post('/api/words', data)
  .then(res => res.data)
  .then(word => dispatch(addWord(word)))
  .catch(err => err)
}

export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_WORDS:
      return action.words
    case GET_WORD:
      return action.word
    case GET_LEVEL:
      return action.wrods
    case EDIT_WORD:
      return [...state, action.word]
    case DELETE_WORD:
      return state.filter(word => word.id !== action.id)
    case ADD_WORD:
      return [...state, action.word]
    default:
      return state;
  }
}
