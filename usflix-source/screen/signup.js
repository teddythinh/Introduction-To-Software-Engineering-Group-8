function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addAcc(event) {
event.preventDefault();
  const email = document.getElementById("MyEmail").value;
  const passw = document.getElementById("MyPassword").value;
  console.log(email)
  console.log(passw)
  const check = async () => {
    const response = await fetch('/api/users/add', {
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
    if (content.success === true){
      setCookie("username", content.pathid, 30);
      window.location.replace("/")  
    }
    else{
      document.getElementById("errornotif").style.display = "block";
    }
  }
  check();
}

document.getElementById("submitSignUpInfo").addEventListener('click', addAcc);