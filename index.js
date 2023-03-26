const { toast, touchMove, touchUp, usleep, appActivate, keyDown, keyUp, copyText, clipText, inputText } = at
const { getData } = require("./request.js");
const { openApp } = require("./task.js");
const { getOTPVietcombank, postOTPVietcombank, checkColorVCB } = require("./taskVietcombank");
const { checkColorVTB, checkQueueVTB } = require("./taskVietinbank")
const { getQRCodeBIDV, taskBIDV, checkColorScanOTPBIDV, postOTPBIDV } = require("./taskBIDV")
//-----------------------------------------------------------------------------------------------
for (let i = 10; i > 5; i++) {//> mặc định
    usleep(2500000);
    i--
    run()
}
async function run() {
    await getData()
        .then(data => {

            if (data !== '0') {
                            console.log('Đã get được queue')
                if (data['app'] == "com.vcb.VCB") {
                    openApp(data['app']);
                    for (let i = 1; i < 10; i++) {
                        color = checkColorVCB()
                        if (color == true) {
                            toast("Đúng màu");
                            getOTPVietcombank(data);
                            postOTPVietcombank(data);
                            usleep(5000000);
                            at.appKill(data['app']);
                            usleep(2000000);
                            break
                        } else {
                            toast("Kiểm tra màu lần: " + i)
                            usleep(500000)
                        }
                    }

                } else if (data['app'] == "com.vietinbank.mobilebanking") {
                    at.toast("Xử lý Vietinbank");
                    openApp(data['app']);
                    for (let i = 1; i < 12; i++) {
                        color = checkColorVTB()
                        if (color == true) {
                            toast("Đúng màu");
                            //Click xác thực giao dịch
                            at.tap(333, 888)
                            usleep(2000000)
                            at.tap(368, 1268)
                            usleep(2000000)
                            break
                            //----------------------------------------------------
                        } else {
                            toast("Kiểm tra màu lần: " + i)
                            usleep(1000000)
                            // if (i === 11){
                            //     toast("Đã vào đến đây")
                            //     checkQueueVTB(data)
                            //     at.appKill(data['app']);
                            //     toast("Đã kill Vietinbank")
                            //     usleep(10000000)
                            // }
                        }
                    }
                    usleep(5000000)
                    //Gửi request check OTP
                    checkQueueVTB(data)
                    at.appKill(data['app']);
                    usleep(10000000)
                } else if (data['app'] == "com.bidv.smartbanking") {
                    toast("Xử lý giao dịch BIDV")
                    usleep(2000000)
                    getQRCodeBIDV(data)
                    openApp(data['app'])
                    at.tap(368, 1268)
                    usleep(2000000)
                    for (let i = 1; i < 10; i++) {
                        color = checkColorScanOTPBIDV()
                        if (color == true) {
                            toast("Kiểm tra: Đúng");
                            //Click xác thực giao dịch
                            taskBIDV()
                            postOTPBIDV(data)
                            usleep(10000000)
                            break
                            //----------------------------------------------------
                        } else {
                            toast("Kiểm tra màu lần: " + i)
                            usleep(1000000)
                        }
                    }
                } else {
                    usleep(2500000);
                    at.toast("Chưa có trong danh sách xử lý");

                }
            } else {
                usleep(2500000);
                console.log('Kết thúc quá trình')
                at.toast("Chưa có giao dịch cần xử lý");

            }
        }
        )
        .catch(error => {
            console.log(error);
        });
}
usleep(2000000);