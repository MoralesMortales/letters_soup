
<template>
  <div id="container">
    <div id="top_part">
      <div id="bar_container_btn">
        <a @click.native="$router.push(`/History`)" id="bars" @click="toggleSidebar">
          <font-awesome-icon :icon="['fas', 'arrow-right']" flip="horizontal" size="2xl" />
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
            <input readonly type="number" v-model.number="rows" @input="crearSopa" min="1" />
          </div>
          <div class="buttom" id="cols">
            <label for="">Columnas: </label>
            <input readonly type="number" v-model.number="cols" @input="crearSopa" min="1" />
          </div>
        </div>
        <div id="bottom">
          <q-btn label="Palabras" color="primary" @click="showWords" />
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
import jsPDF from 'jspdf';
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

const generatePDF = () => {
  const doc = new jsPDF();

  // Add Title to PDF
  doc.setFontSize(15);
  doc.text('Generador de Sopa de Letras', 70, 20);

  // Set table position and size
  const startY = 40; // Start Y position for the table
  let currentY = startY;

  const letterWidth = 8; // Width for each letter
  const rowHeight = 8; // Height for each row

  // Calculate the total width of the grid
  const totalGridWidth = sopaDeLetras.value[0].length * letterWidth;

  // Calculate the starting X position to center the grid
  const startX = (doc.internal.pageSize.width - totalGridWidth) / 2;

  // Draw the word search grid on PDF
  for (let i = 0; i < sopaDeLetras.value.length; i++) {
    let currentX = startX; // Reset X position for each row
    for (let j = 0; j < sopaDeLetras.value[i].length; j++) {
      const letra = sopaDeLetras.value[i][j];
      doc.text(letra, currentX, currentY);
      currentX += letterWidth; // Move to next column
    }
    currentY += rowHeight; // Move to next row
  }

  // Save the generated PDF
  doc.save('sopa_de_letras.pdf');
}
</script>

<style>
#title{
  font-size: 30px;
}

#container{
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#bars {
  margin-left: 1.8em;
  color: #222;
  display: inline-block;
  cursor: pointer;
}

#bars:active, #bars:visited{
  color: #0f0;
}

.links{
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 30px;
  height: 70px;
  border-bottom: 1px solid #a2a2a2;
}

#top_part{
  height: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#sopa_box{
  width: 80%;
  height: 80%;
  margin-top: 35px;
  background-color: #999;
}

#export_options{
  width: 80%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items:center;
}

#mainPart{
  height: 95%;
  background-color: #99d3f7;
  display: flex;
  transition: margin-left 0.3s ease;
}

#left_main{
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

#right_main{
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#top{
  height: 18%;
  margin-top: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#pdf_option{
  height: 90%;
  width: 50%;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#pdf_option:hover{
  background-color: #ff0;
  cursor: pointer;
}


#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  color: #222;
}

#sidebar:first-child{
  border-top: 1px solid #a2a2a2;
}

#sidebar ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

#sidebar li {
  translate: all .3s ease;
}

#sidebar li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  translate: all .3s ease;
  color: #222;
}

#sidebar li a:hover {
  color: green;

}

/* Aplica la animación cuando el sidebar se muestra */
#sidebar.v-show {
  transform: translateX(0); /* Muestra el sidebar */
  transition: all .3s ease;
}

/* Desplazar la parte principal hacia la derecha cuando el sidebar está visible */
#mainPart.sidebar-visible {
  margin-left: 250px; /* Empuja el contenido hacia la derecha */
}

#middle{
  height: 10%;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  align-content: space-around;
  justify-items: center;
}

#bottom{
  height: 15%;
  margin-bottom: 9em;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bottom > #shuffle_btn{
  height: 50%;
  width: 30%;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #000;
  cursor: pointer;
  transition: all .12s ease;
}

#bottom > #shuffle_btn:hover{
  background-color: #aaa;
  transition: all .12s ease;
}

#middle > .buttom{
  width: 200px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

#middle > .buttom > input{
  width: 60%;
}

input, input:hover, input::selection, input:active{
  border: none;
  background-color: transparent;
}
</style>
