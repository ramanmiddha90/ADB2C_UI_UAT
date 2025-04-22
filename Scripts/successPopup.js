
// Ensure B2C API is available



$(document).ready(function () {
    // Remove 'active' class from first tab and pane
    $('#myTab li').removeClass('active');
    $('.tab-pane').removeClass('active in');

    // Add 'active' to the second tab and pane
    $('#myTab li:eq(1)').addClass('active');
    $('#passwordReset').addClass('active in');

    $("#home-tab").click(function (e) {
        e.preventDefault();                      // Stop default
        e.stopImmediatePropagation(); // Stop internal B2C logic
        alert("tab clicked");
    });

});

const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector('form');
    if (form) {
        obs.disconnect();
        // Auto-show the modal on page load
        if (bootstrap) {
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});