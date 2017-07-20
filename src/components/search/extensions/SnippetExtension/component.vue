<template>
<div>
	<p class="my-gray"> Select or create campaign level snippet extensions </p>
	<list-manager editor="SnippetExtension" :provider="getList"></list-manager>
</div>
</template>

<script>
	import checkbox from '../General/checkboxComponent.vue'
	import CreateSnippet from './newSnippetComponent.vue'
	import Vue from 'vue'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';

	export default {
		name: 'SelectSnippet',
		components: {
			'check-box': checkbox,
			'new-snippet': CreateSnippet,
			ListManager
		},
		data: function () {
			return {
				flgNewStructure: false,
				snippetArray: [{
					title: 'Amenities: Children Play Area, Swimming Pool, Multi Purpose Hall, Gym, Table Tennis, Tennis Billiard Room, Golf Puting Green, indoor Badminton, Squash Court',
					flag: false
				}, {
					title: 'Neighborhoods: ITPL, Kannamangala, Bearys Global Research',
					flag: false
				}, {
					title: 'Neighborhoods: Manyata Tech Park, Elements Mall, Nagawara, Diana Public School, KNS insitute',
					flag: false
				}],
				fString: ''
			}
		},
		computed: {
			fArray: function () {
				var temp = []
				var i = 0
				for (i = 0; i < this.snippetArray.length; i++) {
					temp.push({
						title: this.snippetArray[i].title,
						flag: this.snippetArray[i].flag
					})
				}
				for (i = 0; i < this.snippetArray.length; i++) {
					if (this.snippetArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
						if (this.snippetArray[i].flag === false) {
							Vue.set(temp, i, {
								title: this.snippetArray[i].title,
								flag: false
							})
						} else {
							Vue.set(temp, i, {
								title: this.snippetArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(temp, i, {
							title: this.snippetArray[i].title,
							flag: true
						})
					}
				}
				return temp
			}
		},
		watch: {
			fString: function (nFilter) {
				var i = 0
				for (i = 0; i < this.snippetArray.length; i++) {
					if (this.snippetArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
						if (this.snippetArray[i].flag === false) {
							Vue.set(this.fArray, i, {
								title: this.snippetArray[i].title,
								flag: false
							})
						} else {
							Vue.set(this.fArray, i, {
								title: this.snippetArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(this.fArray, i, {
							title: this.snippetArray[i].title,
							flag: true
						})
					}
				}
			}
		},
		methods: {
			getList() {
				return new Promise((resolve, reject) => {
					request.get('/get_extension/sitelink').then(({data}) => {
						resolve(data);
					})
				});
			},
			onNewSnippet: function () {
				this.flgNewStructure = true
			},
			addNewSnippet: function () {
				this.flgNewStructure = false
			},
			closeSnippet: function () {
				this.flgNewStructure = false
			},
			onChangeItem: function (val) {
				var temp = this.snippetArray[val.index]
				temp.flag = val.flag
				Vue.set(this.snippetArray, val.index, temp)
			},
			selectAll: function () {
				for (var i = 0; i < this.snippetArray.length; i++) {
					Vue.set(this.snippetArray, i, {title: this.snippetArray[i].title, flag: true})
				}
			},
			clearAll: function () {
				for (var i = 0; i < this.snippetArray.length; i++) {
					Vue.set(this.snippetArray, i, {title: this.snippetArray[i].title, flag: false})
				}
			}
		}
	}
</script>
