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
							<td> {{advertiser.name}} ({{advertiser.id}}) </td>
							<td> {{advertiser.email}} </td>
							<td> {{advertiser.net_fee}}%  </td>
							<td class="balance">  ${{advertiser.billing_balance || 0}} </td>
							<td>
								<div class="actions">
									<div class="noselect sub-actions">
									<a data-target="#editAccount" data-toggle="modal" @click="editItem(advertiser.id)" class="" data-original-title="Edit Account" data-placement="top"  data-trigger="hover" title=""><span class="fa fa-pencil"></span></a>
									<a @click="remove(advertiser.id)" class="" data-original-title="Edit Account" data-placement="top" data-toggle="popover" data-trigger="hover" title=""><span class="fa fa-trash"></span></a>
									</div>
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
	export default {
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
				$.get('/api/advertisers/get/' + id).done(response => {
					Vue.set(this, 'active', $.extend(true, {}, this.active, response.result) );
				});
			},
			updateItem(item) {
				console.log(clone(item));
				this.update(item.id, item, (ok) => {
					if(ok) $('#editAccount').modal('hide')
				});
			},
			reset() {
				Vue.set(this, 'active', {});
			}
		},
		mounted() {
			this.listName = 'advertisers';
			this.loadItems();
		}
  }
</script>