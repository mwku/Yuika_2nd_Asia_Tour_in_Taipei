let MusicData={};
let PlayList530 = [];
let PlayList531 = [];
let PlayList530PlayingIndex = 0;
let PlayList531PlayingIndex = 0;
let NowPlaying = "n";

fetch("./static/json/songlist.json")
    .then(response => response.json())
    .then(data => {
        MusicData = data;
    });

function PlaySong(songID){

}

function Play(PlayListP){
    if(String(PlayListP)==="Setlist530"){

    }else if(String(PlayListP)==="Setlist531"){

    }
}
function Stop(PlayListP){
    
}
