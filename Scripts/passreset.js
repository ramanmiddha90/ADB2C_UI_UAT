const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector('form');
    const continueBtn = document.querySelector('#continue')
        || document.querySelector('button[type="submit"]');

    if (form && continueBtn) {
        console.log("✅ Form and continue button found.");
        obs.disconnect();

        // Override continue button click
        continueBtn.addEventListener('click', function (e) {
            console.log("🚫 Preventing default B2C submission.");
            e.preventDefault();                      // Stop default
            e.stopImmediatePropagation();            // Stop B2C handlers

            // Check form validity using native HTML5 validation
            if (!form.checkValidity()) {
                console.log("❌ Form is invalid.");
                form.reportValidity(); // Show browser's inline messages
                return;
            }

            //// ✅ Additional custom validation example (optional)
            //const password = document.querySelector('input[type="password"]')?.value || '';
            //if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            //    alert("Password must be at least 8 characters long and include an uppercase letter and a number.");
            //    return;
            //}

            console.log("✅ Form is valid. Submitting manually.");
            const realSubmit = document.querySelector('input[type="submit"][aria-hidden="true"]')
                || document.querySelector('input[type="submit"]:not(#continue)');

            if (realSubmit) {
                realSubmit.click(); // ✅ This triggers B2C's internal flow
                console.log("🚀 Triggered hidden B2C submit");
            } else {
                alert("❌ Could not find hidden submit button. B2C layout may have changed.");
            }
        }, true); // Use capture phase
    }
});

// Start observing body changes immediately
observer.observe(document.body, {
    childList: true,
    subtree: true
});