<template>
  <div>
    <h2>Mis Sopas</h2>
    <div v-if="soups.length === 0">
      <p>No tienes sopas disponibles.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="soup in soups" :key="soup.id">
          <button @click="goTo(soup.id)"><strong>Sopa </strong> {{ soup.id }}</button><br>
        </li>
      </ul>
    </div>
  </div>
  </template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

let userId = 1;
  const user = ref(null);
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);  // Convierte el string de vuelta a un objeto
      userId = user.value.id
      console.log(userId)
    } else {
    }
  };
const soups = ref([]);

const fetchSoups = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/sopas/${userId}`);
    soups.value = response.data;
  } catch (error) {
    console.error("Error al obtener las sopas:", error);
  }
};
  onMounted(() => {
    getUserFromLocalStorage();
  fetchSoups();
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
