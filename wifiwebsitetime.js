(function () {
    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
    const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

    function padZero(data) {
        return data < 10 ? '0' + data : data.toString();
    }

    // 判断是否为闰年
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // 计算两个日期之间的闰年数量
    function getLeapYearCount(startDate, endDate) {
        let leapYears = 0;
        for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
            if (isLeapYear(year)) {
                // 确保闰年2月29日在日期范围内
                const leapDay = new Date(Date.UTC(year, 1, 29));
                if (leapDay >= startDate && leapDay <= endDate) {
                    leapYears++;
                }
            }
        }
        return leapYears;
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

        // 处理负数情况，考虑闰年
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
            // 获取上个月的天数，考虑闰年
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // 调整天数以考虑闰年
        const leapDays = getLeapYearCount(startDate, now);
        days += leapDays;

        return [years, days, hours, minutes, seconds];
    }

    // 计算成为百年老站还需要的时间
    function calculateYearsToCentenary() {
        const now = new Date();
        const startDate = new Date(Date.UTC(2011, 8, 20, 11, 13, 32));
        const centenaryDate = new Date(startDate.getTime());
        centenaryDate.setFullYear(startDate.getFullYear() + 100);

        // 计算精确的时间差，考虑闰年
        const timeDiff = centenaryDate.getTime() - now.getTime();
        const daysToCentenary = Math.floor(timeDiff / (1000 * SECONDS_PER_DAY));

        // 考虑闰年的影响
        const leapYears = getLeapYearCount(now, centenaryDate);
        const yearsToCentenary = Math.floor((daysToCentenary - leapYears) / 365);

        return padZero(yearsToCentenary);
    }

    // 更新运行时间
    function updateElapsedTime() {
        const startDate = new Date(Date.UTC(2011, 8, 20, 11, 13, 32));
        const elapsedTime = calculateTimeDifference(startDate);
        const elapsedTimeHtml = `<span class="num">${elapsedTime[0]}</span>年<span class="num">${elapsedTime[1]}</span>天<span class="num">${padZero(elapsedTime[2])}</span>时<span class="num">${padZero(elapsedTime[3])}</span>分<span class="num">${padZero(elapsedTime[4])}</span>秒`;

        const timeElement = document.getElementById("htmer_time");
        if (timeElement) {
            timeElement.innerHTML = elapsedTimeHtml;  // 注意这里使用 innerHTML 而不是 textContent
        }
    }

    // 初始化
    const yearsElement = document.getElementById('htmer_time2');
    if (yearsElement) {
        yearsElement.innerHTML = `<span class="num">${calculateYearsToCentenary()}</span>`;
    }

    // 定时更新
    setInterval(updateElapsedTime, 1000);
})();