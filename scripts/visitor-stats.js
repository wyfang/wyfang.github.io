window.addEventListener('load', function () {
    // 提取并替换小部件内容的函数
    function extractAndReplaceWidgetContent() {
        var widget = document.querySelector('#custom-widget .la-widget');
        if (widget) {
            var stats = {
                '今日访问人数': '',
                '今日访问量': '',
                '昨日访问人数': '',
                '昨日访问量': '',
                '本月访问量': '',
                '总访问量': ''
            };

            widget.querySelectorAll('span').forEach(function (span) {
                var spanText = span.textContent.trim().replace(/\s+/g, ' '); // 去掉多余空格

                // 匹配并提取统计信息
                Object.keys(stats).forEach(function (key) {
                    var regex = new RegExp(key + '\\s*(\\d+[\\,\\d]*)');
                    var match = spanText.match(regex);
                    if (match) {
                        stats[key] = match[1];
                    }
                });
            });

            // 在获取到“总访问量”数据后进行加 97774 操作-验证OK
            if (stats['总访问量']) {
                // 去掉数字中的逗号并转为整数，进行加法运算后再加回逗号
                let total = stats['总访问量'].replace(/,/g, ''); // 去除逗号
                total = parseInt(total, 10) + 97774;  // 加上 97774
                stats['总访问量'] = total.toLocaleString(); // 转回带逗号的格式
            }
            // 在获取到“总访问量”数据后进行加 97774 操作-验证OK

            // 生成最终的文本内容，每个统计项之间添加两个不间断空格
            var textContent = '';
            Object.keys(stats).forEach(function (key) {
                if (stats[key]) {
                    textContent += key + stats[key] + '&nbsp;&nbsp;';
                }
            });

            // 创建一个新的 div 元素替换原有小部件内容
            var newContent = document.createElement('div');
            newContent.innerHTML = textContent.trim(); // 去掉末尾多余的空格

            // 替换原有小部件内容
            var customWidget = document.getElementById('custom-widget');
            customWidget.innerHTML = '';
            customWidget.appendChild(newContent);
        }
    }

    // 使用 MutationObserver 监控 la-widget 的加载状态
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1 && node.classList.contains('la-widget')) {
                        // 小部件加载完成后提取并替换内容
                        extractAndReplaceWidgetContent();
                    }
                });
            }
        });
    });

    // 监听整个文档的变化
    observer.observe(document, { childList: true, subtree: true });

    // 页面加载完成后直接执行一次提取操作
    extractAndReplaceWidgetContent();

    // 去除#custom-widget的display:none样式
    var customWidget = document.getElementById('custom-widget');
    if (customWidget) {
        customWidget.style.display = '';
    }
});
