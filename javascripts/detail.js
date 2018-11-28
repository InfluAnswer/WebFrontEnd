var url = "https://www.influanswerapi.cf";

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


var pick = function() {
    var resourceURL = "/campaign/pick";
    var regulation = document.getElementById("regulation").checked;
    var campaign_id = document.getElementById("campaign_id").value;
    campaign_id = parseInt(campaign_id);
    var tracking_url = document.getElementById("tracking_url").value
    //tracking_url = JSON.stringify(tracking_url);
    //var ad_url = prompt("작성한 게시글의 URL을 입력하세요!");
    if (!regulation) {
        alert("Regulation을 읽고 체크하세요!");
    } else {
        var body={
            "campaign_id": campaign_id,
            "tracking_url": tracking_url
        }
        postJSON(url + resourceURL, body).then(function(respond) {
            console.log(respond);
            if (respond.message == "success") {
                alert("계약이 체결되었습니다.");
            } else {
                alert(respond.description);
            }
        });
    }

}



function showPopup() {
    window.open("/regulationPopup.html", "규정 보여주기", "width=400, height=300, left=100, top=50");
}
