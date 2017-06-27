<template>
<<<<<<< HEAD
=======
  <!--<div id="app">
      <img src="./assets/logo.png">

      <hello></hello>
    </div>-->
>>>>>>> daniel
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

<<<<<<< HEAD
			<router-view></router-view>
=======
        <!-- ========== LEFT SIDEBAR ========== -->
        <left-side-bar></left-side-bar>
        <!-- /.left-sidebar -->

        <router-view></router-view>
        <!--<main-page></main-page>-->
        <!-- /.main-page -->

        <!--<right-side-bar></right-side-bar>-->

        <!-- /.right-sidebar -->
>>>>>>> daniel

			<!--<right-side-bar></right-side-bar>-->
			<!-- /.right-sidebar -->
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
<<<<<<< HEAD
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
=======
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
>>>>>>> daniel
</script>
