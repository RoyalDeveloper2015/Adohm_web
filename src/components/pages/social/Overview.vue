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
			<div class="panel margin-top-20">
				<div id="overview"></div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="panel">
						<div id="devices"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</template>


<script>
	export default {
		mounted() {
			Highcharts.chart('overview', {
				title: {
					text: 'Overview'
				},

				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},

				plotOptions: {
					series: {
						pointStart: 2010
					}
				},

				series: [{
					name: 'Clicks',
					data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
				}, {
					name: 'Impressions',
					data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
				}, {
					name: 'Cost per conversions',
					data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
				}, {
					name: 'Cost',
					data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
				}]

			});

			Highcharts.chart('devices', {
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
				series: [{
					name: 'Mobile',
					data: [5, 3, 4]
				}, {
					name: 'Tablet',
					data: [2, 2, 3]
				}, {
					name: 'Desktop',
					data: [3, 4, 4]
				}]
			});


		}
	}
</script>