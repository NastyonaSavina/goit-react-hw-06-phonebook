import { combineReducers } from 'redux';


import { contactInitialState} from './contacts.init-state';

import { FILTER, DELETE_CONTACT, ADD_CONTACT } from './contacts.types';


const filterReducer = (state = contactInitialState.filter, { type, payload }) => {
  switch (type) {
    case FILTER:
      return payload;

    default:
      return state;
  }
};

const contactsListsReducer = (state = contactInitialState.contacts, { type, payload }) => {
  switch (type) {
    case DELETE_CONTACT:
      return state.filter(contact => contact.id !== payload);
    
    case ADD_CONTACT:
      return [...state, payload];

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  filter: filterReducer,
  contacts: contactsListsReducer,
});