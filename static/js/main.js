function resizeBackground() {
    const backgroundDiv = document.getElementById("background");
    backgroundDiv.style.height = String(Number(window.innerHeight) - BackgroundMrgin*2) + "px";
    backgroundDiv.style.width = String(Number(window.innerWidth) - BackgroundMrgin*2) + "px";
}



document.addEventListener("DOMContentLoaded", function() {
    resizeBackground();
    let isListenerAdded = false;
    if (!isListenerAdded) {
        window.addEventListener("resize", resizeBackground);
        isListenerAdded = true;
    }
})  