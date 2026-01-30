const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (email === storedEmail && password === storedPassword) {
    // ✅ SET LOGIN FLAG
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to todo page
    window.location.href = "todo.html";
  } else {
    alert("Invalid email or password");
  }
});
