<template>
  <div>
    <div class="checkbox checkbox-primary" style="white-space:warp;word-break:break-word">

        <input class="styled" type="checkbox" v-model="flag" v-on:change="onChange(flag, id)">
        <label>
          {{title}}
        </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-checkbox',
    props: ['title', 'flag', 'id'],
    methods: {
      onChange: function (val, id) {
        console.log(this.status)
        this.$emit('onChange', {
          flag: val,
          index: id
        })
      }
    }
  }
</script>
