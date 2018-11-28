var url = "https://www.influanswerapi.cf";

postJSON = function(url, body) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
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


checkMemberType = function() {
    var type_inf = document.getElementById("userType1");
    if (type_inf.checked == true) {
        return "0";
    }
    return "1";
};

setLoginStatus = function(str, classname) {
    var status = document.getElementById("loginStatus");
    status.innerHTML = str;
    status.className = "alert alert-" + classname;
};




login = function() {
    setLoginStatus("sign in data sent", "success");
    var id = document.getElementById("inputEmail").value;
    var pw = document.getElementById("inputPassword").value;
    var index = checkMemberType();
    var resourceURL = "/user/signIn";

    if (id != "" && pw != "") {
        body = {
            "index": index,
            "id": id,
            "pw": pw,
        };
        //body=JSON.stringify(body);
        setLoginStatus("sign in data sent", "success");
        //console.log(body);
        postJSON(url + resourceURL, body).then(function(respond) {
            console.log(respond);
            if (respond.message == "success") {
                var token = respond.data.token;
                localStorage.setItem("token", token);
		localStorage.setItem("id", id);

                //setLoginStatus(token, "success");
                alert("로그인 성공!")
		if(index == 0) {
			window.location = "./campaign";
		} else {
			window.location = "./publisher";
		}
            } else {
                setLoginStatus(respond.description, "danger");
            }
        });
    }
};
