const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movie-input");
const resultSection = document.getElementById("result-section");
const loader = document.getElementById("loader");

function showLoader(){ loader.style.display = "flex"; }
function hideLoader(){ loader.style.display = "none"; }

searchBtn.addEventListener("click", async () => {
  const movieName = movieInput.value.trim();
  resultSection.querySelectorAll(".movie-card, p").forEach(n => n.remove());
  if (!movieName) {
    resultSection.insertAdjacentHTML("beforeend", "<p>Please enter a movie name.</p>");
    return;
  }
  showLoader();
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=be2c3713&t=${encodeURIComponent(movieName)}`);
    const data = await res.json();
    if (data.Response === "True") {
      const poster = data.Poster !== "N/A" ? `<img src="${data.Poster}" alt="Poster">` : "";
      resultSection.insertAdjacentHTML("beforeend", `
        <div class="movie-card">
          <h2>${data.Title} (${data.Year})</h2>
          ${poster}
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB:</strong> ${data.imdbRating}</p>
        </div>
      `);
    } else {
      resultSection.insertAdjacentHTML("beforeend", "<p>No results found.</p>");
    }
  } catch (e) {
    resultSection.insertAdjacentHTML("beforeend", "<p>Error fetching data.</p>");
  } finally {
    hideLoader();
  }
});

