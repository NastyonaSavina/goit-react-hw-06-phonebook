import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { contactInitialState } from './contacts.init-state';
import { rootReducer } from './contacts.reducer';

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, contactInitialState, enhancer);