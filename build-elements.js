const fs = require("fs-extra");

(async function build() {
  try {
    const project = process.argv.slice(2)[0];

    if (!project) {
      return false;
    }

    const srcPath = `./dist/${project}/browser`;
    const dstPath = `./elements/${project}`;

    console.log(`srcPath: ${srcPath}`);
    console.log(`dstPath: ${dstPath}`);

    await fs.ensureDir(dstPath);
    await fs.copyFile(
      `${srcPath}/styles.css`,
      `${dstPath}/${project}-styles.css`
    );

    fs.ensureDir(`${srcPath}/assets`)
      .then(() => {
        fs.copy(`${srcPath}/assets`, `${dstPath}/assets`);
      })
      .catch((e) => {
        throw e;
      });

    console.info(`
          ====================================
              elements build successfully
          ====================================
          `);
  } catch (e) {
    console.error(
      `
        ======================================
            Error while building elements
        ======================================
        \n`,
      "\n",
      e
    );
  }
})();
