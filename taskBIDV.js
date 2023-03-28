const { usleep, getColors, inputText, toast, appKill } = at
const { postDataBIDV } = require("./request.js");
const configs = require('./config');

function getQRCodeBIDV(data) {
    // at.openURL("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + data['dataSOTP']);
    at.openURL("https://api.ukm.vn/api/autotouch/qrbidv?data=" + data['dataSOTP']);
    usleep(5000000)
    const savePath = null
    const region = { x: 0, y: 0, width: 750, height: 750 }
    at.screenshot(savePath, region)
    usleep(2000000)

}
function checkColorScanOTPBIDV() {
    const [result, error] = getColors([
        { x: 250, y: 250 },
        { x: 300, y: 250 },
        { x: 400, y: 240 }
    ])
    if (error) {
        console.log('Failed to get colors, error: %s', error)
        return false
    } else {
        if (result[0] == result[1] && result[0] === result[2]) {
            toast("True color")
            return true
        } else {
            return false
        }
    }
}
function taskBIDV(data) {
    at.tap(300, 1090)
    usleep(3000000)
    at.tap(100, 400)
    usleep(2000000)
    at.tap(688, 1260)
    usleep(2000000)
    inputText(configs.passSmartOtpBIDV)
    usleep(1000000)
    at.tap(360, 1260) // Click vào số 0
    usleep(1000000)
    at.tap(600, 850)
    usleep(7000000)
    importDone(data)
}
function importDone(data) {
    const [color] = at.getColor(500, 800)
    if (color == 32686) {
        toast('Chuẩn bị huỷ giao dịch')
        data.cancel = true
        usleep(1000000)
        postOTPBIDV(data)

    } else if (color == 16777215) {
        toast('Chuẩn bị xác thực giao dịch')
        data.cancel = false
        at.tap(450, 1250)
        usleep(2000000)
        postOTPBIDV(data)
    } else {
        toast('Có lỗi tại taskBIDV')
        data.cancel = true
        usleep(1000000)
        postOTPBIDV(data)
    }
}
function postOTPBIDV(data) {
    toast('Xử lý postOTP')
    let idbank = data['idbank']
    let tranxId = data['tranxId']
    let cancel = data['cancel']
    console.log("Chuẩn bị post Data BIDV")
    postDataBIDV(idbank, tranxId, cancel)
        .then(postData => {
            toast("Đã gửi data hoàn tất");
            usleep(2500000)
            toast("Kill app BIDV")
            usleep(2500000)
            appKill(data['app']);
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    getQRCodeBIDV,
    checkColorScanOTPBIDV,
    taskBIDV,
    postOTPBIDV
}