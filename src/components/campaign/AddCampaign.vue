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
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.regionCountry" :options="countries"
                                           label="name"
                                           track-by="dcId"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true" :option-height="10"
                                           @input="regionCountrySelected"
                                           placeholder="Pick country"></multiselect>
                            </div>
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.region" :options="regions" label="name"
                                           track-by="dcId"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true" :option-height="10"
                                           placeholder="Pick some"></multiselect>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="city" class="col-sm-2 control-label">City</label>
                          <div class="col-sm-10">
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.cityCountry" :options="countries" label="name"
                                           track-by="dcId"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true" :option-height="10"
                                           @input="cityCountrySelected"
                                           placeholder="Pick country"></multiselect>
                            </div>
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.city" :options="cities" label="name"
                                           track-by="dcId"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true"
                                           placeholder="Pick some"></multiselect>
                            </div>

                          </div>
                        </div>
                        <div class="form-group">
                          <label for="postalCode" class="col-sm-2 control-label">Postal code</label>
                          <div class="col-sm-10">
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.postalCodeCountry" :options="countries"
                                           label="name"
                                           track-by="dcId"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true" :option-height="10"
                                           @input="postalCodeCountrySelected"
                                           placeholder="Pick country"></multiselect>
                            </div>
                            <div class="col-sm-6">
                              <multiselect class="" v-model="newCampaign.postalCode" :options="postalCodes" label="code"
                                           track-by="id"
                                           :multiple="true" :close-on-select="false"
                                           :clear-on-select="false" :hide-selected="true"
                                           placeholder="Pick some"></multiselect>
                            </div>
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
                            <label><input type="radio" name="timeZone" value="User's local"
                                          v-model="newCampaign.timeZone"> User's local</label><br>
                            <label><input type="radio" name="timeZone" value="New York -05:00 / -04:00 GMT"
                                          v-model="newCampaign.timeZone">
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
                      <label><input type="radio" name="chooseExisting" value="true"
                                    v-model="newCampaign.chooseExisting">
                        Choose existing ad</label><br>
                      <div v-if="newCampaign.chooseExisting=='true'">
                        <div class="form-group">
                          <label for="platformType" class="col-sm-2 control-label">Ad</label>
                          <div class="col-sm-10">
                            <select v-model="newCampaign.adId" class="form-control" id="ad"
                                    name="ad">
                              <option v-for="ad in ads" v-bind:value="ad.dcId">
                                {{ ad.name }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <label><input type="radio" name="chooseExisting" value="false"
                                    v-model="newCampaign.chooseExisting">
                        Create a new Ad</label><br>
                      <div v-if="newCampaign.chooseExisting=='false'">
                        <div class="form-group">
                          <label for="platformType" class="col-sm-2 control-label">Name</label>
                          <div class="col-sm-10">
                            <input type="text" v-model="newCampaign.adName" class="form-control" id="adName"
                                   name="adName"
                                   placeholder="Name">
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="text1" class="col-sm-2 control-label">Type</label>
                          <div class="col-sm-10">
                            <select v-model="newCampaign.adType" class="form-control" id="adType"
                                    name="adType">
                              <option value="Standard">
                                Standard
                              </option>
                              <option value="Standard">
                                Click tracker
                              </option>
                              <option value="Standard">
                                Tracking
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="active" class="col-sm-2 control-label">Active</label>
                          <div class="col-sm-10">
                            <input type="checkbox" id="active" v-model="newCampaign.active">
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="archived" class="col-sm-2 control-label">Archived</label>
                          <div class="col-sm-10">
                            <input type="checkbox" id="archived" v-model="newCampaign.archived">
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="ssl" class="col-sm-2 control-label">Ssl required</label>
                          <div class="col-sm-10">
                            <input type="checkbox" id="ssl" v-model="newCampaign.adSslRequired">
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="platformType" class="col-sm-2 control-label">Comments</label>
                          <div class="col-sm-10">
                              <textarea v-model="newCampaign.comments" class="form-control" id="comments"
                                        name="comments"
                                        placeholder="Comments"></textarea>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Start date</label>
                        <div class="col-sm-10">
                          <input type="date" v-model="newCampaign.adStartDate" class="form-control" id="adStartDate"
                                 name="startDate"
                                 placeholder="Start date">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">End date</label>
                        <div class="col-sm-10">
                          <input type="date" v-model="newCampaign.adEndDate" class="form-control" id="adEndDate"
                                 name="endDate"
                                 placeholder="End date">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="text1" class="col-sm-2 control-label">Impression Ratio</label>
                        <div class="col-sm-10">
                          <select v-model="newCampaign.adImpressionRatio" class="form-control" id="adImpressionRatio"
                                  name="adImpressionRatio">
                            <option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                            <option value=4>4</option>
                            <option value=5>5</option>
                            <option value=6>6</option>
                            <option value=7>7</option>
                            <option value=8>8</option>
                            <option value=9>9</option>
                            <option value=10>10</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="priority" class="col-sm-2 control-label">Priority</label>
                        <div class="col-sm-10">
                          <select v-model="newCampaign.priority" class="form-control" id="priority"
                                  name="priority">
                            <option value="AD_PRIORITY_01">1</option>
                            <option value="AD_PRIORITY_02">2</option>
                            <option value="AD_PRIORITY_03">3</option>
                            <option value="AD_PRIORITY_04">4</option>
                            <option value="AD_PRIORITY_05">5</option>
                            <option value="AD_PRIORITY_06">6</option>
                            <option value="AD_PRIORITY_07">7</option>
                            <option value="AD_PRIORITY_08">8</option>
                            <option value="AD_PRIORITY_09">9</option>
                            <option value="AD_PRIORITY_10">10</option>
                            <option value="AD_PRIORITY_11">11</option>
                            <option value="AD_PRIORITY_12">12</option>
                            <option value="AD_PRIORITY_13">13</option>
                            <option value="AD_PRIORITY_14">14</option>
                            <option value="AD_PRIORITY_15">15</option>
                            <option value="AD_PRIORITY_16">16</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="frequency" class="col-sm-2 control-label">Frequency cap</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="newCampaign.adImpressions" class="form-control" id="adImpressions"
                                 name="adImpressions"
                                 placeholder="Frequency cap">
                          <span>Cap cannot exceed 15.</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="region" class="col-sm-2 control-label">Time period</label>
                        <div class="col-sm-10">
                          <div class="col-sm-6">
                            <input type="text" v-model="newCampaign.adDuration" class="form-control"
                                   id="adDuration"
                                   name="adImpressions"
                                   placeholder="Frequency cap">
                          </div>
                          <div class="col-sm-6">
                            <select v-model="newCampaign.durType" class="form-control" id="durType"
                                    name="durType">
                              <option value="Minutes">
                                Minutes
                              </option>
                              <option value="Hours">
                                Hours
                              </option>
                              <option value="Days">
                                Days
                              </option>
                              <option value="Weeks">
                                Weeks
                              </option>
                            </select>
                          </div>
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
  import Vue from 'vue'
  import VueToastr from '@deveodk/vue-toastr'
  // You need a specific loader for CSS files like https://github.com/webpack/css-loader
  // If you would like custom styling of the toastr the css file can be replaced
  import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

  import {mapState, mapActions} from 'vuex'
  import Multiselect from 'vue-multiselect'
  import {FormWizard, TabContent} from 'vue-form-wizard'

  Vue.use(VueToastr, {
    defaultPosition: 'toast-top-center',
    defaultType: 'info'
  })

  export default {
    name: 'addCampaign',
    beforeMount: function () {
      this.step = 'one'
    },
    mounted: function () {
      this.loadAdvertisers()
      this.loadCountries()
      this.loadRegions()
      this.loadCities([])
      this.loadMobileCarriers([])
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
    computed: {
      ...mapState([
        'newCampaign',
        'advertisers',
        'countries',
        'regions',
        'cities',
        'postalCodes',
        'languages',
        'connectionTypes',
        'mobileCarriers',
        'platformTypes',
        'operatingSystems',
        'browsers',
        'hours',
        'days',
        'ads'
      ])
    },
    methods: {
      ...mapActions({
        add: 'ADD_NEW_CAMPAIGN', // map `this.add()` to `this.$store.dispatch('increment')`
        loadAdvertisers: 'LOAD_ADVERTISER_LIST',
        loadCountries: 'LOAD_COUNTRY_LIST',
        loadRegions: 'LOAD_REGION_LIST',
        loadCities: 'LOAD_CITY_LIST',
        loadPostalCodes: 'LOAD_POSTAL_CODE_LIST',
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
        this.loadMobileCarriers(dcIds)
      },
      regionCountrySelected () {
        const dcIds = []
        for (var country of this.newCampaign.regionCountry) {
          dcIds.push(country.dcId)
        }
        this.loadRegions(dcIds)
      },
      cityCountrySelected () {
        const dcIds = []
        for (var country of this.newCampaign.cityCountry) {
          dcIds.push(country.dcId)
        }
        this.loadCities(dcIds)
      },
      postalCodeCountrySelected () {
        const dcIds = []
        for (var country of this.newCampaign.postalCodeCountry) {
          dcIds.push(country.dcId)
        }
        this.loadPostalCodes(dcIds)
      },
      onSubmit () {
        this.add(this.newCampaign).then(() => {
          this.$toastr('success', 'campaign saved successfully')
        }).catch((err) => {
          this.$toastr('error', err.response.data.error)
        })
      }
    }
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
