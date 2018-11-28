var url = "https://www.influanswerapi.cf";
var isSearched = false;

getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("token", localStorage.getItem("token"));
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};
var postJSON = function(url, body) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("token", localStorage.getItem("token"));
        //console.log(JSON.stringify(localStorage.getItem("token")));
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send(JSON.stringify(body));
        console.log(body);
    });
};

getID = function() {
    var token = localStorage.getItem("token");
    var input = document.getElementById("contractAddress");
    if (token == undefined) {
        input.value = "Token Error";
        document.getElementById("contractQuery").disabled = "disabled";
    } else {
        input.value = JSON.parse(atob(token.split('.')[1])).id;
    }

}

getIndex = function() {
    var token = localStorage.getItem("token");
    if (token) {
        console.log("index is: " + JSON.parse(atob(token.split('.')[1])).index);
        return JSON.parse(atob(token.split('.')[1])).index;
    }
}

setMessage = function(msg, stat) {
    var bar = document.getElementById("queryStatus");
    bar.innerHTML = msg;
    bar.className = "alert alert-" + stat;
}


function getContractInfo() {
    var resourceURL = "/transaction/mycontract";
    var index = getIndex();

    var tr = document.getElementById('contractInfo').tHead.children[0],
        th = document.createElement('th');

    if (!isSearched) {
        if (index == "0") {
            th.innerHTML = "수익";
            th.setAttribute("scope", "col");
            tr.appendChild(th);

        } else if (index == "1") {
            th.innerHTML = "수정";
            th.setAttribute("scope", "col");
            tr.appendChild(th);
        }


    }
    setMessage("계약 조회 중....", "warning");
    getJSON(url + resourceURL).then(function(respond) {
        if (respond.message = "success") {
            if (respond.data.length == 0) {
                alert("No Contract Found!!");
                return;
            }
            var tBody = document.getElementById("tBody");
            tBody.innerHTML = "";
            for (var i = 0; i < respond.data.length; i++) {
                var reward = respond.data[i].reward
                var ca = respond.data[i].conversionAction;
                var totalIncome = ca * reward;


                var row = tBody.insertRow(i);

                var c0 = row.insertCell(0);
                var c1 = row.insertCell(1);
                var c2 = row.insertCell(2);
                var c3 = row.insertCell(3);
                var c4 = row.insertCell(4);
                var c5 = row.insertCell(5);
                var c6 = row.insertCell(6);
                var c7 = row.insertCell(7);

                c0.innerHTML = respond.data[i].contract_id;
                c1.innerHTML = respond.data[i].campaign_id;
                c2.innerHTML = respond.data[i].inf_id;
                c3.innerHTML = respond.data[i].adv_id;
                c4.innerHTML = respond.data[i].type;
                c5.innerHTML = respond.data[i].reward;
                c6.innerHTML = respond.data[i].start_date.split("T")[0];
                c7.innerHTML = respond.data[i].end_date.split("T")[0];

                c0.className = "contractTd";
                c1.className = "contractTd";
                c2.className = "contractTd";
                c3.className = "contractTd";
                c4.className = "contractTd";
                c5.className = "contractTd";
                c6.className = "contractTd";
                c7.className = "contractTd";

                if (index == "0") {

                    var c8 = row.insertCell(8);
                    var c9 = row.insertCell(9);
                    var c10 = row.insertCell(10);

                    c8.innerHTML = "<input type='text' class='tdHit' value='" + respond.data[i].hits + "' disabled>";
                    c9.innerHTML = "<input type='text' class='tdCA' value='" + ca + "' disabled>";
                    c10.innerHTML = "<input type='text' class='tdTI' value='" + totalIncome + "' disabled>";

                    c8.className = "contractTd";
                    c9.className = "contractTd";
                    c10.className = "contractTd";

                } else if (index == "1") {

                    var c8 = row.insertCell(8);
                    var c9 = row.insertCell(9);
                    var c10 = row.insertCell(10);

                    c8.innerHTML = "<input type='text' class='tdHit' value='" + respond.data[i].hits + "'>";
                    c9.innerHTML = "<input type='text' class='tdCA' value='" + ca + "'>";
                    c10.innerHTML = "<button id=" + respond.data[i].contractAddress + " class='btn btn-warning btn-modify' onclick='modifyCA(this)'>수정</button>";
                    //console.log(c10.children[0].id);
                    c8.className = "contractTd";
                    c9.className = "contractTd";

                }
                setMessage("계약 조회 완료", "primary");
                isSearched = true;
            }
        } else {
            setMessage(respond.description, "danger");
        }

    }, function(status) { //error detection....
        alert('Something went wrong with getJSON.');
    });

};

modifyCA = function(obj) {
    var resourceURL = "/transaction/write";
    var contractAddress = $(obj).attr("id");
    var tr = $(obj).parent().parent();
    var td = tr.children();
    var hits = parseInt(td.find('.tdHit').val());
    var action = parseInt(td.find('.tdCA').val());
    var really = confirm("정말로 수정하시겠습니까?");
    if (really) {
        //var gas = prompt("가스값을 입력하세요");

        //gas = parseInt(gas);
        var body = {
            "gas": 470000,
            "contractAddress": contractAddress,
            "hits": hits,
            "action": action
        };
        setMessage("블록체인 검증 중....", "warning");
        postJSON(url + resourceURL, body).then(function(respond) {
            if (respond.message == "success") {
                alert("새로운 트랜잭션이 생성되었습니다!");
                setMessage("새로운 트랜잭션 해쉬값: " + respond.data.transactionHash, "success");
            } else {
                setMessage(respond.description, "danger");
            }
        }, function(err) {
            setMessage(err.description, "danger");
        });

        //console.log(body);
    }
};
