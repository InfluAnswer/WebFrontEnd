function requestAd()
{
        var spo_id = document.getElementById("spo_id");
        var product_name = document.getElementById("product_name");
        var prize_hits = document.getElementById("prize_hits");
        var prize_buy = document.getElementById("prize_buy");
        var prize_signUp = document.getElementById("prize_signUp");
        var prize_download = document.getElementById("prize_download");


}




function getSponserName() {
    return "전진우";
}
function getProductName(){
    return "SC 모바일";
}
function getPrizeHits(){
    return 10;
}
function getPrizeBuy(){
    return 3000;
}
function getPrizeSignUp(){
    return 100;
}
function getPrizeDownload(){
    return 2000;
}
function getTotalPrize(){
    return 450000;
}
function contractExec(){
    console.log("컨트랙트 실행");
}




function getHits(){
    return 350;
}
function getBuy(){
    return 50;
}
function getSignUp(){
    return 100;
}
function getDownload(){
    return 20;
}
function getTotalPrize(){
    return getPrizeHits()*getHits() + getPrizeBuy()*getBuy() + getPrizeSignUp()*getSignUp() + getPrizeDownload()*getDownload();
}
