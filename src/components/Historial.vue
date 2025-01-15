<template>
    <div class="page-container">
        <div class="login-container">
        <h2>Mis sopas</h2>
        <form>
            <div v-if="soups.length === 0">
                <p>No tienes sopas disponibles.</p>
            </div>
            <div v-else>
                <ul>
                    <li v-for="soup in soups" :key="soup.id">
                        <div class="elementoHistorial" >
                            <p>Sopa {{ counter() }}</p>
                            <router-link class="linkOjo" :to="`/detail${num}`"><font-awesome-icon class="ojo" :icon="['fa', 'eye']" size="2xl" style="color:#444"  /></router-link>
                        </div>
                    </li>
                </ul>
                
            </div>
            <router-link to="/" class="router">Regresar</router-link>
        </form>
        </div>
    </div>
  </template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

let num = 0;

    function counter() {
    ++num;    
    return num
  }


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

const goTo = (soupId) => {
  router.push({ name: 'detail_soup', params: { soup_id: soupId } });
}

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

    li {
        list-style-type: none;
    }

  .linkOjo:visited {
    color:inherit
  }

  .linkOjo:hover {
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
    text-align: center;
  }

  form {
  }

  </style>
