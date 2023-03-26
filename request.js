const axios = require('axios');
url = 'https://api.ukm.vn/' //Bao gồm / ở cuối
function getData() {
    return axios.get( url + 'api/autotouch/queue')
        .then(response => {
            console.log("Request Get Data: " + JSON.stringify(response.data, null, 4) );
            return response.data;
        })
        .catch(error => {
            console.log('Lỗi:' + error);
        });
}
function postDataVCB(idbank, tranid, otp) {
    console.log("Data postDataVCB: " + tranid + ", ID Bank: " + idbank + ", OTP: " + otp)
    return axios.get(  url + 'api/otp/vietcombank?idBank=' + idbank + "&tranid=" + tranid + "&otp=" + otp)
    //idBank=2&tranid=3284870316&otp=123123
        .then(response => {
            console.log("Return postVCB: " + JSON.stringify(response, null, 4) );
            console.log(JSON.stringify(response,null,2));
return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
function postDataVTB(id, paymentId) {
    return axios.get( url + 'api/otp/vietinbank?idBank=' + id + '&paymentId=' + paymentId)
        .then(response => {
            console.log("Return postVTB: " + JSON.stringify(response, null, 4) );
            str = JSON.stringify(response);
console.log(str);
return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
function postDataBIDV(idbank, tranid) {
    return axios.get( url + 'api/otp/bidv?idBank=' + idbank + '&tranxId=' + tranid)
        .then(response => {
            console.log("Return postVCB: " + JSON.stringify(response, null, 4) );
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
module.exports = {
    getData,
    postDataVCB,
    postDataVTB,
    postDataBIDV
}