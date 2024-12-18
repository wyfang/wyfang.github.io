(function() {
    // 常量定义
    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
    const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

    // 补零函数
    function padZero(data) {
        return data < 10 ? '0' + data : data.toString();
    }

    // 精确计算时间差的函数
    function calculateTimeDifference(startDate) {
        const now = new Date();
        
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        // 处理负数情况
        if (seconds < 0) {
            minutes--;
            seconds += 60;
        }
        if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        if (hours < 0) {
            days--;
            hours += 24;
        }
        if (days < 0) {
            months--;
            // 计算上一个月的天数
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return [years, days, hours, minutes, seconds];
    }

    // 更新运行时间
    function updateElapsedTime() {
        const startDate = new Date(Date.UTC(2011, 8, 20, 11, 13, 32));
        const elapsedTime = calculateTimeDifference(startDate);
        const elapsedTimeHtml = `${elapsedTime[0]}年${elapsedTime[1]}天${padZero(elapsedTime[2])}时${padZero(elapsedTime[3])}分${padZero(elapsedTime[4])}秒`;
        
        const timeElement = document.getElementById("htmer_time");
        if (timeElement) {
            timeElement.textContent = elapsedTimeHtml;
        }
    }

    // 计算成为百年老站还需要的时间
    function calculateYearsToCentenary() {
        const now = new Date();
        const centenaryDate = new Date(Date.UTC(2112, 7, 27, 11, 13, 32));
        const timeToCentenaryInSeconds = (centenaryDate.getTime() - now.getTime()) / 1000;
        const yearsToCentenary = Math.floor(timeToCentenaryInSeconds / (SECONDS_PER_DAY * 365));
        return padZero(yearsToCentenary);
    }

    // 初始化
    updateElapsedTime();
    const yearsElement = document.getElementById('htmer_time2');
    if (yearsElement) {
        yearsElement.textContent = calculateYearsToCentenary();
    }

    // 定时更新
    setInterval(updateElapsedTime, 1000);
})();