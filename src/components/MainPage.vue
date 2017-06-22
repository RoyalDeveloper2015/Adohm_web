<template>
  <div class="main-page">

  	<create-pixel></create-pixel>
  </div>
</template>

<script>
	import CreatePixel from './partials/modals/CreatePixel.vue'
	import Selectize from './partials/Selectize.vue'

	export default {
		components: {CreatePixel, Selectize},
		name: 'mainPage'
	}
</script>
