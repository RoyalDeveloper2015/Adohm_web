<template>
<div>
	<p class="my-gray"> Select or create promotion extensions </p>
	<div class="row ml-n mr-n bg-white">
		<div class="panel panel-default mb-n" >
			<div class="panel-body p-n">
				<table class="table table-bordered mb-n" v-show="!flgNewPromotion">
					<tbody >
						<tr>
							<td class="p-n">
								<div class="" style="position:relative">
									<input type="text" class="form-control mb-n my-border-radius-n outline-no" placeholder="search" v-model="fString">
									<span class="fa fa-search form-control-feedback border-radius-n" style="line-height:34px"> </span>
								</div>
							</td>
							<td class="pt-n pb-n">
								<div>
									<span style="line-height:34px;">None Selected</span>
									<button class="btn btn-link pull-right" v-on:click="clearAll">CLEAR ALL</button>
								</div>
							</td>
							<td class="pl-n pr-n bg-gray" rowspan="4" style="vertical-align:middle;text-align:center">
								<span>PREVIEW</span>
							</td>
						</tr>
						<tr>
							<td class="p-n" >
								<div class="col-sm-12">
									<div class="checkbox checkbox-primary">
										<input id="checkbox1" class="styled" type="checkbox" v-on:click="selectAll" v-model="flgSelectAll">
										<label for="checkbox1">{{promotionArray.length}} promotion extensions</label>
									</div>
								</div>
							</td>
							<td rowspan="2">
								<div class="col-sm-12 pr-n">
									<li v-for="item in promotionArray" v-show="item.flag">{{item.title}}</li>
								</div>
							</td>
						</tr>
						<tr	>
							<td class="p-n" width="50%" height="80%">
								<div class="col-sm-12 pr-n">
									<check-box v-for="(item, index) in fArray" v-show="!item.flag" @onChange="onChangeItem" v-bind:title="item.title" v-bind:flag="item.flag" v-bind:id="index" ></check-box>
								</div>
							</td>

						</tr>
						<tr>
							<td class="p-n bg-gray" colspan="2">
								<button class="btn btn-link" v-on:click="newPromotion">
									<i class="fa fa-plus-circle"></i> NEW PROMOTION EXTENSION
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<new-promotion @save="addNewPromotion" @cancel="closePromotion" v-if="flgNewPromotion"></new-promotion>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import checkbox from '../General/checkboxComponent.vue'
	import CreatePromotion from './newComponent.vue'
	import Vue from 'vue'
	export default {
		name: 'PromotionExtension',
		data: function () {
			return {
				flgSelectAll: false,
				flgNewPromotion: false,
				promotionArray: [{
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
				for (i = 0; i < this.promotionArray.length; i++) {
					temp.push({
						title: this.promotionArray[i].title,
						flag: this.promotionArray[i].flag
					})
				}
				for (i = 0; i < this.promotionArray.length; i++) {
					if (this.promotionArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
						if (this.promotionArray[i].flag === false) {
							Vue.set(temp, i, {
								title: this.promotionArray[i].title,
								flag: false
							})
						} else {
							Vue.set(temp, i, {
								title: this.promotionArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(temp, i, {
							title: this.promotionArray[i].title,
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
				for (i = 0; i < this.promotionArray.length; i++) {
					if (this.promotionArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
						if (this.promotionArray[i].flag === false) {
							Vue.set(this.fArray, i, {
								title: this.promotionArray[i].title,
								flag: false
							})
						} else {
							Vue.set(this.fArray, i, {
								title: this.promotionArray[i].title,
								flag: true
							})
						}
					} else {
						Vue.set(this.fArray, i, {
							title: this.promotionArray[i].title,
							flag: true
						})
					}
				}
			}
		},
		methods: {
			newPromotion: function () {
				this.flgNewPromotion = true
			},
			addNewPromotion: function () {
				this.flgNewPromotion = false
			},
			closePromotion: function () {
				this.flgNewPromotion = false
			},
			onChangeItem: function (val) {
				var temp = this.promotionArray[val.index]
				temp.flag = val.flag
				Vue.set(this.promotionArray, val.index, temp)
			},
			selectAll: function () {
				if (this.flgSelectAll) {
					for (var i = 0; i < this.promotionArray.length; i++) {
						Vue.set(this.promotionArray, i, {title: this.promotionArray[i].title, flag: true})
					}
				} else {
					for (i = 0; i < this.promotionArray.length; i++) {
						Vue.set(this.promotionArray, i, {title: this.promotionArray[i].title, flag: false})
					}
				}
			},
			clearAll: function () {
				for (var i = 0; i < this.promotionArray.length; i++) {
					Vue.set(this.promotionArray, i, {title: this.promotionArray[i].title, flag: false})
				}
				this.flgSelectAll = false
			}
		},
		components: {
			'check-box': checkbox,
			'new-promotion': CreatePromotion
		}
	}
</script>
