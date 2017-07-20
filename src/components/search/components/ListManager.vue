<template>
	<div class="row list-box">
		<template v-if="!showEditor">
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
					<div class="list-item" v-for="id, idx in selectedItems">
						{{itemData(id, 'name')}}
						<span @click="removeSelected(idx)" class="fa fa-times-circle pull-right"> </span>
					</div>
				</div>
			</div>
		</template>
		<template v-else="showEditor">
			 <div class="flex-row-10">
				<div class="flex-item-8"> 
					<component :is="editor" :data.sync="item"></component>
				</div>
				<div class="flex-item-2 bg-grey">
					<span class="blue cursor">PREVIEW</span>
				</div>
			</div> 
		</template>
		<div class="col-xs-12 panel-footer">
			<div v-if="this.editor && !showEditor" class="btn btn-sm" @click="showEditor = true"> <span class="fa fa-plus"></span> NEW ITEM  </div>
			<div v-else>
				<span class="blue cursor" v-on:click="save()">SAVE AND ADD</span>
				<span class="blue cursor margin-left-25" v-on:click="showEditor = false">CANCEL</span>
			</div>
		</div> 
	</div>
</template>

<script>
import Vue from 'vue'
import SitelinkExtension from '@/components/search/extensions/SitelinkExtension/editor'
import CalloutExtension from '@/components/search/extensions/CalloutExtension/newComponent'
import AppExtension from '@/components/search/extensions/AppExtension/component'
import CallExtension from '@/components/search/extensions/CallExtension/newComponent'
import MessageExtension from '@/components/search/extensions/MessageExtension/component'
import ReviewExtension from '@/components/search/extensions/ReviewExtension/component'
import SnippetExtension from '@/components/search/extensions/SnippetExtension/newSnippetComponent'
import PromotionExtension from '@/components/search/extensions/PromotionExtension/component'

export default {
	props: ['provider', 'value', 'editor'],
	components: {
		SitelinkExtension,
		CallExtension,
		CalloutExtension,
		SnippetExtension
	},
	data: () => ({
		searchTerm: null,
		selectedItems: [],
		items: [],
		showEditor: false,
		item: {
			a: "Hello"
		}
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
		},
		save() {
			this.$children[0].save().then(id => {
				let item = clone(this.item);
				item.id = id;
				Vue.set(this, 'showEditor', false);
				this.items.unshift(item);
			})
		}
	},
	beforeMount() {
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

	.list {
		max-height: 300px;
		overflow-y: auto;
	}
</style>