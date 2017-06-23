<script>
import {mapMutations, mapGetters} from 'vuex'
export {vItems, vListMethods, vUtils};
import {request} from '@/config/default/request'
import axios from 'axios'

var vItems = {
	// required: this.listName
	// optional: this.onSuccess, this.onFailure
	methods: {
		status(success, message) {
			if(success) {
				// vApp.message('Success !');
				this.onSuccess && this.onSuccess();
			} else {
				vApp.message('Error performing last action', 'danger');
				this.onFailure && this.onFailure();
			}
		},
		update(item, done) {
			var $this = this;
			// this.prefilter(update);
			var index = this.getIndex(item.id);
			if(index < 0) return;

			$.post(`/api/${this.listName}/`, item)
				.done((response) => {
					$this.status(response.success);
					if(response.success) {
						$this.items[index] = Object.assign($this.items[index], response.result);
						done && done(true);
					} else done && done(false)
				})
				.fail(() => $this.status(false));
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
				.done((response) => {
					$this.status(response);
					if(response.success) {
						var index = $this.getIndex(id);
						if(index > -1) $this.items.splice(index, 1);
					}
				})
				.fail(() => {
					$this.status(false)
				})
		},
		getIndex(id) {
			for(var i = 0; i < this.items.length; i++) {
				if(this.items[i].id === id) return i;
			}
			return -1;
		},
		loadItems() {
			var $this = this;
			$.get(`/api/${this.listName}/`).done(function(response) {
				$this.items.push(...response.result);
			});
		}
	}
};

var vListMethods = {
	// required: this.listName
	// optional: this.onSuccess, this.onFailure
	methods: {
		status(response) {
			if(response && response.success) {
				// vApp.message('Success !');
				this.onSuccess && this.onSuccess();
			} else {
				vApp.message('Error performing last action: ' + response.error, 'danger');
				this.onFailure && this.onFailure();
			}
		},
		add(item, done) {
			var $this = this;
			// this.prefilter(item);
			$.post(`/api/${this.listName}/add`, item)
				.done((response) => {
					$this.status(response);
					if(response.success) {
						this.items.push(response.result);
						done && done(true);
					} else done && done(false);
				})
				.fail(() => $this.status(false));
		},
		update(id, item, done) {
			var $this = this;
			// this.prefilter(update);
			var index = this.getIndex(id);
			if(index < 0) return;

			$.post(`/api/${this.listName}/update/${id}`, item)
				.done((response) => {
					$this.status(response);
					if(response.success) {
						$this.items[index] = Object.assign($this.items[index], response.result);
						done && done(true);
					} else done && done(false)
				})
				.fail(() => $this.status(false));
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
			$.post(`/api/${this.listName}/delete/${id}`)
				.done((response) => {
					$this.status(response);
					if(response.success) {
						var index = $this.getIndex(id);
						if(index > -1) $this.items.splice(index, 1);
					}
				})
				.fail(() => {
					$this.status(false)
				})
		},
		getIndex(id) {
			for(var i = 0; i < this.items.length; i++) {
				if(this.items[i].id === id) return i;
			}
			return -1;
		},
		loadItems() {
			$.get(`/api/${this.listName}/get`).done(response => {
				this.items.push(...response.result);
			});
		}
	}
}

var vUtils = {
	methods: {
		...mapMutations('session', ['message']),
		search({url, listTarget, listSource, query}) {
			if(query !== undefined && !query) return;
			else url = url.replace(/\{query\}/g, encodeURIComponent(query))
			this.isLoading = true;
			var req = request;
			if(url.substr(0, 4) === 'http') {req = axios}
			req.get(url).then(response => {
				var list = eval('response.data' + (listSource || '.result'));
				if(Array.isArray(list) && list.length) {
					this.isLoading = false;
					listTarget[0][listTarget[1]] = list;
				} else listTarget[0][listTarget[1]] = [];
			}).catch((error) => {
				console.error(error);
				listTarget[0][listTarget[1]] = []
			})
		}
	},
	computed: {
		...mapGetters('session', ['user', 'fbApi'])
	},
	filters: {
		formatDate(value) {
			return moment(value).format('YYYY-MM-DD');
		},
		humanize (value) {
			return value[0].toUpperCase() + value.substr(1).replace(/\_/g, ' ');
		}
	}
}
</script>
