<template>
  <div class="main-page">
    <div class="container-fluid">
      <div class="row page-title-div">
        <div class="col-md-6">
          <h2 class="title">Campaigns</h2>
          <p class="sub-title"></p>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-md-6 right-side">
        </div>
        <!-- /.col-md-6 text-right -->
      </div>
      <!-- /.row -->
      <div class="row breadcrumb-div">
        <div class="col-md-6">
          <ul class="breadcrumb">
            <li><a href="#/"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Campaigns</li>
          </ul>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-md-6 text-right">
        </div>
        <!-- /.col-md-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->

    <section class="section">
      <div class="container-fluid">

        <div class="row">
          <div class="col-md-12">
            <div class="panel">
              <div class="panel-heading">
              </div>
              <div class="panel-body p-20">
                <table class="table table-hover table-bordered">
                  <caption>Optional table caption.</caption>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->

      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.section -->

  </div>
</template>

<script>
  export default {
    name: 'mainPage'
  }
</script>
