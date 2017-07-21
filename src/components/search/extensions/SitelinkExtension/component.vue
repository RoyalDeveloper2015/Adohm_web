<template>
	<div>
		<div><span>Select or create campaign level sitelink extensions</span></div>
		<div class="margin-top-10"><span>Add at least 2 sitelink extensions</span></div>
		<list-manager :provider="getList" v-model="item" editor="SitelinkExtension"></list-manager>
	</div>
</template>
<script>
	import Vue from 'vue'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';
	
	export default {
		name: 'SiteLinkExtensions',
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
					request.get('/get_extension/?type=sitelink').then(({data}) => {
						resolve(data.map(el => {
							el.name = el.siteLinkText + ', ' + (el.siteLinkLine2 || '') + ', ' + (el.siteLinkText3 || '');
							el.id = el.id;
							return el;
						}));
					})
				});
			}
		}
	}
</script>
