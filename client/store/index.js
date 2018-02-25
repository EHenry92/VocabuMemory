import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import word from './word';
import dictionary from './dictionary';
import game from './game';
import newDictionary from './newDictionary';
import dictionaryList from './dictionaryList';

const reducer = combineReducers({user, dictionary, word, game, newDictionary, dictionaryList})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, localStorage.storeState && JSON.parse(localStorage.storeState), middleware);

store.subscribe(() => {localStorage.storeState = JSON.stringify(store.getState())})

export default store;
export * from './user';
export * from './word';
export * from './dictionary';
export * from './game';
export * from './newDictionary';
export * from './dictionaryList';
