<template>
  <div class="container">
    <h5>Set up ad groups</h5>
    <p>An ad group contains one or more ads and a set of related keywords. For best results, try to focus all the ads and keywords in an ad group on one product or service.</p>
    <div class="row">
      <div class="col-md-7 col-sm-7 mb-20">
        <ad-group-element
          v-for="element in lstGroup" v-bind:strGroupName="element.strGroupName"
          v-bind:strDefaultBid="element.strDefaultBid" v-bind:lstKeyword="element.lstKeyword"
        ></ad-group-element>

        <div type="button" class="panel row ">
          <div class="col-sm-12" style="font-size:x-large; line-height : 60px" v-on:click="addNewGroup">
            <a style="color:blue"><i class="fa fa-plus-circle" ></i> NEW AD GROUP</a>
            <span class="pull-right"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-5">
        <div class="panel col-md-12">
          <h5><b>Get Keyword ideas</b></h5>
          <div class="input-group mb-20">
            <span class="input-group-addon"><i class="fa fa-link"></i></span>
            <input type="text" class="form-control">
          </div>
          <div class="input-group mb-20">
            <span class="input-group-addon"><i class="fa fa-building"></i></span>
            <input type="text" class="form-control">
          </div>
          <div class="text-center">
            <span class="row"><i class="fa fa-search"></i></span>
            <p class="col-sm-10 col-sm-offset-1">We only show keyword ideas that are relevant to your business.
              To get suggestions, enter your landing page, a related website, or words or phrases that describe your product or service in the field above
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import adGroupElement from './SetupAdGroups/adGroupElement.vue'
  export default {
    name: 'setupAdGroupForm',
    data: function () {
      return {
        lstGroup: [{
          'strGroupName': '',
          'strDefaultBid': '',
          'lstKeyword': ''
        }]
      }
    },
    methods: {
      addNewGroup: function () {
        this.lstGroup.push({
          'strGroupName': '',
          'strDefaultBid': '',
          'lstKeyword': ''
        })
      }
    },
    components: {
      'ad-group-element': adGroupElement
    }
  }
</script>
