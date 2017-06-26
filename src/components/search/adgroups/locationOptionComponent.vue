<template>
  <div class="panel-body panel-default bg-white">
    <div class="col-sm-3">
      <span><b>Location Options</b></span>
    </div>
    <div class="col-sm-9">
      <div style="display: inline; font-size: large">
        <span>Target <i class="fa fa-question-circle-o"></i></span></br>
        <input type="radio" class="" id="itl" value="ot_click" v-model="target">
        <label for="ofc" class="radio-inline"> People in, or who show interest in,your targeted locations (recommended)</label><br>
        <input type="radio" class="" id="ytl" value="ot_conversion" v-model="target">
        <label for="ofn" class="radio-inline"> People in your targeted locations</label><br>
        <input type="radio" class="" id="stl" value="rt_evenly" v-model="target">
        <label for="rte" class="radio-inline"> People searching for your targeted locations</label><br>
      </div>
      <div style="display: inline; font-size: large">
        <span>Exclude <i class="fa fa-question-circle-o"></i></span></br>
        <input type="radio" class="" id="iel" value="ot_click" v-model="exclude">
        <label for="ofc" class="radio-inline"> People in, or who show interest in, your excluded locations (recommended)</label><br>
        <input type="radio" class="" id="yel" value="ot_conversion" v-model="exclude">
        <label for="ofn" class="radio-inline"> People in your excluded locations</label><br>
      </div>
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
