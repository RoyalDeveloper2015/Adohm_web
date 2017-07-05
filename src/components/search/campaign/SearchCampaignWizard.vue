<template>
  <div class="main-page">
    <div class="container-fluid">
      <div class="row">
        <form-wizard title="" subtitle="" shape="circle" color="#4285F4" nextButtonText="Save and Continue"
			@on-loading="state => loading = state">
          <tab-content title="Select Campain Settings" route="/search/addcampaign" :before-change="saveCampaign">
          </tab-content>
          <tab-content title="Set up and groups" route="/search/adgroup">
          </tab-content>
          <tab-content title="Create ads" route="/search/ads">
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
  import {mapActions} from 'vuex'

  Vue.use(FormWizard)
  export default {
    name: 'SearchCampaignWizard',
    components: {
      FormWizard,
      TabContent
    },
	data: () => ({
		loading: false
	}),
	methods: {
		saveCampaign() {
			return new Promise((resolve, reject) => {
				this.$store.dispatch('adwords/campaign/save')
			});
		}
		// ...mapActions('adwords/campaign', ['save'])
	}
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
