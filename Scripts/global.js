function LoadSpinner() {
    $('body').prepend('<div class="backdrop"></div>');
    $('form').prepend('<div id="custom_loader_container" class="verifying-modal"><div id="custom_text">Please wait while it loads</div></div>');
    console.log($("#continue").is(':visible'));
}

function LoadComapnies() {
	var scoutSapSoldToID = $("#scoutSapSoldToID");
	var countryCode = GetParameterValues("countryCode");
	var getcomppanytask = {
		url:
			'https://auf-solar-dev-westeurope-01.azurewebsites.net/api/solar/config/getCompanyInfo?countryCode=' + countryCode,
		method: 'GET',
		timeout: 0
	};
	try {
		$.ajax(getcomppanytask).done(function (response) {
			var companies = result = typeof response === "string" ? JSON.parse(response) : response;
			console.log(companies);
		})
	} catch (e) {
		console.log(e);
	}
}

LoadSpinner();
LoadComapnies();