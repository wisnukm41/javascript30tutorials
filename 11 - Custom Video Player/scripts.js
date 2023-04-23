// get reference
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skip = document.querySelectorAll("button[data-skip]");
const slider = document.querySelectorAll("input[type=range]");
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// create functions
function toggleVideo(){
    if(video.paused){
        video.play()
    } else {
        video.pause();
    }
}

function changeToggle(){
    if(video.paused){
        toggle.textContent = '►';
    } else {
        toggle.textContent = '❚ ❚';
    }
}

function skipVideo(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function sliderVideo(){
    video[this.name] = this.value;
}

function updateProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {

    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// attach event
video.addEventListener('click', toggleVideo);
video.addEventListener('play',changeToggle);
video.addEventListener('pause',changeToggle);
video.addEventListener('timeupdate',updateProgress);

toggle.addEventListener('click', toggleVideo);
skip.forEach(e => e.addEventListener('click', skipVideo));
slider.forEach(e => e.addEventListener('click', sliderVideo));
slider.forEach(e => e.addEventListener('mousemove', sliderVideo));

let mouseclick = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {mouseclick && scrub(e)});
progress.addEventListener('mousedown', () => {mouseclick = true});
progress.addEventListener('mouseup', () => {mouseclick = false});
