<template>
	<div>
		<p class="my-gray"> Select or create campaign level app extensions </p>
		<!-- <list-manager :provider="getList" editor="SitelinkExtension"></list-manager> -->
		 <new-App @save="addNewApp" @cancel="closeApp" v-if="flgNewApp"></new-App> 
	</div>
</template>

<script>
	import checkbox from '../General/checkboxComponent.vue'
	import CreateApp from './newComponent.vue'
	import Vue from 'vue'
	export default {
		name: 'AppExtension',
		data: function () {
			return {
				flgNewApp: false,
				snippetArray: [{
					title: 'Amenities: Children Play Area, Swimming Pool, Multi Purpose Hall, Gym, Table Tennis, Tennis Billiard Room, Golf Puting Green, indoor Badminton, Squash Court',
					flag: false
				}, {
					title: 'Neighborhoods: ITPL, Kannamangala, Bearys Global Research',
					flag: false
				}, {
					title: 'Neighborhoods: Manyata Tech Park, Elements Mall, Nagawara, Diana Public School, KNS insitute',
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
			newApp: function () {
				this.flgNewApp = true
			},
			addNewApp: function () {
				this.flgNewApp = false
			},
			closeApp: function () {
				this.flgNewApp = false
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
		},
		components: {
			'check-box': checkbox,
			'new-App': CreateApp
		}
	}
</script>
