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
								<input type="text" id="listName" class="form-control" placeholder="Enter list name" v-model="item.listName">
							</div>
							<div class="col-xs-6">
								<!-- <multi-select v-model="item.existingId" :options="keywords" label="sharedsetName" track-by="sharedsetId"
								@search-change="query => search({
									url: baseURL + '/get_negativeKeyword',
									listTarget: [$data, 'keywords'],
									listSource: ''
								})"> -->
								<select id="existingList" class="form-control" v-model="item.existingId">
									 <option v-for="keyword in keywords" :key="keyword.id" :value="keyword.id">
										{{keyword.name}}
									</option>
								</select> 
								<!-- </multi-select>  -->
							</div>
						</div>
					</div>
				</template>

				<template v-else="item.isList">
					<label> Add to </label>
					<add-to-list type="campaign" @selected="setAddTo"></add-to-list>
					<label> Select lists </label>
					<list-manager :provider="getKeywordLists" v-model="item.listIds"></list-manager>
					
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
import {request, baseURL} from '@/config/adwords/request'
import MultiSelect from 'vue-multiselect'
import {vUtils} from '@/components/Mixins'

export default {
	name: 'AddNegativeKeywords',
	data: () => ({
		keywords: [],
		baseURL
	}),
	mixins: [vUtils],
	components: {
		AddToList,
		ListManager,
		MultiSelect
	},
	methods: {
		setAddTo(addto) {
			if(this.addto == 'campaign' || this.item.isList) {
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
				request.get('/get_negativeKeyword').then(({data}) => {
					resolve(data.map(el => {
						el.id = el.sharedsetId;
						el.name = el.sharedsetName;
						return el;
					}))
				})
			})
		},
	},
	mounted() {
		this.getKeywordLists().then(keywords => {
			Vue.set(this, 'keywords', keywords);
		});


	},
	computed: {
		...mapState('adwords/keywords', ['item']),
		addto() {
			return this.item.type
		}
	}
}
</script>
