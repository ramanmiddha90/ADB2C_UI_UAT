const waitForSelfAsserted = setInterval(() => {
    if (typeof selfAsserted !== 'undefined' && typeof selfAsserted.submit === 'function') {
        clearInterval(waitForSelfAsserted);
        console.log("✅ selfAsserted object detected");

        // Store original B2C submit method
        const originalSubmit = selfAsserted.submit;

        // Override submit to run validation before continuing
        selfAsserted.submit = function () {
            console.log("🛑 Intercepted B2C submission");

            const pwd = document.querySelector('input[type="password"]')?.value || '';
            const confirm = document.querySelector('input[id*="ConfirmPassword"]')?.value || '';

            // Simple password validation
            if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd)) {
                alert("❌ Password must have at least 8 characters, one uppercase letter, and one number.");
                return;
            }

            // Confirm password match
            if (confirm && pwd !== confirm) {
                alert("❌ Passwords do not match.");
                return;
            }

            // If all validation passes, submit using B2C’s logic
            console.log("✅ All checks passed. Calling original submit.");
            originalSubmit();
        };
    }
}, 200);