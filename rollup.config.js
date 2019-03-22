import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'bin/serve.js',
    output: {
      file: 'dist/byproxy-serve.umd.js',
      format: 'umd',
      name: 'byproxy'
    },
    plugins: [terser()]
  },
  {
    input: 'bin/serve.js',
    output: {
      file: 'dist/byproxy-serve.m.js',
      format: 'esm'
    },
    plugins: [terser()]
  },
  {
    input: 'bin/link.js',
    output: {
      file: 'dist/byproxy-link.js',
      format: 'iife',
      name: 'byproxy'
    },
    plugins: [terser()]
  },
  {
    input: 'bin/link.js',
    output: {
      file: 'dist/byproxy-link.m.js',
      format: 'esm'
    },
    plugins: [terser()]
  }
];