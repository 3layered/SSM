import { UPDATE_APP_LIST, UPDATE_DEPENDENCY_LIST } from '../actions';
import { combineReducers } from 'redux';


const initialState = {
    appList: [],
    dependencyList: []
};

const appListReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_APP_LIST:
            return Object.assign({}, state, {
                appList: action.appList
            });
        case UPDATE_DEPENDENCY_LIST:
            return Object.assign({}, state, {
                dependencyList: action.dependencyList
            });
        default:
            return state;
    }
};


const ssmReducer = combineReducers({
    appListReducer
});

export default ssmReducer;