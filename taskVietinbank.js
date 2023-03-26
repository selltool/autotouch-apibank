const { usleep, getColors, copyText, clipText, inputText, toast, appKill } = at
const { postDataVTB } = require("./request.js");
function checkColorVTB() {
    const [result, error] = getColors([
        { x: 120, y: 240 },
        { x: 60, y: 510 },
        { x: 670, y: 340 }
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
function checkQueueVTB(data) {
    id = data['idbank'];
    paymentId = data['paymentId']
    console.log("Data trong queue: " + paymentId + "," + id)
    postDataVTB(id, paymentId)
        .then(postData => {
            toast("Post OTP VCB: " + postData);
            appKill(data['app']);
        })
        .catch(error => {
            console.log(error);
        });
}


module.exports = {
    checkColorVTB,
    checkQueueVTB,
}