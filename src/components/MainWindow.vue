<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false); // Controla la visibilidad del diálogo para agregar palabra
const deleteDialog = ref(false); // Controla la visibilidad del diálogo de eliminación
const showWordsDialog = ref(false); // Controla la visibilidad del diálogo para mostrar palabras
const newWord = ref("");   // Almacena la nueva palabra ingresada
const words = ref<string[]>([]); // Lista de palabras ingresadas
const selectedWords = ref<string[]>([]); // Palabras seleccionadas para eliminar

// Nuevas referencias para filas y columnas
const rows = ref(0);
const cols = ref(0);
const matrix = ref<string[][]>([]); // Matriz para la sopa de letras

// Función para abrir el cuadro de diálogo para agregar palabra
const prompt = () => {
  dialog.value = true;
};

// Función para manejar la aceptación del diálogo para agregar palabra
const acceptDialog = () => {
  if (newWord.value.trim() !== "") {
    const trimmedWord = newWord.value.trim();
    words.value.push(trimmedWord);
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
  for (const word of selectedWords.value) {
    words.value = words.value.filter(w => w !== word); // Elimina de la lista de palabras
    removeWordFromMatrix(word); // Elimina de la matriz
  }
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

// Función para generar la matriz basada en filas y columnas ingresadas
const generateMatrix = () => {
  matrix.value = Array.from({ length: rows.value }, () =>
    Array.from({ length: cols.value }, () => "")
  );
};

// Función para insertar una palabra en la matriz en una dirección aleatoria
const insertWordInMatrixRandomly = (word: string) => {
  const directions = ['horizontal', 'vertical', 'diagonal'];
  const direction = directions[Math.floor(Math.random() * directions.length)];

  let row, col;

  if (direction === 'horizontal') {
    row = Math.floor(Math.random() * rows.value);
    col = Math.floor(Math.random() * (cols.value - word.length));

    for (let i = 0; i < word.length; i++) {
      matrix.value[row][col + i] = word[i];
    }

  } else if (direction === 'vertical') {
    row = Math.floor(Math.random() * (rows.value - word.length));
    col = Math.floor(Math.random() * cols.value);

    for (let i = 0; i < word.length; i++) {
      matrix.value[row + i][col] = word[i];
    }

  } else if (direction === 'diagonal') {
    row = Math.floor(Math.random() * (rows.value - word.length));
    col = Math.floor(Math.random() * (cols.value - word.length));

    for (let i = 0; i < word.length; i++) {
      matrix.value[row + i][col + i] = word[i];
    }
  }
};

// Función para revolver e insertar todas las palabras en la matriz
const shuffleAndInsertWordsInMatrix = () => {
  generateMatrix(); // Genera una nueva matriz vacía

  for (const word of words.value) {
    insertWordInMatrixRandomly(word);
  }
};

// Función para eliminar una palabra de la matriz
const removeWordFromMatrix = (word: string) => {
  for (let rowIndex = 0; rowIndex < rows.value; rowIndex++) {
    for (let colIndex = 0; colIndex < cols.value; colIndex++) {
      if (matrix.value[rowIndex][colIndex] === word[0]) { // Busca por coincidencia con la primera letra

        // Verifica si hay coincidencia horizontal
        if (
          colIndex <= cols.value - word.length &&
          matrix.value[rowIndex].slice(colIndex, colIndex + word.length).join('') === word
        ) {
          for (let i = 0; i < word.length; i++) {
            matrix.value[rowIndex][colIndex + i] = ""; // Reemplaza con vacío
          }
          return; // Sale después de eliminar una coincidencia
        }

        // Verifica si hay coincidencia vertical
        if (
          rowIndex <= rows.value - word.length &&
          matrix.value.slice(rowIndex, rowIndex + word.length).map(row => row[colIndex]).join('') === word
        ) {
          for (let i = 0; i < word.length; i++) {
            matrix.value[rowIndex + i][colIndex] = ""; // Reemplaza con vacío
          }
          return; // Sale después de eliminar una coincidencia
        }

        // Verifica si hay coincidencia diagonal
        if (
          rowIndex <= rows.value - word.length &&
          colIndex <= cols.value - word.length &&
          Array.from({ length: word.length }, (_, i) => matrix.value[rowIndex + i][colIndex + i]).join('') === word
        ) {
          for (let i = 0; i < word.length; i++) {
            matrix.value[rowIndex + i][colIndex + i] = ""; // Reemplaza con vacío
          }
          return; // Sale después de eliminar una coincidencia
        }
      }
    }
  }
};
</script>

<template>
	<div id="container">
		<div id="top_part">
			<a href="" id="bars">
				<font-awesome-icon :icon="['fas', 'bars']" style="font-size:28px;" />
			</a>
		</div>
		<div id="mainPart">
			<div id="left_main">
				<div id="sopa_box">
					<!-- Mostrar la matriz aquí -->
					<table>
						<tbody>
							<tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
								<td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="export_options"></div>
			</div>
			<div id="right_main">
				<div id="top">
					<h1 id="title">Generador de Sopa de Letras</h1>
				</div>
				<div id="middle">
					<div class="buttom" id="rows">
						<label for="">Filas: </label>
						<input type="number" v-model.number="rows" @change="generateMatrix" />
					</div>
					<div class="buttom" id="cols">
						<label for="">Columnas: </label>
						<input type="number" v-model.number="cols" @change="generateMatrix" />
					</div>
					<!-- Botones -->
					<q-btn label="Insertar Nueva Palabra" color="primary" @click="prompt" />
					<q-btn label="Eliminar Palabra" color="primary" @click="openDeleteDialog" />
					<q-btn label="Palabras" color="primary" @click="showWords" />
					<q-btn label="Revolver" color="secondary" @click="shuffleAndInsertWordsInMatrix" /> <!-- Nuevo botón -->
				</div>
				<div id="bottom">
					<button id="shuffle_btn">Revolver</button>
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
                    <q-btn flat label="Aceptar" color="positive" @click.prevent="acceptDialog()" />
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
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="negative" @click.prevent="cancelDeleteDialog()" />
                    <q-btn flat label="Eliminar" color="positive" @click.prevent="acceptDeleteDialog()" />
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
                    <ul>
                        <li v-for="word in words" :key="word">{{ word }}</li> <!-- Muestra cada palabra en una lista -->
                    </ul>
                    <p v-if="words.length === 0">No hay palabras ingresadas.</p> <!-- Mensaje si no hay palabras -->
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="positive" @click.prevent="showWordsDialog = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>




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
	margin-left: 0.8em;
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
	background-color: darkslategrey;
}

#export_options{
	width: 20%;
	height: 10%;
	background-color: floralwhite;
}

#mainPart{
	height: 95%;
	background-color: #99d3f7;
	display: flex;
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


#middle{
	height: 30%;
	display: grid;
	grid-template-columns: repeat(2,1fr);
	align-content: space-around;
	justify-items: center;
}


#bottoms{
	height: 15%;
	margin-bottom: 9em;
	display: flex;
	justify-content: center;
	align-items: center;
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
	width: 60%;
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
