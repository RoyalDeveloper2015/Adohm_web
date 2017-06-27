<template>
	<div>
		<div class="container-fluid">
			<div class="row page-title-div">
				<div class="col-sm-6">
					<h2 class="title">Advertiser accounts</h2>
					<p class="sub-title">Manage advertiser accounts</p>
				</div>
			</div>
			<div class="row breadcrumb-div">
				<div class="col-sm-6">
					<ul class="breadcrumb">
						<li><i class="fa fa-home"></i> Advertisers </li>
					</ul>
				</div>
			</div>
		</div>

		<section class="section">
			<div class="container-fluid">
				<div class="row mb-20">
					<div class="col-sm-12">
						<a @click="reset()" class="btn btn-success pull-right" data-toggle="modal" href="#editAccount">+ New Advertiser</a>
					</div>
				</div>
				
				<advertiser-editor @add="addItem" @update="updateItem" @reset="reset" :item="active"></advertiser-editor>
				
				<div class="panel">
					<table class="table custom-table-wrapper">
						<thead>
						<tr>
							<th>Status</th>
							<th>Name</th>
							<th>Email</th>
							<th>Commission</th>
							<th>Balance</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="advertiser in items">
							<td>
								<a href="" type="button">
									<div class="statusClass deactivated">&nbsp;</div>
								</a>
							</td>
							<td> {{advertiser.name}} </td>
							<td> {{advertiser.email}} </td>
							<td> {{advertiser.commission}}%  </td>
							<td class="balance">  {{getData(currency, advertiser.currency, 'symbol', 'name')}}{{advertiser.billing_balance || 0}} </td>
							<td>
								<div class="actions">
									<a data-target="#editAccount" data-toggle="modal" @click="editItem(advertiser._id)" class="" data-original-title="Edit Account" data-placement="top"  data-trigger="hover" title=""><span class="fa fa-pencil"></span></a>
									<a @click="remove(advertiser._id)" class="" data-original-title="Edit Account" data-placement="top" data-toggle="popover" data-trigger="hover" title=""><span class="fa fa-trash"></span></a>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import {request} from '@/config/default/request'
	import {vListMethods} from '@/components/Mixins'
	import vBus from '@/components/Bus'
	import AdvertiserEditor from './advertiser/AdvertiserEditor'
	import {mapGetters} from 'vuex'

	export default {
		mixins: [vListMethods],
		components: {
			AdvertiserEditor
		},
		data() {return {
			items: [],
			active: {
				options:{
					platforms:[],
					facebook: {
						adaccount: {}
					}
				}
			}
		}},
		methods: {
			addItem(advertiser) {
				this.add(advertiser);
			},
			editItem(id) {
				vBus.$emit('advertiser-editor:edit', id);
			},
			updateItem(item) {
				this.updateDirect(item._id, item);
			},
			reset() {
				Vue.set(this, 'active', {});
			}
		},
		mounted() {
			this.listName = 'advertisers';
			this.loadItems();
		},
		computed: {
			...mapGetters('session', ['currency'])
		}
  }
</script>