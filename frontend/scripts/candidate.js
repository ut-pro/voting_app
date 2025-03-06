document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to login first");
    window.location.href = "login.html";
    return;
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
            <h3>${candidate.name} (${candidate.party})</h3>
            <p>Votes: ${candidate.voteCount}</p>
            <button class="vote-btn" data-id="${candidate._id}">Vote</button>
        `;
    candidateList.appendChild(div);
  });

  document.querySelectorAll(".vote-btn").forEach((button) => {
    button.addEventListener("click", async function () {
      const candidateID = this.getAttribute("data-id");

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
        window.location.reload();
      } else {
        alert("Failed to submit vote");
      }
    });
  });
});
