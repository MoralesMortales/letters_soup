
<template>
  <div id="container">
    <div id="top_part">
      <div id="bar_container_btn">
        <a href="javascript:void(0);" id="bars" @click="toggleSidebar">
          <font-awesome-icon :icon="['fas', 'bars']" style="font-size:clamp(30px,3vw,34px);" />
        </a>
      </div>
    </div>

    <div id="mainPart" :class="{'sidebar-visible': sidebarVisible}">
      <div id="left_main">
        <div id="sopa_box">
          <table style="padding:15px; width:100%; height:100%; text-align: center; vertical-align: middle;">
            <tbody>
              <tr v-for="(fila, i) in sopaDeLetras" :key="i">
                <td v-for="(letra, j) in fila" :key="j" style="text-align: center; vertical-align: middle;">
                  {{ letra }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="right_main">
        <div id="top">
          <h1 id="title">Generador de Sopa de Letras</h1>
        </div>
        <div id="middle">
          <div class="buttom" id="rows">
            <label for="">Filas: </label>
            <input type="number" v-model.number="rows" @input="crearSopa" min="1" />
          </div>
          <div class="buttom" id="cols">
            <label for="">Columnas: </label>
            <input type="number" v-model.number="cols" @input="crearSopa" min="1" />
          </div>
          <q-btn label="Palabras" color="primary" @click="showWords" />
        </div>
        <div id="bottom">
          <button id="shuffle_btn" @click="crearSopa">Revolver</button>
        </div>
      </div>

      <q-dialog v-model="showWordsDialog">
        <q-card style="width: 400px; max-width: 90vw;">
          <q-card-section>
            <div class="text-h6">Palabras ingresadas:</div>
          </q-card-section>
          <q-card-section>
            <div>
              <li v-for="word in words" :key="word">{{ word }}</li>
            </div>
            <p v-if="words.length === 0">No hay palabras ingresadas.</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="negative" @click.prevent="showWordsDialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
const route = useRoute();
const soupId = route.params.soup_id;
console.log(soupId, 'MITOOO')

let userId = 1;
const user = ref(null);

  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);  // Convierte el string de vuelta a un objeto
      userId = user.value.id
    } 
    };
const soups = ref({});
const sopaDeLetras = ref([]);
const words = ref([]);
const cols = ref(0);
const rows = ref(0);
const soup = ref('');
const showWordsDialog = ref(false); // Para mostrar el diálogo con las palabras

// Función para obtener los datos de la API
const fetchSoups = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/sopas/${userId}/${soupId}`);
    soups.value = response.data;
    words.value = soups.value.words; // Asignamos las palabras
    cols.value = soups.value.col; // Asignamos las columnas
    rows.value = soups.value.row; // Asignamos las filas
    soup.value = soups.value.soup; // Asignamos la sopa de letras

    crearSopa(); // Crear la sopa de letras después de obtener los datos
  } catch (error) {
    console.error("Error al obtener las sopas:", error);
  }
};

// Crear la sopa de letras
const crearSopa = () => {
  const sopa = [];
  const soupString = soup.value; // Tomamos la cadena de sopa de la API
  const letras = soupString.split(''); // Convertimos la cadena en un array de letras

  let letraIndex = 0;

  // Llenamos la sopa con las letras
  for (let i = 0; i < rows.value; i++) {
    sopa.push([]);
    for (let j = 0; j < cols.value; j++) {
      sopa[i].push(letras[letraIndex]); // Colocamos las letras en cada celda
      letraIndex = (letraIndex + 1) % letras.length; // Repetir la cadena de letras si es necesario
    }
  }

  sopaDeLetras.value = sopa; // Asignamos la sopa generada a la variable
};

// Función para mostrar el diálogo con las palabras
const showWords = () => {
  showWordsDialog.value = true;
};

onMounted(() => {
  fetchSoups(); // Cargar los datos cuando el componente se monta
});
</script>

<style>

</style>
