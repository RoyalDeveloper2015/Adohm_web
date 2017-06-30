<template>
  <div class="panel-body panel-default bg-white">
    <div class="col-sm-3 col-md-3">
      Ad schedule
    </div>
    <div class="col-sm-6 col-md-6 no-border border-1-right border-gray" style="border-style:solid">
      <div v-for="item in schedules">
        <div class="col-sm-4 pr-n">
          <select class="form-control" v-model="sel_option" v-on:change="onChangeOption(sel_option,item.from, item.to)">
            <option disabled value=" ">Select one</option>
            <option value="all">All days</option>
            <option value="specific">Other</option>
          </select>
        </div>
        <div class="col-sm-4 pl-n pr-n" style="display:inline-flex">
          <input type="time" class="form-control">
          <span style="line-height:30px">To</span>
        </div>

        <div class="col-sm-4 pl-n">
          <input type="time" class="form-control">
        </div>
      </div>
      <div class="col-sm-12">
        <button class="btn btn-link" v-on:click="addSchedule">ADD</button>
      </div>
      <span class="col-sm-12">Based on account time zone:(GMT+5:30) India Standard Times</span>
    </div>
    <div class="col-sm-3 col-md-3">
      <pre class="bg-white no-border">
        To limit when your ads can run,set
        an ad schedule. keep in mind that
        your ads will only run during these times.
      </pre>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'AdSchedule',
    data: function () {
      return {
        sel_option: 'specific',
        schedules: [{
          from: '00:00:AM',
          to: '00:00:AM'
        }]
      }
    },
    methods: {
      onChangeOption: function (opt, from, to) {
        if (opt === 'all') {
          this.schedules = []
          this.schedules.push({
            from: from,
            to: to
          })
        }
        return
      },
      addSchedule: function () {
        this.schedules.push({
          from: '00:00',
          to: '00:00'
        })
      }
    }
  }
</script>
