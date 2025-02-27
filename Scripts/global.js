function LoadSpinner() {
    $('body').prepend('<div class="backdrop"></div>');
    $('form').prepend('<div id="custom_loader_container" class="verifying-modal"><div id="custom_text">Please wait while it loads</div></div>');
}

LoadSpinner();