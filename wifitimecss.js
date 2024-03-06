// window.onload = function () {
// 	var wifitimecss = new Date().getHours();
// 	if (wifitimecss > 6 && wifitimecss < 18) {
// 		document.getElementById("wifitimecss").setAttribute("href", "/index.css?t=" + Date.now())
// 	} else {
// 		document.getElementById("wifitimecss").setAttribute("href", "/index-night.css")
// 	}
// }

window.onload = function () {
    var wifitimecss = new Date().getHours();
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (wifitimecss > 6 && wifitimecss < 18) {
        document.getElementById("wifitimecss").setAttribute("href", "/index.css?t=" + Date.now());
        themeColorMeta.setAttribute("content", "#FFFFFF"); // 例如：#FFFFFF
    } else {
        document.getElementById("wifitimecss").setAttribute("href", "/index-night.css");
        themeColorMeta.setAttribute("content", "#000000"); // 例如：#000000
    }
}