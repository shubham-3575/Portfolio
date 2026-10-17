# Shubham Patel — Portfolio

A standalone HTML, CSS, and JavaScript portfolio. No framework, package installation, build command, or environment variables are required.

## Repository root

Use `C:\Users\HP\Desktop\Portfolio` as the root of your new Git repository. Its contents should be directly at the top level of GitHub: `public/`, `vercel.json`, and this README. Do not add another enclosing `Portfolio/` folder inside the repository.

```text
Portfolio/                            Repository root
├── .git/                             Existing Git metadata; replace yourself when starting the new repository
├── .gitignore                        Ignores local Vercel settings and OS files
├── .vercelignore                     Excludes documentation and Git metadata from deployment uploads
├── vercel.json                       Publishes only public/ with no build step
├── README.md                         This project guide
└── public/                           Complete website; served as the domain root
    ├── index.html                    Page content, navigation, education, inline SVG animation
    ├── styles.css                    Design, layout, animation, responsive styles
    ├── script.js                     Profile links and interactive behavior
    └── assets/
        ├── favicon.svg               Browser tab icon
        ├── documents/
        │   └── Shubham-Patel-Resume.pdf
        └── fonts/
            ├── Satoshi-Regular.woff2
            └── Satoshi-Bold.woff2
```

The existing `.git/` directory was left untouched. A newly initialized repository creates its own `.git/` metadata; it is never part of the uploaded source files. Vercel CLI may later create an ignored `.vercel/` directory.

## Vercel deployment

1. Create your new Git repository in this Portfolio directory and push its contents to GitHub. Include all the public files, the PDF, both fonts, and root configuration files.
2. In Vercel, select Add New → Project and import the new repository.
3. Root Directory: leave at the repository root (`./`). Do not select `public/` as the Root Directory.
4. Framework Preset: Other. Build Command: empty. Output Directory: `public`. These settings are declared in `vercel.json`. No environment variables are needed.
5. Click Deploy and open the generated URL.
6. Check mobile navigation, project links, and resume viewing/downloading.

Vercel serves `public/index.html` at `/`, not at `/public/index.html`. Files outside `public/` are not website content. Push future updates to the connected production branch to redeploy automatically.

This project is prepared for deployment; it has not been published in this task.

Official Vercel configuration: https://vercel.com/docs/builds/configure-a-build

## Local preview

From the repository root:

```powershell
python -m http.server 4174 --bind 127.0.0.1 --directory public
```

Visit http://127.0.0.1:4174 and stop the server with Ctrl+C. Alternatively, open `public/index.html` directly in a browser.

## Editing

- Page content: `public/index.html`.
- Styling and motion: `public/styles.css`.
- Contact/social links and interactive behavior: `public/script.js`. The `profile` object is near the top.
- Resume: replace `public/assets/documents/Shubham-Patel-Resume.pdf` using the same filename. If renaming it, update both the HTML links and JavaScript profile path.
- Font files: retain both files in `public/assets/fonts/`.

Keep new browser assets inside `public/`. Keep project documentation, scripts, and configuration outside it. Do not place private files in `public/`, which is intentionally served to visitors.

The contact button opens the visitor's mail application. The hero animation is inline SVG, requiring no separate image asset. Native anchor scrolling, one-time reveals, and reduced-motion support are retained.

## Verification

Run `node --check public/script.js` for syntax. Validate local resource paths relative to `public/`, the website root. Old Framer export folders and obsolete routing rules have been removed.
