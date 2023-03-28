const { usleep, getColors, copyText, clipText, inputText, toast, appKill, tap } = at
const { postDataMBB } = require("./request.js");
const configs = require('./config');
function getQRCodeMBB(data) {
    at.openURL("https://api.ukm.vn/api/autotouch/qrmb?qrID=" + data['qrID']);
    usleep(5000000)
    const savePath = null
    const region = { x: 0, y: 0, width: 750, height: 750 }
    at.screenshot(savePath, region)
    usleep(2000000)
}
function checkColorMBB() {
    const [result, error] = getColors([
        { x: 390, y: 930 },
        { x: 450, y: 940 },
        { x: 300, y: 930 }
    ])
    if (error) {
        console.log('Failed to get colors, error: %s', error)
        return false
    } else {
        console.log(JSON.stringify(result, null, '    '))
        if (result[0] == result[1] && result[0] === result[2]) {
            return true
        } else {
            return false
        }
    }
}
function checkColorsMBB(data) {
    for (let i = 1; i < 10; i++) {
        color = checkColorMBB()
        if (color == true) {
            toast("Đúng màu");
            importQRCode(data)
            break
        } else {
            toast("Kiểm tra màu lần: " + i)
            usleep(500000)
        }
    }
}

function importQRCode(data) {
    //Click vào ô tạo OTP
    tap(280, 1240)
    usleep(1000000)
    tap(300, 600)
    usleep(2000000)
    tap(430, 1130)
    usleep(2000000)
    tap(100, 300)
    usleep(5000000)
    at.inputText(configs.passSmartOtpMBB)
    usleep(1000000)
    tap(400, 1280)
    toast('Chuẩn bị force Get OTP')
    forceGetOTP(data)
   
}
function forceGetOTP(data){
    for (let i = 1; i < 10; i++) {
        color = checkColorForceGetOTP()
        if (color == true) {
            toast("Tiến hành quét OTP");
            findOTPMBB(data)
            usleep(1000000)
            break
        } else {
            toast("Kiểm tra màu lần: " + i)
            usleep(4000000)
            at.tap(400, 850)
        }
    }
    
}
function checkColorForceGetOTP() {
    const [result, error] = getColors([
        { x: 200, y: 850 },
        { x: 700, y: 850 },
        { x: 600, y: 500 }
    ])
    if (error) {
        console.log('Failed to get colors, error: %s', error)
        return false
    } else {
        console.log(JSON.stringify(result, null, '    '))

        if (result[0] == result[1] && result[0] === result[2]) {
            return true
        } else {
            return false
        }
    }
}
function findOTPMBB(data) {
    const options = {
        region: { x: 230, y: 500, width: 280, height: 70 },
        level: 0,
        languages: ['en-US'],
        debug: false,
    }
    at.recognizeText(options, (result, error) => {
        if (error) {
            at.toast(error)
        } else {
            at.toast('Tiến hành Post OTP: ' + result['0']['text'])
            otp = result['0']['text']
            postOTPMBBank(data, otp)
            usleep(1000000)
            
        }
    })
}
function postOTPMBBank(data, otp) {
    let idBank = data['idBank']
    let userId = data['owner']
    let qrID = data['qrID']
    postDataMBB(idBank, userId, qrID, otp)
        .then(postData => {
            toast("Post OTP MBB: " + postData);
            usleep(2500000)
            toast("Kill MB Bank")
            appKill(data['app']);
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    getQRCodeMBB,
    checkColorMBB,
    checkColorsMBB
}