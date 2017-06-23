<template>
<div class="messages">
	<div v-show="true" style="display: none" :class="'message alert-dismissable alert alert-' + message.type" v-for="message in messages">
		<a class="close pull-right" data-dismiss="alert">&times;</a>
		{{message.message}}
	</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	computed: mapGetters('session', ['messages'])
}
</script>
