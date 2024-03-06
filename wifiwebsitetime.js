// 获取当前年份
const currentYear = new Date().getFullYear();

// 获取版权声明的元素
const copyrightElements = document.querySelectorAll('.wifi-copyright');

// 更新版权声明中的年份
copyrightElements.forEach(function(element) {
  element.innerHTML = element.innerHTML.replace('现在', currentYear);
});

// 将常量定义在一个立即执行的函数表达式（IIFE）中，以避免污染全局命名空间
(function() {
    // 常量定义
    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
    const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
    const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365;

    // 补零函数
    function padZero(data) {
        return data < 10 ? '0' + data : data.toString();
    }

    // 秒转换为时间数组
    function convertSecondsToTimeUnits(seconds) {
        let time = [0, 0, 0, 0, 0]; // 年，天，小时，分钟，秒
        time[0] = Math.floor(seconds / SECONDS_PER_YEAR);
        seconds -= time[0] * SECONDS_PER_YEAR;
        time[1] = Math.floor(seconds / SECONDS_PER_DAY);
        seconds -= time[1] * SECONDS_PER_DAY;
        time[2] = Math.floor(seconds / SECONDS_PER_HOUR);
        seconds -= time[2] * SECONDS_PER_HOUR;
        time[3] = Math.floor(seconds / SECONDS_PER_MINUTE);
        seconds -= time[3] * SECONDS_PER_MINUTE;
        time[4] = seconds;
        return time;
    }

    // 更新运行时间
function updateElapsedTime() {
    const createTime = new Date(Date.UTC(2011, 9, 20, 11, 13, 32)).getTime() / 1000;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // 取整到秒
    const elapsedTimeInSeconds = currentTimeInSeconds - createTime;
    const elapsedTime = convertSecondsToTimeUnits(elapsedTimeInSeconds);
    const elapsedTimeHtml = `${elapsedTime[0]}年${elapsedTime[1]}天${padZero(elapsedTime[2])}时${padZero(elapsedTime[3])}分${padZero(elapsedTime[4])}秒`;
    
    const timeElement = document.getElementById("htmer_time");
    if (timeElement) {
        timeElement.textContent = elapsedTimeHtml;
    }
}
updateElapsedTime();
setInterval(updateElapsedTime, 1000);

    // 计算成为百年老站还需要的时间
    function calculateYearsToCentenary() {
        const now = new Date();
        const centenaryDate = new Date('2112-08-27T11:13:32Z');
        const timeToCentenaryInSeconds = (centenaryDate.getTime() - now.getTime()) / 1000;
        const yearsToCentenary = Math.floor(timeToCentenaryInSeconds / SECONDS_PER_YEAR);
        return padZero(yearsToCentenary) + '年';
    }

    const yearsElement = document.getElementById('htmer_time2');
    if (yearsElement) {
        yearsElement.textContent = calculateYearsToCentenary();
    }
})();