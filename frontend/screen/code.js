function blurPassword() {
  var x = document.getElementById("MyPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const d = new Date();
const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
console.log(date);
