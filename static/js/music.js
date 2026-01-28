let MusicData={};
let NowPlaying = "n";

let PlayingList = {};
let NowPlayingByID={};
let PlayingAudioByID={};

// if(localStorage.getItem("")){}



function PlaySong(songID, audioObject=null){
    return new Promise((resolve) => {
        // console.log("Playing song ID:", songID, "on audio object:", audioObject);
        PlayingAudioByID[audioObject]=new Audio(MusicData[String(songID)][1]);
        PlayingAudioByID[audioObject].play();
        PlayingAudioByID[audioObject].addEventListener('ended', () => {resolve();});
    });
}

function continuePlaying(id){
    // console.log("continuePlaying:", id);s
    return new Promise((resolve) => {
        PlayingAudioByID[id].addEventListener('ended', () => {resolve();});
        PlayingAudioByID[id].play();
    });
}

function insert(PlayListP,songID){
    // console.log("Inserting song ID:", songID, "into playlist ID:", PlayListP);
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
            NowPlayingByID[PlayListP]=(NowPlayingByID[PlayListP]+1);
        }
        while(String(NowPlaying)===String(PlayListP)){
            // console.log("Playing playlist:", PlayListP);
            NowPlayingByID[PlayListP]=NowPlayingByID[PlayListP]%PlayingList[PlayListP].length;
            await PlaySong(PlayingList[PlayListP][NowPlayingByID[PlayListP]], PlayListP);
            if(String(NowPlaying)!==String(PlayListP)){
                break;
            }
            NowPlayingByID[PlayListP]=(NowPlayingByID[PlayListP]+1);
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

/*
musicdata{
    id:{
        at:listindex
        currentTime:time
    }
}
 */
function SaveState(){
    let SaveData = {};
    for(let key in PlayingAudioByID){
        SaveData[key]={
            at: NowPlayingByID[key],
            currentTime: PlayingAudioByID[key].currentTime
        };
    }
    if(Object.keys(SaveData).length === 0){
        return;
    }
    localStorage.setItem("musicdata",JSON.stringify(SaveData));
}
function LoadState(){
    if(localStorage.getItem("musicdata")){
        let SaveData = JSON.parse(localStorage.getItem("musicdata"));
        // console.log(SaveData);
        for(let key in SaveData){
            NowPlayingByID[key]=SaveData[key]["at"];
            // console.log(PlayingList[key],NowPlayingByID[key]);
            let songid=PlayingList[key][NowPlayingByID[key]];
            // console.log(MusicData[String(songid)][1]);
            PlayingAudioByID[key]=new Audio(MusicData[String(songid)][1]);
            // console.log("h",PlayingAudioByID[key]);
            PlayingAudioByID[key].currentTime=SaveData[key]["currentTime"];
        }
    }
}