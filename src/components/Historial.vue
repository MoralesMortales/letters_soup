<template>
    <div class="page-container">
        <div class="login-container">
        <h2>Historial</h2>
        <form>
            <div class="elementoHistorial">
                <p>Sopa 1</p>
                <font-awesome-icon :icon="['fas', 'eye']" size="2xl"/>
            </div>
            <button type="submit" @click="comprobe">Regresar</button>
        </form>
        </div>
    </div>
  </template>

<script setup>

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

  .elementoHistorial {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: solid skyblue;
    border-radius: 10px;
    background-color: skyblue;
  }

  p {
    padding-right: 100px;
  }

  </style>
