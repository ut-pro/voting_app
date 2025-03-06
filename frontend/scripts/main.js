document.addEventListener("DOMContentLoaded", async function () {
  try {
    async function fetchVotes() {
      const candidateResponse = await fetch(
        "http://localhost:2002/candidate/vote/count"
      );
      const candidates = await candidateResponse.json();
      const container = document.getElementById("candidateResults");
      container.innerHTML = "";
      document.querySelector("#candidates-card").innerHTML = "";

      candidates.forEach((candidate) => {
        const votePercentage = Math.min(candidate.count, 10); // Ensure max 10%
        const div = document.createElement("div");
        div.className = "candidate";
        div.innerHTML = `
                  <div class="candidate-container">
                    <h3>${candidate.party}</h3>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: ${votePercentage}0%">${votePercentage}</div>
                    </div>
                  </div>
                  <button class="vote-btn" data-id="${candidate.candidateID}">Vote</button>
              `;
        container.appendChild(div);
      });

      // Attach vote button event listeners **AFTER** rendering candidates
      document.querySelectorAll(".vote-btn").forEach((button) => {
        button.addEventListener("click", async function () {
          const candidateID = this.getAttribute("data-id");
          console.log(candidateID);
          const token = localStorage.getItem("token");
          if (!token) {
            alert("Login to vote!");
            window.location.href = "login.html";
            return;
          }

          const voteResponse = await fetch(
            `http://localhost:2002/candidate/vote/${candidateID}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (voteResponse.ok) {
            alert("Vote submitted successfully!");
            fetchVotes(); // Refresh the candidates instead of reloading the whole page
          } else {
            alert("Failed to submit vote");
          }
        });
      });
    }

    async function fetchCandidates() {
      const candidateResponse = await fetch("http://localhost:2002/candidate/");
      const candidates = await candidateResponse.json();
      console.log(candidates);
    }
    fetchCandidates();

    await fetchVotes();
    setInterval(fetchVotes, 10000);

    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const logoutButton = document.getElementById("logout");
    const usernameDisplay = document.getElementById("username");

    if (token) {
      const userResponse = await fetch("http://localhost:2002/user/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await userResponse.json();
      if (userResponse.ok) {
        usernameDisplay.textContent = `Welcome, ${user.name}`;
        usernameDisplay.style.display = "inline";
        loginLink.style.display = "none";
        signupLink.style.display = "none";
        logoutButton.style.display = "inline";
      }
    }

    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
      window.location.href = "index.html";
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while loading data.");
  }
});
