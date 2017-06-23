<template>
  <div class="search-network">
    <div id="card" class="campaign-pannel">

    <!-- Title -->
      <div class="title-area">
        <span class="pannel-title">Goals</span>
      </div>
    <!-- End Title -->
    <!-- Sub Title -->
      <div class="items-area">
        <div>
          <span><input type="checkbox"></span>
          <span class="beside-checkbox">Use Goals</span>
          <span class="pannel-title beside-checkbox">Select a campaign type
              <i class="fa fa-question-circle" aria-hidden="true"></i></span>
        </div>        
    <!-- End Sub Title -->        
    <!-- Cards -->
        <div class="allcard-height">
          <div class="card-container">
            <div>
              <span class="card-title">Influence consideration
                <i class="fa fa-question-circle" aria-hidden="true"></i></span>
            </div>
            <div> 
              <div id="card" class="influence-card">            
                <div class="bottom-line">
                  <span><i class="fa fa-television ic-padding" aria-hidden="true"></i></i>
                        Visit your website</span>
                </div>                            
              </div>
            </div>
          </div>
          <div class="card-container">
            <div>
              <span class="card-title">Drive Action
                <i class="fa fa-question-circle" aria-hidden="true"></i></span>
            </div>
            <div> 
              <div id="card" class="influence-card">               
                <div class="bottom-line">
                  <span><i class="fa fa-television ic-padding" aria-hidden="true"></i></i>
                        Express interest on your site</span>
                </div>
                <div class="bottom-line">
                  <span><i class="fa fa-television ic-padding" aria-hidden="true"></i></i>
                        Buy on your website</span>
                </div>
                <div class="bottom-line">
                  <span><i class="fa fa-television ic-padding" aria-hidden="true"></i></i>
                        Call your business</span>
                </div>
                <div class="bottom-line disabled-text">
                  <span><i class="fa fa-television ic-padding" aria-hidden="true"></i></i>
                        Visit your business</span>
                </div>          
              </div>
            </div>
          </div>        
        </div>
      <!-- End Cards -->        
      </div>
		</div>
  </div>
</template>
<script>
export default {
  name: 'SearchNetwork'
}
</script>
<style>
  .search-network {
    display: inline-flex;
    width: 100%;
  }
  .campaign-pannel {
    width: 100%;
    padding: 20px 0px 20px 20px;
    display: inline-flex;
  }
  .title-area, .items-area, .influence-card {
    display: inline-block !important;
  }
  .beside-checkbox {
    vertical-align: top;
    margin-left: 10px;
    margin-right: 30px;
  }
  .title-area {
    width: 20%;
  }
  .items-area {
    width: 100%;
  }
  .ic-padding {
    margin-right: 4px;
  }
  .content-text {
    text-align: center;
  }
  .bottom-line {
    padding: 10px 15px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
  .bottom-line:hover {
    color: #ffffff;
    background-color: #1e72de;
  }
  .disabled-text {
    color: rgba(0,0,0,0.4);
  }
  .content-text span {
    font-size: smaller;
  }
  .pannel-title {
    padding: 0px 40px 0px 0px;
  }
  .allcard-height {
    display: flex;
  }
  .card-container {
    width: 25%;
    display: block;
    margin-top: 10px;
    margin-right: 20px;
  }
  .card-title {
    font-weight: bold;
  }
  .influence-card {
    margin: 10px 20px 0px 0px;
    background-color: rgba(0,0,0,0.04) !important;
    width: 100%;
    height: 250px;
    text-align: left;
  }
  #card {
    background: #fff;
    position: relative;

    -webkit-box-shadow: 0px 1px 10px 0px rgba(207,207,207,1);
    -moz-box-shadow: 0px 1px 10px 0px rgba(207,207,207,1);
    box-shadow: 0px 1px 10px 0px rgba(207,207,207,1);

    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;	
  }
  @media (max-width: 1350px){
    .allcard-height {
      display: inherit;
    }
    .card-item {
      width: 230px;
      height: 265px;
      float: left;
    }
  }  
</style>

