function blurPassword() {
  var x = document.getElementById("MyPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

document.getElementById("showPwd").addEventListener("click", blurPassword, false)

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function accCheck(event) {
  event.preventDefault();
  const email = document.getElementById("MyEmail").value;
  const passw = document.getElementById("MyPassword").value;
  console.log(email)
  console.log(passw)
  const check = async () => {
    const response = await fetch('/api/users/check', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username: email, 
        password: passw
      })
    
    });
    const content = await response.json();
    console.log(content);
    if (content.allow === 1){
      setCookie("username", content.pathid, 30);
      window.location.replace("/")
    }
    else{
      document.getElementById("wrongpwdnotif").style.display = "block";
    }
  }
  check();
}
document.getElementById("submitLoginInfo").addEventListener("click", accCheck)