<template>
	<form @submit.prevent="save()" class="panel border-1 border-gray row ml-n mr-n">
		<div class="panel-heading">
			<div class="panel-title">
				New {{adType}} ad
				<svg class="a-s-fa-Ha-pa pull-right" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#000000">
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
				</svg>
			</div>
		</div>
		<div class="panel-body" v-if="adType == 'text'">
			<div >
				<input v-model="item.finalUrl" class="form-control" type="url" placeholder="Final URL">
			</div>
			<div >
				<input v-model="item.headline1" class="form-control" type="text" placeholder="Headline 1">
			</div>
			<div class="pull-right"><span>0/30</span></div>
			<div class="form-group">
				<input v-model="item.headline2" class="form-control" type="text" placeholder="Headline 2">
			</div>
			<div class="row pr-15"><span class="pull-right">0/30</span></div>
			<div><span>Display path <i class="fa fa-question-circle-o"></i></span></div>
			<div style="display:inline-flex;">
				<span style="line-height:30px">www.example.com/</span>
				<div><input	v-model="item.displayPath.path1" class="form-control" maxlength="15" placeholder="Path 1"></div>
				<span style="line-height:30px">/</span>
				<div><input v-model="item.displayPath.path2" class="form-control" maxlength="15" placeholder="Path 2"></div>
			</div>
			<div class="mt-10" style="display:inline-flex; width:100%;">
				<textarea v-model="item.description" class="form-control" type="text" placeholder="Description" maxlength="80"></textarea>
			</div>
			<div class="row ml-n mr-n" v-on:click="showUrlOption()">
				<i class="fa" v-bind:class="flg_urlOption ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
				<span>Ad URL option</span>
			</div>
			<url-option v-if="flg_urlOption" ></url-option>
		</div>
		<div class="panel-body" v-if="adType == 'callOnly'">
			<div class="form-group">
				<input v-model="item.businessName" class="form-control" type="url" placeholder="Final URL">
			</div>
			<div class="row">
				<div class="col-xs-6">
					<select v-model="item.country" class="form-control">
						<option> India </option>
					</select>
				</div>
				<div class="col-xs-6">
					<input v-model="item.phoneNumber" class="form-control" type="text" placeholder="Phone number">
				</div>
			</div>
			<div>
				<input type="text" v-model="item.description1" class="form-control" placeholder="Description 1">
			</div>
			<div>
				<input type="text" v-model="item.description2" class="form-control" placeholder="Description 2">
			</div>
			<div>
				<input type="text" v-model="item.displayUrl" class="form-control" placeholder="Display URL">
			</div>
			<div>
				<input type="text" v-model="item.verificationUrl" class="form-control" placeholder="Verification URL">
			</div>
			<div>
				<label> Call reporting </label>
				<label class="no-style"> <input type="radio" name="trackCalls" v-model="item.trackCalls" :value="true"> On </label>
				<label class="no-style"> <input type="radio" name="trackCalls" v-model="item.trackCalls" :value="false"> Off </label>
			</div>
			<div v-if="item.trackCalls">
				<label> Report conversions </label>
				<label class="no-style"> <input type="checkbox" v-model="item.countConversions" :value="true"> Count conversions as </label> 
				<select :disabled="!item.countConversions">
					<option> Select one </option>
				</select>
			</div>
		</div>
		<div class="panel-footer">
			<button class="btn btn-link"> DONE </button>
			<button type="button" class="btn btn-link" @click="cancel()"> CANCEL </button>
		</div>
	</form>
</template>

<script>
	import urlOption from '../../extensions/General/newAdUrlOptionComponent.vue'
	import Vue from 'vue'
	import {mapState, mapMutations} from 'vuex'

	export default {
		name: 'newAdComponent',
		components: {
			'url-option': urlOption
		},
		data: function () {
			return {
				flg_urlOption: false,
				adType: 'text'
			}
		},
		beforeMount() {
			var adType = this.$route.query.type || 'text';
			Vue.set(this, 'adType', adType)
		},
		methods: {
			showUrlOption: function () {
				this.flg_urlOption = !this.flg_urlOption
				console.log(this.flg_urlOption)
			},
			save() {
				this.$emit('save')
			},
			cancel: function () {
				this.$emit('cancel')
			},
			...mapMutations('adwords/ad', ['setupAdParams'])
		},
		computed: {
			...mapState('adwords/ad', ['item'])
		},
		watch: {
			adType: {
				immediate: true,
				handler(type) {
					this.$store.commit('adwords/ad/adType', type);
					this.setupAdParams();
				}
			}
		}
	}
</script>

<style>

.input-icon {
	display:inline-flex; width:100%;
}

</style>