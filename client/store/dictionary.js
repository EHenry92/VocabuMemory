import axios from 'axios';

const GET_DICTIONARIES = 'GET_DICTIONARIES';
const EDIT_DICTIONARY = 'EDIT_DICTIONARY';
const DELETE_DICTIONARY = 'DELETE_DICTIONARY';

const getDictionaries = (dictionaries) => {
  const action = {type: GET_DICTIONARIES, dictionaries }
}
