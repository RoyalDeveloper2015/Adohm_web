<template>
  <!--<div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <hello></hello>
  </div>-->
  <div>
    <!-- ========== TOP NAVBAR ========== -->
    <top-nav-bar></top-nav-bar>

    <!-- ========== WRAPPER FOR BOTH SIDEBARS & MAIN CONTENT ========== -->
    <div class="content-wrapper">
      <div class="content-container">

        <!-- ========== LEFT SIDEBAR ========== -->
        <left-side-bar></left-side-bar>
        <!-- /.left-sidebar -->

        <main-page></main-page>
        <!-- /.main-page -->

        <right-side-bar></right-side-bar>
        <!-- /.right-sidebar -->

      </div>
      <!-- /.content-container -->
    </div>
    <!-- /.content-wrapper -->
  </div>
</template>

<script>
  import TopNavBar from './components/TopNavBar.vue'
  import LeftSideBar from './components/LeftSideBar.vue'
  import RightSideBar from './components/RightSideBar.vue'
  import MainPage from './components/MainPage.vue'
  export default {
    components: {
      TopNavBar,
      LeftSideBar,
      RightSideBar,
      MainPage
    },
    name: 'app'
  }
</script>
