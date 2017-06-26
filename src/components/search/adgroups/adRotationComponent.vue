<template>
  <div class="panel-body panel-default bg-white">
    <div class="col-sm-3 col-md-3">
      Ad rotation
    </div>
    <div class="col-sm-6 col-md-6 no-border border-1-right border-gray" style="border-style:solid">
      <div style="display: inline; font-size: large">
        <input type="radio" class="" id="ofc" value="ot_click" v-model="sRotation">
        <label for="ofc" class="radio-inline"> Optimize for clicks</label><br>
        <input type="radio" class="" id="ofn" value="ot_conversion" v-model="sRotation">
        <label for="ofn" class="radio-inline"> Optimize for conversions</label><br>
        <input type="radio" class="" id="rte" value="rt_evenly" v-model="sRotation">
        <label for="rte" class="radio-inline"> Rotate evenly</label><br>
        <input type="radio" class="" id="rti" value="rt_indefinitely" v-model="sRotation">
        <label for="rti" class="radio-inline"> Rotate indefinitely</label><br>
      </div>
    </div>
    <div class="col-sm-3 col-md-3">
      <pre class="bg-white no-border">
        Show ads that are expected to get
        more clicks. This is the default
        setting.
      </pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdRotation',
    data: function () {
      return {
        sRotation: 'ot_click'
      }
    }
  }
</script>
