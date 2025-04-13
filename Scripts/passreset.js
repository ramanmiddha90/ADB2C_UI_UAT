window.onload = function () {
    document.addEventListener("DOMContentLoaded", function () {
        const observer = new MutationObserver(function (mutations, obs) {
            // Try to find the button by ID
            const continueBtn = document.querySelector('#continue')
                || document.querySelector('button[id^="continue"]')
                || document.querySelector('button[type="submit"]'); // fallback

            debugger;
            if (continueBtn) {
                console.log("Continue button detected.");

                // Stop observing once the button is found
                obs.disconnect();

                // Override the click behavior
                continueBtn.onclick = function (e) {
                    e.preventDefault(); // ❌ Prevent default B2C submission
                    console.log("B2C submission blocked.");

                    // ✅ Custom logic here
                    alert("Custom logic before form submission");

                    //// ✅ Optional: Submit manually after checks
                    //const form = document.querySelector('form');
                    //if (form && form.checkValidity()) {
                    //    form.submit();
                    //} else {
                    //    form?.reportValidity();
                    //}
                };
            }
        });

        // Observe body changes — B2C injects the form and button dynamically
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};