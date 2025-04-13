﻿(function onPageReady() {
    var SIGN_IN_POLICY = "B2C_1A_SOLAR_LOGIN";
    var SIGN_UP_POLICY = "B2C_1A_SOLAR_SIGNUP";
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    loadFields();
                    setUIElements();
                  

                    $("#customContinue").click(function (e) {
                        setFieldValues();
                        $("#continue").click();
                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());


function GetParameterValues(param) {
    if (document.referrer != undefined) {
        var url = document.referrer.slice(document.referrer.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                return urlparam[1];
            }

        }
    }
    var currentURL = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < currentURL.length; i++) {
        var currentURLParams = currentURL[i].split('=');
        if (currentURLParams[0].toUpperCase() == param.toUpperCase()) {
            return currentURLParams[1];
        }

    }
    return null;
};

function SetUIElements() {

    $("#btnReset").click(function (event) {

        var queryparams = new URLSearchParams(window.location.search);
        if (queryparams.has("redirect_uri")) {
            queryparams.set("p", "B2C_1A_PWRESET");
            window.location.replace(window.location.origin + window.location.pathname + "?" + queryparams.toString())
        }
        else {
            var redirect_uri = GetParameterValues("redirect_uri");
            var client_id = GetParameterValues("client_id");
            var return_url = GetParameterValues("return_url");
            var originURL = document.domain;
            var tenantName = originURL.replace(".b2clogin.com", "") + ".onmicrosoft.com";
            var passwordURL = "https://" + originURL + "/" + tenantName + "/oauth2/v2.0/authorize?p=B2C_1A_pwreset&client_id=" + client_id + "&nonce=defaultNonce&redirect_uri=" + redirect_uri + "&scope=openid&response_type=id_token&UI_Locales=en&return_url=" + return_url;
            window.location.replace(passwordURL);
        }
    });
    $("#btnConsent").click(function (e) {
        $("#lbl_pitcherURLError").hide();
        var portalURL = $("#passwordResetPortalUserURl").val();

        if (portalURL != null && portalURL != undefined && portalURL != "")
            window.location.replace(portalURL);
        else {
            $("#lbl_pitcherURLError").show();
            e.preventDefault();
        }
    });
}

function LoadFields() {

    var fieldInfo = $.parseJSON($("#FieldInfo").val());
    fieldInfo.Fields_Info.forEach(function (UXField) {
        var fieldAttr = "." + UXField.Id + "_li";
        var fieldAttrLabelId = "#" + UXField.Id + "_label";

        if (UXField.Is_Visible) {
            if (UXField.Is_Req) {
                let objIndex = SA_FIELDS.AttributeFields.findIndex(
                    (obj) => obj.ID == UXField.Id
                );
                if (objIndex >= 0) {
                    //Update object's name property.
                    SA_FIELDS.AttributeFields[objIndex].IS_REQ = true;
                    $(fieldAttrLabelId).text($(fieldAttrLabelId).text() + "*");
                }
            }
            else {
                $(fieldAttr).show();

            }
        }
        else {
            $(fieldAttr).hide();
        }
    });
}


const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector('form');
    const cancelBtn = document.querySelector('#cancel');
    const continueBtn = document.querySelector('#continue')
        || document.querySelector('button[type="submit"]');

    if (form && continueBtn) {

      
        console.log("✅ Form and continue button found.");
        obs.disconnect();

        const cancelHandler=function(e)
        {
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation(); // Stop internal B2C logic

            var returnUrl = GetParameterValues('return_url'); //Encoded value FE URL
            if (returnUrl == null)
                returnUrl = "";
            var redirectURI = GetParameterValues('redirect_uri');
            var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_476:" + returnUrl;
            window.location.replace(url);
        }

        // Replace default click behavior
        const handler = function (e) {
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation();            // Stop internal B2C logic

            // ✅ Native HTML validation
            if (!form.checkValidity()) {
                form.reportValidity(); // show field-level errors
                return;
            }
            alert("profile edit cancel clicked")
            //call ajax api call here
            console.log("✅ All checks passed. Resuming B2C submission...");

           
        };

        // Attach your handler using capture
        continueBtn.addEventListener('click', handler, true);
        cancelBtn.addEventListener('click', cancelHandler, true);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

//  Remove the blocker listener and click the button to let B2C take over
//continueBtn.removeEventListener('click', handler, true);
//continueBtn.click(); // this triggers B2C’s real submission flow