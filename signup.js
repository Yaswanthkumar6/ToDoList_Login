const signupBtn = document.getElementById("signup");

signupBtn.addEventListener("click", () => {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!(email && password)) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Signup successful!");
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "todo.html";
});
