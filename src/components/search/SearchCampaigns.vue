<template>
  <div class="search-item">
    <nav class="navbar bg-white box-shadow sub-nav">
        <ul class="nav subnav active">
            Campaign  
        </ul>
        <ul class="nav subnav">
            <span>More</span>
            <i class="fa fa-angle-down arrow"></i>
        </ul>        
    </nav>
    <div class="line-group">
      <div class="line-item">
        <span>100</span><hr />
      </div>
      <div class="line-item">
        <span>400</span><hr />
      </div>
      <div class="line-item">
        <span>0</span><hr />
      </div>
    </div>
    <a class="round-button"><i class="fa fa-plus"></i></a>


    <table id="example" class="display table-custom" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>
<i class="fa fa-check" aria-hidden="true"></i>
                </th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </tfoot>
        <tbody>
            <tr>
                <td data-search="Tiger Nixon">T. Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td data-order="1303689600">Mon 25th Apr 11</td>
                <td data-order="320800">$320,800/y</td>
            </tr>
            <tr>
                <td data-search="Garrett Winters">G. Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td data-order="1311552000">Mon 25th Jul 11</td>
                <td data-order="170750">$170,750/y</td>
            </tr>
            <tr>
                <td data-search="Ashton Cox">A. Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>66</td>
                <td data-order="1231718400">Mon 12th Jan 09</td>
                <td data-order="86000">$86,000/y</td>
            </tr>
          </tbody>
        </table>


  </div>
</template>

<script>
  export default {
    name: 'searchCampaign'
  }
</script>
<style lang="css">
  .search-item {
    display: inline-block;
    width: 100%;
    z-index: 2;    
  }
  .subnav {
    margin: 30px 20px 0px 40px;
    padding-bottom: 4px;
    display: inline-block;
  }
  .subnav:hover {
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: #3498db;
  }
  .active {
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: #3498db;
  }
  .round-button {
    display:block;
    width:50px;
    height:50px;
    line-height:50px;
    border-radius: 50%;
    color:#ffffff;
    text-align:center;
    text-decoration:none;
    background: #3498FC;
    box-shadow: 0 0 3px gray;
}
  .round-button:hover {
      background: #ffffff;
      color: #3498FC;
  }
  .line-group {
    margin: 40px 0px 40px 40px;
  }
  .line-item {
    margin: 40px 0px 40px 0px;
    vertical-align: center;
    width: 95%;
    text-align: right;
  }
  .line-item hr {
    display: inline-block;
    width: 95%;
    border: 0;
    border-top: 1px solid #ccc;
    padding: 0;
    margin: 5px 0px 5px 10px;
  }

  .table-custom tr {
    border: 2px solid rgba(0,0,0,0.04);
  }

  .fa-check{
        border: 2px solid rgba(0,0,0,0.5);
    border-radius: 3px;
    color: rgba(0,0,0,0.7);
  }
</style>

