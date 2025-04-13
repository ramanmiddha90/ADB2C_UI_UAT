const observer = new MutationObserver((mutations, obs) => {
    if (typeof selfAsserted !== 'undefined' && selfAsserted.submit) {
        console.log("✅ B2C SelfAsserted object found");

        obs.disconnect();

        // Save original B2C submit handler
        const originalSubmit = selfAsserted.submit;

        // Override it
        selfAsserted.submit = function () {
            console.log("🚫 Custom intercept before submission");

            // Your custom validation logic
            const pwdInput = document.querySelector('input[type="password"]');
            const pwd = pwdInput?.value || '';

            if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd)) {
                alert("❌ Password must have at least 8 characters, one uppercase, and one number.");
                pwdInput?.focus();
                return; // Stop submission
            }

            console.log("✅ Custom validation passed. Submitting via original B2C handler...");
            originalSubmit(); // Proceed with normal B2C orchestration
        };
    }
});

observer.observe(document.body, { childList: true, subtree: true });