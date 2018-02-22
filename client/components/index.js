/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as DictionaryList} from './DictionaryList';
export {default as GameBoard} from './GameBoard';
export {default as WordList} from './WordList';
export {default as MainGame} from './MainGame';
export {default as Home} from './Home';
export {default as Results} from './Results';
export {default as Admin} from './Admin';
export {default as AddDictionary} from './AddDictionary';


