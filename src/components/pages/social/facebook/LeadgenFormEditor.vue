<template>
	<div class="row" style="">
		<form  @submit="save" id="leadform-editor" class="col-md-12">
			<div class="row form-group">
				<div class="col-xs-4">
					<label class="control-label">Lead form</label>
				</div>
				<div class="col-xs-8">
					<div class="col-xs-12 row" style="width: calc(100% - 15px); display: inline-block">
						<multi-select label="name" track-by="id" :options="details.forms" v-model="active"></multi-select>
					</div>
					<a @click="toggleForm" class="btn">
						<span class="glyphicon glyphicon-plus">
						</span>
					</a>
				</div>
			</div>
			<div class="form-group collapse" id="leadform">
				<div class="row form-group">
					<div class="col-xs-4">
						<label class="control-label">Name</label>
					</div>
					<div class="col-xs-8">
						<input required placeholder="Form name" type="text" v-model="item.name" class="form-control">
					</div>
				</div>
				
				<div class="row form-group">
					<div class="col-xs-4">
						<label class="control-label">Follow up url</label>
					</div>
					<div class="col-xs-8">
						<input required type="url" placeholder="Landing page url" v-model="item.follow_up_action_url" class="form-control">
					</div>
				</div>

				<div class="row form-group">
					<div class="col-xs-4">
						<label required class="control-label">Privacy policy page</label>
					</div>
					<div class="col-xs-8">
						<input type="url" placeholder="Privacy policy page link" v-model="item.privacy_policy.url" class="form-control">
					</div>
				</div>
				<div class="row form-group">
					<div class="col-xs-4">
						<label class="control-label"></label>
					</div>
					<div class="col-xs-8">
						<input required type="text" placeholder="Privacy policy link text" v-model="item.privacy_policy.link_text" class="form-control">
					</div>
				</div>
				<div class="row form-group">
					<div class="col-xs-4">
						<label class="control-label">Questions</label>
					</div>
					<div class="col-xs-8">
						<div class="col-md-12">
							<label class="col-xs-5" v-for="question in details.questions">
								<input type="checkbox" v-model="item.questions" :value="question.type"> 
								&nbsp; {{question.name}} &nbsp;
							</label>
						</div>
						<div class="col-md-12">
							<div class="row" style="margin: 5px 0!important" v-for="field,idx in item.customQuestions">
								<div class="col-md-5"><input type="text" v-model="field.key" class="form-control" placeholder="Short name or key"></div>
											<div class="col-md-6"><input type="text" v-model="field.label" class="form-control" placeholder="Field label"></div>
								<div class="col-md-1"><a class="fa fa-close" @click="removeField(idx)"></a></div>
							</div>
						</div>
						<a class="btn btn-default" @click="addField"> Add custom field </a>
					</div>
				</div>

				<div class="row form-group">
					<div class="col-xs-4"></div>
					<div class="col-xs-8">
						<button class="btn btn-success">Save form</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import {vUtils} from '@/components/Mixins'
	import MultiSelect from 'vue-multiselect'
	import Vue from 'vue'
	import {mapGetters} from 'vuex'
	import vBus from '@/components/Bus'
	import {request} from '@/config/default/request';
	import axios from 'axios';
	
	export default {
		components: {MultiSelect},
		mixins: [vUtils],
		props: ['value', 'page'],
		data: () => ({
			item: {
				id: null,
				name: null,
				follow_up_action_url: null,
				questions: [],
				customQuestions: [],
				privacy_policy: {
					url: null,
					link_text: null
				},
				leadgenform_id: null
			},
			active: {},
			details: {
				questions: [
					{name: "First name", type: "FIRST_NAME"},
					{name: "Last name", type: "LAST_NAME"},
					{name: "Phone number", type: "PHONE"},
					{name: "Street address", type: "STREET_ADDRESS"},
					{name: "City", type: "CITY"},
					{name: "State", type: "STATE"},
					{name: "Province", type: "PROVINCE"},
					{name: "Country", type: "COUNTRY"},
					{name: "Post code", type: "POST_CODE"},
					{name: "Zip code", type: "ZIP"},
					{name: "Date of birth", type: "DOB"},
					{name: "Gender", type: "GENDER"},
					{name: "Marital status", type: "MARITIAL_STATUS"},
					{name: "Relationship status", type: "RELATIONSHIP_STATUS"},
					{name: "Military status", type: "MILITARY_STATUS"},
					{name: "Job title", type: "JOB_TITLE"},
					{name: "Work phone number", type: "WORK_PHONE_NUMBER"},
					{name: "Work email", type: "WORK_EMAIL"},
					{name: "Company name", type: "COMPANY_NAME"}
				],
				forms: [],
				accounts: [],
				pages: []
			},
			options: {
				page: {}
			}
		}),
		methods: {
			addField() {
				var fields = this.item.customQuestions;
				if(fields.length == 0 || fields[fields.length-1].key || fields[fields.length-1].label) {
					fields.push({key: null, label: null, type: 'CUSTOM'});
				}
			},
			removeField(index) {
				var fields = this.item.customQuestions;
				fields.splice(index, 1);
			},
			save(event) {
				var vm = this;
				event.preventDefault();
				if(!event.currentTarget.checkValidity()) return;
				var form = clone(this.item);
				var form_id = form.id;
				form.questions = form.questions.map(q => ({type: q}));
				form.questions = form.questions.concat(form.customQuestions);
				delete form.customQuestions;
				delete form.id;
				form.access_token = this.page.access_token;
				if(form_id) {
					FB.api(`/${this.page.id}/${form_id}`, 'POST', form, handleResponse);
				} else FB.api(`/${this.page.id}/leadgen_forms`, 'POST', form, handleResponse);
				
				function handleResponse(response) {
					var id = vm.getId(response, form_id);
					if(!id) return vm.message("Error saving form", "danger");
					vm.message('Success');
					vBus.$emit('input', id);
					vm.details.forms.push({id, name: form.name});
					Vue.set(vm.item, 'id', id);
				}
			},
			toggleForm(event) {
				$(event.currentTarget).find('.glyphicon')
					.toggleClass('glyphicon-plus')
					.toggleClass('glyphicon-minus');
				$('#leadform').slideToggle();
				Vue.set(this, 'item', this.$options.data().item);
			},
			getId(response, existing) {
				if(!response) return false;
				var data = response.data;
				if(Array.isArray(data) && data.length > 0) {
					return data[0].id;
				} else if (response.id) {
					return response.id;
				} else if(response.success) {
					return existing;
				} else if(response.error) {
					console.log(response.error);
				}
				return false;
			}
		},
		mounted() {
			vBus.$on('leadgenform:delete', (value) => {
				request.delete('/api/items/' + value).then(({data}) => {
					if(data.success) {
						// vBus.$emit('leadgenform:deleted', value);
					}
				});
			});

		},
		watch: {
			page(page) {
				console.log("Page changed", page);
				axios.get(`${this.fbApi.baseUrl}/${page.id}/leadgen_forms?fields=id,name&access_token=${page.access_token}`).then(({data}) => {
					Vue.set(this.details, 'forms', data.data || []);
				});
			},
			value(form_id) {
				console.log("value changed");
				FB.api(`/${this.options.page.id}/${form_id}`, 'GET', {access_token: this.fbAccount.accessToken}, function(response) {
					console.log("Lead form get", response)
				});
			},
			'item.id': {
				handler(value) {
					this.$emit('input', value);
				}
			}
		},
		computed: {
			...mapGetters('session', ['fbApi', 'fbAccount'])
		}
	}
</script>