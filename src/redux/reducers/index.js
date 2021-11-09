import calculator from "./calculator";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ calculator: calculator });

export default rootReducer;
