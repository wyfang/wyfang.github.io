(function () {
    var page = document.documentElement;
    page.classList.add('wifi-background-loading');

    function initBackground() {
        var background = document.querySelector('[data-wifi-background]');
        var backgroundImage = background && background.querySelector('.wifi-background__image');
        var scrollEffects = document.querySelector('[data-wifi-scroll-effects]');
        var frameId = null;

        function revealBackground() {
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    page.classList.remove('wifi-background-loading');
                    page.classList.add('wifi-background-visible');
                });
            });
        }

        if (!backgroundImage || backgroundImage.complete) {
            revealBackground();
        } else {
            backgroundImage.addEventListener('load', revealBackground, { once: true });
            backgroundImage.addEventListener('error', revealBackground, { once: true });
        }

        if (!scrollEffects) {
            return;
        }

        function updateScrollEffects() {
            var scrollingElement = document.scrollingElement || document.documentElement;
            var scrollTop = Math.max(0, scrollingElement.scrollTop || window.scrollY || 0);
            var viewportHeight = document.documentElement.clientHeight;
            var documentHeight = Math.max(
                scrollingElement.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            var maxScrollTop = Math.max(0, documentHeight - viewportHeight);
            var edgeThreshold = 2;

            scrollEffects.classList.toggle('has-scroll-above', scrollTop > edgeThreshold);
            scrollEffects.classList.toggle(
                'has-scroll-below',
                maxScrollTop - scrollTop > edgeThreshold
            );
            frameId = null;
        }

        function requestScrollUpdate() {
            if (frameId === null) {
                frameId = window.requestAnimationFrame(updateScrollEffects);
            }
        }

        updateScrollEffects();
        window.requestAnimationFrame(function () {
            scrollEffects.classList.add('is-ready');
        });

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
        window.addEventListener('resize', requestScrollUpdate, { passive: true });
        window.addEventListener('orientationchange', requestScrollUpdate, { passive: true });
        window.addEventListener('pageshow', requestScrollUpdate);

        if ('ResizeObserver' in window) {
            new ResizeObserver(requestScrollUpdate).observe(document.body);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackground, { once: true });
    } else {
        initBackground();
    }
})();
