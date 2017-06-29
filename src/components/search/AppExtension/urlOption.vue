<template>
  <div class="row m-n p-n">
    <div class="col-sm-12">
      <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Tracking template">
      <span class="my-gray">Example: http://www.trackingc.com/?url={ipurl}&id=5</span>
    </div>
    <div class="col-sm-12">
      <span class="my-gray">Custom Parameter&nbsp;<i class="fa fa-question-circle"></i></span>
    </div>
    <div class="col-sm-12 pl-n">
      <div class="col-sm-4" style="position:relative;">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Name" v-model="param1.name">
        <span class="" style="right:0;position:absolute;top:0;line-height:30px">=</span>
      </div>
      <div class="col-sm-6">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Value" v-model="param1.value">
      </div>
    </div>
    <div class="col-sm-12 pl-n">
      <div class="col-sm-4" style="position:relative;">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Name" v-model="param2.name">
        <span class="" style="right:0;position:absolute;top:0;line-height:30px">=</span>
      </div>
      <div class="col-sm-6">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Value" v-model="param2.value">
      </div>
    </div>
    <div class="col-sm-12 pl-n">
      <div class="col-sm-4" style="position:relative;">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Name" v-model="param3.name">
        <span class="" style="right:0;position:absolute;top:0;line-height:30px">=</span>
      </div>
      <div class="col-sm-6">
        <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Value" v-model="param3.value">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UrlOption',
    data: function () {
      return {
        strUrl: '',
        param1: {
          name: '',
          value: ''
        },
        param2: {
          name: '',
          value: ''
        },
        param3: {
          name: '',
          value: ''
        }
      }
    }
  }
</script>
