window.onload = function () {
    var wifitimecss = new Date().getHours();
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (wifitimecss > 6 && wifitimecss < 18) {
        document.getElementById("wifitimecss").setAttribute("href", "/index.css");
        themeColorMeta.setAttribute("content", "#ECF1F3");
    } else {
        document.getElementById("wifitimecss").setAttribute("href", "/index-night.css?t=" + Date.now());
        setTimeout(function() {
            themeColorMeta.setAttribute("content", "#080C0F");
        }, 1000);
    }
}
