<template>
<div class="panel-body panel-default bg-white row">
	<div class="mt-10"> 
		<strong class="no-style">Target <i class="fa fa-question-circle-o"></i></strong>
	</div>
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" id="itl" value="ot_click" v-model="target">
			People in, or who show interest in,your targeted locations (recommended)
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" class="" id="ytl" value="ot_conversion" v-model="target">
			People in your targeted locations
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" class="" id="stl" value="rt_evenly" v-model="target">
			People searching for your targeted locations
		</label>
	</div>	
	<div class="mt-10"> 
		<strong class="no-style">Exclude <i class="fa fa-question-circle-o"></i></strong>
	</div>
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" class="" id="iel" value="ot_click" v-model="exclude">
			People in, or who show interest in, your excluded locations (recommended)
		</label>
	</div>	
	<div class="mt-10"> 
		<label class="no-style">
			<input type="radio" class="" id="yel" value="ot_conversion" v-model="exclude">
			People in your excluded locations
		</label>
	</div>	
</div>
</template>

<script>
  export default{
    name: 'locationOption',
    data: function () {
      return {
        target: '',
        exclude: ''
      }
    }
  }
</script>
