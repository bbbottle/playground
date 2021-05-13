import rollupOptions from "./rollup.config";

const PROD = "production";

const externalDependencies = {
  rxjs: "6.6.3",
  "rxjs/operators": "6.6.3",
  classnames: "2.2.6",
  immer: "8.0.1",
  react: "17.0.1",
  "react-dom": "17.0.1",
  "prop-types": "15.7.2",
};

const externalsDepsToEsmDotShCDNURL = (depVerMap = {}) => {
  const baseCDNURL = "https://esm.sh";
  const retMap = {};

  for (const dep in depVerMap) {
    const [d, ...rest] = dep.split("/");
    const suffixPath = rest.join("/");
    const ver = depVerMap[d];
    const pkg = `${d}@${ver}`;
    retMap[dep] = `${baseCDNURL}/${pkg}/${suffixPath}`;
  }

  return retMap;
};

export default ({ mode }) => {
  const alias = externalsDepsToEsmDotShCDNURL(externalDependencies);

  const sharedOptions = {
    root: "src",
    json: { stringify: true },
    resolve: { alias },
  };

  const buildOptions = {
    build: {
      outDir: "../dist",
      name: "index.js",
      target: "esnext",
      rollupOptions,
    },
  };

  const serveOptions = {
    server: {
      port: 8080,
    },
  };

  const isBuilding = mode === PROD;

  console.log("----", isBuilding);

  return {
    ...sharedOptions,
    ...(isBuilding ? buildOptions : serveOptions),
  };
};
