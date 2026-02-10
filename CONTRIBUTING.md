# Contributing to programming-course-docs

Thank you for your interest in contributing to this course documentation!

## How to Contribute

1.  **Report Bugs**: Use GitHub Issues to report bugs in the content.
2.  **Suggest Improvements**: Suggest new content or improvements to existing content via Issues or Pull Requests.
3.  **Submit Pull Requests**:
    *   Fork the repository.
    *   Create a new branch for your changes.
    *   Ensure your changes follow the project's style and structure.
    *   Submit a Pull Request with a clear description of your changes.

## Content Guidelines

*   Use Japanese for all content (unless it's code/technical terms where English is appropriate).
*   Follow the existing folder structure and `_meta.ts` patterns.
*   Ensure all images and assets are placed in the appropriate `img/` or `assets/` folders within the page's directory.

## Rule Composition

This repository uses `compose-agentsmd` to manage agent rules. If you update any rules, please run `compose-agentsmd` to regenerate `AGENTS.md`.
