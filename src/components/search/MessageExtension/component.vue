<template>
  <div class="row ml-n mr-n bg-white">
    <div class="col-sm-3">
      Message extensions
    </div>
    <div class="col-sm-9 pl-n">
      <p class="my-gray"> Select or create message extensions </p>
      <div class="row ml-n mr-n bg-white">
        <div class="panel panel-default mb-n" >
          <div class="panel-body p-n">
            <table class="table table-bordered mb-n" v-show="!flgNewReview">
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
                        <label for="checkbox1">3 message extensions</label>
                      </div>
                    </div>
                  </td>
                  <td rowspan="2">
                    <div class="col-sm-12 pr-n">
                      <li v-for="item in messageArray" v-show="item.flag">{{item.title}}</li>
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
                    <button class="btn btn-link" v-on:click="newReview">
                      <i class="fa fa-plus-circle"></i> NEW MESSAGE EXTENSION
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <new-review @save="addNewReview" @cancel="closeReview" v-if="flgNewReview"></new-review>
          </div>
        </div>
      </div>
    </div>
    <div class="pull-right" style="position:absolute; right:0">
      <span class="my-gray"><i class="fa fa-chevron-up"></i></span>
    </div>
  </div>
</template>

<script>
  import checkbox from '../General/checkboxComponent.vue'
  import CreateReview from './newComponent.vue'
  import Vue from 'vue'
  export default {
    name: 'ReviewExtension',
    data: function () {
      return {
        flgNewReview: false,
        messageArray: [{
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
        for (i = 0; i < this.messageArray.length; i++) {
          temp.push({
            title: this.messageArray[i].title,
            flag: this.messageArray[i].flag
          })
        }
        for (i = 0; i < this.messageArray.length; i++) {
          if (this.messageArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
            if (this.messageArray[i].flag === false) {
              Vue.set(temp, i, {
                title: this.messageArray[i].title,
                flag: false
              })
            } else {
              Vue.set(temp, i, {
                title: this.messageArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(temp, i, {
              title: this.messageArray[i].title,
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
        for (i = 0; i < this.messageArray.length; i++) {
          if (this.messageArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
            if (this.messageArray[i].flag === false) {
              Vue.set(this.fArray, i, {
                title: this.messageArray[i].title,
                flag: false
              })
            } else {
              Vue.set(this.fArray, i, {
                title: this.messageArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(this.fArray, i, {
              title: this.messageArray[i].title,
              flag: true
            })
          }
        }
      }
    },
    methods: {
      newReview: function () {
        this.flgNewReview = true
      },
      addNewReview: function () {
        this.flgNewReview = false
      },
      closeReview: function () {
        this.flgNewReview = false
      },
      onChangeItem: function (val) {
        var temp = this.messageArray[val.index]
        temp.flag = val.flag
        Vue.set(this.messageArray, val.index, temp)
      },
      selectAll: function () {
        for (var i = 0; i < this.messageArray.length; i++) {
          Vue.set(this.messageArray, i, {title: this.messageArray[i].title, flag: true})
        }
      },
      clearAll: function () {
        for (var i = 0; i < this.messageArray.length; i++) {
          Vue.set(this.messageArray, i, {title: this.messageArray[i].title, flag: false})
        }
      }
    },
    components: {
      'check-box': checkbox,
      'new-review': CreateReview
    }
  }
</script>
