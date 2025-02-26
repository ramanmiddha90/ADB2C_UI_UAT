//signin.html;
(function onPageReady() {
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {

                var SetInvitationElements = function () {

                    $("#signInName").on("change paste keyup", function () {
                        //console.log($(this).val());
                        $("#CurrentSignInStatus").val("NF");
                        $("#invitationCode").hide();
                    });

                    var targetNode = document.getElementById('claimVerificationServerError');
                    //debugger;
                    $("#divInvitationCode").hide();
                    var observer = new MutationObserver(function () {
                        if (targetNode.style.display != 'none') {
                            //debugger;

                            var errorCode = GetCancelCodeBasedOnMessage();
                            $("#attributeList").after($("#claimVerificationServerError"))
                            if (errorCode == "461") {
                                $("#invitationCode").val("");
                                $("#invitationCode").show();
                                //$("#claimVerificationServerError").after($("#invitationCode"));
                                $("#CurrentSignInStatus").val("AI");
                            }

                        }
                        else {
                            /* $("#CurrentSignInStatus").val("NF");*/
                            //$("#invitationCode").hide();
                        }
                    });
                    observer.observe(targetNode, { attributes: true, childList: true });
                };

                function SetUILabels() {
                    try {
                        if ($("#ErrorMappings") != null) {

                            var UI_Locales = $.parseJSON($("#ErrorMappings").val());
                            UI_Locales.StatusMapping.forEach(function (UIElementConfig) {
                                if (UIElementConfig.Type && UIElementConfig.Type == "label")
                                {
                                    //code is id
                                    var currentElement = $("#"+UIElementConfig.Code);
                                    if (currentElement) {
                                        currentElement.html(UIElementConfig.Text);
                                    }

                                }
                            });
                        }
                    }
                    catch {
                        
                    }
                }
                function GetCancelCodeBasedOnMessage() {
                    var errorCode = 999;
                    if ($("#ErrorMappings") != null) {

                        var UI_Locales = $.parseJSON($("#ErrorMappings").val());
                        var currentErrorMessage = $("#claimVerificationServerError")?.text();
                        if (currentErrorMessage) {

                            UI_Locales.StatusMapping.forEach(function (error) {

                                if (error.Message!=undefined && error.Message == currentErrorMessage) {
                                    errorCode = error.Code;
                                    return false;
                                }
                            });
                        }
                    }
                    return errorCode;
                };


                function AddPasswordResetLink() {

                }
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
                var BindIDPEvent = function () {
                    $("#NovartisExchange").click(function (event) {

                        var queryparams = new URLSearchParams(window.location.search);
                        queryparams.set("p", "B2C_1A_SANDOZ_IDP_LOGIN");
                        window.location.search = queryparams.toString();
                    });
                    $("#resetPassword").click(function (event) {

                        var queryparams = new URLSearchParams(window.location.search);
                        queryparams.set("p", "B2C_1A_PWRESET");
                        window.location.search = queryparams.toString();
                    });
                };
                var setCustomLabels = function () {
                    SetUILabels();
                    $("#customCancel").text($("#cancel").text())

                    if ($("#api"))
                        $("#api > .intro:eq(0) ").before("<div class='pageheader intropageheader intro'><p id='intropageheader_lbl'>Login</p></div>");

                };
                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    //AddPasswordResetLink();
                    if ($("#CurrentSignInStatus")) {
                        $("#CurrentSignInStatus").val("NF");
                    }
                    if ($("#customCancel") && $("#customCancel").is(':visible')) {
                        $("#customCancel").remove();
                    }

                    $("#continue").after("<button id='customCancel'>Cancel</button>");
                    $(".password_li").filter(":last").append("<div class='forgot-password center-height'><a id='resetPassword' href='javascript:undefined'>Forgot your password?</a></div>");

                    setCustomLabels();

                    $("#customCancel").click(function () {
                        //debugger;
                        var errorCode = GetCancelCodeBasedOnMessage();
                        var redirectURL = GetParameterValues('return_url'); //Encoded value FE URL
                        if (redirectURL == null)
                            redirectURL = "";
                        //microsoft redirecturl
                        var redirectURI = GetParameterValues('redirect_uri');
                        //var url = decodeURIComponent(redirectURI) + "#error=" + errorCode + ":" + redirectURL;
                        var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_" + errorCode + ":" + redirectURL;
                        window.location.replace(url);


                    });

                    SetInvitationElements();
                    BindIDPEvent();
                    clearInterval(intervalHandle);


                }
            }
        }, 50);
}());