<template>
  <div class="main-page">
    <div class="container-fluid">
      <div class="row">
        <form-wizard title="" subtitle="" shape="circle" color="#4285F4" nextButtonText="Save and Continue"
			@on-loading="state => loading = state">
          <tab-content title="Select Campain Settings" route="/search/addcampaign" :before-change="saveCampaign">
          </tab-content>
          <tab-content title="Set up ad groups" route="/search/addcampaign/adgroup" :before-change="saveAdGroup">
          </tab-content>
          <tab-content title="Create ads" route="/search/addcampaign/ads" :before-change="saveAd">
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
  import {mapActions, mapState} from 'vuex'

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
	computed: {
		...mapState('adwords/adgroup', {adGroupId: 'id'}),
		...mapState('adwords/campaign', {campaignId: 'id'}),
		...mapState('adwords/ad', ['text', 'callOnly', 'adType'])
	},
	methods: {
		saveCampaign() {
			return this.$store.dispatch('adwords/campaign/save');
		},
		saveAdGroup() {
			return this.$store.dispatch('adwords/adgroup/save', this.campaignId);
		},
		saveAd() {
			Vue.set(this[this.adType], 'adGroupId', this.adGroupId);
			this.$store.dispatch('adwords/ad/save', this.adGroupId).then(success => {
				this.$route.push('/search/campaigns');
			})
		}
		// ...mapActions('adwords/campaign', ['save'])
	},
	watch: {
		adGroupId() { 
			console.log("AdGroupId changed")
		}
	}
  }
</script>
<style src="vue-form-wizard/dist/vue-form-wizard.min.css"></style>
