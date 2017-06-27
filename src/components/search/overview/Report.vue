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
          <!-- <highcharts v-bind:options="options" ref="highcharts"></highcharts> -->
        </div>

      </div>

      <div class="device flex-row-10 margin-top-20">
        <div id="card" class="flex-item-5 padding-15">
          <div class="padding-15 flex-row-10">
            <div class="flex-item-9"><span class="font-xlarge black">Device</span></div>
            <div class="flex-item-1 right"><i class="fa fa-ellipsis-v font-xlarge" aria-hidden="true"></i></div>
          </div>
          <div class="margin-top-20 padding-15">
            <i class="fa fa-mobile font-xxlarge blue" aria-hidden="true"></i>
            <span class="margin-left-10 align-super">Mobile phones</span>
            <i class="fa fa-tablet margin-left-10 font-xlarge red" aria-hidden="true"></i>
            <span class="margin-left-10 align-super">Tablets</span>
            <i class="fa fa-desktop margin-left-10 font-xlarge yellow" aria-hidden="true"></i>
            <span class="margin-left-10 align-super">Computers</span>
          </div>

          <div class="margin-top-20 padding-15">
            <div class="flex-row-10">
              <div class="progress flex-item-7 stick-progress ">
                <div class="progress-bar bg-blue" role="progressbar" style="width:60%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.5%"></div>              
                <div class="progress-bar bg-danger" role="progressbar" style="width:2%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.5%"></div>
                <div class="progress-bar bg-yellow" role="progressbar" style="width:37%"></div>
              </div>
              <div class="flex-item-3 margin-left-30">
                <div class="line-bottom display-flex">
                  <span>Cost</span>
                  <i class="fa fa-sort-desc margin-left-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="padding-15">
            <div class="flex-row-10">
              <div class="progress flex-item-7 stick-progress ">
                <div class="progress-bar bg-blue" role="progressbar" style="width:70%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.5%"></div>
                <div class="progress-bar bg-yellow" role="progressbar" style="width:0.6%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.6%"></div>
                <div class="progress-bar bg-yellow" role="progressbar" style="width:28.3%"></div>
              </div>
              <div class="flex-item-3 margin-left-30">
                <div class="line-bottom display-flex">
                  <span>Clicks</span>
                  <i class="fa fa-sort-desc margin-left-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="padding-15">
            <div class="flex-row-10">
              <div class="progress flex-item-7 stick-progress ">
                <div class="progress-bar bg-blue" role="progressbar" style="width:63%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.5%"></div>
                <div class="progress-bar bg-danger" role="progressbar" style="width:2%"></div>
                <div class="progress-bar bg-white" role="progressbar" style="width:0.6%"></div>
                <div class="progress-bar bg-yellow" role="progressbar" style="width:33.9%"></div>
              </div>
              <div class="flex-item-3 margin-left-30">
                <div class="line-bottom display-flex">
                  <span>Conversions</span>
                  <i class="fa fa-sort-desc margin-left-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>


        </div>


        <div id="card" class="margin-left-10 flex-item-5 padding-15">
          <div class="padding-15 flex-row-10">
            <div class="flex-item-9"><span class="font-xlarge black">Device</span></div>
            <div class="flex-item-1 right"><i class="fa fa-ellipsis-v font-xlarge" aria-hidden="true"></i></div>
          </div>
            <ul class="nav nav-tabs nav-justified border-bottom border-danger" role="tablist">
                <li role="presentation"><a class="bor-blue" href="#home8" style="border-bottom-color: #4285F4 !important;" aria-controls="home8" role="tab" data-toggle="tab">DAY</a></li>
                <li role="presentation" class="active"><a class="bor-blue" style="border-bottom-color: #4285F4 !important;" href="#profile8" aria-controls="profile8" role="tab" data-toggle="tab">DAY & HOUR</a></li>
                <li role="presentation"><a class="bor-blue" href="#messages8" style="border-bottom-color: #4285F4 !important;" aria-controls="messages8" role="tab" data-toggle="tab">HOUR</a></li>                
            </ul>

            <!-- Tab panes -->
            <div class="tab-content bg-white p-15">
              <div role="tabpanel" class="tab-pane" id="home8"></div>
              <div role="tabpanel" class="tab-pane active" id="profile8">
                  <div id="heatmap">
                    <!-- <highcharts v-bind:options="heatoptions" ref="highcharts"></highcharts>-->
                  </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="messages8"></div>              
            </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import VueHighCharts from 'vue-highcharts'
  import * as Highcharts from 'highcharts'

  window.Highcharts = Highcharts
  
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
    },
    mounted: function () {
      if (!window.NAME_UNIQUE_FOR_THIS_FILE) {
        window.NAME_UNIQUE_FOR_THIS_FILE = true
        const mychart = document.getElementById('heatmap')
        // Highcharts.chart(mychart, this.heatoptions)
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
  .margin-left-20 {
    margin-left: 20px;
  }
  .margin-left-30 {
    margin-left: 30px;
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
  .font-xxlarge {
    font-size: xx-large;
  }
  .bg-blue {
    background-color: #4285F4;
  }
  .bor-blue {
    border-bottom-color: #4285F4 !important;
  }
  .bg-white {
    background-color: #fff;
  }
  .bg-yellow {
    background-color: #f9be60;
  }
  .inline-block {
    display: inline-block;
  }
  .flex-item-9 {
    flex: 9;
  }
  .flex-item-7 {
    flex: 7;
  }
  .flex-item-3 {
    flex: 3;
  }
  .flex-item-1 {
    flex: 1;
  }
  .stick-progress {
    height: 30px;
    margin-bottom: 0px;
    border-radius: 0px;
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
  .align-super {
    vertical-align: super;
  }
</style>
