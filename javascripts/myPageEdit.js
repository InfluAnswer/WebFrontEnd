var url = "https://www.influanswerapi.cf";

var postJSON = function(url, body) {
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

var edit = function() {

  var user_id = document.getElementById('hidden_id');
  user_id.innerHTML = ""
  var stored_id = ""
  stored_id += "<input type='hidden' id='user_id' name='user_id' value=" +"'" + localStorage.getItem("id")+"'" + ">";

  user_id.innerHTML += stored_id;


  try {
    document.getElementById("pub_info").submit();
    alert("Submitted Successfully");
    setTimeout(function(){
        window.location = "https://www.influanswer.cf/publisher";
    }, 1000);

  } catch (e) {
    alert("Not submitted");
  }






}

var editPW = function() {

  var resourceURL = ""

  var old_password      = document.getElementById("old_pw").value;
  var new_password      = document.getElementById("new_pw").value;
  var new_password_chk  = document.getElementById("new_pw_chk").value

  if(new_password == new_password_chk) {
    body = {
       "old_password" : old_password,
       "new_password" : new_password,
     }
     console.log(body);
  } else {
    alert("새로 입력한 비밀번호가 다릅니다.");
    document.getElementById("old_pw").value = "";
    document.getElementById("new_pw").value = "";
    document.getElementById("new_pw_chk").value = "";
  }


}
