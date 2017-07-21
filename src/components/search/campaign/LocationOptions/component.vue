<template>
<div class="panel-body panel-default bg-white row">
	<div class="mt-10"> 
		<label>Target <i class="fa fa-question-circle-o"></i></label>
	</div>
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" name="location_target" value="interested" v-model="item.target">
			People in, or who show interest in,your targeted locations (recommended)
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" name="location_target" value="in" v-model="item.target">
			People in your targeted locations
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" name="location_target" value="searching" v-model="item.target">
			People searching for your targeted locations
		</label>
	</div>	
	<div class="mt-10"> 
		<label>Exclude <i class="fa fa-question-circle-o"></i></label>
	</div>
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" name="location_exclude" value="interested" v-model="item.exclude">
			People in, or who show interest in, your excluded locations (recommended)
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" name="location_exclude" value="in" v-model="item.exclude">
			People in your excluded locations
		</label>
	</div>	
</div>
</template>

<script>
  export default {
	name: 'locationOption',
	props: ['value'],
	data: () => ({
		item: {
			target: null,
			exclude: null
		}
	}),
	beforeMount() {
		this.item = Object.assign({}, this.item, this.value);
	},
	watch: {
		item() {
			this.$emit('update:value', this.item);
		}
	}
  }
</script>
