<template>
<div>
	<div class="container-fluid">
		<div class="row page-title-div">
			<div class="col-sm-6">
				<h2 class="title">Taboola Campaigns</h2>
				<p class="sub-title">Campaigns manager</p>
			</div>
		</div>
		<div class="row breadcrumb-div">
			<div class="col-sm-6">
				<ul class="breadcrumb">
					<li><i class="fa fa-home"></i> Taboola </li>
					<li class="active"> <a href="/social/performance/">Campaigns</a></li>
				</ul>
			</div>
		</div>
	</div>
	<section class="section">
		<div class="container-fluid">
			<router-link to="/taboola/campaign-editor" class="btn btn-success"> <span class="fa fa-plus"></span> Create </router-link>
		</div>
	</section>
</div>
</template>

<script>
export default {
  
}
</script>
