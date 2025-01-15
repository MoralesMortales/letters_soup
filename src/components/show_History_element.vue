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
      <!-- Sidebar -->
      <div v-if="sidebarVisible" id="sidebar" style="margin-top:30px; z-index: 3; margin-left:250px; margin-top:75px;">
        <ul>
          <!-- Solo muestra este bloque cuando user_exist sea verdadero -->
          <div v-if="user_exist">
            <li>
              <div class="links">
                <router-link to="/History">Ver historial</router-link>
              </div>
            </li>
            <li>
              <div class="links">
                <button @click="closeSession" style="font-size:18px; border:none; background-color:transparent;">Cerrar Sesión</button>
              </div>
            </li>
              <li>
              <div class="links">
                <router-link to="/">Ir a Inicio</router-link>
              </div>
            </li>
          </div>

          <!-- Si user_exist es falso, muestra las opciones de login o registro -->
          <div v-else>
            <li>
              <div class="links">
                <router-link to="/Register">Registrar</router-link>
              </div>		
            </li>
            <li>
              <div class="links">
                <router-link to="/Login">Iniciar sesión</router-link>
              </div>
            </li>
          </div>
        </ul>
      </div>

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
        <div id="export_options">
          <button @click="generatePDF" id="pdf_option">
            <h4>PDF</h4>
          </button>
        </div>
      </div>

      <div id="right_main">
        <div id="top">
          <h1 id="title">Generador de Sopa de Letras</h1>
        </div>
        <div id="middle">
          <div class="buttom" id="rows">
            <label for="">Filas: </label>
            <input type="number" v-model.number="filas" @input="generarSopa" min="1" />
          </div>
          <div class="buttom" id="cols">
            <label for="">Columnas: </label>
            <input type="number" id="columnasInput" v-model.number="columnas" @input="generarSopa" min="1" />
          </div>
		  <q-btn label="Palabras" color="primary" @click="showWords" /> <!-- Botón modificado -->
          
                    </div>
        </div>
        <div id="bottom">
          <button id="shuffle_btn" @click="generarSopa">Revolver</button>
        </div>
      </div>
    </div>

        <!-- Diálogo para mostrar las palabras ingresadas -->
        <q-dialog v-model="showWordsDialog">
            <q-card style="width: 400px; max-width: 90vw;">
                <q-card-section>
                    <div class="text-h6">Palabras ingresadas:</div>
                </q-card-section>
                <q-card-section>
                    <div>
                        <li v-for="word in words" :key="word">{{ word }}</li> <!-- Muestra cada palabra en una lista -->
                    </div>
                    <p v-if="words.length === 0">No hay palabras ingresadas.</p> <!-- Mensaje si no hay palabras -->
                </q-card-section>
                <q-card-actions align="right">
                    <!-- Cambiar aquí para cerrar el diálogo -->
                    <q-btn flat label="Cerrar" color="negative" @click.prevent="showWordsDialog = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>

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
