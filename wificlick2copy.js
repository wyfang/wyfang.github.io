function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

document.querySelectorAll('[wificlick2copy]').forEach(function(element) {
    element.addEventListener('click', function() {
      var text = this.getAttribute('wificlick2copy');
      copyTextToClipboard(text);
    });
  });

