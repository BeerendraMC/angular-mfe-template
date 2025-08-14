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
            to: `index.html`
          }
        ]
      })
    ]
    // devtool: 'inline-source-map' // Optional: for easier debugging
  };
};
