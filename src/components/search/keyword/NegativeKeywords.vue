<template>
	<div>
		<router-link to="/search/keywords/negative/add"><a class="round-button"><i class="fa fa-plus"></i></a></router-link>
		<div class="content-table">
			<table id="example" class="display table table-striped table-bordered" cellspacing="0">
				<thead>
					<tr>
						<th>
							<input type="checkbox" value="">
						</th>
						<th>Negative Keywords</th>
						<th>Added to</th>
						<th>Level</th>
						<th>Match type</th>
					</tr>					
				</thead>
				<tfoot>
				
				</tfoot>
				<tbody>				
					<tr class="content-row"v-for="keyword in items">
						<td>
							<input type="checkbox" value="">
						</td>
						<td>{{keyword.name}}</td>
						<td>{{keyword.impr}}</td>
						<td>{{keyword.clicks}}</td>
						<td>{{keyword.ctr}}%</td>
					</tr>						 
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import {mapActions, mapState} from 'vuex'

	require('datatables.net')
	require('datatables.net-bs')

export default {
	name: 'searchCampaign',
	data: function () {
		return {
		}
	},
	methods: {
		...mapActions('adwords/keyword', ['getAll']),
		...mapState('adwords/keyword', ['items']),

	},
	mounted: function () {
		this.$nextTick(function () {
			$('#example').DataTable({
				'paging': false
			})
		});
		// this.getAll().then(keywords => {
		// 	Vue.set(this, 'keywords', keywords);
		// });
	},
	watch: {
		// keywords: {
		// 	handler(keywords) {
		// 		for (let i = 0; i < keywords.length; i++) {
		// 			this.totalbudget = this.totalbudget + keywords[i].budget.amount
		// 		}
		// 	}
		// }
	}
}
</script>

