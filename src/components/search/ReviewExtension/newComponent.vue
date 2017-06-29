<template>
  <div class="row m-n p-n bg-white">
    <table class="table-bordered mb-n">
        <tbody>
          <tr>
            <td>
              <div class="col-sm-12">
                <p>Add New review extension </p>
              </div>
              <div class="col-sm-7 mb-10">
                <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Review text" ng-model="strReview">
              </div>
              <div class="col-sm-7 mb-10">
                <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Source" ng-model="strSource">
              </div>
              <div class="col-sm-7 mb-10">
                <input class="form-control my-border-radius-n bottom-border-no-outline" placeholder="Source URL" ng-model="strUrl">
              </div>
              <div class="col-sm-12">
                <p class="my-gray mb-10">Format</p>
                <div class="radio radio-primary" style="white-space:warp;word-break:break-word">
                  <input type="radio" id="r_para"  value="paraphrased" v-model="flag">
                  <label for="r_para">Paraphrased</label>
                </div>
                <div class="radio radio-primary" style="white-space:warp;word-break:break-word">
                  <input type="radio" id="r_extra" value="extra" v-model="flag" >
                  <label for="r_extra">Extra quote</label>
                </div>
              </div>
              <div class="col-sm-12 p-n">
                <button class="btn btn-link" v-on:click="advanceOption=!advanceOption">
                  <i class="fa" v-bind:class="advanceOption?'fa-chevron-up':'fa-chevron-down'"></i> Advacned Option
                </button>
              </div>
              <div class="col-sm-12 p-n">
                <advance-option v-if="advanceOption"></advance-option>
              </div>
            </td>
            <td rowspan="2" width="13%" class="bg-gray" style="text-align:center;vertical-align:middle">
              <span>PREVIEW</span>
            </td>
          </tr>
          <tr>
            <div class="col-sm-12">
              <button class="btn btn-link" v-on:click="save">SAVE AND ADD </button>
              <button class="btn btn-link" v-on:click="cancel">CANCEL </button>
            </div>
          </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import Option from './advancedOption.vue'
  export default {
    name: 'createReview',
    data: function () {
      return {
        strReview: '',
        strSource: '',
        strUrl: '',
        flag: 'paraphrased',
        advanceOption: false
      }
    },
    methods: {
      save: function () {
        this.$emit('save')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    },
    components: {
      'advance-option': Option
    }
  }
</script>
