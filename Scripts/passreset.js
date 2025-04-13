window.onload = function () {
    // Wait until the form is rendered by B2C
    setTimeout(function () {
        const form = document.querySelector('form');
        const continueBtn = document.querySelector('button[id^="continue"]');

        if (form && continueBtn) {
            continueBtn.onclick = function (e) {
                e.preventDefault(); // Prevent default B2C submission

                const passwordInput = document.querySelector('input[type="password"]');
                const password = passwordInput ? passwordInput.value : '';

                // Your custom password validation
                const passwordIsValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

                if (!passwordIsValid) {
                    alert("Password must be at least 8 characters long and include one uppercase letter and one number.");
                    return; // Don't submit
                }

                // Optionally, also trigger B2C's HTML5 validation
                if (form.checkValidity()) {
                    alert("invalidForm");
                } else {
                    alert("validform");
                    form.reportValidity();
                }
            };
        }
    }, 500); // wait for B2C to inject the DOM
};