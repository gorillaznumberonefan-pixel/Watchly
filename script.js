function searchVideos() {
    const query = document.getElementById("search").value
        .trim()
        .toLowerCase();

    const content = document.getElementById("video-grid");

    // If the search box is empty, show the normal videos
    if (query === "") {
        document.querySelectorAll(".video-card").forEach(video => {
            video.style.display = "block";
        });

        const oldAccounts = document.getElementById("account-results");

        if (oldAccounts) {
            oldAccounts.remove();
        }

        return;
    }

    // -------------------------
    // Search for the account
    // -------------------------

    const savedAccount = localStorage.getItem("watchlyAccount");

    let accountMatch = null;

    if (savedAccount) {
        const account = JSON.parse(savedAccount);

        const displayName = account.displayName.toLowerCase();
        const username = account.username.toLowerCase();

        if (
            displayName.includes(query) ||
            username.includes(query)
        ) {
            accountMatch = account;
        }
    }

    // -------------------------
    // Search for videos
    // -------------------------

    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        const title = video.querySelector("h3")
            .textContent
            .toLowerCase();

        const creator = video.querySelector("p")
            .textContent
            .toLowerCase();

        if (
            title.includes(query) ||
            creator.includes(query)
        ) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    });

    // -------------------------
    // Remove old account results
    // -------------------------

    const oldAccounts = document.getElementById("account-results");

    if (oldAccounts) {
        oldAccounts.remove();
    }

    // -------------------------
    // Display account result
    // -------------------------

    if (accountMatch) {
        const accountResults = document.createElement("div");

        accountResults.id = "account-results";

        accountResults.innerHTML = `
            <h2>👤 Accounts</h2>

            <div class="account-result" onclick="openAccount()">
                <h3>${accountMatch.displayName}</h3>
                <p>${accountMatch.username}</p>
            </div>
        `;

        content.parentNode.insertBefore(accountResults, content);
    }
}


// -------------------------
// Open the account
// -------------------------

function openAccount() {
    window.location.href = "profile.html";
}


// -------------------------
// Search when Enter is pressed
// -------------------------

document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchVideos();
    }
});
