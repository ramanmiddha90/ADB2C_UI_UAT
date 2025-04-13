
    const observer = new MutationObserver(function (mutations, obs) {
        const form = document.querySelector('form');

        if (form) {
            console.log("Form detected, binding submit listener.");
            obs.disconnect();

            // Intercept the form submission directly
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // 🔥 This actually stops B2C submission

                console.log("Submission prevented via form listener.");

                // 🔐 Run your custom validation / logic here
                alert("Form submission is blocked. Run custom logic.");

                // ✅ To manually submit later:
                // form.submit(); // uncomment if needed
            }, true); // Important: use capture phase to override B2C!

        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });