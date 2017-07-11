<template>
	<div id="card" class="detail-pannel margin-top-20">
		<div class="top-card">
			<div class="col-md-3">
				<span class="black">{{label}}</span>
			</div>
			<div class="col-md-8">
				<div v-if="!collapsed">
					<component :is="extension"></component>
				</div>
			</div>
			<div class="col-md-1 right">
				<i class="fa fa-angle-up trans ro-11 font-xlarge" :class="{rotate: collapsed}" @click="collapsed = !collapsed"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import SitelinkExtension from '../extensions/SitelinkExtension/component'
	import CalloutExtension from '../extensions/CalloutExtension/component'
	import AppExtension from '../extensions/AppExtension/component'
	import CallExtension from '../extensions/CallExtension/component'
	import MessageExtension from '../extensions/MessageExtension/component'
	import ReviewExtension from '../extensions/ReviewExtension/component'
	import SnippetExtension from '../extensions/SnippetExtension/component'
	import PromotionExtension from '../extensions/PromotionExtension/component'
	import LocationOptions from './LocationOptions/component'
	import CampaignUrlOptions from './CampaignUrlOptions/component'
	import AdSchedule from './AdSchedule/component'
	import AdRotation from './AdRotation/component'
	
export default {
	components: {
		SitelinkExtension, 
		CalloutExtension,
		AppExtension,
		CallExtension,
		AdSchedule,
		AdRotation,
		MessageExtension,
		ReviewExtension,
		SnippetExtension,
		PromotionExtension,
		LocationOptions,
		CampaignUrlOptions
	},
	props: ['label', 'extension'],
	data: () => ({
		collapsed: false
	}),
	methods: {
  	}
}
</script>
