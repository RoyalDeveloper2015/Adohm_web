<template>
	<div class="left-sidebar fixed-sidebar bg-black-300 box-shadow tour-three">
		<div class="sidebar-content">
			<div class="user-info closed">
				<img src="http://placehold.it/90/c2c2c2?text=User" alt="John Doe" class="img-circle profile-img">
				<h6 class="title"> username</h6>
				<small class="info">role </small>
			</div>
			<!-- /.user-info -->

			<div class="sidebar-nav">
				<ul class="side-nav color-gray">
					<li>
						<router-link to="/"> <i class="fa fa-dashboard"></i> <span>Dashboard</span> </router-link>
					</li>
					<li class="has-children">
						<li><router-link to="/search"><i class="fa fa-search"></i> <span>Search</span></router-link></li>
					</li>
					<li class="has-children">
						<li><router-link to="/campaign"><i class="fa fa-bolt"></i> <span>Programmatic</span></router-link></li>
					</li>
					<li class="has-children">
						<a href="#"><i class="fa fa-paint-brush"></i> <span>Social</span> <i class="fa fa-angle-right arrow"></i></a>
						<ul class="child-nav">
							<li><router-link to="/social/overview"><i class="fa fa-bank"></i> <span>Overview</span></router-link></li>
							<li><router-link to="/social/performance" name="social-performance"><i class="fa fa-check"></i> <span> Campaigns</span></router-link></li>
						</ul>
					</li>
					<li class="has-children">
						<a href="#"><i class="fa fa-map-signs"></i> <span>Visual Campaigns</span> <i class="fa fa-angle-right arrow"></i></a>
						<ul class="child-nav">
							<li><a href="color-primary.html"><i class="fa fa-bank"></i> <span>Overview</span></a></li>
							<li><a href="color-success.html"><i class="fa fa-check"></i> <span>Campaigns</span></a></li>
						</ul>
					</li>

					<li class="has-children">
						<a href="#"><i class="fa fa-magic"></i> <span>Native</span> <i class="fa fa-angle-right arrow"></i></a>
						<ul class="child-nav">
							<li><a href="ui-buttons.html"><i class="fa fa-plane"></i> <span>Overview</span></a></li>
							<li><a href="ui-panels.html"><i class="fa fa-puzzle-piece"></i> <span>Campaigns</span></a></li>
						</ul>
					</li>
					<li class="has-children">
						<a href="#"><i class="fa fa-bars"></i> <span>Media Planning</span> <i class="fa fa-angle-right arrow"></i></a>
						<ul class="child-nav">
							<li><a href="bt-accordions.html"><i class="fa fa-bar-chart"></i> <span>Planning</span></a></li>
							<li><a href="bt-affix.html"><i class="fa fa-bell-o"></i> <span>Collaborate</span></a></li>
							<li><a href="bt-alerts.html"><i class="fa fa-info-circle"></i> <span>Reporting</span></a></li>
						</ul>
					</li>
					<li class="has-children">
						<a href="#"><i class="fa fa-comments-o"></i> <span>Reports</span> <i class="fa fa-angle-right arrow"></i></a>
						<ul class="child-nav">
							<li><a href="table-basic.html"><i class="fa fa-lock"></i> <span>Scheduled Reports</span></a></li>
						</ul>
					</li>

					<li>
						<a href="#"><i class="fa fa-bar-chart-o"></i> <span>Alerts</span> </a>
					</li>
					
				</ul>
				<!-- /.side-nav -->
				<!--<div class="purchase-btn hidden-sm hidden-xs">
					<a target="_blank" class="btn btn-success btn-labeled">Upgrade Now<span class="btn-label btn-label-right"><i class="fa fa-check"></i></span></a>
				</div>-->
			</div>
			<!-- /.sidebar-nav -->
		</div>
		<!-- /.sidebar-content -->
	</div>
</template>

<script>
  export default {
    name: 'leftSideBar'
  }
</script>
