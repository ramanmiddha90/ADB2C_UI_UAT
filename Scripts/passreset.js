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
            if (typeof window['Login'] === 'function') {
                window['Login']();
            } else if (typeof window['__doPostBack'] === 'function') {
                window['__doPostBack'](); // fallback
            } else {
                alert("❌ Could not find B2C submit handler.");
            }
        }, true); // Use capture phase
    }
});

// Start observing body changes immediately
observer.observe(document.body, {
    childList: true,
    subtree: true
});