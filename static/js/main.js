/*! --------------------------------------------------------------
# main.js
#
# Main theme js file for Options-admin template.
# This is compressed js file. You get uncompressed version with download.
--------------------------------------------------------------*/

$(function($) {
	"use strict";

	// Toggle user info on sidebar
	$(document).on('click', '.user-info-handle', function(event){
		event.preventDefault();
		$('.user-info').toggleClass('closed');
	});

	// Toggle small sidebar
	$(document).on('click', '.small-nav-handle', function(event){
		event.preventDefault();
		$('.left-sidebar').toggleClass('small-nav');
		$('.navbar-header').toggleClass('small-nav-header');
	});

	// Toggle Mobile Nav
	$(document).on('click', '.mobile-nav-toggle', function(event){
		event.preventDefault();
		$('.left-sidebar').toggle();
	})

	// Toggle tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// Toggle popovers
	$('[data-toggle="popover"]').popover();

	// For custom modal backdrop
	$('.modal[data-backdrop-color]').on('show.bs.modal hide.bs.modal', function () {
		$('body').toggleClass('modal-color-'+ $(this).data('backdropColor'));
	});

	// Open right sidebar
	$('.open-right-sidebar').on('click', function(event){
		event.preventDefault();
		$('.right-sidebar, .right-sidebar .sidebar-content').css('right','0px');
	});
	$('.right-sidebar .close-icon').on('click', function(event){
		event.preventDefault();
		$('.right-sidebar, .right-sidebar .sidebar-content').css('right','-400px');
	});

	// Initialize panel controls
	$('[data-panel-control]').lobiPanel();

	// Toggle full screen
	$('.full-screen-handle').on('click', function(event){
		event.preventDefault();
		if ((document.fullScreenElement && document.fullScreenElement !== null) ||
			(!document.mozFullScreen && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	});

	// Toggle sidebar dropdown


	// For Dropdown menu animation
	var dropdownSelectors = $('.dropdown, .dropup');

	// Custom function to read dropdown data
	// =========================
	function dropdownEffectData(target) {
		// @todo - page level global?
		var effectInDefault = null,
			effectOutDefault = null;
		var dropdown = $(target),
			dropdownMenu = $('.dropdown-menu', target);
		var parentUl = dropdown.parents('ul.nav');

		// If parent is ul.nav allow global effect settings
		if (parentUl.size() > 0) {
			effectInDefault = parentUl.data('dropdown-in') || null;
			effectOutDefault = parentUl.data('dropdown-out') || null;
		}

		return {
			target: target,
			dropdown: dropdown,
			dropdownMenu: dropdownMenu,
			effectIn: dropdownMenu.data('dropdown-in') || effectInDefault,
			effectOut: dropdownMenu.data('dropdown-out') || effectOutDefault,
		};
	}

	// Custom function to start effect (in or out)
	// =========================
	function dropdownEffectStart(data, effectToStart) {
		if (effectToStart) {
			data.dropdown.addClass('dropdown-animating');
			data.dropdownMenu.addClass('animated');
			data.dropdownMenu.addClass(effectToStart);
		}
	}

	// Custom function to read when animation is over
	// =========================
	function dropdownEffectEnd(data, callbackFunc) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		data.dropdown.one(animationEnd, function() {
			data.dropdown.removeClass('dropdown-animating');
			data.dropdownMenu.removeClass('animated');
			data.dropdownMenu.removeClass(data.effectIn);
			data.dropdownMenu.removeClass(data.effectOut);

			// Custom callback option, used to remove open class in out effect
			if (typeof callbackFunc == 'function') {
				callbackFunc();
			}
		});
	}

	// Bootstrap API hooks
	// =========================
	dropdownSelectors.on({
		"show.bs.dropdown": function() {
			// On show, start in effect
			var dropdown = dropdownEffectData(this);
			dropdownEffectStart(dropdown, dropdown.effectIn);
		},
		"shown.bs.dropdown": function() {
			// On shown, remove in effect once complete
			var dropdown = dropdownEffectData(this);
			if (dropdown.effectIn && dropdown.effectOut) {
				dropdownEffectEnd(dropdown, function() {});
			}
		},
		"hide.bs.dropdown": function(e) {
			// On hide, start out effect
			var dropdown = dropdownEffectData(this);
			if (dropdown.effectOut) {
				e.preventDefault();
				dropdownEffectStart(dropdown, dropdown.effectOut);
				dropdownEffectEnd(dropdown, function() {
					dropdown.dropdown.removeClass('open');
				});
			}
		},
	});
});
