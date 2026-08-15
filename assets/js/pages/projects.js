// =============================================
// PROJECT CMS
// =============================================

const PROJECTS_JSON = "assets/data/projects.json";



// =============================================
// HOMEPAGE
// =============================================

async function loadProjects() {

    const container = document.getElementById("projects");

    if (!container) return;

    try {

        const response = await fetch(PROJECTS_JSON);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const projects = await response.json();

        // Debug
        console.log("All projects:", projects);

        // Only featured projects
        const featuredProjects = projects.filter(project => project.featured === true);

        console.log("Featured projects:", featuredProjects);

        container.innerHTML = "";

        featuredProjects.forEach(project => {

            const article = document.createElement("article");

            article.innerHTML = `
                <span class="image">
                    <a href="project.html?slug=${project.slug}">
                        <img src="${project.image}" alt="${project.title}">
                    </a>
                </span>

                <div class="project-info">
                    <h4>${project.title}</h4>
                    <h5>${project.tags.join(", ")}</h5>
                </div>
            `;

            container.appendChild(article);

        });

    } catch (error) {

        console.error("Couldn't load homepage projects:", error);

    }

}

// =============================================
// PROJECT PAGE
// =============================================

async function loadProjectPage() {

    if (!document.getElementById("projectTitle")) return;

    try {

        const params = new URLSearchParams(window.location.search);

        const slug = params.get("slug");

        if (!slug) {

            throw new Error("No project slug provided.");

        }

        const response = await fetch(PROJECTS_JSON);

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        const projects = await response.json();

        const project = projects.find(
          p => p.slug === slug
        );

        

        if (!project) {

            document.querySelector("main").innerHTML =
                "<h1>Project not found.</h1>";

            return;

        }

        // Browser title
        document.title = project.title;

        // Hero image
       const hero = document.getElementById("projectHero");

if (hero) {

    if (project.showHero === false) {

        hero.parentElement.style.display = "none";

    } else {

        hero.src = project.heroImage || project.image;
        hero.alt = project.title;
        hero.parentElement.style.display = "";

    }

}

        // Title
        document.getElementById("projectTitle").textContent =
            project.title;

        // Subtitle
        const subtitle = document.getElementById("projectSubtitle");

        if (subtitle) {

            subtitle.textContent = project.subtitle || "";

        }

        // Year
        const year = document.getElementById("projectYear");

        if (year) {

            year.textContent = project.year || "";

        }

        // Tags
        const tagContainer = document.getElementById("projectTags");

        if (tagContainer) {

            tagContainer.innerHTML = "";

            (project.tags || []).forEach(tag => {

    const link = document.createElement("a");

    link.className = "tag";

    link.href = `archive.html?tag=${encodeURIComponent(tag)}`;

    link.textContent = tag;

    tagContainer.appendChild(link);

});

        

        }

// Markdown content
if (project.content) {

    console.log("Loading markdown:", project.content);

    await renderMarkdown(project.content);

}

// Previous / Next navigation
renderProjectNavigation(projects, project);

} catch (error) {

    console.error("Couldn't load project:", error);

}

}


// =============================================
// PROJECT NAVIGATION
// =============================================

function renderProjectNavigation(projects, currentProject) {

    const nav = document.getElementById("projectNavigation");
    if (!nav) return;

    // Only featured projects
    const featured = projects.filter(p => p.featured === true);

    const currentIndex = featured.findIndex(
        p => p.slug === currentProject.slug
    );

    const previous = currentIndex > 0
        ? featured[currentIndex - 1]
        : null;

    const next = currentIndex < featured.length - 1
        ? featured[currentIndex + 1]
        : null;

    // Hide entire navigation if only one project exists
    if (!previous && !next) {
        nav.style.display = "none";
        return;
    }

    nav.innerHTML = "";

    // Previous
    if (previous) {

        nav.innerHTML += `
            <a class="project-prev"
               href="project.html?slug=${previous.slug}">
                <span>← Previous</span>
                <strong>${previous.title}</strong>
            </a>
        `;

    } else {

        // Empty spacer so Next stays on the right
        nav.innerHTML += `<div></div>`;

    }

    // Next
    if (next) {

        nav.innerHTML += `
            <a class="project-next"
               href="project.html?slug=${next.slug}">
                <span>Next →</span>
                <strong>${next.title}</strong>
            </a>
        `;

    }

}
// =============================================
// INITIALISE
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

    loadProjectPage();

});