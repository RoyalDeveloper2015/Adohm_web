<template>
	<div class="row">
		<div class="col-sm-8 border-1-right border-gray">
			<div v-for="item, idx in items" class="row mb-10">
				<div class="col-sm-4">
					<select class="form-control" v-model="item.dayOfWeek">
						<option value="ALL">All days</option>
						<option value="WEEKDAYS">Mondays - Fridays</option>
						<option value="WEEKENDS">Saturdays - Sundays</option>
						<option value="MONDAY">Mondays</option>
						<option value="TUESDAY">Tuesdays</option>
						<option value="WEDNESDAY">Wednesdays</option>
						<option value="THURSDAY">Thursdays</option>
						<option value="FRIDAY">Fridays</option>
						<option value="SATURDAY">Saturdays</option>
						<option value="SUNDAY">Sundays</option>
					</select>
				</div>
				<div class="col-sm-4" style="display: inline-flex">
					<select v-model="item.startTime" class="form-control mr-10">
						<template v-for="hour in 24">
							<template v-for="minute in 4">
								<option :value="`${hour-1}:${(minute-1)*15}`"> {{hour-1}}:{{(minute-1)*15}} </option>
							</template>
						</template>
					</select>
					<span style="line-height:30px"> To</span>
				</div>
				<div class="col-sm-3">
					<select v-model="item.endTime" class="form-control">
						<template v-for="hour in 24">
							<template v-for="minute in 4">
								<option :value="`${hour-1}:${(minute-1)*15}`"> {{hour-1}}:{{(minute-1)*15}} </option>
							</template>
						</template>
					</select>
				</div>
				<div class="1" v-if="idx > 0">
					<span class="fa fa-times-circle" @click="items.splice(idx, 1)"></span>
				</div>
			</div>
			<div class="col-sm-12">
				<button class="btn btn-link" v-on:click="addSchedule">ADD</button>
			</div>
			<span class="col-sm-12">Based on account time zone:(GMT+5:30) India Standard Times</span>
		</div>
		<div class="col-sm-4">
			<div class="bg-white no-border">
				To limit when your ads can run,set an ad schedule. keep in mind that your ads will only run during these times.
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'AdSchedule',
		data: () => ({
			items: []
		}),
		methods: {
			addSchedule: function () {
				this.items.push(this.getModel())
			},
			getModel() {
	 			return {
					dayOfWeek: 'ALL',
					startTime: null,
					endTime: null
				}
			}
		},
		beforeMount() {
			this.addSchedule();
		},
		watch: {
			items: {
				deep: true, 
				handler(items) {
					this.$emit('update:value', items);
				}
			}
		}
	}
</script>
