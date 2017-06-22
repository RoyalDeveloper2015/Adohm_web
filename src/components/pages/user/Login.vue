<template>
	<div class="modal" id="loginModal">
		<div class="modal-dialog modal-sm" style="margin-top: 150px">
			<div class="modal-content">
				<form @submit="login" action="/login" method="POST">
					<div class="modal-header navbar navbar-inverse">
						<a href="/"><img alt="" src="/images/logo.png"></a>
					</div>
					<div class="modal-body">
						<div class="input-group">
							<span class="input-group-addon glyphicon glyphicon-user"></span>
							<input v-model="login" class="form-control" required name="login" placeholder="Enter your login" type="text"> 
						</div>
						<div class="input-group">
							<span class="input-group-addon glyphicon glyphicon-lock"></span>
							<input v-model="password" class="form-control" required name="password" placeholder="Enter your password" type="password"> 
						</div>
					</div>
					<div class="modal-footer">
						<input class="btn btn-success" type="submit" value="Sign In">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data: () => ({
			login: null, password: null
		}),
		methods: {
			login(e) {
				if(e.currentTarget.checkValidity()) {
					e.preventDefault();
					axios.post('/login', {login: this.login, password: this.password})
						.then(response => {
							if(response.success) {
								
							}
						});
				}
			}
		}
	}
</script>