(function () {
    var root = document.documentElement;
    var darkModeToggle = null;
    var isDarkMode = false;
    var userToggled = false;
    var transitionTimer = null;
    var THEME_TRANSITION_MS = 2000;

    function getThemeColorMeta() {
        return document.querySelector('meta[name="theme-color"]');
    }

    function getAutoDarkMode() {
        var hour = new Date().getHours();
        return !(hour > 6 && hour < 18);
    }

    function updateToggleText() {
        if (darkModeToggle) {
            darkModeToggle.textContent = isDarkMode ? "LIGHT MODE" : "DARK MODE";
        }
    }

    function updateThemeColor() {
        var themeColorMeta = getThemeColorMeta();
        if (themeColorMeta) {
            themeColorMeta.setAttribute("content", isDarkMode ? "#080C0F" : "#ECF1F3");
        }
    }

    function setTheme(nextIsDark, shouldAnimate) {
        var themeChanged = root.classList.contains("dark-mode") !== nextIsDark;

        isDarkMode = nextIsDark;

        if (themeChanged && shouldAnimate) {
            root.classList.add("theme-transitioning");
            window.clearTimeout(transitionTimer);
            transitionTimer = window.setTimeout(function () {
                root.classList.remove("theme-transitioning");
            }, THEME_TRANSITION_MS);
        }

        root.classList.toggle("dark-mode", isDarkMode);
        updateThemeColor();
        updateToggleText();
    }

    function checkTimeAndUpdateTheme() {
        if (userToggled) {
            return;
        }

        var nextMode = getAutoDarkMode();
        setTheme(nextMode, nextMode !== isDarkMode);
    }

    function bindToggle() {
        darkModeToggle = document.getElementById("darkModeToggle");

        if (darkModeToggle) {
            darkModeToggle.onclick = function () {
                userToggled = true;
                setTheme(!isDarkMode, true);
            };
        }

        setTheme(isDarkMode, false);
    }

    isDarkMode = getAutoDarkMode();
    setTheme(isDarkMode, false);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindToggle);
    } else {
        bindToggle();
    }

    window.setInterval(checkTimeAndUpdateTheme, 1000);
})();
