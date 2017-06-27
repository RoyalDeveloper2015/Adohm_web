<template>
	<div>
		<div class="row mb-10">
			<div class="col-xs-4"><label for="">Upload</label></div>
			<div class="col-xs-8">
				<label class="box-label"> <input :name="'uploadType-' + index" type="radio" v-model="card.upload.type" value="image">Image</label>
				<label class="box-label"> <input :name="'uploadType-' + index" type="radio" v-model="card.upload.type" value="video">Video</label>
				<div class="panel bg-gray-700 center-block" >
					<div class="text-center" v-if="card.upload.thumbnail_url">
						<template v-if="card.upload.type == 'image'">
							<img :src="card.upload.thumbnail_url" width="100%"/>
						</template>
						<template v-else-if="card.upload.type == 'video'">
							<video :src="card.upload.thumbnail_url" width="100%" controls="controls" style="max-height: 300px"></video>
						</template>
					</div>
					<div v-else class="text-center" v-else>Upload preview</div>
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
				<input type="text" class="form-control" required v-model="card.name">
			</div>
		</div>
		
		<div class="row">
			<div class="col-xs-4"><label for="">Description</label></div>
			<div class="col-xs-8">
				<input type="text" class="form-control" required v-model="card.description">
			</div>
		</div>

		<div class="row">
			<div class="col-xs-4"><label for="">Website URL</label></div>
			<div class="col-xs-8">
				<input required type="text" class="form-control" required v-model="card.link">
			</div>
		</div>
	</div>
</template>


<script>
	import Uplaoder from '@/components/partials/Uploader'
	export default {
		props: ['value', 'index'],
		data: () => ({
			card: {
				call_to_action: {
					type: "LEARN_MORE"
				},
				link: null,
				description: null,
				name: null,
				picture: null,
				upload: {type: null}
			}
		}),
		methods: {
			handleUpload(data) {
				this.card.upload = Object.assign({}, this.card.upload, data);
			}
		},
		mounted() {
			this.card = Object.assign({}, this.card, this.value);
		},
		watch: {
			card: {
				deep: true,
				handler(card) {
					this.$emit('input', card);
				}
			}
		}
	}
</script>