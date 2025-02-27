function LoadSpinner() {
    $('body').prepend('<div class="backdrop"></div>');
    $('form').prepend('<div id="custom_loader_container" class="verifying-modal"><div id="custom_text">Please wait while it loads</div></div>');
    console.log($("#continue").is(':visible'));
}

function LoadComapnies() {
	var getcomppanytask = {
		url:
			'https://auf-solar-dev-westeurope-01.azurewebsites.net/api/solar/webforms/scout/dcr/getWholeSellers?countryCode=CA',
		method: 'GET',
		timeout: 0
	};
	try {
		$.ajax(getcomppanytask).done(function (response) {
			console.log(response);
		})
	} catch (e) {
		console.log(e);
	}
}

LoadSpinner();
LoadComapnies();