<template>
  <div class="search-content">
    <div class="bg-white sub-side">
      <div class="sidebar-content">
        <div class="section submenu">

          <li class="item">Overview</li>
          <li class="item">Opportunites</li>
          <li><hr /></li>

          <li class="item"><router-link to="/search/campaigns">Campaigns</router-link></li>
          <li><hr /></li>

          <li class="item">Ad Groups</li>
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
    name: 'search'
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
    padding: 0px 30px 0px 30px;
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
</style>

