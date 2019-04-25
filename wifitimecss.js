window.onload = function () {
	var wifitimecss = new Date().getHours();
	if (wifitimecss > 6 && wifitimecss < 18) {
		document.getElementById("wifitimecss").setAttribute("href", "/index.css?t=" + Date.now())
	} else {
		document.getElementById("wifitimecss").setAttribute("href", "/index-night.css")
	}
}
