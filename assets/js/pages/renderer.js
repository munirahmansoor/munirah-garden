// =============================================
// renderer.js
// Portfolio Markdown Renderer
// =============================================

class PortfolioRenderer {

    constructor(container) {

        this.container = container;

    }

    // -----------------------------------------
    // Public
    // -----------------------------------------

    async load(path) {

        this.showLoading();

        try {

            const response = await fetch(path);

            if (!response.ok) {

                throw new Error(`Couldn't load ${path}`);

            }

            const markdown = await response.text();

            this.render(markdown);

        }

        catch (error) {

            console.error(error);

            this.showError(error);

        }

    }

    render(markdown) {

        // Markdown → HTML

        this.container.innerHTML =
            marked.parse(markdown);


        // Enhance HTML

        this.decorateLinks();

        this.buildGalleries();

        this.decorateImages();

        this.decorateCode();

    

    }

    // -----------------------------------------
    // Helpers
    // -----------------------------------------

    showLoading() {

        this.container.innerHTML =
            "<p>Loading...</p>";

    }

    showError(error) {

        this.container.innerHTML = `
            <p>
                Couldn't load content.
            </p>
        `;

    }

    // -----------------------------------------
    // Links
    // -----------------------------------------

    decorateLinks() {

        this.container
            .querySelectorAll("a")
            .forEach(link => {

                link.target = "_blank";

                link.rel = "noopener";

            });

    }

    // -----------------------------------------
    // Images
    // -----------------------------------------

    decorateImages() {

        this.container
            .querySelectorAll("img")
            .forEach(image => {

                image.loading = "lazy";

                image.decoding = "async";

            });

    }

    // -----------------------------------------
    // Code
    // -----------------------------------------

    decorateCode() {

        this.container
            .querySelectorAll("pre")
            .forEach(block => {

                block.classList.add("code-block");

            });

    }

    // -----------------------------------------
    // Galleries
    // -----------------------------------------

    buildGalleries() {

        const paragraphs =
            [...this.container.querySelectorAll("p")];

        let images = [];

        paragraphs.forEach(paragraph => {

            if (paragraph.children.length === 1 &&
                paragraph.firstElementChild.tagName === "IMG") {

                images.push(paragraph);

            }

            else {

                this.wrapGallery(images);

                images = [];

            }

        });

        this.wrapGallery(images);

    }

    wrapGallery(images) {

        if (images.length < 2) return;

        const gallery =
            document.createElement("div");

        gallery.className = "gallery";

        images[0].before(gallery);

        images.forEach(image => {

            gallery.appendChild(image);

        });

    }

}


// =============================================
// Public function
// =============================================

async function renderMarkdown(path) {

    console.log("renderMarkdown called:", path);

    const container = document.getElementById("projectContent");

    if (!container) {
        console.error("#projectContent not found");
        return;
    }

    const renderer = new PortfolioRenderer(container);

    await renderer.load(path);

}