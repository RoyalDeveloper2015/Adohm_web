<template>
	<div>
		<div class="row mb-10">
			<div class="col-xs-4"><label for="">Upload</label></div>
			<div class="col-xs-8">
				<label class="box-label"> <input :name="'uploadType-' + index" type="radio" v-model="item.upload.type" value="image">Image</label>
				<label class="box-label"> <input :name="'uploadType-' + index" type="radio" v-model="item.upload.type" value="video">Video</label>
				<div class="panel bg-gray-700 center-block" >
					<div class="text-center" v-if="item.upload.thumbnail_url">
						<template v-if="item.upload.type == 'image'">
							<img :src="options.baseURL + item.upload.thumbnail_url" width="100%"> </img>
						</template>
						<template v-else-if="item.upload.type == 'video'">
							<video :src="options.baseURL + item.upload.thumbnail_url" width="100%" controls="controls" style="max-height: 300px"></video>
						</template>
					</div>
					<div v-else class="text-center">Upload preview</div>
				</div>
				<div class="container-fluid"> 
					<uploader @upload-complete="handleUpload">
						<div class="col-xs-2">
							<a class="btn btn-info mr-20 upload-btn"> Upload </a>
						</div>
						<div class="col-xs-2">
							<label for="">Progress: </label>
						</div>
						<div class="col-xs-8">
							<div class="progress">
								<div class="progress-bar"></div>
							</div>
						</div>
					</uploader>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4"><label for="">Headline</label></div>
			<div class="col-xs-8">
				<input type="text" class="form-control" required v-model="item.name">
			</div>
		</div>
		
		<div class="row">
			<div class="col-xs-4"><label for="">Description</label></div>
			<div class="col-xs-8">
				<input type="text" class="form-control" required v-model="item.description">
			</div>
		</div>

		<div class="row">
			<div class="col-xs-4"><label for="">Website URL</label></div>
			<div class="col-xs-8">
				<input required type="text" class="form-control" required v-model="item.link">
			</div>
		</div>
	</div>
</template>


<script>
	import Uploader from '@/components/partials/Uploader'
	import Vue from 'vue'
	import {baseURL} from '@/config/default/request'

	export default {
		props: ['value', 'index'],
		components: {Uploader},
		data: () => ({
			item: {
				call_to_action: {
					type: "LEARN_MORE"
				},
				link: null,
				description: null,
				name: null,
				picture: null,
				upload: {type: null}
			},
			options: {
				baseURL
			}
		}),
		methods: {
			handleUpload(data) {
				if(!data) return;
				this.item.upload = Object.assign({}, this.item.upload, data);
			}
		},
		mounted() {
			this.item = Object.assign({}, this.item, this.value);
		},
		watch: {
			item: {
				deep: true,
				handler(item) {
					console.log('item updated', clone(item))
					this.$emit('update:value', item);
				}
			}
		}
	}
</script>