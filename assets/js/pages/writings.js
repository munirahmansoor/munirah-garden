async function loadwritings() {
  try {
    const response = await fetch("assets/data/writings.json");
    const writings = await response.json();

    const container = document.getElementById("writings");

    container.innerHTML = "";

    writings.forEach(writings => {
      const article = document.createElement("article");

      article.innerHTML = `
      
        <div class="blog-content">
        <p>${writings.year}</p>
        <p span class="text-effect"><a href="${writings.link}">${writings.title}</a></p>
        </div>
      `;

      container.appendChild(article);
    });

  } catch (error) {
    console.error("Couldn't load writings:", error);
  }
}

loadwritings();