const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Usuario ficticio para autenticación
const USER = { username: 'eduardo', password: '1234' };

// Ruta para servir la página de inicio de sesión
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta de autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    // HTML actualizado con el nuevo mensaje de bienvenida
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generador de Tareas</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
              }
              h1 {
                  color: #333;
              }
              #welcomeMessage {
                  font-size: 1.2em;
                  margin: 10px 0;
              }
              form {
                  background: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  margin-bottom: 20px;
              }
              label {
                  display: block;
                  margin-bottom: 5px;
              }
              input, textarea, select {
                  width: 100%;
                  padding: 10px;
                  margin-bottom: 10px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
              }
              button {
                  background-color: #5cb85c;
                  color: white;
                  padding: 10px 15px;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 1em;
              }
              button:hover {
                  background-color: #4cae4c;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
              th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
              }
              th {
                  background-color: #5bc0de;
                  color: white;
              }
              tr:hover {
                  background-color: #f1f1f1;
              }
          </style>
      </head>
      <body>
          <h1>Bienvenido al generador de tareas</h1>
          <p id="welcomeMessage">Bienvenido, ${username}!</p>
          
          <h2>Registrar Nueva Tarea</h2>
          <form id="taskForm">
              <label for="taskId">Código de la tarea:</label>
              <input type="text" id="taskId" required><br>
              
              <label for="taskTitle">Título de la tarea:</label>
              <input type="text" id="taskTitle" required><br>
              
              <label for="taskDescription">Descripción:</label>
              <textarea id="taskDescription" required></textarea><br>
              
              <label for="startDate">Fecha de inicio:</label>
              <input type="date" id="startDate" required><br>
              
              <label for="clientName">Nombre del cliente:</label>
              <input type="text" id="clientName" required><br>
              
              <label for="projectId">ID del proyecto:</label>
              <input type="text" id="projectId" required><br>
              
              <label for="comments">Comentarios:</label>
              <textarea id="comments"></textarea><br>
              
              <label for="status">Estatus:</label>
              <select id="status">
                  <option value="Por hacer">Por hacer</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Finalizado">Finalizado</option>
              </select><br>
              
              <button type="submit">Agregar Tarea</button>
              <button type="button" id="clearTasks">Limpiar Tareas</button> <!-- Botón para limpiar tareas -->
          </form>

          <h2>Tareas Registradas</h2>
          <table id="taskTable">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Descripción</th>
                      <th>Fecha de Inicio</th>
                      <th>Nombre del Cliente</th>
                      <th>ID del Proyecto</th>
                      <th>Comentarios</th>
                      <th>Estatus</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Las tareas se agregarán aquí -->
              </tbody>
          </table>

          <script>
              const taskForm = document.getElementById('taskForm');
              const taskTableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

              taskForm.addEventListener('submit', function(event) {
                  event.preventDefault(); // Evita el envío del formulario

                  // Captura los datos del formulario
                  const taskId = document.getElementById('taskId').value;
                  const taskTitle = document.getElementById('taskTitle').value;
                  const taskDescription = document.getElementById('taskDescription').value;
                  const startDate = document.getElementById('startDate').value;
                  const clientName = document.getElementById('clientName').value;
                  const projectId = document.getElementById('projectId').value;
                  const comments = document.getElementById('comments').value;
                  const status = document.getElementById('status').value;

                  // Valida que los campos no estén vacíos
                  if (!taskId || !taskTitle || !taskDescription || !startDate || !clientName || !projectId) {
                      alert('Por favor, completa todos los campos requeridos.');
                      return;
                  }

                  // Crea una nueva fila en la tabla
                  const newRow = taskTableBody.insertRow();
                  newRow.insertCell(0).innerText = taskId;
                  newRow.insertCell(1).innerText = taskTitle;
                  newRow.insertCell(2).innerText = taskDescription;
                  newRow.insertCell(3).innerText = startDate;
                  newRow.insertCell(4).innerText = clientName;
                  newRow.insertCell(5).innerText = projectId;
                  newRow.insertCell(6).innerText = comments;
                  newRow.insertCell(7).innerText = status;

                  // Limpia el formulario
                  taskForm.reset();
              });

              // Función para limpiar las tareas
              document.getElementById('clearTasks').addEventListener('click', function() {
                  // Limpia la tabla de tareas
                  taskTableBody.innerHTML = '';
              });
          </script>
      </body>
      </html>
    `);
  } else {
    res.send('<h1>Error de autenticación: Usuario o contraseña incorrectos</h1>');
  }
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
