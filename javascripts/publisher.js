var url = "https://www.influanswerapi.cf";

var adpost = function() {

  // var resourceURL = "/campaign/register";
  //
  // var adv_id        = document.getElementById("manager_name").value;
  // var manager_name  = document.getElementById("manager_name").value;
  // var phone_number  = document.getElementById("phone_number").value;
  // var type          = document.getElementById("type").value;
  // var start_date    = document.getElementById("start_date").value;
  // var end_date      = document.getElementById("end_date").value;
  // var budget        = document.getElementById("budget").value;
  // var reward        = document.getElementById("reward").value;
  // var name          = document.getElementById("name").value;
  // var url           = document.getElementById("url").value;
  // var description   = document.getElementById("description").value;
  // var image         = document.getElementById("image").value;
  //
  // body = {
  //   "adv_id" : "JOO",
  //   "manager_name" : manager_name,
  //   "phone_number" : phone_number,
  //   "type" : type,
  //   "start_date" : start_date,
  //   "end_date" : end_date,
  //   "budget" : budget,
  //   "reward" : reward,
  //   "name" : name,
  //   "URL" : url,
  //   "description" : description,
  //   "campaign_image" : image
  // };
  // console.log(body);
  var user_id = document.getElementById('hidden_id');
  user_id.innerHTML = ""
  var stored_id = ""
  stored_id += "<input type='hidden' id='user_id' name='user_id' value=" +"'" + localStorage.getItem("id")+"'" + ">";

  user_id.innerHTML += stored_id;


  try {
    document.getElementById("campaign_info").submit();
    alert("Submitted Successfully");
    setTimeout(function(){
        window.location = "https://www.influanswer.cf/publisher";
    }, 1000);

  } catch (e) {
    alert("Not submitted");
  }
}
