const observer = new MutationObserver(function (mutations, obs) {
    const continueBtn = document.querySelector('#continue')
        || document.querySelector('button[type="submit"]')
        || document.querySelector('button');

    if (continueBtn) {
        console.log("✅ Continue button found");

        obs.disconnect();

        // Disable the button immediately to stop B2C JS postback
        continueBtn.addEventListener('click', function (e) {
            console.log("🚫 Blocking B2C submission");

            e.preventDefault(); // This alone is NOT enough
            e.stopImmediatePropagation(); // 🔥 Stop all other listeners

            // 🔐 Your logic here
            alert("Form submission blocked for custom logic");

            // Optional: re-enable and manually submit if needed
            // document.querySelector('form')?.submit();
        }, true); // Capture phase
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});