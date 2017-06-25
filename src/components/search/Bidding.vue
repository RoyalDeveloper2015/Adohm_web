<template>
  <!-- bidding -->
  <div id="card" class="detail-pannel margin-top-20">
    <div class="top-card padding-15">
      <div class="col-md-3">
        <span>Bidding</span>
      </div>
      <div class="col-md-6">
        <div class="trans-5">
          <div class="display-block">
            <span>Select your bid strategy</span>
            <i aria-hidden="true" class="fa fa-question-circle"></i>
          </div>
          <div class="display-block">
            <select class="selectpicker margin-top-20 form-control"
                v-model="selected"
                v-on:change="empty = false; use_portfolio = false; use_existing_portfolio = false">
              <optgroup v-for="bids in biddatas" v-bind:label="bids.name">
                <option v-for="bid in bids.values" v-bind:value="bid">{{bid}}</option>
              </optgroup>
            </select>
          </div>

          <!-- Anyone is not selected -->
          <div v-show="empty">
            <div class="display-block margin-top-20">
              <input type="checkbox" name="partner" class="margin-top-5" id="partner">
              <span class="vertical margin-left-10">Enable Enhanced CPC</span>
              <i aria-hidden="true" class="fa fa-question-circle"></i>
            </div>
            <div class="display-block margin-top-5">
              <span>AdWords automatically adjusts your manual bids to try to maximize conversion</span>
            </div>
          </div>

          <!-- Target CPA is selected -->
          <div v-show="selected == 'Target CPA'">
            <div v-show="use_portfolio">
              <div class="display-block margin-top-20">
                <input type="radio" name="cpa-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="display-block margin-top-20">
                <input type="radio" name="cpa-portfolio"
                  v-model="use_existing_portfolio"
                  v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="display-block margin-top-20"
                v-bind:class="{'margin-left-25': use_portfolio}"
                v-show="!use_existing_portfolio">
              <div>              
                <span>Target CPA</span>             
              </div>
              <div class="margin-top-10">            
                <span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
                <input id="url" type="url" name="url" class="bottom-line-input width-40">                 
              </div>
              <div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="use_portfolio">               
                <input id="url" type="url" name="url" class="bottom-line-input width-40">                                
              </div>
            </div>
            <div class="margin-top-20" v-show="!use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
            </div>
            <div class="margin-top-20" v-show="use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = false">Back to standard strategy</div>
            </div>         
          </div>

          <!-- Target ROAS -->
          <div v-show="selected == 'Target ROAS'">
            <div v-show="use_portfolio">
              <div class="display-block margin-top-20">
                <input type="radio" name="roas-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="display-block margin-top-20">
                <input type="radio" name="roas-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="display-block margin-top-20"
                 v-bind:class="{'margin-left-25': use_portfolio}"
                 v-show="!use_existing_portfolio">
              <div>              
                <span>Target ROAS</span>             
                <i aria-hidden="true" class="fa fa-question-circle"></i>
              </div>              
              <div class="margin-top-10">                
                <input id="url" type="url" name="url" class="bottom-line-input width-40 margin-right-5-">
                <span class="border-bottom"><i class="fa fa-percent left-icon" aria-hidden="true"></i></span>
              </div>
              <div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="use_portfolio">               
                <input id="url" type="url" name="url" class="bottom-line-input width-40">                                
              </div>
            </div>
            <div class="margin-top-20" v-show="!use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
            </div>
            <div class="margin-top-20" v-show="use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = false">Back to standard strategy</div>
            </div>         
          </div>

              

        </div>
      </div>
      <div class="col-md-3 row margin-right-0">
        <div class="col-md-10">
          <div class="trans-5">
            <div class="display-block margin-top-30 padding-left-10 left-border">
              <span>With Manual CPC bidding, you set your own maximum cost-per-click (CPC) for your ads</span>
            </div>            
            <div class="display-block padding-top-10 padding-left-10 left-border">
              <a class="blue">Learn more</a>
            </div>
          </div>
        </div>
        <div class="col-md-2 right padding-right-0">
          <i class="fa fa-angle-up trans ro-5 font-xlarge"
            v-on:click="expand('trans-5', 'ro-5')"></i>
        </div>
      </div>        
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'Bidding',
    data: function () {
      return {
        selected: '',
        empty: true,
        use_portfolio: false,
        use_existing_portfolio: false,
        biddatas: [
          {
            name: 'Automated bid strategies',
            values: [
              'Target CPA',
              'Target ROAS',
              'Maximize clicks',
              'Maximize conversions',
              'Target search page location',
              'Target outranking share',
              'Enhanced CPC'
            ]
          },
          {
            name: 'Manual Bid Strategies',
            values: [
              'Manual CPC'
            ]
          }
        ]
      }
    },
    methods: {
      expand: function (tar1, tar2) {
        $('.' + tar1).slideToggle()
        $('.' + tar2).toggleClass('rotate')
      },
      select: function () {
        console.log(this.selected)
      }
    }
  }
</script>
<style lang="css">
  .cursor {
    cursor: pointer;
  }
  .margin-right-5- {
    margin-right: -5px;
  }
  .border-bottom {
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
</style>
