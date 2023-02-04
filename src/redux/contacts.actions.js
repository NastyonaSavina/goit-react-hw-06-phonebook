import { FILTER, DELETE_CONTACT, ADD_CONTACT } from './contacts.types';

export const contactsFilterAction = payload => ({ type: FILTER, payload });
export const deleteContactAction = payload => ({ type: DELETE_CONTACT, payload });
export const addContactAction = payload => ({ type: ADD_CONTACT, payload });