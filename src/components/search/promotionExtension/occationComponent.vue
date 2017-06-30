<template>
  <select class="form-control" v-model="val">
    <option value="none">None</option>
    <option value="newYear">New Year's</option>
    <option value="Valentine">Valentine's Day</option>
    <option value="Easter">Easter</option>
    <option value="MotherDay">Mother's Day</option>
    <option value="FatherDay">Father's Day</option>
    <option value="LaborDay">Labor Day</option>
    <option value="BacktoSchool">Back to School</option>
    <option value="Halloween">Halloween</option>
    <option value="BlackFriday">Black Friday</option>
    <option value="CyberMonday">Cyber Monday</option>
    <option value="Christmas">Christmas</option>
    <option value="BoxingDay">Boxing Day</option>
  </select>
</template>

<script>
  export default {
    name: 'OccationType',
    data: function () {
      return {
        val: 'none'
      }
    }
  }
</script>
