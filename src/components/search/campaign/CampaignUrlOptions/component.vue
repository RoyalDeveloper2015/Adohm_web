<template>
  <div class="row">
    <div class="col-sm-8  no-border border-1-right border-gray" style="border-style:solid">
      <div>
        <span><b>Tracking template <i class="fa fa-question-circle-o"></i></b></span>
      </div>
      <div class="col-sm-9 pl-n mt-10">
        <input type="text" class="form-control">
        <span class="color-light-black">Example http://www.trackingc.com/?url={purl}&id=5</span>
      </div>
      <div class="col-sm-9 pl-n mt-10">
        <span><b>Custom parameter <i class="fa fa-question-circle-o"></i></b></span>
      </div>
      <div class="col-sm-9 pl-n mt-5" >
        <div class="col-sm-4 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="name">
        </div>
        <span class="col-sm-1"> = </span>
        <div class="col-sm-6 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
      <div class="col-sm-9 pl-n mt-5" >
        <div class="col-sm-4 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="name">
        </div>
        <span class="col-sm-1"> = </span>
        <div class="col-sm-6 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
      <div class="col-sm-9 pl-n mt-5" >
        <div class="col-sm-4 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="name">
        </div>
        <span class="col-sm-1"> = </span>
        <div class="col-sm-6 pl-n pr-n" style="display: inline-flex">
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
    </div>
    <div class="col-sm-4 ">
      <span class="bg-white no-border">
        The tracking template is the URL.
        you want people to go through
        before reaching your landing page.
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CampaignUrlOption',
    data: function () {
      return {
        sRotation: 'ot_click'
      }
    }
  }
</script>
