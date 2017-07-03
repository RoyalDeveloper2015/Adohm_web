<template>
  <div class="mt-20">
    <div style="display:inline-flex; width:100%;">
      <input class="form-control bottom-border-no-outline" type="text" placeholder="Tracking template">
      <i class="fa fa-question-circle-o" style="line-height:30px;"></i>
      <span style="line-height:30px">&nbsp;TEST</span>
    </div>
    <span style="color:gray">&nbsp;&nbsp;Example: http://www.trackingc.com/?url={lpurl}&id=5</span>
    <div><span style="color:gray">&nbsp;&nbsp;Custom parameter <i class="fa fa-question-circle-o"></i></span></div>
    <div style="display:inline-flex;">
      <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="{ _Name       }"></div>
      <span style="line-height:30px">=</span>
      <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="Value"></div>
    </div>
    <div style="display:inline-flex;">
      <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="{ _Name       }"></div>
      <span style="line-height:30px">=</span>
      <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="Value"></div>
    </div>
    <div>
      <input type="checkbox"> Use a different final URL for mobile
    </div>
    <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="m.example.com"></div>
  </div>
</template>

<script>
  export default {
    name: 'urlOption'
  }
</script>
