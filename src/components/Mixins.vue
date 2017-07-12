<script>
import {mapMutations, mapGetters} from 'vuex'
import {request} from '@/config/default/request'
import axios from 'axios'
import Vue from 'vue'

const filters = {
	humanize (value) {
		if(!value) return;
		return value[0].toUpperCase() + value.substr(1).replace(/\_/g, ' ');
	}
}

const utils = {
	clone(object) {
		return JSON.parse(JSON.stringify(object));
	}
};

var vUtils = {
	methods: {
		message(message, type) {
			this.$store.commit('session/message', {message, type});
		},
		search({url, listTarget, listSource, query}) {
			if(query !== undefined && !query) return;
			else url = url.replace(/\{query\}/g, encodeURIComponent(query))
			this.isLoading = true;
			var req = request;
			if(url.substr(0, 4) === 'http') {req = axios}
			req.get(url).then(response => {
				if(listSource == undefined) listSource = '.result';
				var list = eval('response.data' + listSource);
				if(Array.isArray(list) && list.length) {
					this.isLoading = false;
					listTarget[0][listTarget[1]] = list;
				} else listTarget[0][listTarget[1]] = [];
			}).catch((error) => {
				console.error(error);
				listTarget[0][listTarget[1]] = []
			})
		},
		getData(list, where_value, select_field, where_key='_id') {
			var item = list.find((item) => item[where_key] == where_value);
			return item && item[select_field];
		}
	},
	computed: {
		...mapGetters('session', ['user', 'fbApi'])
	},
	filters: {
		formatDate(value) {
			return moment(value).format('YYYY-MM-DD');
		},
		formatAmount(value, currency) {
			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency,
				minimumFractionDigits: 2,
			});
			return formatter.format(value);
		},
		...filters
	}
}

var vItems = {
	// required: this.listName
	// optional: this.onSuccess, this.onFailure
	methods: {
		status(success, message) {
			if(success) {
				// this.message('Success !');

				this.onSuccess && this.onSuccess();
			} else {
				this.message('Error performing last action', 'danger');
				this.onFailure && this.onFailure();
			}
		},
		update(item, done) {
			var $this = this;
			// this.prefilter(update);
			var index = this.getIndex(item.id);
			if(index < 0) return;

			$.post(`/api/${this.listName}/`, item)
				.then(({data}) => {
					$this.status(data.success);
					if(data.success) {
						$this.items[index] = Object.assign($this.items[index], data.result);
						done && done(true);
					} else done && done(false)
				})
				.catch(() => $this.status(false));
		},
		updateDirect(id, item) {
			var index = this.getIndex(id);
			if(index < 0) return;
			this.items[index] = Object.assign(this.items[index], item);
		},
		get(id) {
			var index = this.getIndex(id);
			if(index > -1) return this.items[index];
			else return false;
		},
		remove(id) {
			var $this = this;
			$.delete(`/api/${this.listName}/${id}`)
				.then(({data}) => {
					$this.status(data);
					if(data.success) {
						var index = $this.getIndex(id);
						if(index > -1) $this.items.splice(index, 1);
					}
				})
				.catch(() => {
					$this.status(false)
				})
		},
		getIndex(id) {
			for(var i = 0; i < this.items.length; i++) {
				if(this.items[i]._id === id) return i;
			}
			return -1;
		},
		loadItems() {
			var $this = this;
			$.get(`/api/${this.listName}/`).then(({data}) => {
				$this.items.push(...data.result);
			});
		}
	}
};

var vListMethods = {
	// required: this.listName
	// optional: this.onSuccess, this.onFailure
	mixins: [vUtils],
	methods: {
		status(response) {
			if(response && response.success) {
				// this.message('Success !');
				this.onSuccess && this.onSuccess();
			} else {
				this.message('Error performing last action: ' + response.error, 'danger');
				this.onFailure && this.onFailure();
			}
		},
		add(item, done) {
			var $this = this;
			// this.prefilter(item);
			request.post(`/api/${this.listName}`, item)
				.then(({data}) => {
					$this.status(data);
					if(data.success) {
						this.items.push(data.result);
						done && done(true);
					} else done && done(false);
				})
				.catch(() => $this.status(false));
		},
		update(id, item, done) {
			var $this = this;
			// this.prefilter(update);
			var index = this.getIndex(id);
			if(index < 0) return;

			request.post(`/api/${this.listName}/${id}`, item)
				.then(({data}) => {
					$this.status(data);
					if(data.success) {
						$this.items[index] = Object.assign($this.items[index], data.result);
						done && done(true);
					} else done && done(false)
				})
				.catch(() => $this.status(false));
		},
		updateDirect(id, item) {
			var index = this.getIndex(id);
			if(index < 0) return;
			Vue.set(this.items, index, $.extend(true, {}, this.items[index], item) );
		},
		get(id) {
			var index = this.getIndex(id);
			if(index > -1) return this.items[index];
			else return false;
		},
		remove(id) {
			var $this = this;
			request.delete(`/api/${this.listName}/${id}`)
				.then(({data}) => {
					$this.status(data);
					if(data.success) {
						var index = $this.getIndex(id);
						if(index > -1) $this.items.splice(index, 1);
					}
				})
				.catch(() => {
					$this.status(false)
				})
		},
		getIndex(id) {
			for(var i = 0; i < this.items.length; i++) {
				if(this.items[i]._id === id) return i;
			}
			return -1;
		},
		loadItems() {
			request.get(`/api/${this.listName}/`).then(({data}) => {
				this.items.push(...data.result);
			});
		}
	}
}

var vInsights = {
	data: () => ({
		details: {
			fields: [
				{ "id": "campaign_id", "name": "Campaign id" },
				{ "id": "campaign_name", "name": "Campaign name" },
				{ "id": "objective", "name": "Campaign objective" },
				{ "id": "date_start", "name": "Start date", "filters": ["formatDate"] },
				{ "id": "date_stop", "name": "End date", "filters": ["formatDate"] },
				{ "id": "results", "name": "Results" },
				{ "id": "cost_per_result", "name": "Cost per result",  "prefix": "{currency}",  "filters": ["toFixed"]},
				{ "id": "clicks", "name": "Clicks" },
				{ "id": "cpc", "name": "CPC", "prefix": "{currency}", "filters": ["toFixed"]},
				{ "id": "cpm", "name": "CPM", "prefix": "{currency}", "filters": ["toFixed"]},
				{ "id": "cpp", "name": "CPP", "prefix": "{currency}", "filters": ["toFixed"]},
				{ "id": "ctr", "name": "CTR", "suffix": "%", "filters": ["toFixed"]},
				{ "id": "frequency", "name": "Frequency" },
				{ "id": "impressions", "name": "Impressions" },
				{ "id": "reach", "name": "Reach" },
				{ "id": "spend", "name": "Spend", "prefix": "{currency}"}
			],
			currency: {}
		}
	}),
	methods: {
		getInsights(_params, done) {
			var _params = Object.assign({
				fields: ['impressions','spend','clicks','cpc','cpm','ctr','results','cost_per_result'],
				range: {
					type: 'predefined',
					value: 'last_30d'
				}
			}, _params||{});
			var fields = clone(_params.fields);
			var _fields = [];
			for(var i in fields) {
				var fieldDetail = this.details.fields.find(el => el.id == fields[i]);
				_fields.push(fields[i]);
			}
			fields = _fields;
			var params = {
				fields: (['objective'].concat(fields)).join(',')
			};
			var range = _params.range;
			if(_params.range.type == 'predefined') {
				params.date_preset = range.value;
			} else {
				params.time_range = {};
				if(range.start)	params.time_range.since = range.start.format('YYYY-MM-DD');
				if(range.end)	params.time_range.until = range.end.format('YYYY-MM-DD');
			}
			request.post('/api/insights', params).then(({data}) => {
				var insights = [];
				for(var i in data.result)  
					insights.push(data.result[i]);
				done(insights);
			});
		},
		processValue(item, field) {
			if(!item) return 0;
			var filters = {
				toFixed: function(value) {
					var number = Number(value);
					if( !isNaN(number) && (Math.round(number) != number) ) return number.toFixed(2);
					else return value;
				},
				formatDate: function(value) {
					return moment(value).format('YYYY-MM-DD');
				}
			};

			var fieldDetails = this.details.fields;
			var fieldDetail = fieldDetails.find(el => el.id == field);
			var value = item[field];

			if(value != undefined || value != null && fieldDetail) {
				if(fieldDetail.filters) {
					fieldDetail.filters.forEach(filter => {
						value = filters[filter](value);
					});
				}
				
				if(fieldDetail.suffix) value = value + this.processMacros(fieldDetail.suffix, item);
				if(fieldDetail.prefix) value = this.processMacros(fieldDetail.prefix, item) + value;
			}
			return value;
		},
		processMacros(value, item) {
			value = value.replace(/\{(\w+)\}/g, ($0, $1) => {
				switch($1) {
					case 'currency': {
						if(!item) return '';
						return this.details.currency[item.advertiser.currency];
					}
				}
			});
			return value;
		}
	},
	mounted() {
		request.get('/api/currency', ({data}) => {
			if(data.success) {
				Vue.set(this.details, 'currency', data.result);
			}
		});
	}
}
export {vItems, vListMethods, vUtils, vInsights, filters, utils};
</script>
