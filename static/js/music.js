let MusicData={};
let NowPlaying = "n";

let PlayingList = {};
let NowPlayingByID={};
let PlayingAudioByID={};

if(localStorage.getItem("")){}

fetch("./static/json/songlist.json")
    .then(response => response.json())
    .then(data => {
        MusicData = data;
    });
function PlaySong(songID, audioObject=null){
    return new Promise((resolve) => {
        // console.log("Playing song ID:", songID, "on audio object:", audioObject);
        PlayingAudioByID[audioObject]=new Audio(MusicData[String(songID)][1]);
        PlayingAudioByID[audioObject].play();
        PlayingAudioByID[audioObject].addEventListener('ended', () => {resolve();});
    });
}

function continuePlaying(id){
    // console.log("continuePlaying:", id);
    return new Promise((resolve) => {
        PlayingAudioByID[id].addEventListener('ended', () => {resolve();});
        PlayingAudioByID[id].play();
    });
}

function insert(PlayListP,songID){
    console.log("Inserting song ID:", songID, "into playlist ID:", PlayListP);
    NowPlayingByID[PlayListP]=PlayingList[PlayListP].indexOf(String(songID));
    Stop(PlayListP);
    Play(PlayListP,false);
}

async function Play(PlayListP,isContinue=true,){
    if(String(NowPlaying)===PlayListP){
        return;
    }else{
        for(let key in NowPlayingByID){
            if(String(key)!==String(PlayListP)){
                Stop(key);
            }
        }
        // console.log("Start playing:", PlayListP);
        NowPlaying=PlayListP;
        const element = document.getElementById(`play-button-${PlayListP}`);
        element.style.backgroundImage = "url(./img/pause.png)";
        if(NowPlayingByID[PlayListP] && isContinue){
            await continuePlaying(PlayListP);
        }
        while(String(NowPlaying)===String(PlayListP)){
            // console.log("Playing playlist:", PlayListP);
            for(let i=NowPlayingByID[PlayListP]; i<PlayingList[PlayListP].length;i++){
                NowPlayingByID[PlayListP]=(i+1)%PlayingList[PlayListP].length;
                await PlaySong(PlayingList[PlayListP][i], PlayListP);
                if(String(NowPlaying)!==String(PlayListP)){
                    break;
                }
            }
        }
    }
    
}
function Stop(PlayListP){
    if(PlayingAudioByID[PlayListP]){
        PlayingAudioByID[PlayListP].pause();
        NowPlaying="n";
        const element = document.getElementById(`play-button-${PlayListP}`);
        // element.onclick = () => Play(PlayListP);
        element.style.backgroundImage = "url(./img/play.png)";
    }
    
}
