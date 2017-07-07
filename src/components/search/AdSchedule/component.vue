<template>
	<div class="row">
		<div class="col-sm-8 border-1-right border-gray">
			<div v-for="item in schedules" class="row">
				<div class="col-sm-4">
					<select class="form-control" v-model="sel_option" v-on:change="onChangeOption(sel_option,item.from, item.to)">
						<option disabled value=" ">Select one</option>
						<option value="all">All days</option>
						<option value="specific">Other</option>
					</select>
				</div>
				<div class="col-sm-4" style="display: inline-flex">
					<input type="time" class="form-control mr-10">
					<span style="line-height:30px"> To</span>
				</div>
				<div class="col-sm-4">
					<input type="time" class="form-control">
				</div>
			</div>
			<div class="col-sm-12">
				<button class="btn btn-link" v-on:click="addSchedule">ADD</button>
			</div>
			<span class="col-sm-12">Based on account time zone:(GMT+5:30) India Standard Times</span>
		</div>
		<div class="col-sm-4">
			<div class="bg-white no-border">
				To limit when your ads can run,set
				an ad schedule. keep in mind that
				your ads will only run during these times.
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AdSchedule',
		data: function () {
			return {
				sel_option: 'specific',
				schedules: [{
					from: '00:00:AM',
					to: '00:00:AM'
				}]
			}
		},
		methods: {
			onChangeOption: function (opt, from, to) {
				if (opt === 'all') {
					this.schedules = []
					this.schedules.push({
						from: from,
						to: to
					})
				}
				return
			},
			addSchedule: function () {
				this.schedules.push({
					from: '00:00',
					to: '00:00'
				})
			}
		}
	}
</script>
