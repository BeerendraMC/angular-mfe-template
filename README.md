# Angular Micro-Frontend Template

This template provides a foundational setup for building micro-frontend applications using **Angular CLI version 19.2.0**. It's designed to streamline the process of creating independent Angular applications that can be integrated into a larger host application.

---

## What is a Micro-Frontend?

Micro-frontends are an architectural style where a web application is broken down into smaller, independent "micro" applications. Each micro-frontend can be developed, deployed, and managed autonomously, enabling teams to work more independently and scale their development efforts.

---

## Getting Started

Follow these steps to set up and create your own Angular micro-frontend application.

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Installation

1.  **Install Angular CLI Globally**

    If you don't already have it, install the Angular CLI globally on your machine:

    ```bash
    npm install -g @angular/cli
    ```

2.  **Create an Angular Workspace**

    Start by creating a new Angular workspace. This acts as a monorepo, allowing you to manage multiple Angular projects (including your micro-frontends) within a single repository. The `--no-create-application` flag ensures no default application is generated with the workspace.

    ```bash
    ng new [workspace_name] --no-create-application
    ```

3.  **Navigate to the Workspace Directory**

    Change your current directory to the newly created workspace:

    ```bash
    cd [workspace_name]
    ```

4.  **Generate Your First Micro-Frontend Application**

    Now, generate a new Angular application within your workspace. This will be your first micro-frontend.

    ```bash
    ng generate application [mfe_name]
    ```

5.  **Generate Environments**

    It's good practice to set up environment files for different deployment targets (e.g., development, production).

    ```bash
    ng generate environments --project=[mfe_name]
    ```

6.  **Install Necessary Dependencies**

    1. Install `webpack-cli` and `copy-webpack-plugin` as dev dependencies. These are required for building the micro-frontend.
    2. Install `@angular/elements` as a dependency which provides the necessary tools and APIs to convert an Angular component into a framework-agnostic custom element.

    ```bash
    npm install --save-dev webpack-cli copy-webpack-plugin
    npm install --save @angular/elements
    ```

---

## Webpack Configuration for Micro-Frontends

To prepare your Angular application as a standalone micro-frontend that can be loaded elsewhere, you'll need a custom `webpack.config.js`. This configuration bundles your application's main files and assets into a single JavaScript file, making it easy to consume.

1.  **Create `webpack.config.js`**

    Create a file named `webpack.config.js` in the **root directory** of your Angular workspace (the same level as `angular.json`). Add the following code:

    ```javascript
    const path = require('path');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    
    module.exports = env => {
      if (!env || !env.project_name) {
        throw new Error(
          "Error: 'project_name' environment variable is required. Please provide it using --env project_name=<your-project-name>"
        );
      }
      const projectName = env.project_name;
      const environment = env.target_env || 'dev';
    
      const srcPath = `./dist/${projectName}-${environment}/browser`;
      const dstPath = `./elements/${projectName}-${environment}`;
    
      console.log(`Building for Project: ${projectName}`);
      console.log(`Target Environment: ${environment}`);
      console.log(`Source Path: ${srcPath}`);
      console.log(`Output Path: ${dstPath}`);
    
      return {
        mode: 'production',
        entry: {
          bundle: [`${srcPath}/polyfills.js`, `${srcPath}/main.js`]
        },
        output: {
          path: path.resolve(__dirname, dstPath), // Output directory
          filename: `${projectName}-element.js`
        },
        module: {
          rules: [
            // You might need rules for handling other file types (e.g., Babel for older browser support)
          ]
        },
        plugins: [
          new CopyWebpackPlugin({
            patterns: [
              {
                from: `${srcPath}/styles.css`,
                to: `${projectName}-styles.css`
              },
              {
                from: `${srcPath}/assets`,
                to: 'assets',
                noErrorOnMissing: true // Prevents errors if the assets directory does not exist
              },
              // Comment this out if you don't want to view MFE as a standalone app
              {
                from: `./elements/${projectName}.html`,
                to: `index.html`,
                noErrorOnMissing: true // Prevents errors if the HTML file does not exist
              }
            ]
          })
        ]
        // devtool: 'inline-source-map' // Optional: for easier debugging
      };
    };
    ```

    **Note:** The `srcPath` in the `webpack.config.js` was updated from `./dist/${projectName}-${environment}` to `./dist/${projectName}-${environment}/browser` as Angular CLI versions 17+ typically output to `dist/[project-name]/browser` regardless of environment for the browser build. You might need to adjust this depending on your specific Angular version and build output structure.

---

## Building Your Micro-Frontend

Once you have your `webpack.config.js` set up, you can build your micro-frontend. You'll typically run an Angular build command followed by a webpack command to process the output.
Example:

1.  **Angular Build Command**

    ```bash
    ng build [project_name] --configuration [env] --output-hashing none --output-path dist/[project_name]-[env]

    ng build sample-mfe --configuration dev --output-hashing none --output-path dist/sample-mfe-dev
    ```

2.  **Webpack Command**

    ```bash
    webpack --config webpack.config.js --env project_name=[project_name] target_env=[env]

    webpack --config webpack.config.js --env project_name=sample-mfe target_env=dev
    ```

    **Note:** The `project_name` and `target_env` arguments are required

---

## Usage in a Host Application

This section will explain how to consume the generated micro-frontend (`[mfe_name]-element.js` and `[mfe_name]-styles.css`) in a host application (e.g., a single-spa setup, or a simple HTML page).

Load the micro-frontend in your host application by referencing `[mfe_name]-element.js` and `[mfe_name]-styles.css` files like below

```html
<script src="./[mfe_name]-element.js" type="module"></script>
<link href="./[mfe_name]-styles.css" rel="stylesheet" />
```

---

## Contributing

This project welcomes contributions. Submit a pull request if you'd like to contribute.

---
