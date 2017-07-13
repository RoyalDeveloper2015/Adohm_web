<template>
  <div class="panel row">
    <div class="form-group">
      <div class="col-sm-7 col-md-7">
        <label for="group-name" class="control-label">Ad group name</label>
        <input type="text" id="group-name" v-model="item.name" class="form-control">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-7 col-md-7">
        <label for="default-bid" class="control-label">Default bid
          <i class="fa fa-question-circle-o"></i>
        </label>
        <input type="text" id="default-bid" v-model="item.defaultBid" class="form-control">
      </div>
    </div>
    <div class="form-group col-md-12 col-sm-12">
      <textarea class="form-control" rows="7" v-model="item.keywords" placeholder="Enter or paste your keywords, one word or phrase per line">
      </textarea>
    </div>
    <div class="form-group col-md-12 col-sm-12">
      <p><b>Match types help control which searches can trigger your ads</b></p>
      <p>keyword = Broad match "keyword" = Phrase match [keyword] = Exact match <a href="#index" style="color:blue">Learn more</a></P>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
  export default {
    name: 'adGroupElement',
    props: ['data'],
	data: () => ({
		item: {}
	}),
	mounted() {
		Vue.set(this, 'item', this.data);
	},
	watch: {
		item: {
			deep: true,
			handler(item) {
				this.$emit('update:data', item);
			}
		}
	}
  }
</script>
