const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video :true, audio:false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play()
        }).
        catch(err => {
            console.error(`OH NO!!!`, err);
        });
}

function paintToCanvas(){
    // setup the size of the canvas
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width,height)
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);
    
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
    
        // pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
      }, 30);
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'goodlooking');
    link.innerHTML = `<img src="${data}" alt="Good" />`
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);