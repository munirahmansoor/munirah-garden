> **Status:** Actively developed. This repository documents the evolution of a lightweight static CMS for creative portfolios and long-form publishing.

# Portfolio CMS

A lightweight, static portfolio and publishing platform built with HTML, CSS and Vanilla JavaScript.

Originally based on the **Phantom** template by HTML5 UP, 
this project has since evolved into a custom content management 
system (CMS) powered entirely by JSON and Markdown. 
Instead of relying on a traditional backend or third-party CMS, 
all content is managed as static files, making the site fast, 
secure and easy to deploy on GitHub Pages.

---

## Overview

This project was created to serve as both a portfolio and a long-term publishing platform.

The goal was to separate **content**, **presentation**, and **data**, 
allowing projects and writings to be updated without editing HTML pages directly.

Current features include:

- JSON-driven homepage 
- Dynamic individual project pages
- Markdown-based content rendering
- Custom Markdown renderer
- Archive with tag filtering
- Clickable project taxonomy
- Featured project support
- Optional hero images
- Previous / Next project navigation
- Responsive layouts
- Static deployment through GitHub Pages

---

## Architecture

```
                        Content

                Google Docs (Writing)
                        │
                        ▼
              Export as Markdown (.md)
                        │
                        ▼
              assets/content/*.md

                        ▲
                        │

        projects.json         writings.json
               │                    │
               └────────────┬───────┘
                            ▼

                     project.js
                     archive.js

                            ▼

                    renderer.js

                            ▼

                  HTML rendered
                  in the browser
```

The site intentionally avoids databases and server-side rendering.

All pages are rendered client-side using lightweight JavaScript.

---

## Repository Structure

```
assets/
│
├── content/
│   ├── project-a.md
│   ├── project-b.md
│   └── ...
│
├── data/
│   ├── projects.json
│   └── writings.json
│
├── js/
│   ├── project.js
│   ├── archive.js
│   ├── renderer.js
│   └── main.js
│
├── css/
│   └── main.css
│
├── index.html
├── project.html
├── archive.html
└── writing.html
```

---

## Content Workflow

Projects are intentionally written outside the codebase.

```
Google Docs

↓

Markdown

↓

assets/content/

↓

renderer.js

↓

Website
```

This keeps writing separate from implementation while preserving the benefits of static hosting.

---

## Features

### Homepage

- Loads featured projects dynamically from `projects.json`
- No manual HTML editing required
- Featured projects can be toggled with:

```json
"featured": true
```

---

### Project Pages

Projects are loaded dynamically via URL slugs.

```
project.html?slug=my-project
```

Each page automatically renders:

- Title
- Subtitle
- Hero image (optional)
- Year
- Tags
- Markdown content

---

### Markdown Renderer

Projects are written in Markdown rather than HTML.

Supported content includes:

- Headings
- Images
- Responsive image galleries
- Hyperlinks
- Code blocks
- Embedded iframes
- Videos
- Raw HTML when needed

---

### Archive

The archive automatically indexes content from JSON files.

Features include:

- Tag filtering
- URL-based filtering

```
archive.html?tag=research
```

- Automatic category generation
- Shared taxonomy across projects and writings

---

### Navigation

Each project page automatically generates:

- Previous project
- Next project

based on the current ordering of featured projects.

---

## Technologies

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

### Content

- Markdown
- JSON

### Rendering

- Marked.js

### Deployment

- GitHub Pages

### Authoring

- Google Docs
- Markdown

---

## Design Philosophy

The project intentionally avoids heavyweight frameworks and backend services.

Goals include:

- fast loading
- static hosting
- long-term maintainability
- simple content editing
- low dependency count
- readable source code

Rather than introducing a database or authentication layer, structured JSON files provide the site's data while Markdown provides the content layer.

---

## Future Roadmap

Planned improvements include:

- Related projects
- Full-text search
- Reading time estimation
- Image lightbox
- Table of contents generation
- RSS feed
- Dark/light theme toggle
- Keyboard navigation
- Progressive Web App support

---

## Credits

### HTML Template

This project began with the **Phantom** template by **AJ Kohn** from **HTML5 UP**.

The original template provided the initial responsive layout and visual foundation.

Over time, the site's architecture was substantially redesigned into a 
custom static CMS with dynamic routing, JSON-driven content management, 
Markdown rendering, archive generation, and client-side navigation.

HTML5 UP  
https://html5up.net

License: Creative Commons Attribution 3.0

---

### Design Inspiration

The information architecture and presentation of projects and writings were inspired by:

- https://ky.fyi/

This project does **not** reuse code from ky.fyi, but draws inspiration 
from their thoughtful organization of creative work and writing.

---

### Development Assistance

Development was assisted by **ChatGPT (OpenAI)**.

ChatGPT was used throughout development for:

- architecture discussions
- JavaScript implementation
- debugging
- refactoring
- renderer design
- CMS planning
- documentation

All final design decisions, implementation, testing and content are the work of the repository author.

---

### Libraries

- Marked.js
- Font Awesome
- jQuery (legacy HTML5 UP components)

---

## License

This repository contains modifications built upon the HTML5 UP Phantom template.

Please refer to the original HTML5 UP license for template usage:

https://html5up.net/license

All original content, code modifications, 
Markdown renderer, CMS architecture, 
project content and documentation are c
opyright © 2026 Nara Medusa unless otherwise stated.