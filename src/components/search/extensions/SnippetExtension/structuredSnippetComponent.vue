<template>
  <div class="row ml-n mr-n bg-white">
    <div class="col-sm-3">
      Structured snippet extensions
    </div>
    <div class="col-sm-9 pl-n">
      <div class="row">
        <div class="radio radio-primary line-adjust">
          <input id="snippet-account" class="" type="radio" value="account" v-model="flgSnippet">
          <label for="snippet-account">Use account level structured snipped extensions</label>
        </div>
        <div class="radio radio-primary line-adjust">
          <input id="snippet-other" class="" type="radio" value="other" v-model="flgSnippet">
          <label for="snippet-other">Select or create campaign level structured snippet extensions</label>
        </div>
      </div>
      <div>
        <snippet-list></snippet-list>
      </div>
    </div>
    <div class="pull-right" style="position:absolute; right:0">
      <span class="my-gray"><i class="fa fa-chevron-up"></i></span>
    </div>
  </div>
</template>

<script>
  import selectSnippet from './selectSnippetComponent.vue'
  export default {
    name: 'StructuredSnippet',
    data: function () {
      return {
        flgSnippet: 'account'
      }
    },
    components: {
      'snippet-list': selectSnippet
    }
  }
</script>
