<template>
	<div class="row" style="padding-top: 5px">
		<div class="col-xs-4">
			<selectize v-model="activeFilter.field" :data="options.filters" :options="{valueField: 'field', dropdownParent: null}"></selectize>
		</div>
		<div class="col-xs-4">
			<div v-for="filterArgs in options.filters" v-if="filterArgs.field == activeFilter.field">
				<div v-if="filterArgs.inputType == 'text'">
					<input v-model="activeFilter.value" type="text" class="form-control input-search" :placeholder="filterArgs.hint">
				</div>
				<div v-else-if="filterArgs.inputType == 'select'">
					<selectize :key="filterArgs.field" v-model="activeFilter.value" @input="applyFilters" :multiple="!!filterArgs.multiple" :options="filterArgs.inputOptions"></selectize>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	({
		props: ['options'],
		data() {return {
			activeFilter: {
				field: null, type: null, value: null						
			}
		}},
		methods: {
			applyFilters(value) {
				if(!this._items) this._items = this.options.items; // backup unfiltered results
				// console.log(value, this._items);
				if(value == false || value === null || value.length == 0) if(this._items) {
					return this.$emit('input', this._items); // restore if no filter value
				}
				
				var filterObj = clone(this.activeFilter);
				var args = transfer(filterObj, this.getFilterArgs());
				var filter = Object.assign(args, {value});
				$.post(this.options.source, filter).done((response) => {
					this.$emit('input', response.result);
				});
			},
			getFilterArgs() {
				return this.options.filters.find(el => el.field == this.activeFilter.field);
			},
			toggleFilter(event, field, value) {
				$(event.target).toggleClass('active');
			}
		},
		mounted() {
			// console.log(this.options);
			Vue.set(this.activeFilter, 'field', this.options.activeFilter);
		},
		watch: {
			'activeFilter.field': {
				handler(field) {
					Vue.set(this.activeFilter, 'value', null);
				}
			},
			'activeFilter.value': {
				handler(value) {
					// if(value == false ||  value.length == 0 ) return;
					debounce(() => {this.applyFilters(value)}, 500)();
				}
			}
		}
	})
</script>