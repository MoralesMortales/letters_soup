<template>
    <div class="page-container">
        <div class="crear-usuario">
        <h2>Crear Usuario</h2>
        <form @submit.prevent="crearUsuario">
            
            <div class="input-group">
                <label for="correo">Ingrese su correo</label>
                <input type="email" id="correo" v-model="correo" required />
            </div>
            
            <div class="input-group">
                <label for="clave">Ingrese una Clave</label>
                <input type="password" id="clave" v-model="clave" required />
            </div>
            
            <div class="input-group">
                <label for="confirmar-clave">Confirme su clave</label>
                <input type="password" id="confirmar-clave" v-model="confirmarClave" required />
            </div>

            <button type="submit">CREAR</button>
        </form>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const correo = ref('');
  const clave = ref('');
  const confirmarClave = ref('');
  
  const crearUsuario = () => {
    if (clave.value !== confirmarClave.value) {
      alert('Las claves no coinciden');
      return;
    }
    // Aquí puedes agregar la lógica para crear el usuario
    alert('Usuario creado con éxito');
    router.push({ name: 'Home' })
    
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
    padding: 1em;
    background: #f4f4f4; /* Fondo del formulario */
    border-radius: 8px;
  }
  
  .crear-usuario {
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
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: green;
  }
  
  </style>
  