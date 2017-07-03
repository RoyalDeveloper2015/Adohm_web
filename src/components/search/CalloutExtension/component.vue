<template>
  <div class="row ml-n mr-n bg-white">
    <div class="col-sm-3">
      <p>Callout extensions</P>
    </div>
    <div class="col-sm-9" style="position:relative">
      <div class="radio radio-primary" style="white-space:warp;word-break:break-word">
        <input type="radio" id="r_account" value="account" v-model="val" >
        <label for="r_account">Use account level callout extension</label>
      </div>
      <div class="radio radio-primary" style="white-space:warp;word-break:break-word">
        <input type="radio" id="r_create" value="create" v-model="val" >
        <label for="r_create">Select or create campaign level extension</label>
      </div>
      <span style="position:absolute;right:0;top:0"><i class="fa fa-chevron-up"></i></span>
      <list-component v-if="listView"></list-component>
    </div>
  </div>
</template>

<script>
  import list from './ListComponent.vue'
  export default {
    name: 'CalloutExtension',
    data: function () {
      return {
        val: '',
        listView: false
      }
    },
    watch: {
      val: function (currentVal) {
        if (currentVal === 'create') {
          this.listView = true
        } else {
          this.listView = false
        }
      }
    },
    components: {
      'list-component': list
    }
  }
</script>
