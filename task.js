const { usleep, getColors, appActivate, keyDown, keyUp, copyText, clipText, inputText, toast, appKill } = at

function openApp(app) {
    appActivate("com.apple.SpringBoard");
    toast("Restart " + app)
    appKill(app)
    usleep(2000000);
    at.appRun(app);
    usleep(4000000);
}

module.exports = {
    openApp
}