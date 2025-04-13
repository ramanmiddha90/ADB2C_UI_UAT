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

            // ✅ Custom password rule
            //const password = document.querySelector('input[type="password"]')?.value || '';
            //if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            //    alert("Password must be at least 8 characters long, include an uppercase letter and a number.");
            //    return;
            //}

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