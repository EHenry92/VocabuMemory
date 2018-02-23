import axios from 'axios';

const GET_DICTIONARY = 'GET_DICTIONARY';
const EDIT_DICTIONARY = 'EDIT_DICTIONARY';
const DELETE_DICTIONARY = 'DELETE_DICTIONARY';


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
   .then(_ => {
     dispatch(deleteDictionary(id))
   })
   .catch(err => err)
 }}


export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_DICTIONARY:
      return action.dictionary;
    case EDIT_DICTIONARY:
      return [...state, action.dictionary];
    case DELETE_DICTIONARY:
      return state.filter(dictionary => dictionary.id != action.id);
    default:
      return state;
  }
}
