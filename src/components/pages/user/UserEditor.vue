<template>
	<div id="editUser" class="modal fade in" role="dialog">
		<div class="modal-dialog">
			<form @submit.prevent="submit">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">
							{{item._id ? `Edit User: ${item.name} ` : 'New User'}}
							<button type="button" class="close" data-dismiss="modal">×</button>
						</h4>
					</div>
					<div class="modal-body">
						<div class="form-container">
							<div class="row form-group">
								<label class="col-sm-4 control-label text-right">Name</label>
								<div class="col-sm-8">
									<input required v-model="item.name" type="text" class="form-control" placeholder="Name">
								</div>
							</div>
							
							<div class="row form-group">
								<label class="col-sm-4 control-label text-right">Login</label>
								<div class="col-sm-8">
									<input required v-model="item.login" type="text" class="form-control" placeholder="Login">
								</div>
							</div>

							<div class="row form-group">
								<label class="col-sm-4 control-label text-right">Email</label>
								<div class="col-sm-8">
									<input required v-model="item.email" type="text" class="form-control" placeholder="Email">
								</div>
							</div>

							<div class="row form-group">
								<label class="col-sm-4 control-label text-right">Role</label>
								<div class="col-sm-8">
									<multi-select label="name" track-by="id" :disabed="user.role.id != 'superadmin'"  v-model="item.role" :options="details.roles"></multi-select>
								</div>
							</div>
							
							<div class="row form-group">
								<label class="col-sm-4 control-label text-right">Assign Advertisers</label>
								<div class="col-sm-8">
									<multi-select label="name" track-by="_id" v-model="item.advertisers" :options="details.advertisers" :multiple="true"
										@search-change="query => search({
											url: '/api/advertisers',
											listTarget: [details, 'advertisers']
										})"></multi-select>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="col-md-offset-8">
							<button type="button" class="btn btn-default cancelEdit" data-dismiss="modal" aria-label="Close" aria-hidden="true">Cancel</button>
							<button class="btn btn-success">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import {request} from '@/config/default/request'
	import {vListMethods,vUtils} from '@/components/Mixins'
	import MultiSelect from 'vue-multiselect'
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	import vBus from '@/components/Bus.js'

	export default {
		mixins: [vUtils],
		components: {
			MultiSelect
		},
		data() {return {
			item: {
				_id: null,
				name: null,
				email: null,
				login: null,
				role: {},
				advertisers: []
			},
			details: {
				advertisers: [],
				roles: []
			}
		}},
		mounted() {
			var $this = this;
			var roles = [
				{id: 'superadmin', name: 'Super Admin', create_roles: ['superadmin', 'admin', 'advertiser', 'user']},
				{id: 'admin', name: 'Admin', create_roles: ['admin', 'admin', 'advertiser', 'user']},
				{id: 'advertiser', name: 'Advertiser', create_roles: ['user']},
				{id: 'user', name: 'User'}
			];
			var current_role = roles.find(el => el.id == this.user.role.id);
			Vue.set(this.details, 'roles', roles.filter(el => current_role.create_roles && current_role.create_roles.includes(el.id)) ); // Current user can only create user with role id present in create_roles array
			request.get('/api/advertisers/').then(({data}) => {
				$this.$parent.status(data);
				Vue.set($this.details, 'advertisers', data.result);
			});
			// this.item = Object.assign({}, this.item, this.data);
			vBus.$on('user-editor:edit', id => {
				this.editItem(id);
			});
			vBus.$on('user-editor:reset', () => {
				this.clearForm();
			});
		},
		methods: {
			setData(object, key, value) {
				console.log(key, value);
				Vue.set(this.item, key, value);
			},
			submit() {
				var item = Object.assign({}, this.item);
				var id = item._id;
				var url = '/api/users/' + (id ? id : '');
				request.post(url, item).then(({data}) => {
					if(!data.success) return this.message('Error saving user: ' + data.error, 'danger');
					if(id) this.$emit('update', this.item);
					else this.$emit('add', Object.assign(this.item, {id: data.result}));
					$('#editUser').modal('hide');
					this.clearForm();				
				});
			},
			editItem(id) {
				request.get('/api/users/' + id).then(({data}) => {
					Vue.set(this, 'item', $.extend(true, {}, this.item, data.result));
				});
			},
			clearForm() {
				this.item = Object.assign({}, this.item, this.$options.data().item);
			}
		},
		watch: {
			data:{
				deep: true,
				handler: function(data) {
					var $this = this;
					// console.log(clone(data));
					if(data.id)
						request.get('/api/users/' + data.id).then(({data}) => {
							// $this.$parent.status(response.success);
							if(data.success) {
								data.advertisers = data.result.advertisers;
								$this.item = Object.assign({}, $this.item, data);
							}
						});
					else this.clearForm(true);
				}
			}
		},
		computed: {
			...mapGetters('session', ['user'])
		}
	}
</script>
