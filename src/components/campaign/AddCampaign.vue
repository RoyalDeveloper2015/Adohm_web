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
                  <div v-if="step =='one'">
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
                    <div class="form-group">
                      <label for="text1" class="col-sm-2 control-label"></label>
                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Next</button>
                      </div>
                    </div>
                  </div>
                  <div v-if="step =='two'">
                    <h1>step {{step}}</h1>

                  </div>
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

  export default {
    name: 'addCampaign',
    beforeMount: function () {
      this.step = 'one'
    },
    mounted: function () {
      // this.$store.dispatch('LOAD_ADVERTISER_LIST')
      this.loadAdvertisers()
    },
    data: () => {
      return {
        step: 'one'
      }
    },
    computed: mapState([
      'newCampaign',
      'advertisers'
    ]),
    methods: {
      ...mapActions({
        add: 'ADD_NEW_CAMPAIGN', // map `this.add()` to `this.$store.dispatch('increment')`
        loadAdvertisers: 'LOAD_ADVERTISER_LIST'
      }),
      onSubmit () {
        this.step = 'two'
        console.log(this.data)
      }
    }
  }
</script>
