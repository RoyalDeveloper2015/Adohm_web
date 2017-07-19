<template>
<div style="display: inline-block">
	<a v-if="(type == 'campaign' && !campaign.id) || (type == 'adgroup' && !adgroup.id)" data-toggle="modal" href="#AddToList" class="color-primary">
			Select item <span class="fa fa-pencil"></span> 
	</a>
	<a v-else data-toggle="modal" href="#AddToList" class="color-primary">
		{{type == 'campaign' ? campaign.name : adgroup.name}} <span class="fa fa-pencil"></span> 
	</a>
	<div class="modal" id="AddToList">
		<div class="modal-dialog">
			<div class="modal-content" id="card">
				<div class="modal-header">Select One</div>
				<div class="modal-body">
					<div class="row">
						<div :class="{'col-xs-6': type == 'adgroup', 'col-xs-12': type == 'campaign'}"  style="max-height: 600px; overflow-y: auto">
							<div class="row list-item" v-for="item in campaigns" @click="selectItem('campaign', item)" :class="{active: isSelected('campaign', item.id)}">
								{{item.name}}
							</div>
						</div>
						<div v-if="type == 'adgroup'" class="col-xs-6"  style="max-height: 600px; overflow-y: auto">
							<div class="row list-item" v-for="item in adgroups" @click="selectItem('adgroup', item)" :class="{active: isSelected('adgroup', item.id)}">
								{{item.name}}
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a class="btn btn-default" data-dismiss="modal">Cancel</a>
					<a class="btn btn-primary" data-dismiss="modal" @click="save()" :disabled="(type == 'campaign' && !campaign.id) || (type == 'adgroup' && !adgroup.id)">Done</a>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import {request} from '@/config/adwords/request'
import Vue from 'vue'

export default {
	props: ['type'],
	data: () => ({
		campaign: {},
		adgroup: {},
		campaigns: [],
		adgroups: []
	}),
	mounted() {
		request.get('/get_campaigns').then(({data}) => {
			Vue.set(this, 'campaigns', data);
		});
	},
	methods: {
		loadAdGroups(campaignId) {
			if(this.type == 'adgroup') {
				request.get('/get_adgroup/' + campaignId).then(({data}) => {
					Vue.set(this, 'adgroups', data);
				});
			}
		},
		selectItem(type, item) {
			Vue.set(this, type, item)
			if(this.type == 'adgroup' && type == 'campaign') this.loadAdGroups(item.id);
		},
		isSelected(type, id) {
			if(this[type]) {
				if(this[type].id == id) return true;
			}
			return false
		},
		save() {
			this.$emit('selected', {campaign: this.campaign, adgroup: this.adgroup});
		}
	}
}
</script>

<style scoped>
	.list-item {
		padding: 5px 10px;
		width: 100%;
		cursor: pointer;
	}

	.list-item:hover {
		background: silver;
	}

	.list-item.active {
		background: #50ad50;
	}
</style>
