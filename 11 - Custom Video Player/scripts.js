// 获取元素
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');

/* 处理函数 */
// 播放/暂停切换
const togglePlay = function () {
    // 利用video.paused判断视频是否播放
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    // 三元运算简化
    // video.paused ? video.play() : video.pause();
    // 利用计算值属性执行方法
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// 播放图标切换
const updateButton = function () {
    const icon = video.paused ? '<ion-icon name="play"></ion-icon>' : '<ion-icon name="pause"></ion-icon>';
    // console.log(icon);
    toggle.innerHTML = icon;
}

// 快退/快进
const skip = function () {
    video.currentTime += parseFloat(this.dataset.skip);
}

// 音量和播放速度
const rangesChange = function () {
    video[this.name] = this.value;
    console.log(`${this.name} : ${this.value}`);
}

// 进度条
const progressChange = function () {
    const persent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${persent}%`;
}

// 点击进度条跳转进度
const progressClick = function (e) {
    // 拖动时 this.offsetWidth 为 undefined ！
    // console.log(e.offsetX, this.offsetWidth, progress.offsetWidth);
    const position = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = position;
}

/* 绑定事件 */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
// 进度条
//      利用video的timeupdate事件实现进度条变化
video.addEventListener('timeupdate', progressChange)

// 播放图标切换
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(item => item.addEventListener('click', skip))

// 音量和播放速度
ranges.forEach(item => item.addEventListener('input', rangesChange))

// 点击进度条
let mousedown = false;
progress.addEventListener('click', progressClick)
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mousemove', (e) => mousedown && progressClick(e))
progress.addEventListener('mouseup', () => mousedown = false)