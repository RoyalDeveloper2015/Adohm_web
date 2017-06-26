<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	import {baseURL} from '@/config/default/request'

	export default {
		props: ['options'],
		data: () => ({
			uploadId: null,
			thumbnail_url: null
			// oldFile: null
		}),
		mounted() {
			var vm = this;
			
			var uploader = new ss.SimpleUpload({
				button: $(vm.$el).find('.upload-btn'),
				url: baseURL + '/api/creatives/upload',
				cors: true,
				withCredentials: true,
				name: 'file',
				dropzone: $(vm.$el).find('.upload-dropzone'),
				responseType: 'json',
				allowedExtensions: ['gif', 'jpg', 'jpeg', 'png', 'zip', 'mov', 'mp4'],
				multiple: false,
				onSubmit: function(filename, extension) {
					var progressBar = $(vm.$el).find('.progress');
					if(progressBar.length) {
						this.setProgressBar(progressBar.find('.progress-bar')[0]);
					}
				},
				onComplete: function(filename, response) {
					 $(vm.$el).find('.progress-bar').css({width: '0'});
					if(!response.success) return vApp.message("Error uploading image");
					vm.$emit('upload-complete', response.result);
					Vue.set(vm, 'thumbnail_url', response.result.thumbnail_url);
					Vue.set(vm, 'uploadId', response.result.uploadId);
				}
			});
		}
	}
</script>