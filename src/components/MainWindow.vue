<script setup lang="ts">
	import { ref } from 'vue'

</script>

<template>

	<div id="container">

		<div id="top_part">
			<a href="" id="bars">
				<font-awesome-icon :icon="['fas', 'bars']" style="font-size:28px;"/>
			</a>
		</div>
		<div id="mainPart">

			<div id="left_main">

				<div id="sopa_box">

				</div>

				<div id="export_options">

				</div>

			</div>

			<div id="right_main">
				<div id="top">

					<h1 id="title">Generador de Sopa de Letras</h1>

				</div>
				<div id="middle">

					<div class="buttom" id="rows">
<label for="">Filas: </label><input type="text">
					</div>

					<div class="buttom" id="cols">
<label for="">Columnas: </label><input type="text">
					</div>
					<button class="buttom" id="btn_3"></button>
					<button class="buttom" id="btn_4">d</button>

				</div>
				<div id="bottom">

					<button id="shuffle_btn">Revolver</button>

				</div>
			</div>

		</div>
	</div>

</template>

<style scoped>
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
	background-color: #222;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

#top{
	background-color: whitesmoke;
	height: 18%;
	margin-top: 47px;
	display: flex;
	align-items: center;
	justify-content: center;
}


#middle{
	background-color: wheat;
	height: 30%;
	display: grid;
	grid-template-columns: repeat(2,1fr);
	align-content: space-around;
	justify-items: center;
}


#bottom{
	background-color: red;
	height: 15%;
	margin-bottom: 9em;
	display: flex;
	justify-content: center;
	align-items: center;
}

#bottom > #shuffle_btn{
	background-color: gray;
	height: 50%;
	width: 30%;
}

#middle > .buttom{
	width: 60%;
	height: 40px;
	background-color: yellow;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
}

#middle > .buttom > input{
width: 5%;
}

</style>
