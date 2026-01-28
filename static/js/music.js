let MusicData={};
let NowPlaying = "n";

let PlayingList = {};
let NowPlayingByID={};
let PlayingAudioByID={};

function PlaySong(songID, audioObject=null){
    return new Promise((resolve) => {
        // console.log("Playing song ID:", songID, "on audio object:", audioObject);
        PlayingAudioByID[audioObject]=new Audio(MusicData[String(songID)][1]);
        PlayingAudioByID[audioObject].volume=1;
        PlayingAudioByID[audioObject].play();
        PlayingAudioByID[audioObject].addEventListener('ended', () => {resolve();});
    });
}

function continuePlaying(id){
    // console.log("continuePlaying:", id);s
    return new Promise((resolve) => {
        PlayingAudioByID[id].volume=1;
        PlayingAudioByID[id].play();
        PlayingAudioByID[id].addEventListener('ended', () => {resolve();});
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
        const element = document.getElementById(`play-button-${PlayListP}`);
        if(!PlayingList[PlayListP] || PlayingList[PlayListP].length === 0){
            element.style.backgroundImage = "url(./img/play.png)";
            return;
        }
        for(let key in NowPlayingByID){
            if(String(key)!==String(PlayListP)){
                Stop(key);
            }
        }
        // console.log("Start playing:", PlayListP);
        NowPlaying=PlayListP;
        
        element.style.backgroundImage = "url(./img/pause.png)";
        if(NowPlayingByID[PlayListP] && isContinue){
            NowPlayingByID[PlayListP]=NowPlayingByID[PlayListP]%PlayingList[PlayListP].length;
            const element = document.getElementById(`music-${PlayListP}-${PlayingList[PlayListP][NowPlayingByID[PlayListP]]}`);
            if(element){
                // element.style.borderTop = "2px solid #00000000";
                // element.style.borderBottom = "2px solid yellow";
                element.style.color = "yellow";
            }
            await continuePlaying(PlayListP);
            if(element){
                // element.style.border = "none";
                element.style.color = "#ffffff";
            }
            NowPlayingByID[PlayListP]=(NowPlayingByID[PlayListP]+1);
        }
        
        while(String(NowPlaying)===String(PlayListP)){
            
            // border-top: 2px solid #00000000;
    // border-bottom: 2px solid yellow ;
            // console.log("Playing playlist:", PlayListP);
            NowPlayingByID[PlayListP]=NowPlayingByID[PlayListP]%PlayingList[PlayListP].length;
            const element = document.getElementById(`music-${PlayListP}-${PlayingList[PlayListP][NowPlayingByID[PlayListP]]}`);
            if(element){
                // element.style.borderTop = "2px solid #00000000";
                // element.style.borderBottom = "2px solid yellow";
                element.style.color = "yellow";
            }
            await PlaySong(PlayingList[PlayListP][NowPlayingByID[PlayListP]], PlayListP);
            if(element){
                // element.style.border = "none";
                element.style.color = "#ffffff";
            }
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
        const cell = document.getElementById(`cell-${PlayListP}`);
        if(cell){
            for(let i=0;i<cell.children.length;i++){
                let child=cell.children[i];
                if(child.style.color==="yellow"){
                    // child.style.border="none";
                    child.style.color="#ffffff";
                }
            }
        }
        // element.onclick = () => Play(PlayListP);
        element.style.backgroundImage = "url(./img/play.png)";
    }
    
}

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