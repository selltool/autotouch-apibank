//Pass Smart OTP phải có số cuối là số 0
//Hãy nhập 5 số đầu
const passSmartOtpMBB = '13579'; //5 số đầu
const passSmartOtpBIDV = '13579';//5 số đâu
const passSmartOtpVCB = '135790';//6 số
const bankWork = [
    'com.vcb.VCB',
    'com.vietinbank.mobilebanking',
    'com.mbmobile',
    'com.bidv.smartbanking'
]
const url = 'https://api.ukm.vn/' //Bao gồm / ở cuối
module.exports = {
    passSmartOtpMBB,
    passSmartOtpBIDV,
    passSmartOtpVCB,
    bankWork,
    url
}