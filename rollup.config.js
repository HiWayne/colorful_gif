const path = require("path");
const { default: babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const { default: dts } = require("rollup-plugin-dts");
const rimraf = require("rimraf");

const pkg = require(path.join(__dirname, `package.json`));
const peerDependencies = pkg.peerDependencies
  ? Object.keys(pkg.peerDependencies)
  : [];
const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

rimraf.sync(path.join(__dirname, "lib"));
rimraf.sync(path.join(__dirname, "es"));

module.exports = [
  {
    input: path.join(__dirname, "src/colorfulGif/index.ts"),
    output: [
      {
        file: path.join(__dirname, `es/index.js`),
        format: "esm",
        // 当使用export default导出时，用"auto"或"default"
        exports: "named",
      },
      {
        file: path.join(__dirname, `lib/index.js`),
        format: "umd",
        name: "ColorfulGif",
        // 当使用export default导出时，用"auto"或"default"
        exports: "named",
      },
    ],
    external: [...peerDependencies, ...dependencies],
    plugins: [
      nodeResolve({
        mainField: ["jsnext:main", "browser", "module", "main"],
        // browser: true,
        extensions: [".js", ".es6", ".es", ".mjs", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript(),
      babel({
        include: [/\.(j|t)sx?$/],
        babelrc: false,
        presets: [
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
              },
              modules: false,
            },
          ],
        ],
        plugins: [
          [
            "@babel/plugin-transform-classes",
            {
              loose: true,
            },
          ],
        ],
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        // babel 默认不支持 ts 需要手动添加
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
  },
  {
    input: path.join(__dirname, "src/colorfulGif/index.ts"),
    output: [
      {
        file: path.join(__dirname, "lib/type.d.ts"),
        format: "esm",
      },
      {
        file: path.join(__dirname, "es/type.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
];
