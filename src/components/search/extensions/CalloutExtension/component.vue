<template>
<div>
	<label class="no-style">
		<input type="radio" value="account" v-model="useAccount" :value="true">
		Use account level callout extension
	</label>
	<label class="no-style">
		<input type="radio" value="create" v-model="useAccount" :value="false">
		Select or create campaign level extension
	</label>
	<list-manager v-if="!useAccount" :provider="getList" editor="CalloutExtension"></list-manager>
</div>
</template>

<script>
	import list from './ListComponent.vue'

	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';


	export default {
		name: 'CalloutExtension',
		components: {
			ListManager
		},
		data: () => ({
			useAccount: true
		}),
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.get('/get_extension/callout').then(({data}) => {
						resolve(data);
					})
				});
			}
		}
	}
</script>
