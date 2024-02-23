import { combineReducers } from "redux";
import categoryReducer from './actions/reducers/categoryReducer';
import commonReducer from './actions/reducers/commonReducer';
import manufacturerReducer from './actions/reducers/manufacturerReducer';

const rootReducer = combineReducers({
    categoryReducer,
    commonReducer,
    manufacturerReducer
});

export default rootReducer;