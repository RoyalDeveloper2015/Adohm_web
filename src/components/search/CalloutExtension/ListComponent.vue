<template>
  <div class="row mr-n ml-n">
    <div class="row">
      <div class="col-sm-12 my-gray">
        Add at least 2 callout extentions
      </div>
    </div>
    <div class="row bg-gray">
      <div class="panel panel-default mb-n" >
        <div class="panel-body p-n">
          <table class="table table-bordered mb-n" v-show="!flgNewCallout">
            <tbody >
              <tr>
                <td class="p-n">
                  <div class="" style="position:relative">
                    <input type="text" class="form-control mb-n my-border-radius-n outline-no" placeholder="search" v-model="fString">
                    <span class="fa fa-search form-control-feedback border-radius-n" style="line-height:34px"> </span>
                  </div>
                </td>
                <td class="pt-n pb-n">
                  <div>
                    <span style="line-height:34px;">None Selected</span>
                    <button class="btn btn-link pull-right" v-on:click="clearAll">CLEAR ALL</button>
                  </div>
                </td>
                <td class="pl-n pr-n bg-gray" rowspan="4" style="vertical-align:middle;text-align:center">
                  <span>PREVIEW</span>
                </td>
              </tr>
              <tr>
                <td class="p-n" >
                  <div class="col-sm-12">
                    <div class="checkbox checkbox-primary">
                      <input id="checkbox1" class="styled" type="checkbox" v-on:click="selectAll">
                      <label for="checkbox1">3 callout extensions</label>
                    </div>
                  </div>
                </td>
                <td rowspan="2">
                  <div class="col-sm-12 pr-n">
                    <li v-for="item in calloutArray" v-show="item.flag">{{item.title}}</li>
                  </div>
                </td>
              </tr>
              <tr  >
                <td class="p-n" width="50%" height="80%">
                  <div class="col-sm-12 pr-n">
                    <check-box v-for="(item, index) in fArray" v-show="!item.flag" @onChange="onChangeItem" v-bind:title="item.title" v-bind:flag="item.flag" v-bind:id="index" ></check-box>
                  </div>
                </td>

              </tr>
              <tr>
                <td class="p-n bg-gray" colspan="2">
                  <button class="btn btn-link" v-on:click="newCallout">
                    <i class="fa fa-plus-circle"></i> NEW CALLOUT EXTENSION
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <new-Callout @save="addNewCallout" @cancel="closeCallout" v-if="flgNewCallout"></new-Callout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import checkbox from '../General/checkboxComponent.vue'
  import CreateCallout from './newComponent.vue'
  import Vue from 'Vue'
  export default {
    name: 'CampaignCalloutExtension',
    data: function () {
      return {
        flgNewCallout: false,
        calloutArray: [{
          title: 'Amenities: Children Play Area, Swimming Pool, Multi Purpose Hall, Gym, Table Tennis, Tennis Billiard Room, Golf Puting Green, indoor Badminton, Squash Court',
          flag: false
        }, {
          title: 'Neighborhoods: ITPL, Kannamangala, Bearys Global Research',
          flag: false
        }, {
          title: 'Neighborhoods: Manyata Tech Park, Elements Mall, Nagawara, Diana Public School, KNS insitute',
          flag: false
        }, {
          title: 'Neighborhoods: Manyata Tech Park, Elements Mall, Nagawara, Diana Public School, KNS insitute',
          flag: false
        }],
        fString: ''
      }
    },
    computed: {
      fArray: function () {
        var temp = []
        var i = 0
        for (i = 0; i < this.calloutArray.length; i++) {
          temp.push({
            title: this.calloutArray[i].title,
            flag: this.calloutArray[i].flag
          })
        }
        for (i = 0; i < this.calloutArray.length; i++) {
          if (this.calloutArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
            if (this.calloutArray[i].flag === false) {
              Vue.set(temp, i, {
                title: this.calloutArray[i].title,
                flag: false
              })
            } else {
              Vue.set(temp, i, {
                title: this.calloutArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(temp, i, {
              title: this.calloutArray[i].title,
              flag: true
            })
          }
        }
        return temp
      }
    },
    watch: {
      fString: function (nFilter) {
        var i = 0
        for (i = 0; i < this.calloutArray.length; i++) {
          if (this.calloutArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
            if (this.calloutArray[i].flag === false) {
              Vue.set(this.fArray, i, {
                title: this.calloutArray[i].title,
                flag: false
              })
            } else {
              Vue.set(this.fArray, i, {
                title: this.calloutArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(this.fArray, i, {
              title: this.calloutArray[i].title,
              flag: true
            })
          }
        }
      }
    },
    methods: {
      newCallout: function () {
        this.flgNewCallout = true
      },
      addNewCallout: function () {
        this.flgNewCallout = false
      },
      closeCallout: function () {
        this.flgNewCallout = false
      },
      onChangeItem: function (val) {
        var temp = this.calloutArray[val.index]
        temp.flag = val.flag
        Vue.set(this.calloutArray, val.index, temp)
      },
      selectAll: function () {
        for (var i = 0; i < this.calloutArray.length; i++) {
          Vue.set(this.calloutArray, i, {title: this.calloutArray[i].title, flag: true})
        }
      },
      clearAll: function () {
        for (var i = 0; i < this.calloutArray.length; i++) {
          Vue.set(this.calloutArray, i, {title: this.calloutArray[i].title, flag: false})
        }
      }
    },
    components: {
      'check-box': checkbox,
      'new-Callout': CreateCallout
    }
  }
</script>
