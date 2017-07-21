<template>
	<div class="row">
		<div class="col-sm-8 no-border border-1-right border-gray" style="border-style:solid">
			<label class="no-style col-xs-12">
				<input type="radio" v-model="adRotation" name="adRotation" value="OPTIMIZE"> Optimize for clicks
			</label>
			<label class="no-style col-xs-12">
				<input type="radio" v-model="adRotation" name="adRotation" value="CONVERSION_OPTIMIZE"> Optimize for conversions
			</label>
			<label class="no-style col-xs-12">
				<input type="radio" v-model="adRotation" name="adRotation" value="ROTATE"> Rotate evenly
			</label>
			<label class="no-style col-xs-12">
				<input type="radio" v-model="adRotation" name="adRotation" value="ROTATE_INDEFINITELY"> Rotate indefinitely
			</label>
		</div>
		<div class="col-sm-4">
			Show ads that are expected to get more clicks. 
		</div>
	</div>
</template>
	
<script>
	import Vue from 'vue'
	export default {
		props: ['value'],
		name: 'AdRotation',
		data: () => ({
			adRotation: 'OPTIMIZE'
		}),
		mounted() {
			Vue.set(this, 'adRotation', this.value)
		},
		watch: {
			adRotation() {
				this.$emit('update:value', this.adRotation);
			} 
		}
	}
</script>
