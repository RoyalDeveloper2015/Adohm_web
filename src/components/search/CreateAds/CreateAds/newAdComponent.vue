<template>
  <div class="panel border-1 border-gray row ml-n mr-n">
    <div class="panel-body p-n">
      <div class="col-sm-5 col-md-5 pl-n pr-n">
        <div class="panel border-1-bottom border-gray mb-n">
          <div class="panel-heading">
            <div class="panel-title">
              New text ad
              <svg class="a-s-fa-Ha-pa pull-right" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
              </svg>
            </div>
          </div>
          <div class="panel-body">
            <div style="display:inline-flex; width:100%;">
              <input class="form-control bottom-border-no-outline" type="text" placeholder="Final URL">
              <i class="fa fa-question-circle-o" style="line-height:30px;"></i>
            </div>
            <div style="display:inline-flex; width:100%;">
              <input class="form-control bottom-border-no-outline" type="text" placeholder="Headline 1">
              <i class="fa fa-question-circle-o" style="line-height:30px;"></i>
            </div>
            <div class="pull-right"><span>0/30</span></div>
            <div style="display:inline-flex; width:100%;">
              <input class="form-control bottom-border-no-outline" type="text" placeholder="Headline 2">
              <i class="fa fa-question-circle-o" style="line-height:30px;"></i>
            </div>
            <div class="row pr-15"><span class="pull-right">0/30</span></div>
            <div><span>Display path <i class="fa fa-question-circle-o"></i></span></div>
            <div style="display:inline-flex;">
              <span style="line-height:30px">www.example.com/</span>
              <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="Path 1"></div>
              <span style="line-height:30px">/</span>
              <div><input class="form-control bottom-border-no-outline" maxlength="15" placeholder="Path 2"></div>
            </div>
            <div style="display:inline-flex; width:100%;">
              <textarea class="form-control bottom-border-no-outline" type="text" placeholder="Description" maxlength="80"></textarea>
              <i class="fa fa-question-circle-o" style="line-height:30px;"></i>
            </div>
            <div class="row ml-n mr-n" v-on:click="showUrlOption()">
              <i class="fa" v-bind:class="flg_urlOption ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              <span>Ad URL option</span>
            </div>
            <url-otpion v-if="flg_urlOption" ></url-otpion>
          </div>
        </div>
      </div>
      <div class="col-sm-7 col-md-7 pl-n pr-b">
      </div>
    </div>
    <div class="panel-footer">
      <button type="button" class="btn btn-link" v-on:click="save()"> DONE </button>
      <button type="button" class="btn btn-link" v-on:click="cancel()"> CANCEL </button>
    </div>
  </div>
</template>

<script>
  import urlOption from '../../General/newAdUrlOptionComponent.vue'
  export default {
    name: 'newAdComponent',
    components: {
      'url-otpion': urlOption
    },
    data: function () {
      return {
        flg_urlOption: false
      }
    },
    methods: {
      showUrlOption: function () {
        this.flg_urlOption = !this.flg_urlOption
        console.log(this.flg_urlOption)
      },
      save: function () {
        console.log('aa')
        this.$emit('save')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    }
  }
</script>
