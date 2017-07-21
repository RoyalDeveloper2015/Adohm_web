<template>
<div>
	<p class="my-gray"> Select or create campaign level snippet extensions </p>
	<list-manager editor="SnippetExtension" :provider="getList"></list-manager>
</div>
</template>

<script>
	import Vue from 'vue'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';

	export default {
		name: 'SelectSnippet',
		components: {
			ListManager
		},
		props: ['value'],
		data: () => ({
			item: []
		}),
		mounted() {
			Vue.set(this, 'item', this.value);
		},
		watch: {
			item: {
				deep: true, 
				handler() {
					this.$emit('update:value', this.item);
				}
			}
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.get('/get_extension/?type=structuredsnippet').then(({data}) => {
						resolve(data);
					})
				});
			}
		}
	}
</script>
