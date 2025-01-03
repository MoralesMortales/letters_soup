<script setup lang="ts">
	import { ref } from 'vue'
const dialog = ref(false); // Controla la visibilidad del diálogo
const newWord = ref("");   // Almacena la nueva palabra ingresada
const words = ref<string[]>([]); // Lista de palabras ingresadas

// Función para abrir el cuadro de diálogo
const prompt = () => {
  dialog.value = true;
};

// Función para manejar la aceptación del diálogo
const acceptDialog = () => {
  if (newWord.value.trim() !== "") {
    words.value.push(newWord.value.trim());
    newWord.value = ""; // Limpia el input
  }
  dialog.value = false;
};

// Función para cancelar el diálogo
const cancelDialog = () => {
  dialog.value = false;
  newWord.value = ""; // Limpia el input
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
				<div id="sopa_box"></div>
				<div id="export_options"></div>
			</div>
			<div id="right_main">
				<div id="top">
					<h1 id="title">Generador de Sopa de Letras</h1>
				</div>
				<div id="middle">
					<div class="buttom" id="rows">
						<label for="">Filas: </label><input type="text" />
					</div>
					<div class="buttom" id="cols">
						<label for="">Columnas: </label><input type="text" />
					</div>
					<!-- Botón para insertar nueva palabra -->
					<q-btn label="Insertar Nueva Palabra" color="primary" @click="prompt" />
						<!-- Eliminar palabra -->

						<q-btn label="Eliminar Palabra" color="primary" @click="prompt" />
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
					<q-input
							outlined
							v-model="newWord"
							label="Nueva palabra"
							autofocus
							/>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="Cancelar" color="negative" @click="cancelDialog" />
						<q-btn flat label="Aceptar" color="positive" @click="acceptDialog" />
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
