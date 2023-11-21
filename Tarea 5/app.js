const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta raíz para renderizar el formulario y mostrar la lista de contactos
app.get('/', async (req, res) => {
  try {
    // Obtener la lista de contactos desde http://www.raydelto.org/agenda.php
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const contactos = response.data;

    // Renderizar el formulario HTML con Bootstrap y la lista de contactos
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario y Lista de Contactos</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container mt-5">
          <h2>Agregar Contacto</h2>
          <form action="/" method="post">
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono:</label>
              <input type="text" class="form-control" id="telefono" name="telefono" required>
            </div>
            <button type="submit" class="btn btn-primary">Agregar Contacto</button>
          </form>
          <hr>
          <h2 class="mt-5">Listado de Contactos</h2>
          <ul class="list-group mt-4">
            ${contactos.map(contacto => `<li class="list-group-item">${contacto.nombre}: ${contacto.telefono}</li>`).join('')}
          </ul>
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error al obtener la lista de contactos');
  }
});

// Ruta para almacenar un contacto en la API de Raydelto
app.post('/', async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    
    // Almacena el contacto en la API de Raydelto
    await axios.post('http://www.raydelto.org/agenda.php', { nombre, telefono });

    // Redirige de nuevo a la ruta raíz después de almacenar el contacto
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al almacenar el contacto');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
