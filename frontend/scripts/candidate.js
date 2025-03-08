document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to login first");
    window.location.href = "login.html";
    return;
  }
  const usernameDisplay = document.getElementById("username");
  const userResponse = await fetch("http://localhost:2002/user/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await userResponse.json();
  if (userResponse.ok) {
    usernameDisplay.textContent = `Welcome, ${user.name}`;
  }

  const response = await fetch("http://localhost:2002/candidate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const candidates = await response.json();
  const candidateList = document.getElementById("candidateList");

  candidates.forEach((candidate) => {
    const div = document.createElement("div");
    div.className = "candidate";
    div.innerHTML = `
            <h3>Name: ${candidate.name} (${candidate.party})</h3>
            <h3>Age: ${candidate.age}yr</h3>
            <p>Votes: ${candidate.voteCount}</p>
        `;
    candidateList.appendChild(div);
  });

  let logoutButton = document.querySelector("#logout");

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
});
