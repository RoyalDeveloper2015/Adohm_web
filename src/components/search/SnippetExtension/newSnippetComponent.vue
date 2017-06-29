<template>
  <table class="mb-n table-bordered">
    <tbody>
      <tr>
        <td width="87%">
          <div class="col-sm-12">
            <p class="mt-n mb-5">Add new structured snippet extension</P>
          </div>
          <div class="col-sm-12">
            <span class="my-gray">Header&nbsp;<i class="fa fa-question-circle"></i></span>
          </div>
          <div class="col-sm-12 p-n">
            <div class="col-xs-4">
              <select class="form-control bottom-border-no-outline my-border-radius-n">
                <option value="eng">English</option>
              </select>
            </div>
            <div class="col-xs-4">
              <select class="form-control bottom-border-no-outline my-border-radius-n">
                <option value="amenities">Amenities</option>
                <option value="brand">Brand</option>
                <option value="courses">Courses</option>
                <option value="degree">Degree programs</option>
                <option value="destinations">Destinations</option>
                <option value="featured">Featured hotels</option>
                <option value="insurance">Insurance coverage</option>
                <option value="models">Models</option>
                <option value="neighborhoods">Neighborhoods</option>
                <option value="service">Service catalog</option>
                <option value="shows">Shows</option>
                <option value="styles">Styles</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12">
            <p class="mt-10 mb-5 my-gray">Values &nbsp;<i class="fa fa-question-circle"></i></p>
          </div>
          <div class="col-sm-12">
            <input class="form-control" v-model="strWifi" placeholder="WiFi" maxLength="25">
            <span class="pull-right">{{strWifi.length}}/25</span>
          </div>
          <div class="col-sm-12">
            <input class="form-control" v-model="strPool" placeholder="Pool" maxLength="25">
            <span class="pull-right">{{strPool.length}}/25</span>
          </div>
          <div class="col-sm-12">
            <input class="form-control" v-model="strFitness" placeholder="Fitness center" maxLength="25">
            <span class="pull-right">{{strFitness.length}}/25</span>
          </div>
          <div  class="col-sm-12 pl-n">
            <button class="btn btn-link">ADD VALUE</button>
          </div>
          <div class="col-sm-12 pl-n">
            <button class="btn btn-link" v-on:click="flgAdvance=!flgAdvance"><i class="fa" v-bind:class="flgAdvance?'fa-chevron-up':'fa-chevron-down'"></i>Advance Options</button>
          </div>
          <advance-option v-if="flgAdvance"></advance-option>
        </td>
        <td width="13%" class="bg-gray" rowspan="2" style="text-align:center;vertical-align:middle">
          <span>PRIVIEW</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray">
          <button class="btn btn-link" v-on:click="save">SAVE AND ADD</button>
          <button class="btn btn-link" v-on:click="cancel">CANCEL</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import advanceOption from '../calloutExtension/advanceOption.vue'
  export default {
    name: 'CreateSnippet',
    data: function () {
      return {
        strWifi: '',
        strPool: '',
        strFitness: '',
        flgAdvance: false
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
      'advance-option': advanceOption
    }
  }
</script>
