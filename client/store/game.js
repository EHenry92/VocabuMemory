import axios from 'axios';
let initialState = {
  cards: [],
  score: 0,
  matches: []
}
const ADD_MATCH = 'ADD_MATCH';
const VIEW_MATCHES = 'VIEW_MATCHES';
const END_GAME = 'END_GAME';
const PICK_WORDS = 'PICK_WORDS';
const SET_SIZE = 'SET_SIZE';

export const addMatch = (word) => ({type: ADD_MATCH, word});
export const viewMatches = (words) => ({type: VIEW_MATCHES, words});
export const pickWords = (words) => ({type: PICK_WORDS, words});
export const setSize = (size) => ({type: SET_SIZE, size});
export const endGame = () => ({type: END_GAME})

export const postMatch = (id) => (dispatch) => {
  axios.get(`/api/words/${id}`)
  .then(res => res.data)
  .then(word => {
    dispatch(addMatch(word))
  })
  .catch(err => err)
}

export const fetchCards = (option, value, size) => (dispatch) => {
    return (
      option == 'level' ?
          axios.get(`/api/words/level/${value}`)
          .then(res => res.data)
          .then(words => {
            let out = [];
            let mixed = shuffle(words)
            for (var i = 0; i < (size / 2) ; i++) {
              out.push({data: mixed[i].word,
                        match: i,
                        id: mixed[i].id,
                        hint: mixed[i].sentence})
              out.push({data: mixed[i].definition,
                        match: i,
                        id: mixed[i].id,
                        hintImage: mixed[i].image})
            }
            return shuffle(out);
          })
          .then(words => dispatch(pickWords(words)))
          .catch(err => err)
    :
          axios.get(`/api/dictionaries/${value}`)
          .then(res => res.data)
          .then(dictionary => {
            let out = [];
            let mixed = shuffle(dictionary.words)
            for (var i = 0; i < (size / 2);i++) {
              out.push({data: mixed[i].word,
                        match: i,
                        id: mixed[i].id,
                        hint: mixed[i].sentence
                      })
              out.push({data: mixed[i].definition,
                        match: i,
                        id: mixed[i].id,
                        hintImage: mixed[i].image})
            }
            return shuffle(out);
          })
          .then(words => dispatch(pickWords(words)))
          .catch(err => err)
  )
}

export const destroyCards = () => (dispatch) => {
  dispatch(endGame());
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MATCH:
      return Object.assign({}, state, {
        score: state.score + 1,
        matches: [...state.matches, action.word]
      })
    case VIEW_MATCHES:
      return action.words;
    case END_GAME:
      return {
        cards: [],
        score: 0,
      }
    case SET_SIZE:
      return action.size;
    case PICK_WORDS:
      return Object.assign({}, state, {
        cards: action.words,
        score: 0
      })
    default:
      return state;
  }
}

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
