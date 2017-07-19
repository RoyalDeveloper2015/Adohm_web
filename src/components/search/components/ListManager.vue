<template>
	<div class="row list-box">
		<div class="col-xs-6">
			<div class="p-5 border-bottom mb-5"> <input type="text" v-model="searchTerm" class="form-control" placeholder="Search"> </div>
			<div class="p-5 border-bottom mb-5"> <label class="no-style"> <input type="checkbox" @click="toggleAll"> {{items.length}} item{{items.length > 1 ? 's' : ''}} </label> </div>
			<div class="list p-5">
				<label class="list-item" v-for="item in items">
					<input type="checkbox" name="selectedItems" v-model="selectedItems" :value="item.id"> &nbsp; 
					{{item.name}}
				</label>
			</div>
		</div>
		<div class="col-xs-6">
			<div class="p-10 border-bottom mb-5"> 
				<strong> {{selectedItems.length}} item{{selectedItems.length > 1 ? 's' : ''}} selected </strong>
				<a class="pull-right" @click="clear()"> CLEAR </a>
			</div>
			<div class="list"> 
				<div class="list-item" v-for="id in selectedItems">
					{{itemData(id, 'name')}}
					<span @click="removeSelected(id)" class="fa fa-times-circle pull-right"> </span>
				</div>
			</div>
		</div>
		<div class="col-xs-12 panel-footer" v-if="this.$slots.editor">
			<div class="btn btn-sm"> <span class="fa fa-plus"></span> NEW ITEM  </div>
		</div> 
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	props: ['provider', 'value'],
	data: () => ({
		searchTerm: null,
		selectedItems: [],
		items: []
	}),
	methods: {
		loadItems(search) {
			this.provider(search).then(list => {
				Vue.set(this, 'items', this.filter(list))
			})
		},
		itemData(id, key) {
			let item = this.items.find(el => el.id == id);
			return item && item[key] || '';
		},
		removeSelected(idx) {
			this.selectedItems.splice(idx, 1)
		},
		clear() {
			this.selectedItems.splice(0, this.selectedItems.length);
		},
		filter(items) {
			if(!this.searchTerm) return items;
			return this.items.filter(el => {
				return el.name.match(this.searchTerm) || this.selectedItems.includes(el.id);
			});
		},
		toggleAll(event) {
			if(event.currentTarget.checked) Vue.set(this, 'selectedItems', this.items.map(el => el.id));
			else Vue.set(this, 'selectedItems', []);
		}
	},
	mounted() {
		this.loadItems();
	},
	watch: {
		searchTerm(term) {
			this.loadItems(term);
		},
		selectedItems(items) {
			this.$emit('input', items);
		}
	}
}
</script>

<style scoped>
	.list-box {
		border: solid 1px #ddd;
		margin: 10px auto;
	}

	.list-box .form-control {
		border-radius: 0;
		border: none;
		box-shadow: none;
		margin: 0px;

	}
	.list-box .form-control:focus {
		border-bottom: solid 2px #4285f4;
		outline: none;
	}

	.list-box .col-xs-6:first-child { 
		border-right: solid 1px #ddd;
	}
	.list-item {
		font-weight: normal
	}
	.list-item:last-child {
		border-bottom: none;
	}

	.border-bottom {
		border-bottom: solid 1px #ddd;
	}
</style>