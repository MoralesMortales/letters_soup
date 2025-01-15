<template>
    <div class="page-container">
        <div class="login-container">
        <h2>Historial</h2>
        <form>
            <div class="elementoHistorial">
                <h6>Sopa 1</h6>
                <font-awesome-icon :icon="['fas', 'eye']" size="2xl" class="ojo"/>
            </div>
            <router-link to="/" class="router">Regresar</router-link>
        </form>
        </div>
    </div>
  </template>

<script setup>
</script>

<style scoped>

  .ojo:hover {
    color: teal;
    cursor: pointer;
  }

  .page-container {
    background-color: #99d3f7; /* Color de fondo para toda la página */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    width: 50%;
    max-width: 400px;
    margin: auto;
    padding: 1em;
    background: #f4f4f4;
    border-radius: 8px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
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
  
  .router {
    display: flex;
    justify-content: center ;
    width: 70%;
    padding: 0.7em;
    background: rgb(28, 111, 255);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: auto;
    text-decoration: none;
    font-size: 120%;
  }
  
  .router:hover {
    background: blue;
  }

  .elementoHistorial {
    margin: 20px auto;
    gap: 50px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: solid rgb(250, 208, 153);
    border-radius: 10px;
    background-color: rgb(250, 208, 153);
    width: 50%
  }

  p {
    margin: 0px;
  }

  </style>
