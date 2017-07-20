<template>
	<div>
		<div><span>Select or create campaign level sitelink extensions</span></div>
		<div class="margin-top-10"><span>Add at least 2 sitelink extensions</span></div>
		<list-manager :provider="getList" editor="SitelinkExtension"></list-manager>
	</div>
</template>
<script>
	import $ from 'jquery'
	import { mapState } from 'vuex'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';
	
	export default {
		name: 'SiteLinkExtensions',
		components: {
			ListManager
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.get('/get_extension/sitelink').then(({data}) => {
						resolve(data);
					})
				});
			}
		}
	}
</script>
