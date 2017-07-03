<template>
  <div class="row mr-n ml-n bg-white">
    <div class="col-sm-2">
      Call extensions
    </div>
    <div class="col-sm-10 pl-n">
      <div class="row mr-n ml-n">
        <div class="row">
          <div class="col-sm-12 my-gray pl-n">
            Select or Create campaign level call extensions
          </div>
        </div>
        <div class="row bg-gray">
          <div class="col-sm-10 pr-n pl-n">
            <div class="panel panel-default mb-n" v-show="!flgNewCall">
              <div class="panel-body p-n">
                <table class="table table-bordered mb-n">
                  <tbody>
                    <tr>
                      <td class="p-n">
                        <div class="" style="position:relative">
                          <input type="text" class="form-control mb-n my-border-radius-n" placeholder="search" v-model="fString">
                          <span class="fa fa-search form-control-feedback border-radius-n" style="line-height:34px"> </span>
                        </div>
                      </td>
                      <td class="pt-n pb-n">
                        <div>
                          <span style="line-height:34px;">None Selected</span>
                          <button class="btn btn-link pull-right" v-on:click="clearAll">CLEAR ALL</button>
                        </div>
                      </td>
                    </tr>
                    <tr >
                      <td class="p-n" width="50%">
                        <div class="col-sm-12">
                          <div class="checkbox checkbox-primary">
                            <input id="checkbox1" class="styled" type="checkbox" v-on:click="selectAll">
                            <label for="checkbox1">2 call extensions</label>
                          </div>
                        </div>
                      </td>
                      <td rowspan="2">
                        <div class="col-sm-12 pr-n">
                          <li v-for="item in callArray" v-show="item.flag">{{item.title}}</li>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="p-n" >
                        <div class="col-sm-12 p-n" style="min-height:100px">
                          <div class="col-sm-12 pr-n">
                            <check-box v-for="(item, index) in fArray" v-show="!item.flag" @onChange="onChangeItem" v-bind:title="item.title" v-bind:flag="item.flag" v-bind:id="index" ></check-box>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-gray p-n" colspan="2">
                        <button class="btn btn-link" v-on:click="onNewCallExtension">
                          <i class="fa fa-plus-circle"></i> NEW CALL EXTENSION
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <new-call-extension v-if="flgNewCall" @save="addExtension" @cancel="cancelExtension"></new-call-extension>
          </div>
          <div class="col-sm-2 pl-n text-center">
            <span>PREVIEW</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import newCallExtension from './newComponent.vue'
  import checkbox from '../General/checkboxComponent.vue'
  import Vue from 'Vue'
  export default {
    name: 'CallExtension',
    data: function () {
      return {
        flgNewCall: false,
        callArray: [{
          title: 'Amenities: Children Play Area, Swimming Pool, Multi Purpose Hall, Gym, Table Tennis, Tennis Billiard Room, Golf Puting Green, indoor Badminton, Squash Court',
          flag: false
        }, {
          title: 'Neighborhoods: ITPL, Kannamangala, Bearys Global Research',
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
        for (i = 0; i < this.callArray.length; i++) {
          temp.push({
            title: this.callArray[i].title,
            flag: this.callArray[i].flag
          })
        }
        for (i = 0; i < this.callArray.length; i++) {
          if (this.callArray[i].title.toLowerCase().indexOf(this.fString) !== -1) {
            if (this.callArray[i].flag === false) {
              Vue.set(temp, i, {
                title: this.callArray[i].title,
                flag: false
              })
            } else {
              Vue.set(temp, i, {
                title: this.callArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(temp, i, {
              title: this.callArray[i].title,
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
        for (i = 0; i < this.callArray.length; i++) {
          if (this.callArray[i].title.toLowerCase().indexOf(nFilter) !== -1) {
            if (this.callArray[i].flag === false) {
              Vue.set(this.fArray, i, {
                title: this.callArray[i].title,
                flag: false
              })
            } else {
              Vue.set(this.fArray, i, {
                title: this.callArray[i].title,
                flag: true
              })
            }
          } else {
            Vue.set(this.fArray, i, {
              title: this.callArray[i].title,
              flag: true
            })
          }
        }
      }
    },
    components: {
      'new-call-extension': newCallExtension,
      'check-box': checkbox
    },
    methods: {
      onNewCallExtension: function () {
        this.flgNewCall = !this.flgNewCall
      },
      addExtension: function (val) {
        this.flgNewCall = false
      },
      cancelExtension: function () {
        this.flgNewCall = false
      },
      onChangeItem: function (val) {
        var temp = this.callArray[val.index]
        temp.flag = val.flag
        Vue.set(this.callArray, val.index, temp)
      },
      selectAll: function () {
        for (var i = 0; i < this.callArray.length; i++) {
          Vue.set(this.callArray, i, {title: this.callArray[i].title, flag: true})
        }
      },
      clearAll: function () {
        for (var i = 0; i < this.callArray.length; i++) {
          Vue.set(this.callArray, i, {title: this.callArray[i].title, flag: false})
        }
      }
    }
  }
</script>
