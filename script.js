function searchVideos() {
    const query = document.getElementById("search").value
        .trim()
        .toLowerCase();

    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        const title = video.querySelector("h3").textContent.toLowerCase();
        const creator = video.querySelector("p").textContent.toLowerCase();

        if (
            title.includes(query) ||
            creator.includes(query)
        ) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    });
}


document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchVideos();
    }
});