function countDown() {
    var nowtime = +new Date();
    var inputTime = new Date('2112,08,27 11:13:32');
    var times = (inputTime - nowtime) / 1000; //秒
    var y = parseInt(times / 60 / 60 / 24 / 365);
    y = y < 10 ? '0' + y : y;

    return y + '年';
}
var years = document.getElementById('htmer_time2');
years.innerText = countDown();