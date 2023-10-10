document.addEventListener('DOMContentLoaded', () => {
    const addContactForm = document.getElementById('addContactForm');
    const contactList = document.getElementById('contactList');
  
    // Cargar la lista de contactos al cargar la página
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => {
        data.forEach(contact => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.textContent = `${contact.nombre} ${contact.apellido} - Teléfono: ${contact.telefono}`;
          contactList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error al cargar la lista de contactos:', error);
      });
  
    // Agregar un nuevo contacto
    addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const telefono = document.getElementById('telefono').value;
  
      const newContact = {
        nombre,
        apellido,
        telefono
      };
  
      // Enviar la solicitud POST para agregar el contacto
      fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(newContact)
      })
        .then(response => response.json())
        .then(data => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.textContent = `${data.nombre} ${data.apellido} - Teléfono: ${data.telefono}`;
          contactList.appendChild(listItem);
          
          // Limpiar el formulario después de agregar el contacto
          addContactForm.reset();
        })
        .catch(error => {
          console.error('Error al agregar el contacto:', error);
        });
    });
  });
  