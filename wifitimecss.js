window.onload = function () {
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    var darkModeToggle = document.getElementById("darkModeToggle");
    var isDarkMode = false; // 初始值设置为false
    var userToggled = false; // 用户是否切换了主题

    // 设置主题
    function setTheme(isDark) {
        var cssLink = document.getElementById("wifitimecss");
        if (isDark) {
            cssLink.setAttribute("href", "index-night.css");
            setTimeout(function() {
                themeColorMeta.setAttribute("content", "#080C0F");
            }, 1000);
            darkModeToggle.textContent = "LIGHT MODE";
        } else {
            cssLink.setAttribute("href", "index.css");
            themeColorMeta.setAttribute("content", "#ECF1F3");
            darkModeToggle.textContent = "DARK MODE";
        }
    }

    // 检查时间并更新主题
    function checkTimeAndUpdateTheme() {
        if (!userToggled) { // 只有当用户没有切换主题时才自动更新
            var wifitimecss = new Date().getHours();
            isDarkMode = !(wifitimecss > 6 && wifitimecss < 18);
            setTheme(isDarkMode);
        }
    }

    // 初始化主题
    checkTimeAndUpdateTheme();

    // 点击切换模式
    darkModeToggle.onclick = function() {
        isDarkMode = !isDarkMode; // 切换模式
        userToggled = true; // 用户已切换主题
        setTheme(isDarkMode);
    };

    // 检查时间并更新主题
    setInterval(checkTimeAndUpdateTheme, 1000);
};
