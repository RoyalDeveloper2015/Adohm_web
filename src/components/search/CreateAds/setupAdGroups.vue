<template>
  <div class="main-page">
    <div class="container-fluid">
      <div class="row">
        <form-wizard title="" subtitle="" shape="circle" color="#4285F4" nextButtonText="Save and Continue">
          <tab-content title="Select Campain Settings" >
          </tab-content>
          <tab-content title="Set up and groups" route="/search/second">
          </tab-content>
          <tab-content title="Create ads" route="/search/last">
          </tab-content>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </form-wizard>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import Router from 'vue-router'
  import setupAdGroupForm from './SetupAdGroups/setupAdGroupForm.vue'
  import createAds from './CreateAds/createAds.vue'
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/search/second', component: setupAdGroupForm },
      { path: '/search/last', component: createAds }
    ]
  })
  Vue.use(FormWizard)
  export default {
    router,
    name: 'setupAdGroups',
    beforeMount: function () {
      this.step = 'one'
    },
    components: {
      FormWizard,
      TabContent
    }
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
