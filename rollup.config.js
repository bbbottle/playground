import babel from "rollup-plugin-babel";
import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";

const entryHTMLTransformer = (contents) => {
  return contents
    .toString()
    .replace('type="module"', 'type="systemjs-module"')
    .replace(
      "<!-- RXJS_HACK_SCRIPTS -->",
      '<script src="./assets/rxjs-operators-resolve-hacker.js"></script>'
    );
};

export default {
  treeshake: false,
  input: ['src/assets/index.js'],
  output: [
    {
      sourcemap: false,
      dir: "./dist/assets",
      format: "system",
      entryFileNames: `[name].js`,
    },
  ],
  plugins: [
    resolve(),
    clear({
      target: ["dist"],
    }),
    copy({
      targets: [
        {
          src: "src/index.html",
          dest: "dist/",
          transform: entryHTMLTransformer,
        },
        { src: "src/service-worker.js", dest: "dist/" },
        { src: "src/CNAME", dest: "dist/" },
        { src: "src/assets", dest: "dist/" },
      ],
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/plugin-syntax-export-default-from",
        "@babel/plugin-proposal-class-properties",
      ],
    }),
    replace({
      "process.env.NODE_ENV": "'production'",
    }),
  ],
  external: [
    "react",
    "react-dom",
    "immer",
    "classnames",
    "prop-types",
    "rxjs/operators",
    "rxjs",
  ],
};
