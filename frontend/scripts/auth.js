document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname;

  // Password toggle functionality (only on signup & login pages)
  const togglePasswordButton = document.getElementById("togglePassword");
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", function () {
      const passwordField = document.getElementById("password");
      passwordField.type =
        passwordField.type === "password" ? "text" : "password";
    });
  }

  // Signup form submission (only on signup page)
  if (currentPage.includes("signup.html")) {
    document
      .getElementById("signupForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;
        const adharNo = document.getElementById("adharNo").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:2002/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobileNo,
            age,
            address,
            adharNo,
            password,
          }),
        });

        if (response.ok) {
          alert("Signup successful! Please log in.");
          window.location.href = "login.html";
        } else {
          alert("Signup failed");
        }
      });
  }

  // Login form submission (only on login page)
  if (currentPage.includes("login.html")) {
    document
      .getElementById("loginForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const adharNo = document.getElementById("adharNo").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:2002/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adharNo, password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Login failed");
        }
      });
  }
});
