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
                <table class="table table-hover table-bordered">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>UpdatedAt</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="campaign in campaigns">
                    <td>{{campaign.dcId}}</td>
                    <td>{{campaign.name}}</td>
                    <td>{{campaign.createdAt}}</td>
                    <td>{{campaign.updatedAt}}</td>
                  </tr>
                  </tbody>
                </table>
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
      console.log('in mounted')
      this.$store.dispatch('LOAD_PROJECT_LIST')
    }
  }
</script>
