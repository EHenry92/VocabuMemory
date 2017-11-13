import axios from 'axios';

const GET_DICTIONARIES = 'GET_DICTIONARIES';
const GET_DICTIONARY = 'GET_DICTIONARY';
const EDIT_DICTIONARY = 'EDIT_DICTIONARY';
const DELETE_DICTIONARY = 'DELETE_DICTIONARY';
const ADD_DICTIONARY = 'ADD_DICTIONARY';
const ADD_DICTIONARY_WORD = 'ADD_DICTIONARY_WORD';

export const getDictionaries = (dictionaries) => {
  const action = {type: GET_DICTIONARIES, dictionaries};
  return action;
}

export const getDictionary = (dictionary) => {
  const action = {type: GET_DICTIONARY, dictionary};
  return action;
}
export const editDictionary = (dictionary) => {
  const action = {type: EDIT_DICTIONARY, dictionary};
  return action;
}

export const deleteDictionary = (id) => {
  const action = {type: DELETE_DICTIONARY, id};
  return action;
}

export const addDictionary = (dictionary) => {
  const action = {type: ADD_DICTIONARY, dictionary};
  return action;
}

export const addDictionaryWord = (id, word) => {
  const action = {type: ADD_DICTIONARY_WORD, id, word};
  return action;
}

export const fetchDictionaries = () => {
 return (dispatch) =>  {
  axios.get('/api/dictionaries')
  .then(res => res.data)
  .then(dictionaries => {
    dispatch(getDictionaries(dictionaries))
  })
  .catch(err => err)
}}

export const fetchDictionary = (id) => {
  return (dispatch) =>  {
   axios.get(`/api/dictionaries/${id}`)
   .then(res => res.data)
   .then(dictionary => {
     dispatch(getDictionary(dictionary))
   })
   .catch(err => err)
 }}

 export const putDictionary = (id, data) => {
   return (dispatch) => {
    axios.put(`/api/dictionaries/${id}`, data)
    .then(res => res.data)
    .then(dictionary => {
      dispatch(editDictionary(dictionary))
    })
    .catch(err => err)
   }
 }

 export const destroyDictionary = (id) => {
  return (dispatch) =>  {
   axios.delete(`/api/dictionaries/${id}`)
   .then(res => res.data)
   .then(()=> {
     dispatch(deleteDictionary(id))
   })
   .catch(err => err)
 }}

 export const postDictionary = (data) => {
  return (dispatch) =>  {
    axios.get('/api/dictionaries', data)
    .then(res => res.data)
    .then(dictionary => {
      dispatch(addDictionary(dictionary))
    })
    .catch(err => err)
  }
}

export const addWord = (dictionaryId, wordId) => {
  return (dispatch) =>  {
    axios.get(`/api/dictionaries/${dictionaryId}/${wordId}`)
    .then(res => res.data)
    .then(dictionary => {
      dispatch(addDictionaryWord(dictionary))
    })
    .catch(err => err)
  }
}

export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      return action.dictionaries;
    case GET_DICTIONARY:
      return action.dictionary;
    case EDIT_DICTIONARY:
      return [...state, action.dictionary];
    case DELETE_DICTIONARY:
      return state.filter(dictionary => dictionary.id !== action.id);
    case ADD_DICTIONARY:
      return [...state, action.dictionary]
    case ADD_DICTIONARY_WORD:
      return [...state, action.dictionary]
    default:
      return state;
  }
}
