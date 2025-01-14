<template>
    <div class="page-container">
        <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="checkUserExistence">
            <div class="input-group">
            <label for="correo">Ingrese su correo</label>
            <input type="email" id="correo" v-model="correo" required />
            </div>
            <div class="input-group">
            <label for="clave">Ingrese su clave</label>
            <input type="password" id="clave" v-model="clave" required />
            </div>
            <button type="submit" onclick="getUserByEmail()">Ingreso</button>
        </form>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getUserByEmail } from '../services/axios'; 
  
  const clave = ref('');
  
  const router = useRouter()

  const login = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    alert('Inicio de sesión exitoso');
    
  };

// Definimos las variables reactivas usando `ref`
const correo = ref('');
const user = ref(null);
const loading = ref(false);
const error = ref(null);

getUserByEmail(correo.value, clave.value)
  .then(user => {
  if (user.email == email && user.password == clave){
    router.push({ name: 'Home' })
    console.log('User found:', user);
    router.push({ name: 'Home' })
  }

  else {
  console.log('no sirvbeeeeeeeeeeeeeeeeee')
  }

  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  </script>
  
  <style scoped>

  .page-container {
    background-color: #99d3f7; /* Color de fondo para toda la página */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 1em;
    background: #f4f4f4;
    border-radius: 8px;
  }
  
  h2 {
    text-align: center;
  }
  
  .input-group {
    margin-top: 1em;
    margin-bottom: 2em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
  }
  
  input {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 0.7em;
    background: rgb(28, 111, 255);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: blue;
  }
  </style>
  
