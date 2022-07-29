import { createStore } from "redux";
import stepsReducer from "./reducer";

const store = createStore(stepsReducer);

export default store;
