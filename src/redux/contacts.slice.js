import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactInitialState } from './contacts.init-state';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    contactsFilterAction: (state, { payload }) => {
        state.filter = payload;
    },

    deleteContactAction: (state, { payload }) => {
        state.contacts = state.contacts.filter(contact => contact.id !== payload);
      },
    addContactAction: (state, { payload }) => {
        state.contacts.push(payload);
    }
  },
});

export const { contactsFilterAction, deleteContactAction, addContactAction } = contactSlice.actions;

const persistConfig = {
  key: 'actual_contacts',
  storage,
  whitelist: ['contacts'],
};

export const contactsReducer = persistReducer(persistConfig, contactSlice.reducer);
