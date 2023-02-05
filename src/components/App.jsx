import React from 'react';
import { nanoid } from 'nanoid';


import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, deleteContactAction, contactsFilterAction } from '../redux/contacts.slice';


import styles from './App.module.css';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter} from './Filter/Filter';
import { useMemo } from 'react';




const App =()=> {

  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  
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
  

  

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);
  


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