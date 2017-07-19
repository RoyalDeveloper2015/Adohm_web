<template>
  <div class="container">
    <h5>Create ads</h5>
    <p>For each ad group, we recoomend you create at least three ads that closely relate to the theme of your keywords</p>
    <div class="panel p-20 mb-n">
      <div class="">
        <div>Ad group: <add-to-list type="adgroup" @selected="setAddTo"></add-to-list> </div>
        <p>Keywords:<b>hourses for sale</b></p>
      </div >
    </div>
	<div class="row mt-10" v-for="">
		<div class="col-xs-4">
		    <add-new-component v-if="showNewAd" @save="onAddNew" @cancel="onCancelNew" :key="$route.query.type"></add-new-component>
		</div>
	</div>
	<div>
	<a class="btn btn-info btn-lg dropdown-toggle" data-toggle="dropdown">
		<i class="fa fa-plus"></i> New Ad
		<ul class="dropdown-menu">
			<li> <router-link to="/search/ads/new?type=text"><span class="fa fa-plus"></span> Text Ad</router-link> </li>
			<li> <router-link to="/search/ads/new?type=callOnly"><span class="fa fa-plus"></span> Call only Ad</router-link> </li>
		</ul> 
	</a>
	</div>
    <div class="panel mt-20 p-20">
      <div class="">
        <div><b>Improve your ads by adding extensions to this campaign</b></div>
        <p>Adding at least one extension to your campaign may boost your ads'click through rate by 5-15%.</p>
      </div>
      <div class="panel p-20">
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Sitelink extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="sitelink_extension" placeholder="Add additional links to your ad" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Callout extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="callout_extension" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
        <div class="form-group mb-20">
          <label class="col-sm-2 control-label" for="text1">Call extensions</label>
          <div class="col-sm-10 input-group">
            <input type="text" id="call_extension" placeholder="Add a phone number to your ad" class="form-control">
            <span class="input-group-addon"><i class="fa fa-angle-down"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import newAdComponent from './CreateAds/newAdComponent.vue'
  import AddToList from '../components/AddToList'
  import Vue from 'vue'
  import {mapState} from 'vuex'

  export default {
    name: 'createAds',
    data: function () {
      return {
        showNewAd: true
      }
    },
    components: {
	  'add-new-component': newAdComponent,
	  AddToList
	},
	computed: {
		...mapState('adwords/ad', ['text', 'callOnly', 'adType'])
	},
    methods: {
      onAddNew: function () {
        this.showNewAd = false
      },
      onCancelNew: function () {
        this.showNewAd = false
	  },
	  setAddTo(addto) {
		//   this.$store.commit('adwords/ad/setAdGroupId', addto.adgroup.id)
		Vue.set(this[this.adType], 'adGroupId', addto.adgroup.id);
	  }
    }
  }
</script>
