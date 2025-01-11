<template>
    <div class="page-container">
        <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <div class="input-group">
            <label for="correo">Ingrese su correo</label>
            <input type="email" id="correo" v-model="correo" required />
            </div>
            <div class="input-group">
            <label for="clave">Ingrese su clave</label>
            <input type="password" id="clave" v-model="clave" required />
            </div>
            <button type="submit">Ingreso</button>
        </form>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const correo = ref('');
  const clave = ref('');
  
  const login = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    alert('Inicio de sesión exitoso');
  };
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
  