<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Reporting</h2>
				<p class="sub-title">Social campaign reporting</p>
			</div>
		</div>

		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Social </li>
					<li class="active">Reporting</li>
				</ul>
			</div>
		</div>
	</div>
	<section class="section">
		<div class="container-fluid overview">
			<div class="panel mt-20">
				<div class="panel-heading">
					<h3 class="panel-title">Overview</h3>
				</div>
			</div>
			<div id="card" class="chart-pannel">
				<div class="display-flex">
					<!--blue-block -->
					<div class="block-report">
						<div class="padding-15 fixed-block bg-blue white">
						<div class="line-bottom width-60">
							<select v-model="overview.options.selectedFields[0]">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
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
							<select v-model="overview.options.selectedFields[1]">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
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
							<select v-model="overview.options.selectedFields[2]">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
						</div>
						<div class="margin-top-20 font-xlarge">
							<i class="fa fa-inr" aria-hidden="true"></i>
							<span>2.27M</span>
						</div>
						</div>
					</div>

					<!-- green block -->
					<div class="block-report">
						<div class="padding-15 fixed-block black bg-success thin-bordered">
						<div class="line-bottom width-60">
							<select v-model="overview.options.selectedFields[3]">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
						</div>
						<div class="margin-top-20 font-xlarge">
							<i class="fa fa-inr" aria-hidden="true"></i>
							<span>598M</span>
						</div>
						</div>
					</div>

				</div>
				<div class="margin-top-20">
					<highcharts :options="overview.chartOptions" ref="highcharts"></highcharts>
				</div>
     		</div>

			<div class="row">
				<div class="col-xs-6">
					<div class="panel mt-20">
						<div class="panel-heading">
							<h3 class="panel-title">Devices Breakdown</h3>
						</div>
						<div class="block-report text-center">
							<select v-model="devices.options.selectedFields[0]" class="center-block">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
						</div>
						<div class="chart-panel">
							<highcharts :options="devices.chartOptions" ref="highcharts"></highcharts>
						</div>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="panel mt-20">
						<div class="panel-heading">
							<h3 class="panel-title">Days and Hours</h3>
						</div>

						<div class="block-report text-center">
							<select v-model="heatmap.options.selectedFields[0]" class="center-block">
								<option v-for="field in options.availableFields" :value="field" :key="field">{{details.fields.find(el => el.id == field).name}}</option>
							</select>
						</div>

						<div class="chart-panel">
							<highcharts :options="heatmap.chartOptions" ref="highcharts"></highcharts>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
	import Vue from 'vue'
	import VueHighCharts from 'vue-highcharts'
	import * as Highcharts from 'highcharts'
	import loadHeatMaps from 'highcharts/modules/heatmap'
	import {vInsights} from '@/components/Mixins'
	import {request} from '@/config/default/request'
	import axios from 'axios'
	import {mapGetters} from 'vuex'

	loadHeatMaps(Highcharts);
	import Boost from "highcharts/modules/boost";
	Boost(Highcharts);
	Vue.use(VueHighCharts, {Highcharts})

	export default {
		mixins: [vInsights],
		data: () => ({
			options: {
				availableFields: ['results','cost_per_result','clicks','cpc','cpm','cpp','ctr','frequency','impressions','reach','spend']
			},
			overview: {
				options: {
					selectedFields: ['impressions', 'spend', 'results', 'cost_per_result'],
					fieldColors: ['#4285F4', '#e74c3c', '#f39c12', '#27ae60']
				},
				chartOptions: {
					title: {
						text: '',
						x: 0
					},
					subtitle: {
						text: '',
						x: 0
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
					series: []
				}
			},
			devices: {
				options: {
					selectedFields: ['impressions', 'clicks', 'spend'],
					fieldColors: ['#4285F4', '#e74c3c', '#f39c12', '#27ae60'],
					breakdowns: ['impression_device']
				},
				chartOptions:  {
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Devices'
					},
					xAxis: {
						categories: ['Cost', 'Clicks', 'Conversions']
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Devices'
						}
					},
					legend: {
						reversed: true
					},
					plotOptions: {
						series: {
							stacking: 'normal'
						}
					},
					series: []
				}
			},
			heatmap: {
				options: {
					selectedFields: ['impressions'],
					breakdowns: ['hourly_stats_aggregated_by_audience_time_zone']
				},
				chartOptions: {
					chart: {
						type: 'heatmap',
						marginTop: 40,
						marginBottom: 80,
						plotBorderWidth: 1
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: [],
						title: 'Day times'
					},
					yAxis: {
						categories: [],
						title: 'Weekdays'
					},
					colorAxis: {
						min: 0,
						minColor: '#FFFFFF',
						maxColor: Highcharts.getOptions().colors[3]
					},
					legend: {
						align: 'right',
						layout: 'vertical',
						margin: 0,
						verticalAlign: 'top',
						y: 25,
						symbolHeight: 280
					},
					series: [],
					    tooltip: {
							formatter: function () {
								return `<strong>${this.point.value.toFixed(2)}</strong> ${this.series.name} on
								<strong>${this.series.yAxis.categories[this.point.y]}, ${this.series.xAxis.categories[this.point.x]}'O clock </strong>`;
							}
						},
				}
			}
		}),
		beforeMount() {

		},
		methods: {
			getTimeRanges(start, end, unit, format) {
				var length = end.diff(start, unit);
				var time_ranges = [];
				var labels = [];
				for(var i = 0; i < length; i++) {
					time_ranges.push({since: start.startOf(unit).format('YYYY-MM-DD'), until: start.endOf(unit).format('YYYY-MM-DD')});
					labels.push(start.format(format));
					start.add(1, unit);
				}
				return {time_ranges, labels};
			},
			refreshChart(chart) {
				var {time_ranges, labels} = this.getTimeRanges(moment().subtract(7, 'days'), moment(), 'day', 'ddd');
				var options = this[chart].options;
				request.post('/api/insights', {
					fields: options.selectedFields.join(','),
					time_ranges,
					group_by: 'date',
					breakdowns: options.breakdowns && options.breakdowns.join(',') || ''
				}).then(({data}) => {
					if(data.success) {
						var insights = data.result;
						var series = [];
						main: for(let i = 0; i < time_ranges.length; i++) {
							var day = time_ranges[i].since;
							var seriesIndex = 0;
							for(let j in this[chart].options.selectedFields) {
								var field = this[chart].options.selectedFields[j];
								var insight = insights.find(el => {
									return moment(el.date_start).format('YYYY-MM-DD') == day;
								});
								if(!insight) break main;
								if(!series[seriesIndex]) series[seriesIndex] = {name: field, color: this[chart].options.fieldColors[seriesIndex], data: []};
								series[seriesIndex].data.push(insight[field]);
								seriesIndex++;
							}
						}
						// debugger
						Vue.set(this[chart].chartOptions.xAxis, 'categories', labels);
						Vue.set(this[chart].chartOptions, 'series', series);

					}
				});
			},
			refreshDevicesChart(chart) {
				var time_range = {since: moment().subtract(7, 'days').format('MM-DD-YYYY'), until: moment().format('MM-DD-YYYY')};
				request.post('/api/breakdowns',{
					field : this.devices.options.selectedFields[0],
					time_range,
					breakdown: this.devices.options.breakdowns[0]
 				}).then(({data}) => {
					if(data.success) {
						console.log(data);
						var labels = [];
						var series = []
						var seriesKeyArray = [];
						for (var key in data.result ){
							labels.push(key);
							if ( Array.isArray(data.result[key])) {
							    for ( var i = 0 ;i<data.result[key].length; i++ ) {
								if ( seriesKeyArray.length == 0 ) {
								    seriesKeyArray.push(data.result[key][i]['impression_device']);
								    series.push({ 
									name : data.result[key][i]['impression_device'],
									data : []
								     });
								} else if ( seriesKeyArray.indexOf(data.result[key][i]['impression_device']) == -1) {
								    seriesKeyArray.push(data.result[key][i]['impression_device']);
								    series.push({ 
									name : data.result[key][i]['impression_device'],
									data : []
								     });
								}
							    }
							    if ( seriesKeyArray.length == 0 ) {
								
							    }
							}
														
						}
						var insightStr = this.devices.options.selectedFields[0];
						for ( key in data.result ) {
						    if ( Array.isArray(data.result[key])) {
							for ( var j = 0 ;j<series.length;j++) {
							    series[j].data.push(0);
							}
							for ( j = 0 ;j<data.result[key].length;j++) {
							
							    var indx = seriesKeyArray.indexOf(data.result[key][j]['impression_device']);
							    series[indx].data[series[indx].data.length-1] = parseInt(data.result[key][j][insightStr]);
							}
						    } else {
							for ( var j = 0 ;j<series.length;j++) {
							    series[j].data.push(0);
							}
						    }
						    
						}
						Vue.set(this.devices.chartOptions.xAxis, 'categories', labels);
						Vue.set(this.devices.chartOptions, 'series', series);
 					}
				});
			},
			refreshHeatmap(chart) {
				var time_range = {since: moment().subtract(7, 'days').format('MM-DD-YYYY'), until: moment().format('MM-DD-YYYY')};
				var field = this.heatmap.options.selectedFields[0];
				// debugger
				request.post('/api/breakdownsDH',{
					field : this.heatmap.options.selectedFields[0],
					time_range,
					breakdown: this.heatmap.options.breakdowns[0]
 				}).then(({data}) => {
 				    console.log(data);
 				    var series = [{
 					name: 'Days and Hours',
 					borderWidth : 1,
 					data:[],
 					dataLabels: {
 					    endabled: true,
 					    color: '#000000'
 					}
 				    }];
// 					debugger;
					if(data.success) {
					    console.log(data);
					    var field = this.heatmap.options.selectedFields[0];
						var d1 = new Date(time_range.since);
						var yAxis = [];
						var xAxis = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
						for ( var key in data.result ) {
						    yAxis.push(key);
						}	
						var firstDay = false;
						for ( key in data.result ) {
						    for ( var k=0;k<24;k++) {
							series[0].data.push([k,yAxis.indexOf(key),0]);
						    }
						    for ( var j=0;j<data.result[key].length;j++) {
							var yPos = yAxis.indexOf(key);
							var xPos = 0;
							var strTemp = data.result[key][j]['hourly_stats_aggregated_by_audience_time_zone'];
							var xTvalue = strTemp.substring(0,2);
							xPos = xAxis.indexOf(xTvalue);
							var temp = [];
							temp.push(xPos);
							temp.push(yPos);
							if ( yPos == 0 ) firstDay = true;
							temp.push(parseInt(data.result[key][j][field]));
							series[0].data.push(temp);
						    }
						}
						if ( firstDay == false ) series[0].data.push([0,1,0]);
//						series[0].data.push([1,1,100]);					
						Vue.set(this.heatmap.chartOptions.xAxis, 'categories', xAxis);
						Vue.set(this.heatmap.chartOptions.yAxis, 'categories', yAxis);
						console.log(series);
						console.log(yAxis);
						console.log(xAxis);
						Vue.set(this.heatmap.chartOptions, 'series', series);
					}
				});
			},

		},
		computed: {
			...mapGetters('session', ['fbApi'])
		},
		watch: {
			'devices.options.selectedFields': {
				immediate: true,
				handler() {
					this.refreshDevicesChart();
				}
			},
			'heatmap.options.selectedFields': {
				immediate: true,
				handler() {
					this.refreshHeatmap();
				}
			},
			'overview.options.selectedFields': {
				immediate: true,
				handler() {
					this.refreshChart('overview');
				}
			}
		}
	}
</script>

<style>
/* */
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


/* extra shit */
  .block-report select {
	background-color: transparent;
	border: none;
	outline: 0;
	display: inline-block;
  }

  .block-report select option {
	  color: black;
  }

</style>
