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
	import SitelinkExtension from './SitelinkExtension.vue'
	import CalloutExtension from '../CalloutExtension/component'
	import AppExtension from '../AppExtension/component'
	import CallExtension from '../CallExtension/component'
	import AdSchedule from '../AdSchedule/component'
	import AdRotation from '../adRotation/component'
	import MessageExtension from '../MessageExtension/component'
	import ReviewExtension from '../ReviewExtension/component'
	import SnippetExtension from '../SnippetExtension/component'
	import PromotionExtension from '../promotionExtension/component'
	
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
		PromotionExtension
	},
	props: ['label', 'extension'],
	data: () => ({
		collapsed: false
	}),
	methods: {
  	}
}
</script>
