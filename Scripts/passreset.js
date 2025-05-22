
        // Ensure B2C API is available
   




function HandleTabEvents(tabIndex = 1) {
    // tabIndex =0 - PE
    // tabIndex =1 - PR
    var PE_POLICY = "B2C_1A_SOLAR_SANDOZID_PROD_PROFILE_EDIT";
    var PR_POLICY = "B2C_1A_SOLAR_PWRESET";
    if (tabIndex == 1) {
        // Remove 'active' class from first tab and pane
        $('#myTab li').removeClass('active');
        $('.tab-pane').removeClass('active in');
        // Add 'active' to the second tab and pane
        $('#myTab li:eq(1)').addClass('active');
        $('#passwordReset').addClass('active in');
    }

    //user is on PE and set password reset tab clieck
    if (tabIndex == 0) {
        $("#passwrod-tab").click(function (e) {
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation(); // Stop internal B2C logic
            SetTabURL(PR_POLICY);
        });
    }
    else {
        //user is ON PR set PE click
        $("#home-tab").click(function (e) {
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation(); // Stop internal B2C logic
            SetTabURL(PE_POLICY);
        });
    }
}
function setQueryParam(value,defaultValue = "") {
    if (value == "" || value == null || value == undefined) {
        value = defaultValue
    }
    return value;
}
function SetTabURL(policy) {
    var queryparams = JSON.parse($("#queryparams").val());
    var countryCode = setQueryParam(queryparams.countryCode, "US");
    var return_url = queryparams.return_url ?? "";
    var regType = setQueryParam(queryparams.regType, "V1");
    var clientId = queryparams.clientId ?? "";
    var redirect_uri = queryparams.redirect_uri ?? "";

    var queryparams = new URLSearchParams(window.location.search);
    if (queryparams.has("redirect_uri")) {
        queryparams.set("p", policy);
        window.location.replace(window.location.origin + window.location.pathname + "?" + queryparams.toString())
    }
    else {
     
        var originURL = document.domain;
        var tenantName = originURL.replace(".b2clogin.com", "") + ".onmicrosoft.com";
        var passwordURL = "https://" + originURL + "/" + tenantName +
                            "/oauth2/v2.0/authorize?p=" + policy +"&client_id=" + clientId +
                            "&nonce=defaultNonce&redirect_uri=" + redirect_uri + "&scope=openid&response_type=id_token&UI_Locales=en&return_url=" + return_url +
                            "&countryCode=" + countryCode + "&regType=" + regType;
        window.location.replace(passwordURL);
    }
}

const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector('form');
    const continueBtn = document.querySelector('#continue')
        || document.querySelector('button[type="submit"]');

    if (form && continueBtn) {
        console.log("✅ Form and continue button found.");
        obs.disconnect();
        HandleTabEvents(1);
        // Replace default click behavior
        const handler = function (e) {
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation();            // Stop internal B2C logic

            // ✅ Native HTML validation
            if (!form.checkValidity()) {
                form.reportValidity(); // show field-level errors
                return;
            }

            console.log("✅ All checks passed. Resuming B2C submission...");

            // 🔥 Remove the blocker listener and click the button to let B2C take over
            continueBtn.removeEventListener('click', handler, true);
            continueBtn.click(); // 👈 this triggers B2C’s real submission flow
        };

        // Attach your handler using capture
        continueBtn.addEventListener('click', handler, true);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});