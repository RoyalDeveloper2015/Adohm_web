<template>
  <div>
    <div class="col-sm-12">
      <input type="text" class="form-control input-sm mb-n" style="outline:none; border-radius:0px;" placeholder="Search">
      <span class="glyphicon glyphicon-question-sign form-control-feedback" style="right:15px"></span>
      <span>Example; http://www.trackingc.com/?url={lpurl}&id=5</span>
    </div>
    <div class="col-sm-12">
      <div class="row ml-n">
        <span>Custom parameter<i class="fa fa-question-circle"></i></span>
      </div>
      <div class="row ml-n ">
        <div class="col-sm-5 pl-n" style="display:inline-flex">
          <input class="form-control" placeholder="name">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</span>
        </div>
        <div class="col-sm-7 pl-n" >
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
      <div class="row ml-n ">
        <div class="col-sm-5 pl-n" style="display:inline-flex">
          <input class="form-control" placeholder="name">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</span>
        </div>
        <div class="col-sm-7 pl-n" >
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
      <div class="row ml-n ">
        <div class="col-sm-5 pl-n" style="display:inline-flex">
          <input class="form-control" placeholder="name">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</span>
        </div>
        <div class="col-sm-7 pl-n" >
          <input class="form-control" placeholder="parameter">
        </div>
      </div>
      <div class="row ml-n" style="display:inline-flex">
        <input type="checkbox"  id="mobile_check">
        <label for="mobile_check">Use a different final URL for mobile</label>
      </div>
      <div class="col-sm-12">
        <input class="form-control" placeholder="e.example.com">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UrlPoint'
  }
</script>
