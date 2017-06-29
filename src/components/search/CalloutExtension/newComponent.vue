<template>
  <div class="row mr-n ml-n bg-white">
    <table class="table table-bordered mb-n">
      <tbody>
        <tr>
          <td>
            <div class="col-sm-12">
              <h5> Add new Callout extension </h5>
            </div>
            <div class="col-sm-12">
              <span class="" style="color:#4285F4">CalloutText</span>
            </div>
            <div class="col-sm-12">
              <input class="form-control input-sm" v-model="strCallout" maxLength="25">
              <span class="pull-right">{{strCallout.length}}/25</span>
            </div>
            <div class="col-sm-12">
              <button class="btn btn-link pl-n" v-on:click="toggleAdvance">
                <i class="fa" v-bind:class="showAdvance?'fa-chevron-up':'fa-chevron-down'"></i>Advanced Options
              </button>
            </div>
            <div class v-if="showAdvance">
              <advance-option ></advance-option>
            </div>
          </td>
          <td rowspan="2" width="13%" class="bg-gray" style="text-align:center;vertical-align:middle">
            <span>PREVIEW</span>
          </td>
        </tr>
        <tr>
          <td class="bg-gray pt-n pb-n">
            <button class="btn btn-link pl-n" v-on:click="save">
              SAVE AND ADD
            </button>
            <button class="btn btn-link" v-on:click="cancel">
              CANCEL
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import advanceOption from './advanceOption.vue'
  export default {
    name: 'NewCalloutExtension',
    data: function () {
      return {
        strCallout: '',
        showAdvance: false
      }
    },
    components: {
      'advance-option': advanceOption
    },
    methods: {
      toggleAdvance: function () {
        this.showAdvance = !this.showAdvance
      },
      save: function () {
        this.$emit('save')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    }
  }
</script>
