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
              <div role="tabpanel" class="tab-pane active" id="home8"></div>
              <div role="tabpanel" class="tab-pane" id="profile8">
                  <div id="hitmap">
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
  import * as d3 from 'd3'
  
  Vue.use(VueHighCharts)

  const csvDataString = 'day,hour,value\n' +
  '1,1,16\n' +
  '1,2,20\n' +
  '1,3,0\n' +
  '1,4,0\n' +
  '1,5,0\n' +
  '1,6,2\n' +
  '1,7,0\n' +
  '1,8,9\n' +
  '1,9,25\n' +
  '1,10,49\n' +
  '1,11,57\n' +
  '1,12,61\n' +
  '1,13,37\n' +
  '1,14,66\n' +
  '1,15,70\n' +
  '1,16,55\n' +
  '1,17,51\n' +
  '1,18,55\n' +
  '1,19,17\n' +
  '1,20,20\n' +
  '1,21,9\n' +
  '1,22,4\n' +
  '1,23,0\n' +
  '1,24,12\n' +
  '2,1,6\n' +
  '2,2,2\n' +
  '2,3,0\n' +
  '2,4,0\n' +
  '2,5,0\n' +
  '2,6,2\n' +
  '2,7,4\n' +
  '2,8,11\n' +
  '2,9,28\n' +
  '2,10,49\n' +
  '2,11,51\n' +
  '2,12,47\n' +
  '2,13,38\n' +
  '2,14,65\n' +
  '2,15,60\n' +
  '2,16,50\n' +
  '2,17,65\n' +
  '2,18,50\n' +
  '2,19,22\n' +
  '2,20,11\n' +
  '2,21,12\n' +
  '2,22,9\n' +
  '2,23,0\n' +
  '2,24,13\n' +
  '3,1,5\n' +
  '3,2,8\n' +
  '3,3,8\n' +
  '3,4,0\n' +
  '3,5,0\n' +
  '3,6,2\n' +
  '3,7,5\n' +
  '3,8,12\n' +
  '3,9,34\n' +
  '3,10,43\n' +
  '3,11,54\n' +
  '3,12,44\n' +
  '3,13,40\n' +
  '3,14,48\n' +
  '3,15,54\n' +
  '3,16,59\n' +
  '3,17,60\n' +
  '3,18,51\n' +
  '3,19,21\n' +
  '3,20,16\n' +
  '3,21,9\n' +
  '3,22,5\n' +
  '3,23,4\n' +
  '3,24,7\n' +
  '4,1,0\n' +
  '4,2,0\n' +
  '4,3,0\n' +
  '4,4,0\n' +
  '4,5,0\n' +
  '4,6,2\n' +
  '4,7,4\n' +
  '4,8,13\n' +
  '4,9,26\n' +
  '4,10,58\n' +
  '4,11,61\n' +
  '4,12,59\n' +
  '4,13,53\n' +
  '4,14,54\n' +
  '4,15,64\n' +
  '4,16,55\n' +
  '4,17,52\n' +
  '4,18,53\n' +
  '4,19,18\n' +
  '4,20,3\n' +
  '4,21,9\n' +
  '4,22,12\n' +
  '4,23,2\n' +
  '4,24,8\n' +
  '5,1,2\n' +
  '5,2,0\n' +
  '5,3,8\n' +
  '5,4,2\n' +
  '5,5,0\n' +
  '5,6,2\n' +
  '5,7,4\n' +
  '5,8,14\n' +
  '5,9,31\n' +
  '5,10,48\n' +
  '5,11,46\n' +
  '5,12,50\n' +
  '5,13,66\n' +
  '5,14,54\n' +
  '5,15,56\n' +
  '5,16,67\n' +
  '5,17,54\n' +
  '5,18,23\n' +
  '5,19,14\n' +
  '5,20,6\n' +
  '5,21,8\n' +
  '5,22,7\n' +
  '5,23,0\n' +
  '5,24,8\n' +
  '6,1,2\n' +
  '6,2,0\n' +
  '6,3,2\n' +
  '6,4,0\n' +
  '6,5,0\n' +
  '6,6,0\n' +
  '6,7,4\n' +
  '6,8,8\n' +
  '6,9,8\n' +
  '6,10,6\n' +
  '6,11,14\n' +
  '6,12,12\n' +
  '6,13,9\n' +
  '6,14,14\n' +
  '6,15,0\n' +
  '6,16,4\n' +
  '6,17,7\n' +
  '6,18,6\n' +
  '6,19,0\n' +
  '6,20,0\n' +
  '6,21,0\n' +
  '6,22,0\n' +
  '6,23,0\n' +
  '6,24,0\n' +
  '7,1,7\n' +
  '7,2,6\n' +
  '7,3,0\n' +
  '7,4,0\n' +
  '7,5,0\n' +
  '7,6,0\n' +
  '7,7,0\n' +
  '7,8,0\n' +
  '7,9,0\n' +
  '7,10,0\n' +
  '7,11,2\n' +
  '7,12,2\n' +
  '7,13,5\n' +
  '7,14,6\n' +
  '7,15,0\n' +
  '7,16,4\n' +
  '7,17,0\n' +
  '7,18,2\n' +
  '7,19,10\n' +
  '7,20,7\n' +
  '7,21,0\n' +
  '7,22,19\n' +
  '7,23,9\n' +
  '7,24,4'

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
      // let svg = this.$d3.select('#hitmap').append('svg').append('g')
      const data1 = d3.csv.parse(csvDataString)

      console.log(data1)
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
