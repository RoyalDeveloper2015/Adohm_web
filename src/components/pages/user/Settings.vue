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
				<div class="row">
					<div class="col-md-7">
						<legend> Accounts </legend>
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
										<a @click="$set(item.facebook, 'account', {})" class="btn btn-default input-group-addon"> &times; </a>
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
</div>
</template>

<script>
	({
		data: () => ({
			item: {
				facebook: {
					account: {}
				},
				taboola: {
				}
			}
		}),
		methods: {
			fbLogin() {
				FB.login((response) => {
					if(response.status !== 'connected') return vApp.message('Failed to add account', 'danger');
					var authResponse = response.authResponse;
					var account = {id: authResponse.userID, accessToken: authResponse.accessToken};
					// if(!this.fbAccounts.find(el => el.id == authResponse.userID)) {
						FB.api('/me/', (response) => {
							console.log('/me', response);
							account.name = response.name;
							Vue.set(this.item.facebook, 'account', account);
							vApp.message('Facebook account added');
						});
					// }
				}, {
					scope: 'publish_actions,manage_pages,pages_show_list,publish_pages,ads_management,ads_read,business_management,public_profile,basic_info,user_posts,user_events'
				});
			},
			save() {
				$.post('/api/users/me/settings', this.item).done(response => {
					if(!response.success) return vApp.message('Error saving settings');
					vApp.message('Success');
				});
			}
		},
		mounted() {
			$.get('/api/users/me/settings').done(response => {
				if(!response.success) vApp.message('Error getting settings');
				Vue.set(this, 'item', $.extend(true, {}, this.item, response.result));
			});
		},
		computed: {
			fbAccount() {
				return this.item.facebook.account;
			}
		}
	})
</script>