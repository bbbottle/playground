import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy'

const vendorPaths = [
  'node_modules/classnames/bind.js',
  'node_modules/prop-types/prop-types.min.js',
  'node_modules/immer/dist/immer.umd.production.min.js',
  'node_modules/react/umd/react.production.min.js',
  'node_modules/react-dom/umd/react-dom.production.min.js',
  'node_modules/rxjs/bundles/rxjs.umd.min.js',
  'node_modules/systemjs/dist/s.min.js',
  'node_modules/systemjs/dist/system.min.js',
];

export default {
  input: 'src/assets/index.js',
  output: [
    {
      sourcemap: false,
      file: './dist/assets/entry.js',
      format: 'system',
    },
  ],
  plugins: [
    resolve(),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/' },
        { src: 'src/assets', dest: 'dist/' },

        ...vendorPaths.map(p => ({src: p, dest: 'dist/assets/'})),
      ]
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        "@babel/plugin-syntax-export-default-from",
        "@babel/plugin-proposal-class-properties"
      ]
    }),
    commonjs()
  ],
};