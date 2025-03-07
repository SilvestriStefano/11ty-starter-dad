# Personal 11ty starter - DAD

My personal starter for an 11ty website. It has the bare minimum configuration organized as I like it.

## Dependencies
The only dependency is `@11ty/eleventy` v3.0.0. It needs a Node.js version 20 or later.

## 11ty Plug-ins
The only plug-ins installed are
- `@11ty/eleventy-img` v6.0.1
- `@11ty/elevnty-navigation` v0.3.5

## Install and run
- `npm install` to install eleventy and the plug-ins
- `npm start` to run eleventy and start a local development server at http://localhost:8080/
- `npm run build` to build the website in production.

To modify the commands edit `package.json`

## Folder structure
```shell
_config/
├── libraries #contains the library instance (Markdown, HAML, Mustache, Liquid, etc. ) definition.
├── shortcodes/
│   ├── async/
│   │   └── asyncShortCodes.js #export all the async shortcodes. See .eleventy.js.
│   ├── primaryNavigation.js
│   └── shortcodes.js #export all the shortcodes. See .eleventy.js
├── utils #contains more JS scripts that are used often in shortcodes.
├── public #where the HTML files will be written.
├── src/
│   ├── _data/ #where the data of the site will reside.
│   │   └── site.json #site info.
│   ├── _includes/ #templates
│   │   ├── base.njk
│   │   ├── footer.njk
│   │   ├── head.njk
│   │   ├── icons.njk
│   │   └── nav.njk
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── files
│   │   ├── fonts
│   │   └── img/
│   │       ├── favicon/
│   │       │   └── favicon.svg
│   │       └── social/
│   ├── index.njk
│   ├── robots.txt.njk
│   └── sitemap.njk
├── .eleventy.js
├── .gitignore
├── .nojekyll #necessary if publishing through Github Pages
├── package-lock.json
├── package.json
└── README.md
```

## Publish on GitHub Pages
Create the `ACTIONS_DEPLOY_KEY` repository secret in GitHub, via Settings > Security (section) > Secrets (tab) > New Repository Secret 

Make sue the `.nojekyll` file is in the repo.

Add the following GitHub Action workflow
```yaml
# Sample workflow for building and deploying a 11ty site to GitHub Pages
name: 11ty build

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["master"]
    paths-ignore:
      - 'README.md'
  
jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '20.x'
      - name: Install dependencies & build
        run: npm ci && npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./public

```