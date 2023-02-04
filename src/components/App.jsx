import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import contactsJson from '../assets/contacts.json';

import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, deleteContactAction, contactsFilterAction } from '../redux/contacts.actions';


import styles from './App.module.css';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter} from './Filter/Filter';
import { useMemo } from 'react';




const App =()=> {

  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);


  // state = {
  //   contacts: [],
  //   filter: '',
  // };


  //   componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts')) || contactsJson;
  //   this.setState({ contacts });
  // }


  //  componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.contacts.length !== 0 &&
  //     prevState.contacts.length !== this.state.contacts.length
  //   ) {

  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }

  //  }
  
  const addContact = ({ name, number }) => {
    const Contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === Contact.name.toLowerCase()
      )
    ) {
      return alert(`${Contact.name} is already in contacts.`);
    }

    dispatch(addContactAction(Contact));

  };

  const handleDelete = id => {
    dispatch(deleteContactAction(id));

  }

  const handleUpdateSearch = event => {
    dispatch(contactsFilterAction(event.target.value));
   
  };
  
  // getVisibleContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };
  

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);
  
  // render() {
  //   const { filter } = this.state;
  //   const visibleContacts = this.getVisibleContacts();


    return (
    <div className={styles.container} >
      <h1>Phonebook</h1>
      <ContactForm onContact={addContact}/>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleUpdateSearch} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} /> 
    </div>
  );
  
  
};


export default App;