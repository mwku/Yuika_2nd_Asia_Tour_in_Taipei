let MusicData={};
let PlayList530 = [];
let PlayList531 = [];
// let isPlaying = false;
let NowPlaying530 = 0;
let NowPlaying531 = 0;
let NowPlaying = "n";
let PlayingAudio530;
let PlayingAudio531;

fetch("./static/json/songlist.json")
    .then(response => response.json())
    .then(data => {
        MusicData = data;
    });

function PlaySong(songID, audioObject=null){
    return new Promise((resolve) => {
        if(audioObject === "530"){
            PlayingAudio530 = new Audio(MusicData[String(songID)][1]);
            PlayingAudio530.play();
            PlayingAudio530.addEventListener('ended', () => {resolve();},{ once: true });
        }else if(audioObject === "531"){
            PlayingAudio531 = new Audio(MusicData[String(songID)][1]);
            PlayingAudio531.play();
            PlayingAudio531.addEventListener('ended', () => {resolve();},{ once: true });
        }
    });
}

function continuePlaying(id){
    console.log("continuePlaying:", id);
    return new Promise((resolve) => {
        if(String(id)==="530"){
            PlayingAudio530.addEventListener('ended', () => resolve(), { once: true });
            PlayingAudio530.play();
        }else if(String(id)==="531"){
            PlayingAudio531.addEventListener('ended', () => resolve(), { once: true });
            PlayingAudio531.play();
        }
    });
}

async function Play(PlayListP){
    
    if(String(PlayListP)==="Setlist530"){
        if(NowPlaying === "530"){
            return;
        }else{

            Stop("Setlist531");

            NowPlaying = "530";
            const element = document.getElementById('play-button-Setlist530');
            // console.log(element)
            element.style.backgroundImage = "url(../../img/pause.png)";
            // element.onclick = () => Stop("Setlist530");
            // const css = window.getComputedStyle(element);
            

            if(PlayingAudio530){
                await continuePlaying("530");
                // PlayingAudio530.play();
            }
            while(NowPlaying === "530"){
                for(let i=NowPlaying530; i<PlayList530.length;i++){
                    console.log("Playing song:", PlayList530[i]);
                    // isPlaying = true;
                    NowPlaying530=i+1;
                    NowPlaying530 = NowPlaying530%PlayList530.length;
                    await PlaySong(PlayList530[i], "530");
                    if(NowPlaying !== "530"){
                        break;
                    }
                }
            }
        }

    }else if(String(PlayListP)==="Setlist531"){
        if(NowPlaying === "531"){
            return;
        }else{
            Stop("Setlist530");
            // if(PlayingAudio530){
            //     PlayingAudio530=null;
            // }
            NowPlaying = "531";
            const element = document.getElementById('play-button-Setlist531');
            // element.onclick = () => Stop("Setlist531");
            element.style.backgroundImage = "url(../../img/pause.png)";

            if(PlayingAudio531){
                await continuePlaying("531");
            }
            while(NowPlaying === "531"){
                for(let i=NowPlaying531; i<PlayList531.length;i++){
                    NowPlaying531=i+1;
                    NowPlaying531 = NowPlaying531%PlayList531.length;
                    // isPlaying = true;
                    await PlaySong(PlayList531[i], "531");
                    if(NowPlaying !== "531"){
                        break;
                    }
                    
                }
            }
        }
    }
}
function Stop(PlayListP){
    if(String(PlayListP)==="Setlist530"){
        if(PlayingAudio530){
            PlayingAudio530.pause();
            NowPlaying = "n";
            const element = document.getElementById('play-button-Setlist530');
            // element.onclick = () => Play("Setlist530");
            element.style.backgroundImage = "url(../../img/play.png)";
        }
    }else if(String(PlayListP)==="Setlist531"){
        if(PlayingAudio531){
            PlayingAudio531.pause();
            NowPlaying = "n";
            const element = document.getElementById('play-button-Setlist531');
            // element.onclick = () => Play("Setlist531");
            element.style.backgroundImage = "url(../../img/play.png)";
        }
    }
}
