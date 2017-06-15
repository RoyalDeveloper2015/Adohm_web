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
                          <input type="text" v-model="newCampaign.landingPageUrl" class="form-control"
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
                          <select v-model="newCampaign.advertiserId" class="form-control" id="advertiser"
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
                          <select v-model="newCampaign.subaccountId" class="form-control" id="subaccount"
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
                                   v-model="newCampaign.targetName"
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
                                   v-model="newCampaign.postalCode"
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
                        <div class="form-group">
                          <label for="browser" class="col-sm-2 control-label">Browser</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.browser" :options="browsers"
                                         label="name"
                                         track-by="dcId"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                      </div>
                      <div>
                        <h5>
                          Keywords
                        </h5>
                        <div class="form-group">
                          <label for="targetingTemplateName" class="col-sm-2 control-label">Keywords</label>
                          <div class="col-sm-10">
                            <textarea class="form-control"
                                      id="keywords"
                                      name="targetingTemplateName"
                                      v-model="newCampaign.keywords"
                                      placeholder="name"></textarea>
                            <p>
                              Enter one or more keywords or keyword expressions, each separated by a comma. E.g., cat, dog, fish and (pet, water).</p>

                          </div>
                        </div>
                      </div>
                      <div>
                        <h5>
                          Time and day
                        </h5>
                        <div class="form-group">
                          <label for="targetingTemplateName" class="col-sm-2 control-label">Time zone</label>
                          <div class="col-sm-10">
                            <label><input type="radio" name="timeZone" value="User's local" v-model="newCampaign.timeZone"> User's local</label><br>
                            <label><input type="radio" name="timeZone" value="New York -05:00 / -04:00 GMT" v-model="newCampaign.timeZone">
                              New York -05:00 / -04:00 GMT</label><br>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="hours" class="col-sm-2 control-label">Days</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.days" :options="days"
                                         label="name"
                                         track-by="id"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="hours" class="col-sm-2 control-label">Hours</label>
                          <div class="col-sm-10">
                            <multiselect class="" v-model="newCampaign.hours" :options="hours"
                                         label="name"
                                         track-by="id"
                                         :multiple="true" :close-on-select="false"
                                         :clear-on-select="false" :hide-selected="true" :option-height="10"
                                         placeholder="Pick some"></multiselect>

                          </div>
                        </div>
                      </div>
                    </tab-content>
                    <tab-content title="Choose ad">
                      <div class="form-group">
                        <label for="platformType" class="col-sm-2 control-label">Ad</label>
                        <div class="col-sm-10">
                          <!--<multiselect class="" v-model="newCampaign.ad" :options="ads"
                                       label="name"
                                       track-by="dcId"
                                       :multiple="true" :close-on-select="false"
                                       :clear-on-select="false" :hide-selected="true" :option-height="10"
                                       placeholder="Pick some"></multiselect>-->
                          <select v-model="newCampaign.adId" class="form-control" id="ad"
                                  name="ad">
                            <option v-for="ad in ads" v-bind:value="ad.dcId">
                              {{ ad.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="platformType" class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                          <button class="btn btn-default" type="submit">Save</button>
                        </div>
                      </div>
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
      this.loadOperatingSystems()
      this.loadBrowsers()
      this.loadAds()
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
      'platformTypes',
      'operatingSystems',
      'browsers',
      'hours',
      'days',
      'ads'
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
        loadPlatformTypes: 'LOAD_PLATFORM_TYPE_LIST',
        loadOperatingSystems: 'LOAD_OPERATING_SYSTEM_LIST',
        loadBrowsers: 'LOAD_BROWSER_LIST',
        loadAds: 'LOAD_AD_LIST'
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
        console.log('in submit')
        console.log(this.newCampaign)
      }
    }
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
