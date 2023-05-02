const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__controls button')
let count


function countDown(time){

    displayTime(time)

    const now = Date.now();
    const later = now + time * 1000;

    clearInterval(count);

    count = setInterval(()=>{
        const secondsLeft = Math.round((later - Date.now()) / 1000);

        displayTime(secondsLeft)
        if(secondsLeft == 0 ){
            clearInterval(count);
            return;
        }

    }, 1000) 

    displayEndTime(later);
}

function displayTime(seconds){
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    if(hrs > 0) {
        timeLeft.textContent = `${hrs}:${ min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    } else {
        timeLeft.textContent = `${ min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }
}

function displayEndTime(timestamp){
    const timeLeft = new Date(timestamp);
    const hours = timeLeft.getHours();
    const displayHours = hours > 12 ? hours - 12 : hours;
    const minutes = timeLeft.getMinutes();
    
    timeEnd.textContent = `Be Back at ${displayHours}:${minutes < 10 ? '0' + minutes : minutes}`
}

function docountDown(){
    const time = this.dataset.time;
    countDown(time);
}

buttons.forEach(button => button.addEventListener('click', docountDown));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const time = parseInt(this.minutes.value) * 60;
    countDown(time);
    this.reset();
})


