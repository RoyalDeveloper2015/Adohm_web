<template>
<div>
	<p class="my-gray"> Select or create campaign level snippet extensions </p>
	<div class="row ml-n mr-n bg-white">
		<div class="panel panel-default mb-n" >
			<div class="panel-body p-n">
				<table class="table table-bordered mb-n" v-show="!flgNewStructure">
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
										<input id="checkbox1" class="styled" type="checkbox" v-on:click="selectAll">
										<label for="checkbox1">3 structured snippet extensions</label>
									</div>
								</div>
							</td>
							<td rowspan="2">
								<div class="col-sm-12 pr-n">
									<li v-for="item in snippetArray" v-show="item.flag">{{item.title}}</li>
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
								<button class="btn btn-link" v-on:click="onNewSnippet">
									<i class="fa fa-plus-circle"></i> NEW STRUCTURED EXTENSION
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<new-snippet @save="addNewSnippet" @cancel="closeSnippet" v-if="flgNewStructure"></new-snippet>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import checkbox from '../General/checkboxComponent.vue'
	import CreateSnippet from './newSnippetComponent.vue'
	import Vue from 'vue'
	export default {
		name: 'SelectSnippet',
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
		},
		components: {
			'check-box': checkbox,
			'new-snippet': CreateSnippet
		}
	}
</script>
