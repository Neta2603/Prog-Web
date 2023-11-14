import React, { useState, useEffect } from 'react';

const ContactList = ({ contacts }) => {
  return (
    <ul className="list-group mt-3">
      {contacts.map((contact, index) => (
        <li key={index} className="list-group-item">
          {`${contact.nombre} ${contact.apellido} - Teléfono: ${contact.telefono}`}
        </li>
      ))}
    </ul>
  );
};

const AddContactForm = ({ onAddContact }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      nombre,
      apellido,
      telefono
    };

    onAddContact(newContact);

    // Limpiar el formulario después de agregar el contacto
    setNombre('');
    setApellido('');
    setTelefono('');
  };

  return (
    <form onSubmit={handleSubmit} class="mt-3">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Contacto</button>
    </form>
  );
};

const App = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    // Cargar la lista de contactos al cargar la página
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al cargar la lista de contactos:', error));
  }, []);

  const handleAddContact = (newContact) => {
    // Enviar la solicitud POST para agregar el contacto
    fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      body: JSON.stringify(newContact)
    })
      .then(response => response.json())
      .then(data => setContactos([...contactos, data]))
      .catch(error => console.error('Error al agregar el contacto:', error));
  };

  return (
    <div>
      <h1 class="mt-3">Agenda de Contactos</h1>
      <AddContactForm onAddContact={handleAddContact} />
      <h2 class="mt-4">Listado de Contactos</h2>
      <ContactList contacts={contactos} />
    </div>
  );
};

export default App;
