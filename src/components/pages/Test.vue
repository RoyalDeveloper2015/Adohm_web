<template>
	<div class="container-fluid mt-20">
		<div class="panel">
			<div class="panel-heading">
				<h4 class="panel-title"> Test Page</h4>
			</div>
			<div class="panel-body">
				<div>
					<label class="typo__label">Single select</label>
					<multiselect v-model="advertiser" :options="advertisers" 
						track-by="_id"
						label="name"
						placeholder="Pick a value"
						:loading="isLoading"
						@search-change="search('/api/advertisers', $data, 'advertisers')">
					</multiselect>
					<pre class="language-json"><code>{{ advertiser  }}</code></pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {vUtils} from '../Mixins'

export default {
	mixins: [vUtils],
	components: {Multiselect},
	data: () => ({
		isLoading: false,
		advertiser: null,
		advertisers: []
	})
}
</script>
