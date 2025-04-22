
// tabIndex =0 - PE
// tabIndex =1 - PR
function HandleTabEvents(tabIndex = 1) {
    if (tabIndex == 1) {
        // Remove 'active' class from first tab and pane
        $('#myTab li').removeClass('active');
        $('.tab-pane').removeClass('active in');
        // Add 'active' to the second tab and pane
        $('#myTab li:eq(1)').addClass('active');
        $('#passwordReset').addClass('active in');
    }

    $("#home-tab").click(function (e) {
        e.preventDefault();                      // Stop default
        e.stopImmediatePropagation(); // Stop internal B2C logic
    });
}
