var vFilters = {
	filters: {
		formatDate(value) {
			return moment(value).format('YYYY-MM-DD');
		},
		humanize
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
			]
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
			$.post('/api/insights', params).done(response => {
				var data = [];
				for(var i in response.result)  
					data.push(response.result[i]);
				done(data);
			});
		},
		processValue(item, field) {
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
						return this.details.currency[item.currency];
					}
				}
			});
			return value;
		}
	}
}

Object.all = function(object) {
	var result = object[arguments[1]];
	for(var i = 2; i < arguments.length; i++) result = result && object[arguments[i]];
	return result;
}

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
					if(response.success){
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
				if(this.items[i].id == id) return i;
			}
			return -1;
		},
		loadItems() {
			var $this = this;
			$.get(`/api/${this.listName}/get`).done(function(response) {
				$this.items.push(...response.result);
			});	
		}
	}
};


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
					if(response.success){
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
				if(this.items[i].id == id) return i;
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
}

var vPatches = {
	mounted () {
		$('[data-toggle="toggle"]').change(function() {
			this.dispatchEvent(new Event('input'));
		})
	}
}



function ignore(func) {
	try {return func()} 
	catch(e) {}
}


function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function humanize (value) {
	return value[0].toUpperCase() + value.substr(1).replace(/\_/g, ' ');
}

// Transfer values of keys from src to dst, where key exists in dst
function transfer(dst, src) {
	for(var key in dst) {
		if(src[key] && dst[key] !== undefined) dst[key] = src[key];
	}
	return dst;
}

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
	if(jqxhr.status == 401) {
		vApp.message("You've been logged out, please login to continue", "danger");
		$('#loginModal').modal('show');
	}
})

// Vue.config.errorHandler = function(error) {
// 	console.log(error)
// 	$('.messages').html('<div class="alert alert-danger ">Unexpected error occurred, please refresh this page to continue</div>');
// }

window.APP_ID = '1630352836992136';
window.fbAsyncInit = function() {
	FB.init({
		appId: APP_ID,
		cookie: true,
		xfbml: true,
		version: 'v2.9'
	});
	// FB.AppEvents.logPageView();	 
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}