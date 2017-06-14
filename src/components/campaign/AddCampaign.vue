<template>
  <div class="main-page">
    <div class="container-fluid">
      <div class="row page-title-div">
        <div class="col-md-6">
          <h2 class="title">Campaigns</h2>
          <p class="sub-title"></p>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-md-6 right-side">
        </div>
        <!-- /.col-md-6 text-right -->
      </div>
      <!-- /.row -->
      <div class="row breadcrumb-div">
        <div class="col-md-6">
          <ul class="breadcrumb">
            <li><a href="#/"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="#/campaign"><i class="fa fa-home"></i> Campaigns</a></li>
            <li class="active">Add</li>
          </ul>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-md-6 text-right">
        </div>
        <!-- /.col-md-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->

    <section class="section">
      <div class="container-fluid">

        <div class="row">
          <div class="col-md-12">
            <div class="panel">
              <div class="panel-heading">
              </div>
              <div class="panel-body p-20">
                <form class="form-horizontal" @submit.prevent="onSubmit()">
                  <form-wizard title="" subtitle="">
                    <tab-content title="General info">
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="newCampaign.name" class="form-control" id="name" name="name"
                                 placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Landing page url</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="newCampaign.landingPageName" class="form-control"
                                 id="landingPageUrl"
                                 name="landingPageUrl"
                                 placeholder="Landing page url">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Advertiser</label>
                        <div class="col-sm-10">
                          <!--<input type="text" v-model="newCampaign.advertiser" class="form-control" id="advertiser"
                                 name="advertiser"
                                 placeholder="advertiser">-->
                          <select v-model="newCampaign.advertiser" class="form-control" id="advertiser"
                                  name="advertiser">
                            <option v-for="advertiser in advertisers" v-bind:value="advertiser.dcId">
                              {{ advertiser.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Start date</label>
                        <div class="col-sm-10">
                          <input type="date" v-model="newCampaign.startDate" class="form-control" id="startDate"
                                 name="startDate"
                                 placeholder="Start date">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">End date</label>
                        <div class="col-sm-10">
                          <input type="date" v-model="newCampaign.endDate" class="form-control" id="endDate"
                                 name="endDate"
                                 placeholder="End date">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Sub account</label>
                        <div class="col-sm-10">
                          <select v-model="newCampaign.subaccount" class="form-control" id="subaccount"
                                  name="subaccount">
                            <option v-bind:value="1151202">
                              BidManager_Subnetwork_DO_NOT_EDIT
                            </option>
                          </select>
                        </div>
                      </div>
                    </tab-content>
                    <tab-content title="Targeting Template">
                      <div>
                        <h5>
                          Identification
                        </h5>
                        <div class="form-group">
                          <label for="targetingTemplateName" class="col-sm-2 control-label">Name</label>
                          <div class="col-sm-10">
                            <input type="text" class="form-control"
                                   id="targetingTemplateName"
                                   name="targetingTemplateName"
                                   placeholder="name">
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5>
                          Geo
                        </h5>
                        <div class="form-group">
                          <label for="country" class="col-sm-2 control-label">Country</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.country" :options="countries" label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         @input="countrySelected"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="region" class="col-sm-2 control-label">Region</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.region" :options="regions" label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="region" class="col-sm-2 control-label">City</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.city" :options="cities" label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="targetingTemplateName" class="col-sm-2 control-label">Postal code</label>
                          <div class="col-sm-10">
                            <input type="text" class="form-control"
                                   id="postalCode"
                                   name="postalCode"
                                   placeholder="Postal code">
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5>
                          Language
                        </h5>
                        <div class="form-group">
                          <label for="language" class="col-sm-2 control-label">Language</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.language" :options="languages" label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                      </div>
                      <div>
                        <h5>
                          Technology
                        </h5>
                        <div class="form-group">
                          <label for="connectionType" class="col-sm-2 control-label">Connection type</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.connectionType" :options="connectionTypes"
                                         label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="mobileCarrier" class="col-sm-2 control-label">Mobile carrier</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.mobileCarrier" :options="mobileCarriers"
                                         label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="platformType" class="col-sm-2 control-label">Platform type</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.platformType" :options="platformTypes"
                                         label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                      </div>
                    </tab-content>
                    <tab-content title="Last step">
                      Yuhuuu! This seems pretty damn simple
                    </tab-content>
                  </form-wizard>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->

      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.section -->

  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import Multiselect from 'vue-multiselect'
  import {FormWizard, TabContent} from 'vue-form-wizard'

  export default {
    name: 'addCampaign',
    beforeMount: function () {
      this.step = 'one'
    },
    mounted: function () {
      this.loadAdvertisers()
      this.loadCountries()
      this.loadRegions()
      this.loadLanguages()
      this.loadConnectionTypes()
      this.loadPlatformTypes()
    },
    components: {
      Multiselect,
      FormWizard,
      TabContent
    },
    computed: mapState([
      'newCampaign',
      'advertisers',
      'countries',
      'regions',
      'cities',
      'languages',
      'connectionTypes',
      'mobileCarriers',
      'platformTypes'
    ]),
    methods: {
      ...mapActions({
        add: 'ADD_NEW_CAMPAIGN', // map `this.add()` to `this.$store.dispatch('increment')`
        loadAdvertisers: 'LOAD_ADVERTISER_LIST',
        loadCountries: 'LOAD_COUNTRY_LIST',
        loadRegions: 'LOAD_REGION_LIST',
        loadCities: 'LOAD_CITY_LIST',
        loadLanguages: 'LOAD_LANGUAGE_LIST',
        loadConnectionTypes: 'LOAD_CONNECTION_TYPE_LIST',
        loadMobileCarriers: 'LOAD_MOBILE_CARRIER_LIST',
        loadPlatformTypes: 'LOAD_PLATFORM_TYPE_LIST'
      }),
      countrySelected () {
        const dcIds = []
        for (var country of this.newCampaign.country) {
          dcIds.push(country.dcId)
        }
        this.loadCities(dcIds)
        this.loadMobileCarriers(dcIds)
      },
      onSubmit () {
        console.log(this.data)
      }
    }
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
