<template>
  <div class="search-content">
    <div class="bg-white sub-side">
      <div class="sidebar-content">
        <div class="section submenu">

          <li class="item"              
            v-bind:class="{activemenu: isOverview}">
            <router-link class="item-link"                
              v-bind:class="{deactivelink: isOverview}"
              to="/search/campaigns">
              <span v-on:click="removeActive(); isOverview = !isOverview">Overview</span>
            </router-link>
          </li>
          <li class="item">Opportunites</li>
          <li><hr /></li>

          <li class="item"
            v-bind:class="{activemenu: isCampaigns}">
            <router-link class="item-link"
              v-bind:class="{deactivelink: isCampaigns}"
              to="/search/campaigns">
              <span v-on:click="removeActive(); isCampaigns = !isCampaigns">Campaigns</span>
            </router-link>
          </li>
          <li><hr /></li>

          <li class="item"
              v-on:click="removeActive(); isAdGroups = !isAdGroups"
              v-bind:class="{activemenu: isAdGroups}">Ad Groups</li>
          <li><hr /></li>

          <li class="item">Ads & Extensions</li>
          <li class="item">Keywords</li>
          <li><hr /></li>

          <li class="item">Dynamic Ad Targets</li>
          <li><hr /></li>

          <li class="item">Audiences</li>
          <li class="item">Demographics</li>
          <li><hr /></li>

          <li class="item">Settings</li>
          <li><hr /></li>

          <li class="item">Locations</li>
          <li class="item">Ad schedule</li>
          <li><hr /></li>

          <li class="item">Devices</li>
          <li><hr /></li>

          <li class="item">Advanced bid Adjustment</li>
          <li class="item">Change History</li>
        </div>
      </div>      
    </div>
    <router-view></router-view>
  </div>    
</template>
<script>
  export default {
    name: 'search',
    data: function () {
      return {
        isOverview: false,
        isOpportunites: false,
        isCampaigns: false,
        isAdGroups: false,
        isAdsEx: false,
        isKeyworkds: false,
        isDynamic: false,
        isAudience: false,
        isDemographics: false,
        isSetting: false,
        isLocation: false,
        isAdSchedule: false,
        isDevices: false,
        isAdvancedBid: false,
        isChangeHistory: false
      }
    },
    methods: {
      removeActive: function () {
        this.isOverview = false
        this.isOpportunites = false
        this.isCampaigns = false
        this.isAdGroups = false
        this.isAdsEx = false
        this.isKeyworkds = false
        this.isDynamic = false
        this.isAudience = false
        this.isDemographics = false
        this.isSetting = false
        this.isLocation = false
        this.isAdSchedule = false
        this.isDevices = false
        this.isAdvancedBid = false
        this.isChangeHistory = false
        console.log('removed!')
      }
    },
    mounted: function () {
      switch (this.$route.name) {
        case 'SearchCampaign':
          this.isCampaigns = true
          break
        default:
          this.isOverview = true
          break
      }
      console.log(this.isCampaigns)
    }
  }
</script>
<style type="text/css">
  .sub-side {
    width: 170px;
    border-width:
    1px; border-color: #000;
    display: inline-block;
  }
  .search-content {
    display: inline-flex;
    width: 100%;
  }
  .submenu {
    padding: 20px  0px 20px 0px;
    border-width: 1px;
    border-style: ridge;
    border-color: #cccccc;
    font-size: small;
    overflow-y: auto;
    max-height: 100vh;
    transition: visibility 0s 2s, opacity 2s linear;
  }

  .submenu::-webkit-scrollbar {
    width: 8px;
  }

  .submenu::-webkit-scrollbar-track {
    box-shadow: none;
  }

  .submenu::-webkit-scrollbar-thumb {
    background: rgba(30, 30, 30, 0.8);
    box-shadow: none;
    border-radius: 5px;
  }

  .submenu::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(210, 210, 210, 0.4);
  }

  .submenu .item {
    padding: 10px 30px 10px 30px;
  }

  .submenu li {
    list-style: none;
  }

  .submenu .item:hover {
    background-color: #1e72de;
    color: #ffffff;
  }

  .submenu ul {
    border-bottom-width: 1px;
    border-bottom-style: ridge;
    border-bottom-color: #cccccc;
    padding: 5px 20px 5px 20px;
    margin-bottom: 0px;
  }
  .activemenu {
    background-color: #1e72de;    
  }
  .deactivelink {
    color: #ffffff !important;
  }
</style>

