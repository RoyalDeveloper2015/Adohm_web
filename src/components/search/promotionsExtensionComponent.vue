<template>
  <div class="row bg-white">
    <div class="col-sm-2">
      Message extensions
    </div>
    <div class="col-sm-8 mr-n pr-n" style="height:200px">
      <p>Select or Create message extensions</P>
      <div class="panel m-n">
        <div class="panel-body m-n p-n">
          <div class="col-xs-6 mr-n pr-n pl-n" style="border:1px solid gray">
      			<input type="text" class="form-control input-sm mb-n" style="outline:none; border-radius:0px;" placeholder="Search">
            <span class="glyphicon glyphicon-search form-control-feedback" style="right:15px"></span>
            <div>
              <select class="form-control p-n" multiple>
                <option class="form-control" disabled>No message extensions</option>
              </select>
            </div>
          </div>
          <div class="col-xs-6 pr-n pl-n" style="border:1px solid gray">
            <div>
              <span class="col-sm-offset-0 col-sm-7" style="line-height:30px">None Selected</span>
              <div class="col-sm-5">
                <button class="btn bnt-link  pull-right form-control" style="height:30px">CLEAR ALL</button>
              </div>
            </div>
            <div>
              <select class="form-control p-n" multiple>
                <option class="form-control" disabled>No message extensions</option>
              </select>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-link"><i class="fa fa-plus-circle"></i>&nbsp;NEW MESSAGE EXTENSION</button>
        </div>
      </div>
    </div>
    <div class="col-sm-2 ml-n pl-n bg-gray text-center">
      <span style="line-height:200px">PREVIEW</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PromotionsExtension'
  }
</script>
