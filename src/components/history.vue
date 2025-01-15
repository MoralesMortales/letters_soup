<template>
 v-for 
</template>

<script setup>
import { onMounted, ref } from "vue";

  const user = ref(null);
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);  // Convierte el string de vuelta a un objeto
      user_exist.value = true;
    } else {
      user_exist.value = false;
    }
  };


  onMounted(() => {
    getUserFromLocalStorage();
  });
</script>

<style>

</style>
