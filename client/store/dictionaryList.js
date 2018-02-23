import axios from 'axios';

const GET_DICTIONARIES = 'GET_DICTIONARIES';

export const getDictionaries = dictionaries => {
  const action = {type: GET_DICTIONARIES, dictionaries};
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

 export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      return action.dictionaries;
    default:
      return state;
  }
}
