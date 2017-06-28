Object.all = function(object) {
	var result = object[arguments[1]];
	for(var i = 2; i < arguments.length; i++) result = result && object[arguments[i]];
	return result;
}

function ignore(func) {
	try {return func()} 
	catch(e) {}
}

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function humanize (value) {
	return value[0].toUpperCase() + value.substr(1).replace(/\_/g, ' ');
}

// Transfer values of keys from src to dst, where key exists in dst
function transfer(dst, src) {
	for(var key in dst) {
		if(src[key] && dst[key] !== undefined) dst[key] = src[key];
	}
	return dst;
}

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
	if(jqxhr.status == 401) {
		vApp.message("You've been logged out, please login to continue", "danger");
		$('#loginModal').modal('show');
	}
})

// Vue.config.errorHandler = function(error) {
// 	console.log(error)
// 	$('.messages').html('<div class="alert alert-danger ">Unexpected error occurred, please refresh this page to continue</div>');
// }

window.APP_ID = '1630352836992136';
window.fbAsyncInit = function() {
	FB.init({
		appId: APP_ID,
		cookie: true,
		xfbml: true,
		version: 'v2.9'
	});
	// FB.AppEvents.logPageView();	 
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}