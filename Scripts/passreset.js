
        // Ensure B2C API is available
    function waitForB2CApi(callback) {
            if (window.api && window.api.selfasserted) {
        callback();
            } else {
        setTimeout(() => waitForB2CApi(callback), 100);
            }
        }

    // Main initialization
    document.addEventListener('DOMContentLoaded', function() {
        waitForB2CApi(function () {
            try {
                // 1. Disable auto-redirect
                api.selfasserted.setContinueOnSuccess(false);

                // 2. Handle form submission
                api.selfasserted.on('afterSubmit', function () {
                   alert("dd")
                });

                // 4. Error handling
                api.selfasserted.on('afterError', function (error) {
                    console.error('Password reset error:', error);
                });
            } catch (e) {
                console.error('API initialization failed:', e);
                // Fallback to default behavior
                if (api.selfasserted) {
                    api.selfasserted.setContinueOnSuccess(true);
                }
            }
        });
        });




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
    const continueBtn = document.querySelector('#continue')
        || document.querySelector('button[type="submit"]');

    if (form && continueBtn) {
        console.log("✅ Form and continue button found.");
        obs.disconnect();

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