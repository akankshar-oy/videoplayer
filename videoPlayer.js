document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoInput = document.getElementById('videoInput');
    const leftControl = document.getElementById('leftControl');
    const middleControl = document.getElementById('middleControl');
    const rightControl = document.getElementById('rightControl');

    // Load video from input
    videoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            document.getElementById('videoSource').src = url;
            videoPlayer.load();
        }
    });

    // Gesture controls
    let pressTimer = null;

    // Double tap to move 10 seconds forward
    rightControl.addEventListener('dblclick', () => {
        videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 10);
    });

    // Double tap to move 5 seconds backward
    leftControl.addEventListener('dblclick', () => {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 5);
    });

    // Double tap in the middle to play/pause
    middleControl.addEventListener('dblclick', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    });

    // Press and hold for 3x backward
    leftControl.addEventListener('mousedown', () => {
        pressTimer = setInterval(() => {
            videoPlayer.playbackRate = 3;
            videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 0.2);
        }, 100);
    });

    leftControl.addEventListener('mouseup', () => {
        clearInterval(pressTimer);
        videoPlayer.playbackRate = 1;
    });

    leftControl.addEventListener('mouseleave', () => {
        clearInterval(pressTimer);
        videoPlayer.playbackRate = 1;
    });

    // Press and hold for 2x forward
    rightControl.addEventListener('mousedown', () => {
        pressTimer = setInterval(() => {
            videoPlayer.playbackRate = 2;
            videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 0.2);
        }, 100);
    });

    rightControl.addEventListener('mouseup', () => {
        clearInterval(pressTimer);
        videoPlayer.playbackRate = 1;
    });

    rightControl.addEventListener('mouseleave', () => {
        clearInterval(pressTimer);
        videoPlayer.playbackRate = 1;
    });
});
