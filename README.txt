Portfolio CMS

A lightweight static portfolio and publishing platform built with HTML, CSS, and vanilla JavaScript. Originally based on the Phantom template by HTML5 UP, it has evolved into a custom CMS powered by JSON and Markdown, with no backend — all content lives in static files, making it fast, secure, and easy to deploy on GitHub Pages.

Overview
Built as both a portfolio and a long-term publishing platform, the site separates content, presentation, and data so projects and writings can be updated without touching HTML. Key features: JSON-driven homepage, dynamic project pages, Markdown rendering with a custom renderer, tag-filtered archive, project taxonomy, featured project support, optional hero images, previous/next navigation, responsive layouts, and static deployment via GitHub Pages.

Architecture
Content is written in Google Docs, exported as Markdown, and placed in assets/content. Metadata lives in projects.json and writings.json. These feed into project.js and archive.js, which pass data to renderer.js for client-side HTML rendering. No databases or server-side rendering are used.