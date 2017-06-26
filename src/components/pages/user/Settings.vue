<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Settings</h2>
				<p class="sub-title">Configure your account</p>
			</div>

		</div>
		<!-- /.row -->
		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Profile </li>
					<li class="active">Settings</li>
				</ul>
			</div>
		</div>
	</div>

	<section class="section">
		<div class="container-fluid">
			<div class="panel">
				<div class="panel-heading">
					<h4 class="panel-title"> Accounts </h4>
				</div>
				<div class="panel-body">
					<div class="row form-group">
						<div class="col-xs-4">
							<label for="" class="control-label">
								Facebook accounts
							</label>
						</div>
						<div class="col-xs-8">
							<div class="row col-xs-12 form-group">
								<div class="input-group">
									<input class="form-control" disabled :value="fbAccount.name">
									<a @click="removeFBAccount()" class="btn btn-default input-group-addon"> &times; </a>
								</div>
							</div>
							<a class="btn btn-default" @click="fbLogin()"> Add Account </a>
						</div>
					</div>
					<hr>
					<div class="row form-group">
						<div class="col-xs-4">
							<label for="" class="control-label">
							</label>
						</div>
						<div class="col-xs-8">
							<a class="btn  btn-success" @click="save()"> Save Settings </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import {vUtils} from '@/components/Mixins'

	export default {
		mixins: [vUtils],
		methods: {
			...mapActions('user', ['saveOptions', 'load']),
			...mapMutations('user', ['removeFBAccount']),
			fbLogin() {
				FB.login((response) => {
					if(response.status !== 'connected') return this.message('Failed to add account', 'danger');
					var authResponse = response.authResponse;
					var account = {id: authResponse.userID, accessToken: authResponse.accessToken};
					FB.api('/me/', (response) => {
						account.name = response.name;
						this.$store.commit('user/setFBAccount', account);
						this.message('Facebook account added');
					});
				}, {
					scope: 'manage_pages,pages_show_list,publish_pages,ads_management,ads_read,business_management,user_posts,user_events'
				});
			},
			save() {
				this.saveOptions().then(result => this.message('Success')).catch(error => this.message('Error saving', 'danger'));
			}
		},
		mounted() {
			this.$store.dispatch('user/load');
		},
		computed: {
			...mapGetters('user', ['fbAccount'])
		}
	}
</script>