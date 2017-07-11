<template>
<div>
	<div class="radio radio-primary" style="white-space:warp;word-break:break-word">
		<input type="radio" id="r_account" value="account" v-model="val">
		<label for="r_account">Use account level callout extension</label>
	</div>
	<div class="radio radio-primary" style="white-space:warp;word-break:break-word">
		<input type="radio" id="r_create" value="create" v-model="val">
		<label for="r_create">Select or create campaign level extension</label>
	</div>
	<list-component v-if="listView"></list-component>
</div>
</template>

<script>
	import list from './ListComponent.vue'
	export default {
		name: 'CalloutExtension',
		data: function () {
			return {
				val: '',
				listView: false
			}
		},
		methods: {
			expand (tar1, tar2) {
				$('.' + tar1).slideToggle()
				$('.' + tar2).toggleClass('rotate')
			}
		},
		watch: {
			val: function (currentVal) {
				if (currentVal === 'create') {
					this.listView = true
				} else {
					this.listView = false
				}
			}
		},
		components: {
			'list-component': list
		}
	}
</script>
