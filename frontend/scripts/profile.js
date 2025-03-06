document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to login first");
    window.location.href = "login.html";
    return;
  }

  // Fetch User Profile
  const response = await fetch("http://localhost:2002/user/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await response.json();
  if (response.ok) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("mobileNo").value = user.mobileNo;
    document.getElementById("age").value = user.age;
    document.getElementById("address").value = user.address;
    document.getElementById("adharNo").value = user.adharNo;
    document.getElementById("username").textContent = `Welcome, ${user.name}`;
  } else {
    alert("Failed to fetch profile");
  }

  // Enable Editing
  document.getElementById("editProfile").addEventListener("click", function () {
    document
      .querySelectorAll("#profileForm input")
      .forEach((input) => input.removeAttribute("disabled"));
    document.getElementById("saveProfile").style.display = "inline";
  });

  // Save Profile Changes
  document
    .getElementById("profileForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const updatedProfile = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobileNo: document.getElementById("mobileNo").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
      };

      const updateResponse = await fetch("http://localhost:2002/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (updateResponse.ok) {
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update profile");
      }
    });

  // Toggle Change Password Form
  document
    .getElementById("togglePasswordForm")
    .addEventListener("click", function () {
      const passwordForm = document.getElementById("passwordForm");
      passwordForm.style.display =
        passwordForm.style.display === "none" ? "block" : "none";
    });

  // Change Password
  document
    .getElementById("passwordForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const passwordData = {
        currentPassword: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("newPassword").value,
      };

      const passwordResponse = await fetch(
        "http://localhost:2002/user/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (passwordResponse.ok) {
        alert("Password changed successfully!");
        window.location.reload();
      } else {
        alert("Failed to change password");
      }
    });

  // Logout
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
});
