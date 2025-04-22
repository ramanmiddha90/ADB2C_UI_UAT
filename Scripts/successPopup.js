(function onPageReady() {

    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                if (bootstrap) {
                    clearInterval(intervalHandle);
                    const modal = new bootstrap.Modal(document.getElementById('successModal'));
                    modal.show();
                }
            }
        }, 50);
});

const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector('form');
    if (form) {
        obs.disconnect();
        // Auto-show the modal on page load
        
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});