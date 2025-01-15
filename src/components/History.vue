<template>
  <div>
    <h2>Mis Sopas</h2>
    <div v-if="soups.length === 0">
      <p>No tienes sopas disponibles.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="soup in soups" :key="soup.id">
          <strong>Sopa ID:</strong> {{ soup.id }}<br>
          <strong>Email:</strong> {{ soup.email }}<br>
          <strong>Filas:</strong> {{ soup.row }}<br>
          <strong>Columnas:</strong> {{ soup.col }}<br>
          <strong>Sopa:</strong> {{ soup.soup }}<br>
          <strong>Palabras:</strong> {{ soup.words.join(', ') }}<br><br>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const userId = 1;
  const user = ref(null);
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);  // Convierte el string de vuelta a un objeto
      user_exist.value = true;
      userId = user.value.id
    } else {
      user_exist.value = false;
    }
  };
const soups = ref([]);

const fetchSoups = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/sopas/?user_id=${userId}`);
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

<style>

</style>
