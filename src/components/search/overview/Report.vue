<template>
  <div class="overview">
    <nav class="navbar bg-white box-shadow sub-nav padding-20">
      <span class="black">Overview</span>
    </nav>

    <div class="padding-20 padding-left-40">
      <div id="card" class="chart-pannel">
        
        <div class="display-flex">

          <!--blue-block -->
          <div class="block-report">
            <div class="padding-15 fixed-block bg-blue white">
              <div class="line-bottom width-60">
                <span>Clicks</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
              <div class="margin-top-20 font-xlarge">
                <span>38.5K</span>
              </div>
            </div>
          </div>

          <!-- Red block -->
          <div class="block-report">
            <div class="padding-15 fixed-block bg-danger white">
              <div class="line-bottom width-60">
                <span>Impr.</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
              <div class="margin-top-20 font-xlarge">
                <span>5.98M</span>
              </div>
            </div>
          </div>

          <!-- Yellow block -->
          <div class="block-report">
            <div class="padding-15 fixed-block bg-warning black">
              <div class="line-bottom width-85">
                <span>Cost/conv.</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
              <div class="margin-top-20 font-xlarge">
                <i class="fa fa-inr" aria-hidden="true"></i>
                <span>2.27M</span>
              </div>
            </div>
          </div>

          <!-- white block -->
          <div class="block-report">
            <div class="padding-15 fixed-block black thin-bordered">
              <div class="line-bottom width-60">
                <span>Cost</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </div>
              <div class="margin-top-20 font-xlarge">
                <i class="fa fa-inr" aria-hidden="true"></i>
                <span>598M</span>
              </div>
            </div>
          </div>

        </div>
        <div class="margin-top-20">
          <highcharts v-bind:options="options" ref="highcharts"></highcharts>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import VueHighCharts from 'vue-highcharts'
  
  Vue.use(VueHighCharts)

  export default {
    name: 'Report',
    data: function () {
      return {
        options: {
          title: {
            text: '',
            x: -20
          },
          subtitle: {
            text: '',
            x: -20
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [{
            name: '',
            color: '#ea4040',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: '',
            color: '#d9e811',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          }, {
            name: '',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
          }]
        }
      }
    }
  }
</script>
<style>
  .overview{
    display: inline-block;
    width: 100%;
    z-index: 2;
  }
  .thin-bordered {
    border: 1px solid rgba(0,0,0,0.1);
  }
  .padding-20 {
    padding: 20px;
  }
  .padding-left-40 {
    padding-left: 40px;
  }
  .chart-pannel {
    display: block;
    width: 100%;
  }
  .line-bottom {
    border-bottom: 1px solid;    
  }
  .font-xlarge {
    font-size: x-large;
  }
  .bg-blue {
    background-color: #4285F4;
  }
  .inline-block {
    display: inline-block;
  }
  .padding-15 {
    padding: 15px;
  }
  .width-60 {
    width: 60%;
  }
  .width-85 {
    width: 85%;
  }
  .fixed-block {
    width: 150px;
    height: 100px;
  }
  .white {
    color: #fff;
  }
</style>
