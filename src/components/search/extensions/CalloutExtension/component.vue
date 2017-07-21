<template>
<div>
	<div>
		<label class="no-style">
			<input type="radio" name="callout" v-model="item.accountLevelCallOut" :value="true">
			Use account level callout extension
		</label>
	</div>
	<div>
		<label class="no-style">
			<input type="radio" name="callout" v-model="item.accountLevelCallOut" :value="false">
			Select or create campaign level extension
		</label>
	</div>
	<list-manager v-if="!item.accountLevelCallOut" :provider="getList" v-model="item.campaignLevelCallOutExtension" editor="CalloutExtension"></list-manager>
</div>
</template>

<script>
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';
	import Vue from 'vue'

	export default {
		name: 'CalloutExtension',
		components: {
			ListManager
		},
		props: ['value'],
		data: () => ({
			item: {
				accountLevelCallOut: true,
				campaignLevelCallOutExtension: []
			}
		}),
		mounted() {
			this.item = Object.assign({}, this.item, this.value);
			// Vue.set(this, 'item', this.value);
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
					request.get('/get_extension/?type=callout').then(({data}) => {
						resolve(data.map(el => {
							el.name = el.callOutText;
							return el;
						}));
					})
				});
			}
		}
	}
</script>
