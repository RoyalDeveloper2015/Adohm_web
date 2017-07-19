<template>
<div class="main-page">
    <div class="container-fluid">
		<div class="panel mt-10">
			<div class="panel-heading">
				<h4 class="panel-title"> Add Negative keyword </h4>
			</div>
			<form @submit.prevent="save()" class="panel-body">
				<div class="row">
					<div class="col-xs-12">
						<label class="no-style"> <input type="radio" name="isList" v-model="item.isList" :value="false"> Add negative keywords or create new list </label>
						<label class="no-style"> <input type="radio" name="isList" v-model="item.isList" :value="true"> Use negative keyword list </label>
					</div>
				</div>

				<template v-if="item.isList == false">
					<div class="">
						<label> Add to </label>
					</div>
					<div class="">
						<label class="no-style"> <input type="radio" name="addto" v-model="item.type" value="campaign"> Campaign </label>
						<label class="no-style"> <input type="radio" name="addto" v-model="item.type" value="adgroup"> AdGroup </label>
						<add-to-list :type="addto" @selected="setAddTo"></add-to-list>
					</div>
					<div class="">
						<textarea class="form-control" v-model="item.keywords" rows="10" placeholder="Negative keywords"></textarea>
					</div>
					<div class="" v-if="addto == 'campaign'">
						<div> 
							<label> <input type="checkbox" :value="true" v-model="item.newList"> Save to new or existing list </label>
						</div>
						<div class="row" v-if="item.newList"> 
							<div class="col-xs-6">
								<input type="text" class="form-control" placeholder="Enter list name" v-model="item.listName">
							</div>
							<div class="col-xs-6">
								<select></select> 
							</div>
						</div>
					</div>
				</template>

				<template v-else="item.isList">
					<list-manager :provider="getKeywordLists" v-model="item.listIds">
					</list-manager>
				</template>

				<div> 
					<button class="btn btn-success"> Save </button>
				</div>
			</form>
		</div>
		
	</div>
</div>
</template>
<script>
import {mapState} from 'vuex'
import AddToList from '../components/AddToList'
import ListManager from '../components/ListManager'
import Vue from 'vue'
import {request} from '@/config/default/request'
export default {
	data: () => ({
	}),
	components: {
		AddToList,
		ListManager
	},
	methods: {
		setAddTo(addto) {
			if(this.addto == 'campaign') {
				Vue.set(this.item, 'campaignId', addto.campaign.id);
				Vue.set(this.item, 'campaignName', addto.campaign.name);
			} else {
				Vue.set(this.item, 'adGroupId', addto.adgroup.id);
				Vue.set(this.item, 'adGroupName', addto.adgroup.name);
			}
		},
		clearAddToSelection() {

		},
		save() {
			this.$store.dispatch('adwords/keywords/save').then(success => {
				if(success) this.$route.go(-1)
			})
		},
		getKeywordLists(search) {
			return new Promise((resolve, reject) => {
				request.get('/api/campaigns').then(({data}) => {
					resolve(data.result.map(el => {
						el.id = el._id;
						return el;
					}))
				})
			})
		}
	},
	computed: {
		...mapState('adwords/keywords', ['item']),
		addto() {
			return this.item.type
		}
	}
}
</script>
