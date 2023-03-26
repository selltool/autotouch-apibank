const { usleep, getColors, copyText, clipText, inputText, toast, appKill } = at
const { postDataVCB } = require("./request.js");
function getOTPVietcombank(data) {
    //Click vào ô tạo OTP
    at.tap(370, 930)
    usleep(1000000);
    //Nhập mật khẩu
    at.inputText('135790') //Thay đổi mật khẩu theo cách của bạn
    usleep(500000);
    at.tap(390, 650)
    usleep(1500000)
    //Nhập mã giao dịch cần lấy OTP
    at.toast("Nhập mã giao dịch " + data['challenge'])
    at.inputText(data['challenge'])
    at.tap(600, 650)
    usleep(800000)
    at.tap(600, 750)
    usleep(800000)
    at.tap(600, 760)
}
function postOTPVietcombank(data) {
    let idbank = data['idbank']
    let tranid = data['tranId']
    let otp = at.clipText()
    postDataVCB(idbank, tranid, otp)
        .then(postData => {
            toast("Post OTP VCB: " + postData);
            appKill(data['app']);
        })
        .catch(error => {
            console.log(error);
        });
}
function checkColorVCB() {
    const [result, error] = getColors([
        { x: 349, y: 906 },
        { x: 349, y: 909 },
        { x: 349, y: 910 }
    ])
    if (error) {
        console.log('Failed to get colors, error: %s', error)
        return false
    } else {
        if (result[0] == result[1] && result[0] === result[2]) {
            return true
        } else {
            return false
        }
    }
}

module.exports = {
    getOTPVietcombank,
    postOTPVietcombank,
    checkColorVCB
}