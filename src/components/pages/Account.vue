<template>
	<div>
		<div class="container-fluid">
			<div class="row page-title-div">
				<div class="col-sm-6">
					<h2 class="title">Account</h2>
					<p class="sub-title">Account overiew and management</p>
				</div>
			</div>
			<!-- /.row -->
			<div class="row breadcrumb-div">
				<div class="col-sm-6">
					<ul class="breadcrumb">
						<li><i class="fa fa-home"></i> Home </li>
						<li><i class="fa fa-account"></i> Account </li>
					</ul>
				</div>
			</div>
		</div>

		<section class="section">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-4">
						<div class="panel">
							<div class="panel-heading"> 
								<h4 class="panel-title"> Balance </h4>
							</div>
							<div class="panel-body">
								<h1 class="text-center m-10"> {{advertiser.balance | formatAmount(advertiser.currency)}} </h1>
							</div>
							<div class="panel-footer">
								<small>
									<a data-toggle="modal" href="#makePayment">Make Payment</a> 
									<!-- &#183; -->
									<!-- <router-link class="text-right" to="/user/billing-history">Billing History</router-link> -->
								</small>
							</div>
						</div>
					</div>
					<div class="col-xs-8">
						<div class="panel">
							<div class="panel-heading"> 
								<h4 class="panel-title"> Payment History </h4>
							</div>
							<div class="panel-body">
								<table class="table table-stripped">
									<thead> 
										<tr> 
											<th> Date </th> 
											<th> Amount </th>
											<th> Status </th>
										</tr>
									</thead>
									<tbody> 
										<tr v-for="payment in payments">
											<td> {{payment.date | formatDate}} </td>
											<td> {{payment.amount | formatAmount(advertiser.currency)}} </td>
											<td> {{payment.status}} </td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="panel-footer">
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div id="makePayment" class="modal fade in" role="dialog">
			<div class="modal-dialog">
				<form @submit.prevent="makePayment()">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">
								Make payment
								<button type="button" class="close" data-dismiss="modal">×</button>
							</h4>
						</div>
						<div class="modal-body">
							<div class="form-container">
								<div class="row form-group">
									<label class="col-sm-4">Amount</label>
									<div class="col-sm-8">
										<input required v-model="payment.amount" type="number" min="500" step="100" class="form-control" placeholder="Enter amount">
									</div>
								</div>
								
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
							<button class="btn btn-success">Make payment</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {request} from '@/config/default/request'
import {vUtils} from '@/components/Mixins'
import Vue from 'vue'

export default {
	name: 'Account',
	mixins: [vUtils],
	data: () => ({
		payment: {
			amount: 0
		},
		payments: []
	}),
	computed: {
		...mapState('session', ['user', 'currency']),
		advertiser() {
			return this.user.advertisers[0];
		},
		advertiserCurrency() {
			return this.currency.find(el => el.name == this.advertiser.currency).symbol;
		}
	},
	methods: {
		makePayment() {
			var payment = clone(this.payment);
			payment.advertiser = this.advertiser._id;
			request.post('/api/advertisers/payments', payment).then(({data}) => {
				if(data.success) {
					$('#makePayment').modal('hide');
					Vue.set(this.advertiser, 'balance', this.advertiser.balance + data.result.amount);
					this.payments.push(data.result);
				} else this.message('Error making payment: ' + data.error, 'danger');
			});
		}
	},
	mounted() {
		request.get('/api/advertisers/payments').then(({data}) => {
			Vue.set(this, 'payments', data.result);
		})
	}
}
</script>
<style scoped>
.panel-heading {
	text-transform: uppercase;
}

</style>
