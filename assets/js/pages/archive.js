// =============================================
// ARCHIVE
// =============================================

const PROJECTS_JSON = "assets/data/projects.json";
const WRITINGS_JSON = "assets/data/writings.json";

let allContent = [];

// =============================================
// Read URL
// archive.html?tag=archive
// =============================================

function getTagFromURL() {

    const params = new URLSearchParams(window.location.search);

    return params.get("tag");

}

// =============================================
// Load all content
// =============================================

async function loadArchive() {

    const container = document.getElementById("archiveGrid");

    if (!container) return;

    try {

        const [projectsResponse, writingsResponse] = await Promise.all([

            fetch(PROJECTS_JSON),
            fetch(WRITINGS_JSON)

        ]);

        if (!projectsResponse.ok)
            throw new Error("Couldn't load projects.");

        if (!writingsResponse.ok)
            throw new Error("Couldn't load writings.");

        // Add page property automatically
        const projects = (await projectsResponse.json()).map(item => ({
            ...item,
            page: "project.html"
        }));

        const writings = (await writingsResponse.json()).map(item => ({
            ...item,
            page: "writing.html"
        }));

        // Merge everything
        allContent = [
            ...projects,
            ...writings
        ];

        // Sort newest first (optional)
        allContent.sort((a, b) => (b.year || 0) - (a.year || 0));

        const selectedTag = getTagFromURL();

        buildFilters(allContent, selectedTag);

        if (selectedTag) {

            renderProjects(

                allContent.filter(item =>
                    item.tags &&
                    item.tags.includes(selectedTag)
                )

            );

        } else {

            renderProjects(allContent);

        }

    }

    catch (error) {

        console.error(error);

    }

}

// =============================================
// Build filters
// =============================================

function buildFilters(items, selectedTag = null) {

    const container =
        document.getElementById("archiveFilters");

    if (!container) return;

    container.innerHTML = "";

    const tags = new Set();

    items.forEach(item => {

        (item.tags || []).forEach(tag => {

            tags.add(tag);

        });

    });


    // All
    createButton(
        "All",
        "all",
        !selectedTag
    );


    // Tags
    [...tags]
        .sort()
        .forEach(tag => {

            createButton(
                tag,
                tag,
                selectedTag === tag
            );

        });


    //----------------------------------------
    // Create filter button
    //----------------------------------------

    function createButton(label, value, active = false) {

        const button = document.createElement("button");

        button.textContent = label;

        // Reuse project tag styling
        button.classList.add("tag");

        if (active) {
            button.classList.add("active");
        }


        // Click
        button.addEventListener("click", () => {

            container
                .querySelectorAll("button")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");


            // Update URL
            const url = new URL(window.location);


            if (value === "all") {

                url.searchParams.delete("tag");

                renderProjects(allContent);

            }

            else {

                url.searchParams.set("tag", value);

                renderProjects(
                    allContent.filter(item =>
                        item.tags &&
                        item.tags.includes(value)
                    )
                );

            }


            history.replaceState({}, "", url);

        });


        container.appendChild(button);

    }

}

// // =============================================
// // Render archive
// // =============================================

// function renderProjects(items) {

//     const container =
//         document.getElementById("archiveGrid");

//     if (!container) return;

//     container.innerHTML = "";

//     items.forEach(item => {

//         const article =
//             document.createElement("article");

//         article.className = "archive-card";

//         article.innerHTML = `

//             <div class="archive-tags">

//                 ${(item.tags || []).join(", ")}

//             </div>

//             <h2>

//                 <a href="${item.page}?slug=${item.slug}">

//                     ${item.title}

//                 </a>

//             </h2>

//             <p>

//                 ${item.description || ""}

//             </p>

//             <a
//                 class="read-more"
//                 href="${item.page}?slug=${item.slug}">

//                 Read →

//             </a>

//         `;

//         container.appendChild(article);

//     });

// }

// // =============================================
// // Initialise
// // =============================================

// document.addEventListener("DOMContentLoaded", () => {

//     loadArchive();

// });

// =============================================
// Render archive
// =============================================

function renderProjects(items) {

    const container = document.getElementById("archiveGrid");

    if (!container) return;

    container.innerHTML = "";

    items.forEach(item => {

        const article = document.createElement("article");

        article.className = "archive-card";

        article.innerHTML = `

            <a
                class="archive-card-link"
                href="${item.page}?slug=${item.slug}"
            >

                <div class="archive-card-content">

                    <div class="archive-card-info">

                        <h3>
                            ${item.title}
                        </h3>
                        <br>

                        <p class="archive-card-description">
                            ${item.description || ""}
                        </p>

                        <div class="archive-card-meta">

                            ${(item.tags || []).join(" · ")}

                            ${item.year ? ` · ${item.year}` : ""}

                        </div>

                      

                    </div>

                   ${item.image ? `
    <div class="archive-card-image">
        <img
            src="${item.image}"
            alt="${item.title}"
            loading="lazy"
        >
    </div>
` : ""}

                </div>

            </a>

        `;

        container.appendChild(article);

    });

}


// =============================================
// Initialise
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    loadArchive();

});