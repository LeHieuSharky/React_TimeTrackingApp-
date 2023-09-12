import {createStore} from 'redux';
import homeReducer from './reducer';
const homeStore = createStore(homeReducer);

export default homeStore;
