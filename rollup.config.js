import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear'
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'
import { terser } from "rollup-plugin-terser";


export default {
  input: ['src/assets/index.js'],
  output: [
    {
      sourcemap: false,
      dir: './dist/assets',
      format: 'system',
    },
  ],
  plugins: [
    resolve(),
    clear({
      target: ['dist/assets']
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/' },
        { src: 'src/assets', dest: 'dist/' },
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
    replace({
      'process.env.NODE_ENV': "'production'",
    }),
    commonjs(),
    terser()
  ],
};