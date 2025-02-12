(function onPageReady() {
    var SIGN_IN_POLICY = "B2C_1A_SOLAR_LOGIN";
    var SIGN_UP_POLICY = "B2C_1A_SOLAR_SIGNUP";
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                function GetParameterValues(param) {
                    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                            return urlparam[1];
                        }

                    }
                    return null;
                };

                function GetRedirectURLFromReferrer(param) {
                    var url = document.referrer.slice(document.referrer.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                            return urlparam[1];
                        }

                    }
                    return null;
                }

                function loadFields() {

                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        var fieldAttr = "." + UXField.Id + "_li";
                       
                        if (UXField.Is_Visible) {
                            if (UXField.Is_Req) {
                                let objIndex = SA_FIELDS.AttributeFields.findIndex(
                                    (obj) => obj.ID == UXField.Id
                                );
                                if (objIndex >= 0) {
                                    //Update object's name property.
                                    SA_FIELDS.AttributeFields[objIndex].IS_REQ = true;
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

                function IsSignInFlow() {
                    if (window.location.href.includes(SIGN_IN_POLICY))
                        return true;

                    return false;
                }
                function setUIElements() {

                    if ($("#customCancel") && $("#customCancel").is(':visible')) {
                        $("#customCancel").remove();
                    }
                    if ($("#customContinue") && $("#customContinue").is(':visible')) {
                        $("#customContinue").remove();
                    }

                    $("#continue").after("<button id='customCancel'>Cancel</button>");

                    if ($(".FieldInfo_li"))
                        $(".FieldInfo_li").after("<li class='TextBox scoutUserFirstName_li'><div class='intro'><p id='personalInfo_lbl' class='customLabelIntro'>Personal Information</p></div></li>");
                    if ($(".email_li"))
                        $(".email_li").before("<li class='TextBox'><div class='intro'><p id='introaccountheader_lbl' class='customLabelIntro'>Account Details</p></div></li>");

                    if ($(".intro"))
                        $(".intro").before("<div class='pageheader intro'><p id='intropageheader_lbl' class=''>Register to Customer Connect</p></div>");

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
                        var redirectURI = "";
                        if (IsSignInFlow()) {
                            redirectURI = GetRedirectURLFromReferrer('redirect_uri');
                        }
                        else {
                            redirectURI = GetParameterValues('redirect_uri');

                        }
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
                        // setFieldValues();
                        $("#continue").click();
                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());