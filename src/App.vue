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
			<create-pixel></create-pixel>
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
	import CreatePixel from './components/partials/modals/CreatePixel.vue'
	export default {
		components: {
			TopNavBar,
			LeftSideBar,
			RightSideBar,
			LoginPage,
			MainPage,
			GlobalMessage,
			CreatePixel
		},
		name: 'app',
		computed: {
			...mapGetters('session', ['user'])
		},
		mounted() {
			$('.has-children').not('.open').find('.child-nav').slideUp('100');
			$('.has-children>a').on('click', function(event){
				event.preventDefault();
				$(this).parent().toggleClass('open');
				$(this).parent().find('.child-nav').slideToggle('500');
			});
		}
	}
</script>
