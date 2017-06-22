<template>
	<div>
		<div class="container-fluid">
			<div class="row page-title-div">
				<div class="col-sm-6">
					<h2 class="title">User Management</h2>
					<p class="sub-title">Manage users and roles</p>
				</div>

			</div>
			<!-- /.row -->
			<div class="row breadcrumb-div">
				<div class="col-sm-6">
					<ul class="breadcrumb">
						<li><i class="fa fa-home"></i> Users </li>
					</ul>
				</div>
			</div>
		</div>

		<section class="section">
			<div class="container-fluid">
				<div class="row mb-10">
					<div class="col-xs-12">
						<a href="#editUser" data-toggle="modal"  @click="reset()" class="btn btn-success pull-right">Add User</a>
					</div>
				</div>
				<div class="panel">
					<table class="table custom-table-wrapper">
						<thead>
							<tr>
								<th> Name </th>
								<th> Login </th>
								<th> Email </th>
								<th> Role </th>
								<th> Actions </th>
							</tr>
						</thead>
						<tbody>
							<tr class="enter parent-row clickable" v-for="item in items">

								<td class="text-left">
									<div class="nameText">
										{{item.name}} ({{item.id}})
									</div>
								</td>
								<td class="text-left">
									{{item.login}}
								</td>
								<td class="type text-left">
									{{item.email}}
								</td>
								<td>
									{{getListItemProp(roles, item.role, 'name')}}
								</td>
								<td> 
									<div class="actions">
										<div class="noselect sub-actions">
											<a @click="editItem(item)" data-toggle="modal" href="#editUser" title="Edit"><span class="fa fa-pencil"></span></a>
											<a @click="remove(item.id)" class="st-delete" data-placement="top" data-toggle="popover" data-trigger="hover" title="Delete"><span class="fa fa-trash"></span></a>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
		<user-editor @add="addItem" @update="updateItem" @reset="reset()" :data="active"> </user-editor>
	</div>
</template>

<script>
	import {vListMethods} from '@/components/Mixins.vue'
	import {ToolTip} from 'vue-strap'
	export default {
		mixins: [vListMethods],
		components: {ToolTip},
		data() {return {
			items: [],
			active: {},
			roles: [
				{name: 'Admin', id: 1}
			],
			states: [
				{name: 'Active', id: 1}
			]
		}},
		methods: {
			addItem(item) {
				var $this = this;
				this.add(item, function(ok) {
					$this.reset();
				});
			},
			editItem(item) {
				Vue.set(this, 'active', item);
			},
			updateItem(item) {
				var $this = this;
				this.update(item.id, item, (ok) => {
					if(ok) {
						$('#editUser').modal('hide');
						$this.reset();
					}
				});
			},
			reset() {
				Vue.set(this, 'active', {});
			},
			getListItemProp(list, itemId, prop) {
				var item = list.find(el => el.id === itemId);
				return item && item[prop];
			}
		},
		mounted() {
			this.listName = 'users';
			this.loadItems();
		}
	}
</script>