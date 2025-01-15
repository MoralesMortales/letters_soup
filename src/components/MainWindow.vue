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
          <q-btn label="Insertar Nueva Palabra" color="primary" @click="prompt" />
          <q-btn label="Eliminar Palabra" color="primary" @click="openDeleteDialog" />
		  <q-btn label="Palabras" color="primary" @click="showWords" /> <!-- Botón modificado -->
              <div v-if="user_exist">

                <q-btn label="Save Table" color="green" text-color="white" @click="saveOnDb" /> <!-- Botón modificado -->
          
                    </div>
        </div>
        <div id="bottom">
          <button id="shuffle_btn" @click="generarSopa">Revolver</button>
        </div>
      </div>
    </div>

            <!-- Diálogo para insertar nueva palabra -->
			<q-dialog v-model="dialog">
            <q-card style="width: 400px; max-width: 90vw;">
                <q-card-section>
                    <div class="text-h6">Ingresa una nueva palabra</div>
                </q-card-section>
                <q-card-section>
                    <q-input outlined v-model="newWord" label="Nueva palabra" auto-focus />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="negative" @click="cancelDialog" />
                    <q-btn flat label="Aceptar" color="positive" @click="acceptDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Diálogo para eliminar palabras -->
        <q-dialog v-model="deleteDialog">
            <q-card style="width: 400px; max-width: 90vw;">
                <q-card-section>
                    <div class="text-h6">Selecciona las palabras a eliminar:</div>
                </q-card-section>
                <q-card-section>
                    <div v-for="word in words" :key="word">
                        <q-checkbox v-model="selectedWords" :label="word" :val=word />
                    </div>
					<p v-if="words.length === 0">No hay palabras para eliminar.</p>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="negative" @click="cancelDeleteDialog" />
                    <q-btn flat label="Eliminar" color="positive" @click="acceptDeleteDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>

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

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import jsPDF from 'jspdf';  // Import jsPDF
import axios from 'axios';
const dialog = ref(false);
const deleteDialog = ref(false); // Controla la visibilidad del diálogo de eliminación
const showWordsDialog = ref(false); // Controla la visibilidad del diálogo para mostrar palabras
const selectedWords = ref<string[]>([]); // Palabras seleccionadas para eliminar
  const newWord = ref("");
  const words = ref<string[]>([]);
  const sidebarVisible = ref(false); // Controla la visibilidad del sidebar
  const user_exist = ref(false);
  const filas = ref(20);
  const columnas = ref(20);
  const sopaDeLetras = ref<string[][]>([]);

  const user = ref(null);

  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value; // Alterna la visibilidad
  };

  const prompt = () => {
    dialog.value = true;
  };


  const acceptDialog = () => {
  if (newWord.value.trim() !== "") {
    words.value.push(newWord.value.trim().toUpperCase());
    newWord.value = ""; // Limpia el input
  }
  dialog.value = false;
};

// Función para cancelar el diálogo
const cancelDialog = () => {
  dialog.value = false;
  newWord.value = ""; // Limpia el input
};

// Función para abrir el cuadro de diálogo de eliminación
const openDeleteDialog = () => {
  deleteDialog.value = true;
};

// Función para manejar la aceptación del diálogo de eliminación
const acceptDeleteDialog = () => {
  words.value = words.value.filter(word => !selectedWords.value.includes(word));
  selectedWords.value = []; // Limpia las selecciones
  deleteDialog.value = false;
};




// Función para cancelar el diálogo de eliminación
const cancelDeleteDialog = () => {
  deleteDialog.value = false;
  selectedWords.value = []; // Limpia las selecciones
};

// Función para abrir el cuadro de diálogo que muestra las palabras ingresadas
const showWords = () => {
  showWordsDialog.value = true;
};

  const closeSession = () => {
    localStorage.clear();
    location.reload();
  };

  const generarCaracterAleatorio = (): string => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  };

  const generarSopa = () => {
  if (filas.value < 1 || columnas.value < 1) return;

  // Inicializar la sopa de letras vacía
  sopaDeLetras.value = Array.from({ length: filas.value }, () =>
    Array.from({ length: columnas.value }, () => '')
  );

  // Colocar las palabras en la sopa de letras
  words.value.forEach(palabra => {
    colocarPalabra(palabra);
  });

  // Llenar los espacios vacíos con letras aleatorias
  for (let i = 0; i < filas.value; i++) {
    for (let j = 0; j < columnas.value; j++) {
      if (sopaDeLetras.value[i][j] === '') {
        sopaDeLetras.value[i][j] = generarCaracterAleatorio();
      }
    }
  }
};
const user_email = ref('');
  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);  // Convierte el string de vuelta a un objeto
      console.log('!!!', user.value.email)
      user_email.value = user.value.email
      user_exist.value = true;
    } else {
      user_exist.value = false;
    }
  };

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
};
  onMounted(() => {
    getUserFromLocalStorage();
    generarSopa();
  });

  const colocarPalabra = (palabra) => {
  const direcciones = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal derecha
    { x: -1, y: 1 }, // Diagonal izquierda
  ];

  for (let i = 0; i < 100; i++) { // Intentar hasta 100 veces
    const direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    const filaInicio = Math.floor(Math.random() * filas.value);
    const colInicio = Math.floor(Math.random() * columnas.value);
    
    let puedeColocar = true;
    
    for (let j = 0; j < palabra.length; j++) {
      const nuevaFila = filaInicio + j * direccion.y;
      const nuevaColumna = colInicio + j * direccion.x;

      if (nuevaFila < 0 || nuevaFila >= filas.value || nuevaColumna < 0 || nuevaColumna >= columnas.value || 
          (sopaDeLetras.value[nuevaFila] && sopaDeLetras.value[nuevaFila][nuevaColumna] !== '')) {
        puedeColocar = false;
        break;
      }
    }

    if (puedeColocar) {
      for (let j = 0; j < palabra.length; j++) {
        const nuevaFila = filaInicio + j * direccion.y;
        const nuevaColumna = colInicio + j * direccion.x;
        sopaDeLetras.value[nuevaFila][nuevaColumna] = palabra[j];
      }
      return true; // La palabra fue colocada exitosamente
    }
  }
  
  return false; // No se pudo colocar la palabra
};


const saveOnDb = async () => {

const obtenerSopaComoString = () => {
  return sopaDeLetras.value
    .map((fila) => fila.join('')) // Combina las letras de cada fila con un espacio
    .join(''); // Une las filas con un salto de línea
}; 
let sopa = obtenerSopaComoString()

let sWord = [...words.value];

  try {
    // Hacer la solicitud POST con los datos
    const response = await axios.post("http://127.0.0.1:8000/api/v1/create-soup/", {
      email: user_email.value,
      row: filas.value,
      col: columnas.value,
      soup: sopa,
      words: sWord,
    });

    // Manejar respuesta exitosa
    console.log("Sopa creada:", response.data);
    alert("Sopa creada con éxito.");
  } catch (error) {
    // Manejar errores
    console.error("Error al crear la sopa:", error.response.data);
    alert("Error al crear la sopa.");
  }
};

</script>


<style scoped>
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
  height: 30%;
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
