<template>
<div>
	<p class="my-gray"> Select or Create campaign level call extensions</p>
	<list-manager editor="CallExtension" :provider="getList"></list-manager>

	<new-call-extension v-if="flgNewCall" @save="addExtension" @cancel="cancelExtension"></new-call-extension>
</div>
</template>

<script>
	import newCallExtension from './newComponent.vue'
	import checkbox from '../General/checkboxComponent.vue'
	import ListManager from '@/components/search/components/ListManager'
	import {request} from '@/config/adwords/request';

	import Vue from 'vue'
	export default {
		name: 'CallExtension',
		components: {
			'new-call-extension': newCallExtension,
			'check-box': checkbox,
			ListManager
		},
		data: function () {
			return {
				flgNewCall: false,
				callArray: [{
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
				for (i = 0; i < this.callArray.length; i++) {
					temp.push({
						title: this.callArray[i].title,
						flag: this.callArray[i].flag
					})
				}
				for (i = 0; i < this.callArray.length; i++) {
					if (this.callArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
						if (this.callArray[i].flag === false) {
							Vue.set(temp, i, {
								title: this.callArray[i].title,
								flag: false
							})
						} else {
							Vue.set(temp, i, {
								title: this.callArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(temp, i, {
							title: this.callArray[i].title,
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
				for (i = 0; i < this.callArray.length; i++) {
					if (this.callArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
						if (this.callArray[i].flag === false) {
							Vue.set(this.fArray, i, {
								title: this.callArray[i].title,
								flag: false
							})
						} else {
							Vue.set(this.fArray, i, {
								title: this.callArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(this.fArray, i, {
							title: this.callArray[i].title,
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
			onNewCallExtension: function () {
				this.flgNewCall = !this.flgNewCall
			},
			addExtension: function (val) {
				this.flgNewCall = false
			},
			cancelExtension: function () {
				this.flgNewCall = false
			},
			onChangeItem: function (val) {
				var temp = this.callArray[val.index]
				temp.flag = val.flag
				Vue.set(this.callArray, val.index, temp)
			},
			selectAll: function () {
				for (var i = 0; i < this.callArray.length; i++) {
					Vue.set(this.callArray, i, {title: this.callArray[i].title, flag: true})
				}
			},
			clearAll: function () {
				for (var i = 0; i < this.callArray.length; i++) {
					Vue.set(this.callArray, i, {title: this.callArray[i].title, flag: false})
				}
			}
		}
	}
</script>
