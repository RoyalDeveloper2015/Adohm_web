<template>
<div>
	<p class="my-gray"> Select or Create campaign level call extensions</p>
	<list-manager editor="CallExtension" v-model="item" :provider="getList"></list-manager>
</div>
</template>

<script>
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';
	import Vue from 'vue'
	
	export default {
		name: 'CallExtension',
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
					request.get('/get_extension/?type=call').then(({data}) => {
						resolve(data);
					})
				});
			}
		}
	}
</script>
