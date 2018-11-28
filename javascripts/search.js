var url = "https://www.influanswerapi.cf";
var obj = {};
var str_date;
var fin_date;

var postJSON = function(url, body) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("token", localStorage.getItem("token"));
    console.log(JSON.stringify(localStorage.getItem("token")));
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

var search = function() {

  var resourceURL = "/campaign/main/search"

  var keyword = document.getElementById("campaignSearch");
  var types = new Array();
  var checkBox1 = document.getElementById("chk1");
  var checkBox2 = document.getElementById("chk2");
  var checkBox3 = document.getElementById("chk3");
  var checkBox4 = document.getElementById("chk4");
  var checkBox5 = document.getElementById("chk5");
  var checkBox6 = document.getElementById("chk6");


  if (checkBox1.checked == true) {
    types.push("signUp");
  }
  if (checkBox2.checked == true) {
    types.push("play");
  }
  if (checkBox3.checked == true) {
    types.push("click");
  }
  if (checkBox4.checked == true) {
    types.push("reservation");
  }
  if (checkBox5.checked == true) {
    types.push("content");
  }
  if (checkBox6.checked == true) {
    types.push("shopping");
  }


  if (types != null) {
    body = {
      "types": types,
      "keyword": keyword.value
    };

    postJSON(url + resourceURL, body).then(function(respond) {
        console.log(respond);
      if (respond.message == "success") {
        var length = respond.data.length;
        if(length == 0){
            alert("검색된 광고 없음!");
            return;
        }
        var name = new Array(length);

        obj = respond.data;
        console.log(obj);

        for (var i = 0; i < length; i++) {
          name[i] = new Array(9);
          name[i][0] = respond.data[i].campaign_id;
          name[i][1] = respond.data[i].name;
          name[i][2] = respond.data[i].type;
          name[i][3] = respond.data[i].reward;
          name[i][4] = respond.data[i].description;
          str_date = respond.data[i].start_date.split('T');
          name[i][5] = str_date[0];
          fin_date = respond.data[i].end_date.split('T');
          name[i][6] = fin_date[0];
          name[i][7] = respond.data[i].URL;
          name[i][8] = respond.data[i].image;
        }
      } else {
        alert('fail')
      }

      var listDiv = document.getElementById('item_list_all');

      listDiv.innerHTML = ""
      for (var i = 0; i < obj.length; i++) {
        var list = "";
        str_date = obj[i].start_date.split('T');
        fin_date = obj[i].end_date.split('T');
        list += "<div class='each_item' id='item_list' " + i + " onclick='detailPage(" + i + ");'>" +
          "<div class='each_image' id='item-image' " + i + ">" + "<img  class='img_resize' src='" +  obj[i].image + "'" + "/>" + "</div>" +
          "<div class='each_type' id='item-type' " + i + ">" + obj[i].type + "</div>" +
          "<div class='each_name 'id='item-name' " + i + ">" + obj[i].name + "</div>" +
          "<div class='each_point 'id='item-point' " + i + ">" + obj[i].reward + " P</div>" +
          "</div> <br>" +

          "<form id = 'campaignForm" + i + "' action='/campaign/detail' method='post'>" +
            "<input type='hidden' name='campaign_id' value="  + "'" + obj[i].campaign_id  + "'" +">" +
            "<input type='hidden' name='name' value="         + "'" + obj[i].name         + "'" +">" +
            "<input type='hidden' name='type' value="         + "'" + obj[i].type         + "'" +">" +
            "<input type='hidden' name='reward' value="       + "'" + obj[i].reward       + "'" +">" +
            "<input type='hidden' name='description' value="  + "'" + obj[i].description  + "'" +">" +
            "<input type='hidden' name='start_date' value="   + "'" + str_date[0]         + "'" +">" +
            "<input type='hidden' name='end_date' value="     + "'" + fin_date[0]         + "'" +">" +
            "<input type='hidden' name='url' value="          + "'" + obj[i].URL          + "'" +">" +
            "<input type='hidden' name='image' value="        + "'" + obj[i].image        + "'" +">" +
          "</form>";
        listDiv.innerHTML += list;
      }
    });
  }
}

function detailPage(num) {
  try {
    document.getElementById("campaignForm"+num).submit();
  } catch (e) {
    alert("Not submitted");
  }
}
