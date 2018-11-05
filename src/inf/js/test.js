getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        console.log(body);
        xhr.send();
    });
};

postJSON = function(url,body) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        console.log(body);
        xhr.send(body);
    });
};



function contractExec(url) {
    var body = {"idx":10};
    postJSON(url,body).then(function(data){
        var address = data.data.contractAddress;
        var msg = document.getElementById("message");
        msg.innerHTML = address;
    }, function(status){
        alert('Something went wrong with postJSON.');
    });
}


function getBlockInfo(url) {

    var params = document.getElementById("contractAddress").value;
    url += "?contractAddress="+params;
    getJSON(url).then(function(data) {
        var prize = [getPrizeHits(), getPrizeBuy(), getPrizeSignUp(), getPrizeDownload()];
        var ca = [data.data.conversionAction.hits, data.data.conversionAction.buy,  data.data.conversionAction.signUp, data.data.conversionAction.download];
        var totalPrize = 0;
        for (var i=0;i<ca.length;i++){
            totalPrize += prize[i]*ca[i];
        }
        var table = document.getElementById("blockInfo");
        var row = table.insertRow(0);
        row.insertCell(0).innerHTML = getSponserName();
        row.insertCell(1).innerHTML = getProductName();
        row.insertCell(2).innerHTML = ca[0];
        row.insertCell(3).innerHTML = ca[1];
        row.insertCell(4).innerHTML = ca[2];
        row.insertCell(5).innerHTML = ca[3];
        row.insertCell(6).innerHTML = totalPrize;
    }, function(status) { //error detection....
        alert('Something went wrong with getJSON.');
    });

    /*
    var data = {
        "status": 200,
        "code": 200,
        "message": "success",
        "data": {
            "conversionAction": {
                "download": 20,
                "signUp": 100,
                "hits": 350,
                "buy": 50
            }
        }
    };
    */
}

function getSponserName() {
    return "전진우";
}

function getProductName() {
    return "SC 모바일";
}

function getPrizeHits() {
    return 10;
}

function getPrizeBuy() {
    return 3000;
}

function getPrizeSignUp() {
    return 100;
}

function getPrizeDownload() {
    return 2000;
}

function getTotalPrize() {
    return 450000;
}



/*
function getHits() {
    return 350;
}

function getBuy() {
    return 50;
}

function getSignUp() {
    return 100;
}

function getDownload() {
    return 20;
}

function getTotalPrize() {
    return getPrizeHits() * getHits() + getPrizeBuy() * getBuy() + getPrizeSignUp() * getSignUp() + getPrizeDownload() * getDownload();
}
*/
