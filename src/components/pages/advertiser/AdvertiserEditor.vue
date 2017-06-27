<template>
	<div class="modal fade" id="editAccount" style="overflow: auto">
		<div class="modal-dialog">
			<form @submit.prevent="submit">
				<div class="modal-content">
					<div class="modal-header">
						<h4 v-if="advertiser._id" class="modal-title">
							Edit Account for {{advertiser.name}}
							<a class="close" data-dismiss="modal">×</a>
						</h4>
						<h4 v-else class="modal-title">
							Create Advertiser
							<a class="close" data-dismiss="modal">×</a>
						</h4>
					</div>
					<div class="modal-body">
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Name</label>
							</div>
							<div class="col-sm-9">
								<input required v-model="advertiser.name" type="text" class="form-control" placeholder="Name">
							</div>
						</div> 
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Email</label>
							</div>
							<div class="col-sm-9">
								<input required v-model="advertiser.email" type="email" class="form-control" placeholder="Email">
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Currency</label>
							</div>
							<div class="col-sm-9">
								<multi-select required v-model="advertiser.currency" :options="currency.map(el => el.name)"> </multi-select>
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Country</label>
							</div>
							<div class="col-sm-9">
								<multi-select :required="true" v-model="advertiser.country" :options="details.countries"
									track-by="id" label="name"
									@search-change="query => search({
										url: '/api/geo/?type=country',
										listTarget: [details, 'countries']
									})"></multi-select>
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Billing address</label>
							</div>
							<div class="col-sm-9">
								<textarea required class="form-control" v-model="advertiser.options.billing_address"></textarea>
							</div>
						</div>
						
						<div class="row form-group" v-if="user.role.id == 1">
							<div class="col-sm-3"> 
								<label class="control-label">Commission</label>
							</div>
							<div class="col-sm-9">
								<input required v-model="advertiser.net_fee" type="number"  min="0" max="100" class="form-control" placeholder="Commission">
							</div>
						</div>
						
						<div class="row form-group">
							<div class="col-sm-3"> 
								<label class="control-label">Platforms Enabled</label>
							</div>
							<div class="col-sm-9 flexbox">
								<label style="display: inline-block"> <input type="checkbox" v-model="advertiser.options.platforms" value="facebook"> Facebook &nbsp;</label>
								<label style="display: inline-block"> <input type="checkbox" v-model="advertiser.options.platforms" value="dcm"> DCM </label>
								<label style="display: inline-block"> <input type="checkbox" v-model="advertiser.options.platforms" value="adwords"> Adwords </label>
							</div>
						</div>	
						<template v-if="advertiser.options.platforms.includes('facebook') ">
							<legend>Facebook account</legend>
							<div class="row mt-10 form-group">
								<div class="col-sm-3"> 
									<label class="control-label">Ad Account</label>
								</div>
								<div class="col-sm-9">
									<multi-select :required="true" v-model="advertiser.options.facebook.adaccount" placeholder="Select Account" :options="details.adaccounts"
									track-by="account_id" label="name"
									@search-change="query => search({
										url: fbApi.baseUrl + '/me/adaccounts?fields=name,account_id,account_status&limit=200&access_token=' + fbApi.accessToken,
										filters: [{field: 'account_status', operator: 'equals', value: 1}], 
										listSource: '.data', 
										listTarget: [details, 'adaccounts']
									})"></multi-select>
								</div>
							</div>
						
						</template>
					</div>
					<div class="modal-footer">
						<div class="col-md-offset-8">
							<button @click="clearForm()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
							<button class="btn btn-success">Update</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import {request} from '@/config/default/request'
	import MultiSelect from 'vue-multiselect'
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	import vBus from '@/components/Bus.js'
	import {vUtils} from '@/components/Mixins'

	export default {
		mixins: [vUtils],
		components: {
			MultiSelect
		},
		data() {return {
			advertiser: {
				_id: null,
				name: null,
				email: null,
				commission: 10,
				currency: 'USD',
				country: null,
				options: {
					billing_address: null,
					platforms: ['facebook'],
					facebook: {
						adaccount: null
					}
				}
			},
			details: {
				currency: [],
				countries: [],
				adaccounts: [],
				// timezones:[{"name": "Africa accra","id": 59},{"name": "Africa cairo","id": 53},{"name": "Africa casablanca","id": 86},{"name": "Africa johannesburg","id": 141},{"name": "Africa lagos","id": 96},{"name": "Africa nairobi","id": 78},{"name": "Africa tunis","id": 133},{"name": "America anchorage","id": 4},{"name": "America argentina buenos aires","id": 10},{"name": "America argentina salta","id": 11},{"name": "America argentina san luis","id": 9},{"name": "America asuncion","id": 111},{"name": "America atikokan","id": 33},{"name": "America belem","id": 24},{"name": "America blanc sablon","id": 36},{"name": "America bogota","id": 43},{"name": "America campo grande","id": 23},{"name": "America caracas","id": 139},{"name": "America chicago","id": 6},{"name": "America costa rica","id": 44},{"name": "America dawson","id": 27},{"name": "America dawson creek","id": 29},{"name": "America denver","id": 2},{"name": "America edmonton","id": 30},{"name": "America el salvador","id": 131},{"name": "America guatemala","id": 61},{"name": "America guayaquil","id": 51},{"name": "America halifax","id": 37},{"name": "America hermosillo","id": 92},{"name": "America iqaluit","id": 34},{"name": "America jamaica","id": 75},{"name": "America la paz","id": 21},{"name": "America lima","id": 103},{"name": "America los angeles","id": 1},{"name": "America managua","id": 97},{"name": "America mazatlan","id": 93},{"name": "America mexico city","id": 94},{"name": "America montevideo","id": 138},{"name": "America nassau","id": 26},{"name": "America new york","id": 7},{"name": "America noronha","id": 22},{"name": "America panama","id": 102},{"name": "America phoenix","id": 5},{"name": "America port of spain","id": 135},{"name": "America puerto rico","id": 107},{"name": "America rainy river","id": 31},{"name": "America regina","id": 32},{"name": "America santiago","id": 41},{"name": "America santo domingo","id": 49},{"name": "America sao paulo","id": 25},{"name": "America st johns","id": 38},{"name": "America tegucigalpa","id": 63},{"name": "America tijuana","id": 91},{"name": "America toronto","id": 35},{"name": "America vancouver","id": 28},{"name": "Asia amman","id": 76},{"name": "Asia baghdad","id": 72},{"name": "Asia bahrain","id": 20},{"name": "Asia bangkok","id": 132},{"name": "Asia beirut","id": 81},{"name": "Asia colombo","id": 82},{"name": "Asia dhaka","id": 17},{"name": "Asia dubai","id": 8},{"name": "Asia gaza","id": 108},{"name": "Asia ho chi minh","id": 140},{"name": "Asia hong kong","id": 62},{"name": "Asia irkutsk","id": 121},{"name": "Asia jakarta","id": 66},{"name": "Asia jayapura","id": 68},{"name": "Asia jerusalem","id": 70},{"name": "Asia kamchatka","id": 125},{"name": "Asia karachi","id": 105},{"name": "Asia kolkata","id": 71},{"name": "Asia krasnoyarsk","id": 120},{"name": "Asia kuala lumpur","id": 95},{"name": "Asia kuwait","id": 80},{"name": "Asia magadan","id": 124},{"name": "Asia makassar","id": 67},{"name": "Asia manila","id": 104},{"name": "Asia muscat","id": 101},{"name": "Asia nicosia","id": 45},{"name": "Asia omsk","id": 119},{"name": "Asia qatar","id": 112},{"name": "Asia riyadh","id": 126},{"name": "Asia seoul","id": 79},{"name": "Asia shanghai","id": 42},{"name": "Asia singapore","id": 128},{"name": "Asia taipei","id": 136},{"name": "Asia tokyo","id": 77},{"name": "Asia vladivostok","id": 123},{"name": "Asia yakutsk","id": 122},{"name": "Asia yekaterinburg","id": 118},{"name": "Atlantic azores","id": 109},{"name": "Atlantic canary","id": 54},{"name": "Atlantic reykjavik","id": 73},{"name": "Australia broken hill","id": 14},{"name": "Australia perth","id": 13},{"name": "Australia sydney","id": 15},{"name": "Europe amsterdam","id": 98},{"name": "Europe athens","id": 60},{"name": "Europe belgrade","id": 114},{"name": "Europe berlin","id": 47},{"name": "Europe bratislava","id": 130},{"name": "Europe brussels","id": 18},{"name": "Europe bucharest","id": 113},{"name": "Europe budapest","id": 65},{"name": "Europe copenhagen","id": 48},{"name": "Europe dublin","id": 69},{"name": "Europe helsinki","id": 56},{"name": "Europe istanbul","id": 134},{"name": "Europe kaliningrad","id": 115},{"name": "Europe kiev","id": 137},{"name": "Europe lisbon","id": 110},{"name": "Europe ljubljana","id": 129},{"name": "Europe london","id": 58},{"name": "Europe luxembourg","id": 84},{"name": "Europe madrid","id": 55},{"name": "Europe malta","id": 88},{"name": "Europe moscow","id": 116},{"name": "Europe oslo","id": 99},{"name": "Europe paris","id": 57},{"name": "Europe prague","id": 46},{"name": "Europe riga","id": 85},{"name": "Europe rome","id": 74},{"name": "Europe samara","id": 117},{"name": "Europe sarajevo","id": 16},{"name": "Europe skopje","id": 87},{"name": "Europe sofia","id": 19},{"name": "Europe stockholm","id": 127},{"name": "Europe tallinn","id": 52},{"name": "Europe vienna","id": 12},{"name": "Europe vilnius","id": 83},{"name": "Europe warsaw","id": 106},{"name": "Europe zagreb","id": 64},{"name": "Europe zurich","id": 39},{"name": "Indian maldives","id": 90},{"name": "Indian mauritius","id": 89},{"name": "Num timezones","id": 142},{"name": "Pacific auckland","id": 100},{"name": "Pacific easter","id": 40},{"name": "Pacific galapagos","id": 50},{"name": "Pacific honolulu","id": 3}]
			},
			options: {
			}
		}},
		mounted() {
			console.log(this.currency);
			vBus.$on('advertiser-editor:edit', id => {
				this.editItem(id);
			});
			vBus.$on('advertiser-editor:reset', () => {
				this.clearForm();
				if(false) {
					Vue.set(this, 'advertiser', Object.assign(this.advertiser, {
						name: 'Test',
						email: 'test@test',
						currency: 'USD',
						country: {id: 'IND'},
						commission: 10,
						billing_address: 'Address'
					}));
				}
			});


		},
		methods: {
			updateList(list, value, key='id') {
				if(!Array.isArray(value)) value = [value];
				value.forEach(item => {
					if(!list.find(el => el[key] == item[key])) list.push(item);
				});
			},
			submit(event) {
				var advertiser_id = this.advertiser._id;
				var url = '/api/advertisers/' + (advertiser_id ? advertiser_id : '');
				request.post(url, this.advertiser).then(({data}) => {
					if(!data.success) return this.message('Error saving advertiser: ' + data.error, 'danger');
					if(advertiser_id) this.$emit('update', data.result);
					else this.$emit('add', data.result);
					$('#editAccount').modal('hide');
					this.clearForm();				
				});
			},
			editItem(id) {
				request.get('/api/advertisers/' + id).then(({data}) => {
					Vue.set(this, 'advertiser', $.extend(true, {}, this.advertiser, data.result));
				});
			},
			clearForm() {
				this.advertiser = Object.assign({}, this.advertiser, this.$options.data().advertiser);
			}
		},
		watch: {
			item(item) {
				this.advertiser = Object.assign({}, this.advertiser, item);
				if(!item._id) this.clearForm(true);
			}
		},
		computed: {
			...mapGetters('session', ['user', 'fbApi', 'currency'])
		}
	}
</script>