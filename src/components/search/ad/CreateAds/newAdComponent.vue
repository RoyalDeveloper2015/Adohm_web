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
			<div>
				<input v-model="text.finalUrl" class="form-control" type="text" placeholder="Final URL">
			</div>
			<div >
				<input v-model="text.headline1" class="form-control" type="text" placeholder="Headline 1">
			</div>
			<div class="pull-right"><span>0/30</span></div>
			<div class="form-group">
				<input v-model="text.headline2" class="form-control" type="text" placeholder="Headline 2">
			</div>
			<div class="row pr-15"><span class="pull-right">0/30</span></div>
			<div><span>Display path <i class="fa fa-question-circle-o"></i></span></div>
			<div style="display:inline-flex;">
				<span style="line-height:30px">www.example.com/</span>
				<div><input	v-model="text.displayPath.path1" class="form-control" maxlength="15" placeholder="Path 1"></div>
				<span style="line-height:30px">/</span>
				<div><input v-model="text.displayPath.path2" class="form-control" maxlength="15" placeholder="Path 2"></div>
			</div>
			<div class="mt-10" style="display:inline-flex; width:100%;">
				<textarea v-model="text.description" class="form-control" type="text" placeholder="Description" maxlength="80"></textarea>
			</div>
			<div class="row ml-n mr-n" v-on:click="showUrlOption()">
				<i class="fa" v-bind:class="flg_urlOption ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
				<span>Ad URL option</span>
			</div>
			<url-option v-if="flg_urlOption" ></url-option>
		</div>
		<div class="panel-body" v-if="adType == 'callOnly'">
			<div class="form-group">
				<input v-model="callOnly.businessName" class="form-control" type="text" placeholder="Business name">
			</div>
			<div class="row">
				<div class="col-xs-6">
					<select v-model="callOnly.countryCode" class="form-control">
						<option value="IN"> India </option>
					</select>
				</div>
				<div class="col-xs-6">
					<input v-model="callOnly.phoneNumber" class="form-control" type="text" placeholder="Phone number">
				</div>
			</div>
			<div>
				<input type="text" v-model="callOnly.description1" class="form-control" placeholder="Description 1">
			</div>
			<div>
				<input type="text" v-model="callOnly.description2" class="form-control" placeholder="Description 2">
			</div>
			<div>
				<input type="text" v-model="callOnly.displayUrl" class="form-control" placeholder="Display URL">
			</div>
			<div>
				<input type="text" v-model="callOnly.verificationUrl" class="form-control" placeholder="Verification URL">
			</div>
			<div>
				<label> Call reporting </label>
				<label class="no-style"> <input type="radio" name="trackCalls" v-model="callOnly.callreporting" :value="true"> On </label>
				<label class="no-style"> <input type="radio" name="trackCalls" v-model="callOnly.callreporting" :value="false"> Off </label>
			</div>
			<!-- <div v-if="callOnly.callreporting">
				<label> Report conversions </label>
				<label class="no-style"> <input type="checkbox" v-model="callOnly.callconversion" :value="true"> Count conversions as </label> 
				<select :disabled="!callOnly.callconversion">
					<option> Select one </option>
				</select>
			</div> -->
		</div>
		<div class="panel-footer">
			<button class="btn btn-link">  DONE </button>
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
				flg_urlOption: false
			}
		},
		mounted() {
			var adType = this.$route.query.type || 'text';
			debugger
			this.setAdType(adType)
		},
		methods: {
			showUrlOption: function () {
				this.flg_urlOption = !this.flg_urlOption
				console.log(this.flg_urlOption)
			},
			save() {
				this.$store.dispatch('adwords/ad/save').then(result => {

				})
			},
			cancel: function () {
				this.$emit('cancel')
			},
			...mapMutations('adwords/ad', ['setAdType'])
		},
		computed: {
			...mapState('adwords/ad', ['text', 'callOnly', 'adType'])
		}
	}
</script>

<style>

.input-icon {
	display:inline-flex; width:100%;
}

</style>