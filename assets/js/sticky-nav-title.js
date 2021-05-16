(function (window, document) {
    // set up Casper as a global object
    if (!window.Casper) {
        window.Casper = {};
    }

    window.Casper.stickyNavTitle = function stickyNavTitle(options) {
        const nav = document.querySelector(options.navSelector);
        const title = document.querySelector(options.titleSelector);

        let lastScrollY = window.scrollY;
        let ticking = false;

        function onScroll() {
            lastScrollY = window.scrollY;
            requestTick();
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(update);
            }
            ticking = true;
        }

        function update() {
            const trigger = title.getBoundingClientRect().top + window.scrollY;
            const triggerOffset = title.offsetHeight + 35;

            // show/hide post title
            if (lastScrollY >= trigger + triggerOffset) {
                nav.classList.add(options.activeClass);
            } else {
                nav.classList.remove(options.activeClass);
            }

            ticking = false;
        }

        window.addEventListener('scroll', onScroll, {passive: true});

        update();
    };
})(window, document);