<template>
  <!-- bidding -->
  <div id="card" class="detail-pannel margin-top-20">
    <div class="top-card">
      <div class="col-md-3">
        <span>Bidding</span>
      </div>
      <div class="col-md-5">
        <div class="trans-5">
          <div>
            <span>Select your bid strategy</span>
            <i aria-hidden="true" class="fa fa-question-circle"></i>
          </div>
          <div>
            <select class="selectpicker margin-top-20 form-control"
                v-model="selected"
                v-on:change="empty = false; use_portfolio = false; use_existing_portfolio = false">
              <optgroup v-for="bids in biddatas" v-bind:label="bids.name">
                <option v-for="bid in bids.values" v-bind:value="bid">{{bid}}</option>
              </optgroup>
            </select>
          </div>

          <!-- Anyone is not selected -->
          <div v-show="empty || selected == 'Manual CPC'">
            <div class="display-block margin-top-20">
              <input type="checkbox" class="margin-top-5">
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
            <div class="margin-top-20"
                v-bind:class="{'margin-left-25': use_portfolio}"
                v-show="!use_existing_portfolio">
              <div>              
                <span>Target CPA</span>             
              </div>
              <div class="margin-top-10">            
                <span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
                <input type="text" class="bottom-line-input width-40">                 
              </div>
              <div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="use_portfolio">               
                <input type="text" class="bottom-line-input width-40">                                
              </div>
            </div>
            <div class="margin-top-20" v-show="!use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
            </div>
            <div class="margin-top-20" v-show="use_portfolio">
              <div class="blue cursor"
                v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
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
            <div class="margin-top-20"
                 v-bind:class="{'margin-left-25': use_portfolio}"
                 v-show="!use_existing_portfolio">
              <div>              
                <span>Target ROAS</span>             
                <i aria-hidden="true" class="fa fa-question-circle"></i>
              </div>              
              <div class="margin-top-10">                
                <input type="text" class="bottom-line-input width-40 margin-right-5-">
                <span class="border-bottom"><i class="fa fa-percent left-icon" aria-hidden="true"></i></span>
              </div>
              <div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="use_portfolio">               
                <input type="text" class="bottom-line-input width-40">                                
              </div>
            </div>
            <div class="margin-top-20" v-show="!use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
            </div>
            <div class="margin-top-20" v-show="use_portfolio">
              <div class="blue cursor"
                v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
            </div>                 
          </div>

          <!-- maximum clicks -->    
          <div v-show="selected == 'Maximize clicks'">
            <div v-show="use_portfolio">
              <div class="margin-top-20">
                <input type="radio" name="maximize-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="margin-top-20">
                <input type="radio" name="maximize-portfolio"
                  v-model="use_existing_portfolio"
                  v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="margin-top-20"
                v-bind:class="{'margin-left-25': use_portfolio}"
                v-show="!use_existing_portfolio">
              <div>              
                <span>Maximize CPC bid limit(optional)</span>
                <i aria-hidden="true" class="fa fa-question-circle"></i>             
              </div>
              <div class="margin-top-10">            
                <span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>
                <input type="text" class="bottom-line-input width-40">                 
              </div>
              <div class="margin-top-20" v-show="use_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="use_portfolio">               
                <input type="text" class="bottom-line-input width-40">                                
              </div>
              <div v-show="!use_portfolio">
                <div class="display-block margin-top-20">
                  <input type="checkbox" class="margin-top-5">
                  <span class="vertical margin-left-10">Enable Enhanced CPC</span>
                  <i aria-hidden="true" class="fa fa-question-circle"></i>
                </div>
                <div class="display-block margin-top-5">
                  <span>AdWords automatically adjusts your manual bids to try to maximize conversion</span>
                </div>
              </div>
            </div>
            <div class="margin-top-20" v-show="!use_portfolio">
              <div class="blue cursor" v-on:click="use_portfolio = true">Use a portfolio strategy</div>
            </div>
            <div class="margin-top-20" v-show="use_portfolio">
              <div class="blue cursor"
                v-on:click="use_portfolio = false; use_existing_portfolio = false">Back to standard strategy</div>
            </div>                     
          </div>

          <!-- Target search page location -->
          <div v-show="selected == 'Target search page location'">
            <div>
              <div class="margin-top-20">
                <input type="radio" name="target-search-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="margin-top-20">
                <input type="radio" name="target-search-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="margin-top-20 margin-left-25"                 
                 v-show="!use_existing_portfolio">                            
              <span>Where do you want your ads to appear?</span><br />                     
              <div class="margin-left-10 margin-top-20">
                <input type="radio" name="position" checked>                    
                <span>Top of the first results page</span>
              </div>
              <div class="margin-left-10 margin-top-20">
                <input type="radio" name="position">                    
                <span>Anywhare on the first results page</span>
              </div>
              <div class="margin-top-20" v-show="!use_existing_portfolio"><span>Name</span></div>
              <div class="margin-top-10" v-show="!use_existing_portfolio">               
                <input type="text" class="bottom-line-input width-40">                                
              </div>
            </div>                 
          </div>

          <!-- Target outranking share -->
          <div v-show="selected == 'Target outranking share'">
            <div>
              <div class="margin-top-20">
                <input type="radio" name="share-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="margin-top-20">
                <input type="radio" name="share-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="margin-top-20 margin-left-25"                 
                 v-show="!use_existing_portfolio">
              <div>              
                <span>Domain name to outrank</span>             
                <i aria-hidden="true" class="fa fa-question-circle"></i>
              </div>              
              <div class="margin-top-10">                
                <input type="url" class="bottom-line-input width-40 margin-right-5-">                
              </div>
              <div class="margin-top-20">              
                <span>Target to outlank</span>             
                <i aria-hidden="true" class="fa fa-question-circle"></i>
              </div>              
              <div class="margin-top-10">                
                <input type="text" class="bottom-line-input width-40 margin-right-5-">
                <span class="border-bottom"><i class="fa fa-percent left-icon" aria-hidden="true"></i></span>
              </div>
              <div class="margin-top-20">              
                <span>Maximum bid limit</span>             
                <i aria-hidden="true" class="fa fa-question-circle"></i>
              </div>              
              <div class="margin-top-10">
                <span class="left-span"><i class="fa fa-inr left-icon" aria-hidden="true"></i></span>               
                <input type="text" class="bottom-line-input width-40 margin-right-5-">                
              </div class="margin-top-20">
              <div class="margin-top-20"><span>Name</span></div>
              <div class="margin-top-10">               
                <input type="text" class="bottom-line-input width-40">                                
              </div>
            </div>                            
          </div>

          <!-- Enhanced CPC -->
          <div v-show="selected == 'Enhanced CPC'">
            <div>
              <div class="margin-top-20">
                <input type="radio" name="enhanced-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="true">
                <span>Use existing portfolio strategy</span>
              </div>
              <div class="margin-top-20">
                <input type="radio" name="enhanced-portfolio"
                    v-model="use_existing_portfolio"
                    v-bind:value="false">
                <span>Create new portfolio strategy</span>
              </div>
            </div>
            <div class="margin-top-20 margin-left-25"                 
                 v-show="!use_existing_portfolio">
              <div class="margin-top-20"><span>Name</span></div>
              <div class="margin-top-10">               
                <input type="text" name="enhanced" class="bottom-line-input width-40">                                
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- notes -->
      <div class="col-md-4 row margin-right-0">
        <div class="col-md-10 padding-right-0 font-size-smaller">
          <div class="trans-5">
            <div class="margin-top-30 padding-left-10 left-border">

              <!-- Empty or Manual CPC -->
              <div v-show="empty || selected == 'Manual CPC'">
                <span>With Manual CPC bidding, you set your own maximum cost-per-click (CPC) for your ads</span>
              </div>

              <!-- Target CPA -->
              <div v-show="selected == 'Target CPA'">
                <span>With Target CPA, Adwords automatically sets bids to 
                  help get as many conversions as possible at the target cost-per-acquistion(CPA) you set. 
                  Some conversions may cost more or less than your target.</span>
              </div>

              <!-- Target ROAS -->
              <div v-show="selected == 'Target ROAS'">
                <span>With Target ROAS, Adwords automatically sets bids to help get as much conver
                    sion value as possible at the target return on ad spend(ROAS) you set. Some co
                    versions may have a higher or lower return than your target.</span>
              </div>

              <!-- Maximize clicks -->
              <div v-show="selected == 'Maximize clicks'">
                <div>
                  <span>With Maximize clicks, Adwords automatically sets your bids to help get as 
                      many clicks as possible within your budget.</span>
                </div>
                <div class="margin-top-20">
                  <span>A maximum CPC bid limit caps each cost-per-click bid. This could limit the 
                      clicks on your ad.</span>
                </div>
              </div>

              <!-- Maximize conversion -->
              <div v-show="selected == 'Maximize conversions'">
                <span>AdWords automatically sets your bids to help you get the most conversions within your budget.</span>
              </div>

              <!-- Target search page location -->
              <div v-show="selected == 'Target search page location'">
                <span>With Target search page location, Adwords automatically sets your bids to 
                    increase the chances that your ads appear at the top of the page or on the first 
                    page of search results.</span>
              </div>

              <!-- Target outranking share -->
              <div v-show="selected == 'Target outranking share'">
                <span>With Target outranking share, you choose a domain you want to outrank in 
                    search results and how often you want to outrank it, and Adwords automatically 
                    sets your bids to help meet that target.</span>
              </div>

              <!-- Enhanced CPC -->
              <div v-show="selected == 'Enhanced CPC'">
                <span>Adwords automatically adjusts your manual bids to help maximize conversions.</span>
              </div>
              
              <div class="margin-top-20"
                v-show="!use_portfolio && !empty && (selected == 'Target CPA' || selected == 'Target ROAS' || selected == 'Maximize clicks')">
                <span>The strategy you select here will be applied to this campaign only.</span>
              </div>

              <div class="margin-top-20"
                v-show="use_portfolio || selected == 'Target outranking share' || selected == 'Target search page location' || selected == 'Enhanced CPC'">
                <span>A portfolio strategy groups together multiful campaigns, ad groups, 
                  keywords into a single bid strategy</span>
              </div>
              
              <div class="margin-top-20" v-show="use_portfolio">                
                <span v-show="selected == 'Target CPA' || selected == 'Target ROAS' || selected == 'Maximize clicks'">
                  To limit your bidding preferences to a single campaign, use a 
                  standard strategy.</span>
              </div><br />
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
  .font-size-smaller {
    font-size: smaller;
  }
</style>
