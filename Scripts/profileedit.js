(function onPageReady() {
    var SIGN_IN_POLICY = "B2C_1A_SOLAR_LOGIN";
    var SIGN_UP_POLICY = "B2C_1A_SOLAR_SIGNUP";
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
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

               

                function loadFields() {

                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        var fieldAttr = "." + UXField.Id + "_li";
                        var requiredFieldAttr = "." + UXField.Id + "_required_li";
                        var requiredFieldId = "#" + UXField.Id + "_required";
                        console.log(requiredFieldAttr);
                        if (UXField.Is_Visible) {
                            if (UXField.Is_Req && $(requiredFieldAttr) != null && $(requiredFieldAttr) != undefined && $(requiredFieldAttr).length > 0) {
                                $(fieldAttr).hide();
                                $(requiredFieldAttr).show();
                            }
                            else {
                                $(fieldAttr).show();
                                if ($(requiredFieldAttr).length > 0) {
                                    $(requiredFieldAttr).hide();
                                    if (UXField.InputType == "Dropdown") {
                                        //if dropdwon set default index 1
                                        $(requiredFieldId).get(0).selectedIndex = 1;
                                    }
                                    else {
                                        $(requiredFieldId).val("na");
                                    }
                                }
                            }
                        }
                        else {
                            $(fieldAttr).hide();
                            if ($(requiredFieldAttr).length > 0) {
                                $(requiredFieldAttr).hide();
                                if (UXField.InputType == "Dropdown") {
                                    //if dropdwon set default index 1
                                    $(requiredFieldId).get(0).selectedIndex = 1;
                                }
                                else {
                                    $(requiredFieldId).val("na");
                                }
                            }
                        }
                    });
                }
                function setFieldValues() {
                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        if (UXField.Is_Visible) {
                            var fieldAttr = "#" + UXField.Id;
                            var requiredFieldAttr = "#" + UXField.Id + "_required";

                            if (UXField.Is_Req && $(requiredFieldAttr).is(':visible')) {
                                if (UXField.InputType == "Dropdown") {
                                    $(fieldAttr).val($(requiredFieldAttr).val());
                                    //if dropdwon set default index 1
                                    $(fieldAttr).get(0).selectedIndex = $(requiredFieldAttr).get(0).selectedIndex;
                                }
                                else {
                                    $(fieldAttr).val($(requiredFieldAttr).val());
                                }

                            }
                            else {
                                if ($(requiredFieldAttr).length > 0) {
                                    if (UXField.InputType == "Dropdown") {
                                        //if dropdwon set default index 1
                                        $(requiredFieldAttr).get(0).selectedIndex = 1;
                                    }
                                    else {
                                        $(requiredFieldAttr).val("na");
                                    }
                                }
                            }
                        }
                    });
                }

                function setUIElements() {

                    if ($("#customCancel") && $("#customCancel").is(':visible')) {
                        $("#customCancel").remove();
                    }
                    if ($("#customContinue") && $("#customContinue").is(':visible')) {
                        $("#customContinue").remove();
                    }

                    $("#continue").after("<button id='customCancel'>Cancel</button>");
                    $("#btnReset").click(function (event) {

                        var queryparams = new URLSearchParams(window.location.search);
                        if (queryparams.has("redirect_uri")) {
                            queryparams.set("p", "B2C_1A_PWRESET");
                            window.location.search = queryparams.toString();
                        }
                        else {
                            var redirect_uri = GetParameterValues("redirect_uri");
                            var client_id = GetParameterValues("client_id");
                            var return_url = GetParameterValues("return_url");
                            var originURL = document.domain;
                            var tenantName = originURL.remove(".b2clogin.com") +".onmicrosoft.com";
                            var passwordURL = "https://" + originURL + "/" + tenantName + "/oauth2/v2.0/authorize?p=B2C_1A_pwreset&client_id=" + client_id + "&nonce=defaultNonce&redirect_uri=" + redirect_uri + "&scope=openid&response_type=id_token&UI_Locales=en&return_url=" + return_url;
                            window.location.replace(passwordURL);
                        }
                       
                        //window.location.replace("https://ciamtest01.b2clogin.com/ciamtest01.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_pwreset&client_id=29e8b168-9946-4c79-89d3-215c9f55cff7&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login&countryCode=US&UI_Locales=en&return_url=aHR0cHM6Ly91YXQuc29sYXIubXktc2FuZG96LmNvbS8=&Version=2");
                    });
                    $("#btnConsent").click(function () {

                        var portalURL = $("#passwordResetPortalUserURl").val();

                        if (portalURL != null && portalURL != undefined)
                            window.location.replace(portalURL);
                    });

                    $("#continue").after("<button id='customContinue'>Continue</button>");
                    $("#continue").hide();
                    $("#customCancel").text($("#cancel").text())
                    $("#customContinue").text($("#continue").text())
                }
                function AttachCancelEvent() {
                    $("#customCancel").click(function (e) {
                        var returnUrl = GetParameterValues('return_url'); //Encoded value FE URL
                        if (returnUrl == null)
                            returnUrl = "";
                        var redirectURI = GetParameterValues('redirect_uri');
                        var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_466:" + returnUrl;
                        window.location.replace(url);
                        e.stopPropagation();
                    });
                }
                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    loadFields();
                    setUIElements();
                    AttachCancelEvent();

                    $("#customContinue").click(function (e) {
                        setFieldValues();
                        $("#continue").click();
                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());