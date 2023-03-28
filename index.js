const { toast, usleep, appActivate } = at
const { getData } = require("./request.js");
const { openApp } = require("./task.js");
const config = require('./config')
const { getOTPVietcombank, postOTPVietcombank, checkColorVCB } = require("./taskVietcombank");
const { checkColorVTB, checkQueueVTB } = require("./taskVietinbank")
const { getQRCodeBIDV, taskBIDV, checkColorScanOTPBIDV } = require("./taskBIDV")
const { getQRCodeMBB, checkColorsMBB } = require("./taskMbbank")
//-----------------------------------------------------------------------------------------------
for (let i = 10; i > 5; i++) {//> mặc định
    usleep(2500000);
    i--
    run()
}
async function run() {
    await getData()
        .then(data => {//then/////////////
            checkApp = (config.bankWork.includes(data['app']))
            if (checkApp === true) {
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
                    toast("Xử lý Vietinbank");
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
                            taskBIDV(data)
                            usleep(15000000)
                            break
                        } else {
                            toast("Kiểm tra màu lần: " + i)
                            usleep(1000000)
                        }
                    }
                    //----------------------------------------------------
                } else if (data['app'] == "com.mbmobile") {
                    toast("Xử lý MB Bank")
                    getQRCodeMBB(data)
                    openApp(data['app'])
                    checkColorsMBB(data)
                    usleep(10000000)
                } else {
                    usleep(2500000);
                    at.toast("Chưa có trong danh sách xử lý");

                }
            } else {
                usleep(2500000);
                at.toast("Chưa có giao dịch cần xử lý");

            }
        }
        )//then/////////////
        .catch(error => {
            console.log(error);
        });
}
usleep(2000000);