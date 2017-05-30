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
            <li class="active">Campaigns</li>
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
                <div style="overflow-y: scroll">
                  <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Active</th>
                      <th>Advertiser</th>
                      <th>Advertiser group</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Sub account</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="campaign in campaigns">
                      <td>{{campaign.dcId}}</td>
                      <td>{{campaign.name}}</td>
                      <td>{{campaign.status}}</td>
                      <td>{{campaign.advertiserName}}</td>
                      <td>{{campaign.advertiserGroupName}}</td>
                      <td>{{campaign.startDate}}</td>
                      <td>{{campaign.endDate}}</td>
                      <td>{{campaign.subAccountName}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
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
  import { mapState } from 'vuex'
  export default {
    name: 'campaignList',
    computed: mapState([
      'campaigns'
    ]),
    mounted: function () {
      this.$store.dispatch('LOAD_CAMPAIGN_LIST')
    }
  }
</script>
