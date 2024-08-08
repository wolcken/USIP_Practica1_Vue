<template>
    <div>
      <h1>Agenda</h1>
      <input v-model="searchQuery" placeholder="Buscar por nombre o email" @input="filterContacts" class="search-input">
      <table class="contacts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in filteredContacts" :key="contact.id">
            <td>{{ contact.id }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.address }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.country }}</td>
            <td>{{ contact.city }}</td>
            <td>
              <button @click="startEditContact(contact)" class="edit-button">Editar</button>
              <button @click="deleteContact(contact.id)" class="delete-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2 v-if="editMode">Editar Contacto</h2>
      <h2 v-else>Agregar Contacto</h2>
      <form @submit.prevent="editMode ? updateContact() : addContact()" class="contact-form">
        <input v-model="newContact.name" placeholder="Nombre" required>
        <input v-model="newContact.email" placeholder="Email" required>
        <input v-model="newContact.address" placeholder="Dirección" required>
        <input v-model="newContact.phone" placeholder="Teléfono" required>
        <input v-model="newContact.country" placeholder="País" required>
        <input v-model="newContact.city" placeholder="Ciudad" required>
        <button type="submit" class="submit-button">{{ editMode ? 'Actualizar Contacto' : 'Agregar Contacto' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        contacts: [],
        searchQuery: '',
        filteredContacts: [],
        newContact: {
          name: '',
          email: '',
          address: '',
          phone: '',
          country: '',
          city: ''
        },
        editMode: false,
        editContactId: null
      };
    },
    methods: {
      fetchContacts() {
        fetch('http://localhost:3000/contacts')
          .then(response => response.json())
          .then(data => {
            this.contacts = data;
            this.filteredContacts = data;
          });
      },
      addContact() {
        fetch('http://localhost:3000/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newContact)
        })
        .then(response => response.json())
        .then(data => {
          this.contacts.push(data);
          this.filteredContacts.push(data);
          this.resetContactForm();
        });
      },
      deleteContact(id) {
        fetch(`http://localhost:3000/contacts/${id}`, {
          method: 'DELETE'
        })
        .then(() => {
          this.contacts = this.contacts.filter(contact => contact.id !== id);
          this.filteredContacts = this.filteredContacts.filter(contact => contact.id !== id);
        });
      },
      startEditContact(contact) {
        this.newContact = { ...contact };
        this.editMode = true;
        this.editContactId = contact.id;
      },
      updateContact() {
        fetch(`http://localhost:3000/contacts/${this.editContactId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newContact)
        })
        .then(response => response.json())
        .then(updatedContact => {
          const index = this.contacts.findIndex(contact => contact.id === this.editContactId);
          this.contacts.splice(index, 1, updatedContact);
          this.filterContacts();
          this.resetContactForm();
        });
      },
      filterContacts() {
        const query = this.searchQuery.toLowerCase();
        this.filteredContacts = this.contacts.filter(contact =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query)
        );
      },
      resetContactForm() {
        this.newContact = {
          name: '',
          email: '',
          address: '',
          phone: '',
          country: '',
          city: ''
        };
        this.editMode = false;
        this.editContactId = null;
      }
    },
    mounted() {
      this.fetchContacts();
    }
  };
  </script>
  
  <style scoped>
  h1, h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    display: block;
    margin: 0 auto 20px;
    padding: 10px;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .contacts-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .contacts-table th, .contacts-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .contacts-table th {
    background-color: #f4f4f4;
  }
  
  .edit-button, .delete-button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .edit-button {
    background-color: #4CAF50;
    color: white;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .contact-form input {
    margin-bottom: 10px;
    padding: 10px;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  