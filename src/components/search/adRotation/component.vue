<template>
  <div class="row">
    <div class="col-sm-8 no-border border-1-right border-gray" style="border-style:solid">
      <div class="radio radio-primary">
        <input id="ofc" type="radio" v-model="sRotation" value="ot_click">
        <label for="ofc">Optimize for clicks</label>
      </div>
      <div class="radio radio-primary">
        <input id="ofn" type="radio" v-model="sRotation" value="ot_conversion">
        <label for="ofn">Optimize for conversions</label>
      </div>
      <div class="radio radio-primary">
        <input id="rte" type="radio" v-model="sRotation" value="rt_evenly">
        <label for="rte">Rotate evenly</label>
      </div>
      <div class="radio radio-primary">
        <input id="rti" type="radio" v-model="sRotation" value="rt_indefinitely">
        <label for="ofc">Rotate indefinitely</label>
      </div>
    </div>
    <div class="col-sm-4">
        Show ads that are expected to get
        more clicks. This is the default
        setting. asdds
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
