function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkHaveUser(){
  let username = getCookie("username");
  if(username != ""){
    document.getElementById("Acc").style.display = "block";
    document.getElementById("nonAcc").style.display ="none";
  }
  else {
    document.getElementById("Acc").style.display = "none";
    document.getElementById("nonAcc").style.display ="block";
  }
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999; path=/';  
}
function logOut(){
  eraseCookie("username");
  window.location.reload();
}

window.onload = checkHaveUser;
document.getElementById("logOutBtn").addEventListener("click", logOut);