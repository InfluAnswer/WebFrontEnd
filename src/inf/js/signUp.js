
var url = "http://34.219.226.18:3000";

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




setStatus = function(str, classname) {
    var status = document.getElementById("signUpStatus");
    status.innerHTML = str;
    status.className = "alert alert-" + classname;
};


verifyPassword = function() {
    var pw1 = document.getElementById("password1");
    var pw2 = document.getElementById("password2");
    if (pw1.value == "" || pw1.value != pw2.value) {
        var status = document.getElementById("signUpStatus");
        status.innerHTML = "Check Your Password.";
        setStatus("Check Your Password.", "danger");
        return "";
    }
    return pw1.value;
};


checkMemberType = function() {
    var type_inf = document.getElementById("userType1");
    if (type_inf.checked == true) {
        return 0;
    }
    return 1;
};


submit = function() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pw = verifyPassword();
    var index = checkMemberType();
    var resourceURL = "/user/signup";

    if (name != "" && email != "" && pw) {
        body = {
            "index": index,
            "id": email,
            "pw": pw,
            "name": name
        };
        //body=JSON.stringify(body);
        setStatus("sign up data sent", "success");

        postJSON(url + resourceURL, body).then(function(respond) {
            console.log(respond);
            if (respond.message == "success") {
                window.location = "http://www.naver.com";
            } else {
                setStatus("Sign Up Failed", "danger");
            }
        });
    } else {
        if (name == "") {
            setStatus("Enter your name", "danger");
        } else if (email == "") {
            setStatus("Enter your email", "danger");
        } else {
            console.log("pw error");
        }
    }
};
