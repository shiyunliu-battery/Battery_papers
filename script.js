document.addEventListener("DOMContentLoaded", function () {
  const articlesContainer = document.getElementById("articles-container");
  const loadingIndicator = document.getElementById("loading");

  // Fetch articles from the JSON file
  fetch("articles.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load articles.");
      }
      return response.json();
    })
    .then((articles) => {
      loadingIndicator.style.display = "none";
      if (articles.length === 0) {
        articlesContainer.innerHTML = "<p>No articles available.</p>";
        return;
      }

      articles.forEach((article) => {
        const articleElement = document.createElement("article");
        articleElement.innerHTML = `
          <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
          <p>${article.description}</p>
          <p><strong>Published:</strong> ${new Date(article.publicationDate).toLocaleDateString()}</p>
        `;
        articlesContainer.appendChild(articleElement);
      });
    })
    .catch((error) => {
      console.error(error);
      loadingIndicator.innerText = "Failed to load articles.";
    });
});
