<template>
  <!--<div id="app">
      <img src="./assets/logo.png">

      <hello></hello>
    </div>-->
  <div>
    <!-- ========== TOP NAVBAR ========== -->
    <top-nav-bar></top-nav-bar>

    <!-- ========== WRAPPER FOR BOTH SIDEBARS & MAIN CONTENT ========== -->
    <div class="content-wrapper">
      <div class="content-container">
	  	<template  v-if="user._id">
			<!-- ========== LEFT SIDEBAR ========== -->
			<left-side-bar></left-side-bar>
			<!-- /.left-sidebar -->

			<router-view></router-view>
 
		</template>
		<template v-else> 
			<login-page></login-page>
		</template>
		<global-message> </global-message>
      </div>
      <!-- /.content-container -->
    </div>
    <!-- /.content-wrapper -->
  </div>
</template>

<script>
	import TopNavBar from './components/partials/TopNavBar.vue'
	import LeftSideBar from './components/partials/LeftSideBar.vue'
	import RightSideBar from './components/partials/RightSideBar.vue'
	import GlobalMessage from './components/partials/GlobalMessage.vue'
	import MainPage from './components/MainPage.vue'
	import LoginPage from './components/LoginPage.vue'
	import {mapGetters} from 'vuex'

	export default {
		components: {
			TopNavBar,
			LeftSideBar,
			RightSideBar,
			LoginPage,
			MainPage,
			GlobalMessage
		},
		name: 'app',
		computed: {
			...mapGetters('session', ['user'])
		}
	}
</script>
