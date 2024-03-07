// window.onload = function () {
//     var wifitimecss = new Date().getHours();
//     var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
//     if (wifitimecss > 6 && wifitimecss < 18) {
//         document.getElementById("wifitimecss").setAttribute("href", "/index.css");
//         themeColorMeta.setAttribute("content", "#ECF1F3");
//     } else {
//         document.getElementById("wifitimecss").setAttribute("href", "/index-night.css?t=" + Date.now());
//         setTimeout(function() {
//             themeColorMeta.setAttribute("content", "#080C0F");
//         }, 1000);
//     }
// }

window.onload = function () {
    var wifitimecss = new Date().getHours();
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    var darkModeToggle = document.getElementById("darkModeToggle");
    var isDarkMode = !(wifitimecss > 6 && wifitimecss < 18); // 初始暗色模式状态
    // 设置初始主题
    function setTheme(isDark) {
        console.log('Setting theme. Dark mode:', isDark); // 调试输出
        if (isDark) {
            document.getElementById("wifitimecss").setAttribute("href", "index-night.css?t=" + Date.now());
            setTimeout(function() {
                themeColorMeta.setAttribute("content", "#080C0F");
            }, 1000);
            darkModeToggle.textContent = "Light Mode";
        } else {
            document.getElementById("wifitimecss").setAttribute("href", "index.css");
            themeColorMeta.setAttribute("content", "#ECF1F3");
            darkModeToggle.textContent = "Dark Mode";
        }
    }
    // 初始化主题
    setTheme(isDarkMode);
    // 点击切换模式
    darkModeToggle.onclick = function() {
        console.log('Toggle clicked. Current dark mode:', isDarkMode); // 调试输出
        isDarkMode = !isDarkMode; // 切换模式
        setTheme(isDarkMode);
    };
}