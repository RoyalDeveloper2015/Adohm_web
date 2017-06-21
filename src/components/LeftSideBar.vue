<template>
  <div class="left-sidebar bg-black-300 box-shadow">
    <div class="sidebar-content">
      <div class="user-info closed">
        <img src="http://placehold.it/90/c2c2c2?text=User" alt="John Doe" class="img-circle profile-img">
        <h6 class="title">John Doe</h6>
        <small class="info">PHP Developer</small>
      </div>
      <!-- /.user-info -->

      <div class="sidebar-nav">
        <ul class="side-nav color-gray">
          <li class="nav-header">
            <span class="">Main Category</span>
          </li>
          <li class="has-children">
            <a href="#"><i class="fa fa-dashboard"></i> <span>Dashboard</span> <i
              class="fa fa-angle-right arrow"></i></a>
            <ul class="child-nav">
              <li><a href="#/campaign"><i class="fa fa-bolt"></i> <span>Campaigns</span></a></li>
            </ul>
            <ul class="child-nav">
              <li><a href="#/search"><i class="fa fa-search"></i> <span>Search</span></a></li>
            </ul>
          </li>
        </ul>
        <!-- /.side-nav -->
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
